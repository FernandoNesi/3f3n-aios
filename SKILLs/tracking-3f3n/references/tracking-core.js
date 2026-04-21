/**
 * 3F3N Tracking Core — v3.0.0 (production-ready)
 *
 * Padrão definitivo reutilizável para qualquer landing (capturaA/B/C/…).
 *
 * Uso em 1 linha:
 *
 *   initTracking({ page: 'capturaA' });
 *
 * A facade `initTracking` lê IDs de `window.__ENV__` (GA4_ID, PIXEL_ID,
 * WEBHOOK_URL, UTM_TTL_DAYS) e expõe a API completa em `Tracking3F3N`.
 *
 * ─── Hardening aplicado ────────────────────────────────────────────────
 *  ✔ Payload flat validado antes de cada disparo (8 campos obrigatórios)
 *  ✔ event_id UUID compartilhado client ↔ Pixel ↔ CAPI (dedup)
 *  ✔ Dedup inteligente: { once: true }  OU  TTL curto anti duplo-clique
 *  ✔ Dedup lock liberado em falha de webhook (permite retry real)
 *  ✔ Storage tolerante: localStorage → sessionStorage → in-memory
 *  ✔ UTM fallback completo (direct / none / organic)
 *  ✔ _fbp sintético quando cookie ausente (mantém match quality)
 *  ✔ _fbc derivado automaticamente de ?fbclid=…
 *  ✔ Safe retry com backoff exponencial (2 retries) no webhook
 *  ✔ init idempotente + auto page_view com dedup
 *  ✔ Debug: ?debug_tracking=1 ou window.TRACKING_DEBUG=true
 *  ✔ Logs estruturados em JSON (grep-friendly)
 */

(function (global) {
  'use strict';

  // ═════════════════════════════ CONSTANTS ═════════════════════════════

  const VERSION = '3.0.0';
  const STORAGE_UTMS = '3f3n_utms';
  const STORAGE_SESSION = '3f3n_session';
  const STORAGE_DEDUP = '3f3n_dedup';

  const UTM_KEYS = [
    'utm_source',
    'utm_medium',
    'utm_campaign',
    'utm_content',
    'utm_term',
  ];
  const UTM_FALLBACK = {
    utm_source: 'direct',
    utm_medium: 'none',
    utm_campaign: 'organic',
    utm_content: 'none',
    utm_term: 'none',
  };

  const REQUIRED_PAYLOAD_FIELDS = [
    'event_name',
    'page_variation',
    'utm_source',
    'utm_medium',
    'utm_campaign',
    'utm_content',
    'event_id',
    'timestamp',
  ];

  const DEDUP_CLICK_TTL_MS = 3000;           // anti duplo-clique
  const DEDUP_ONCE_TTL_MS = 365 * 86400000;  // "uma vez por sessão/ano"
  const DEFAULT_RETRY = { attempts: 3, backoffMs: 500 };

  // ═════════════════════════════ DEBUG / LOG ═════════════════════════════

  function isDebug() {
    if (global.TRACKING_DEBUG === true) return true;
    try {
      return new URLSearchParams(global.location.search).get('debug_tracking') === '1';
    } catch (_) {
      return false;
    }
  }

  function log(level, event, data) {
    if (level === 'INFO' && !isDebug()) return;
    const entry = {
      ts: new Date().toISOString(),
      src: '3F3N-Tracking',
      v: VERSION,
      level: level,
      event: event,
      data: data || null,
    };
    const fn =
      level === 'ERROR' ? console.error :
      level === 'WARN'  ? console.warn  :
                          console.log;
    try { fn(JSON.stringify(entry)); } catch (_) { fn('[3F3N-Tracking]', entry); }
  }

  // ═════════════════════════════ STORAGE (3-tier) ═════════════════════════════

  const storage = (function () {
    const mem = {};
    function tryOp(store, op, k, v) {
      try {
        if (!store) return null;
        if (op === 'get') return store.getItem(k);
        if (op === 'set') { store.setItem(k, v); return true; }
        if (op === 'del') { store.removeItem(k); return true; }
      } catch (_) { return null; }
      return null;
    }
    const ls = (function () { try { return global.localStorage; } catch (_) { return null; } })();
    const ss = (function () { try { return global.sessionStorage; } catch (_) { return null; } })();

    return {
      get: function (k) {
        const a = tryOp(ls, 'get', k);
        if (a != null) return a;
        const b = tryOp(ss, 'get', k);
        if (b != null) return b;
        return (k in mem) ? mem[k] : null;
      },
      set: function (k, v) {
        if (tryOp(ls, 'set', k, v)) return;
        if (tryOp(ss, 'set', k, v)) return;
        mem[k] = v;
      },
      del: function (k) {
        tryOp(ls, 'del', k);
        tryOp(ss, 'del', k);
        delete mem[k];
      },
    };
  })();

  // ═════════════════════════════ UTILS ═════════════════════════════

  function uuid() {
    if (global.crypto && typeof global.crypto.randomUUID === 'function') {
      return global.crypto.randomUUID();
    }
    return 'evt_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2, 10);
  }

  function readCookie(name) {
    try {
      const m = document.cookie.match(new RegExp('(^|;\\s*)' + name + '=([^;]+)'));
      return m ? decodeURIComponent(m[2]) : null;
    } catch (_) { return null; }
  }

  function writeCookie(name, value, days) {
    try {
      const maxAge = days * 86400;
      document.cookie = name + '=' + encodeURIComponent(value) + '; path=/; max-age=' + maxAge + '; SameSite=Lax';
    } catch (_) { /* noop */ }
  }

  function getQuery(key) {
    try { return new URLSearchParams(global.location.search).get(key); }
    catch (_) { return null; }
  }

  function sleep(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  // ═════════════════════════════ UTM LATCH ═════════════════════════════

  function readUTMsFromURL() {
    try {
      const qs = new URLSearchParams(global.location.search);
      const found = {};
      let has = false;
      UTM_KEYS.forEach(function (k) {
        const v = qs.get(k);
        if (v) { found[k] = v; has = true; }
      });
      return has ? found : null;
    } catch (_) { return null; }
  }

  function readUTMsFromStorage() {
    const raw = storage.get(STORAGE_UTMS);
    if (!raw) return null;
    try {
      const parsed = JSON.parse(raw);
      if (parsed.expiresAt && parsed.expiresAt < Date.now()) {
        storage.del(STORAGE_UTMS);
        return null;
      }
      return parsed.utms;
    } catch (_) { return null; }
  }

  function writeUTMsToStorage(utms, ttlDays) {
    storage.set(STORAGE_UTMS, JSON.stringify({
      utms: utms,
      capturedAt: Date.now(),
      expiresAt: Date.now() + ttlDays * 86400000,
    }));
  }

  function applyUTMFallback(utms) {
    const out = {};
    UTM_KEYS.forEach(function (k) {
      out[k] = (utms && utms[k]) || UTM_FALLBACK[k];
    });
    return out;
  }

  // ═════════════════════════════ FBP / FBC ═════════════════════════════

  function ensureFbp() {
    let fbp = readCookie('_fbp');
    if (fbp) return fbp;
    // Meta format: fb.1.{timestamp_ms}.{random int}
    fbp = 'fb.1.' + Date.now() + '.' + Math.floor(Math.random() * 9e9);
    writeCookie('_fbp', fbp, 90);
    return fbp;
  }

  function ensureFbc() {
    const existing = readCookie('_fbc');
    if (existing) return existing;
    const fbclid = getQuery('fbclid');
    if (!fbclid) return null;
    const fbc = 'fb.1.' + Date.now() + '.' + fbclid;
    writeCookie('_fbc', fbc, 90);
    return fbc;
  }

  // ═════════════════════════════ SESSION + DEDUP ═════════════════════════════

  function ensureSessionId() {
    let sid = storage.get(STORAGE_SESSION);
    if (!sid) {
      sid = 'sess_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2, 10);
      storage.set(STORAGE_SESSION, sid);
    }
    return sid;
  }

  function dedupMap() {
    const raw = storage.get(STORAGE_DEDUP);
    if (!raw) return {};
    try { return JSON.parse(raw) || {}; } catch (_) { return {}; }
  }

  function dedupPersist(map) {
    storage.set(STORAGE_DEDUP, JSON.stringify(map));
  }

  function dedupIsLocked(key) {
    const map = dedupMap();
    const now = Date.now();
    let dirty = false;
    Object.keys(map).forEach(function (k) {
      if (map[k] <= now) { delete map[k]; dirty = true; }
    });
    if (dirty) dedupPersist(map);
    return !!map[key] && map[key] > now;
  }

  function dedupLock(key, ttlMs) {
    const map = dedupMap();
    map[key] = Date.now() + ttlMs;
    dedupPersist(map);
  }

  function dedupRelease(key) {
    const map = dedupMap();
    if (key in map) {
      delete map[key];
      dedupPersist(map);
    }
  }

  // ═════════════════════════════ VALIDATION ═════════════════════════════

  function validatePayload(payload) {
    const missing = REQUIRED_PAYLOAD_FIELDS.filter(function (k) {
      const v = payload[k];
      return v === undefined || v === null || v === '';
    });
    if (missing.length) {
      const err = new Error('Tracking3F3N payload invalid — missing: ' + missing.join(', '));
      err.code = 'INVALID_PAYLOAD';
      err.missing = missing;
      throw err;
    }
  }

  // ═════════════════════════════ SAFE RETRY ═════════════════════════════

  function sendWithRetry(url, body, opts) {
    const cfg = Object.assign({}, DEFAULT_RETRY, opts || {});
    let attempt = 0;

    function run() {
      attempt += 1;
      return fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
        keepalive: true,
      })
        .then(function (res) {
          if (res.ok) return res;
          // 4xx = bug do payload; não retentar
          if (res.status >= 400 && res.status < 500) {
            const err = new Error('webhook 4xx: ' + res.status);
            err.code = 'CLIENT_ERROR';
            err.noRetry = true;
            throw err;
          }
          const err = new Error('webhook ' + res.status);
          err.status = res.status;
          throw err;
        })
        .catch(function (err) {
          if (err.noRetry || attempt >= cfg.attempts) throw err;
          const wait = cfg.backoffMs * Math.pow(2, attempt - 1);
          log('WARN', 'webhook_retry', { attempt: attempt, wait: wait, error: String(err) });
          return sleep(wait).then(run);
        });
    }

    return run();
  }

  // ═════════════════════════════ CORE API ═════════════════════════════

  const Tracking3F3N = {
    version: VERSION,
    _initialized: false,
    _config: null,
    sessionId: null,
    utms: null,

    init: function (config) {
      if (this._initialized) {
        log('INFO', 'init_skipped', { reason: 'already_initialized' });
        return this;
      }
      const c = Object.assign({
        ga4_id: null,
        pixel_id: null,
        webhook_url: null,
        page_variation: null,
        ttl_days: 30,
        auto_page_view: true,
        retry: DEFAULT_RETRY,
      }, config || {});

      if (!c.page_variation) log('WARN', 'missing_page_variation');
      if (!c.webhook_url) log('WARN', 'missing_webhook_url');

      const fromURL = readUTMsFromURL();
      if (fromURL) writeUTMsToStorage(fromURL, c.ttl_days);

      this._config = c;
      this.sessionId = ensureSessionId();
      this.utms = applyUTMFallback(readUTMsFromStorage());
      // Cookies Meta (captura / sintetiza uma vez na inicialização)
      ensureFbp();
      ensureFbc();

      this._initialized = true;
      log('INFO', 'initialized', {
        config: c, utms: this.utms, sessionId: this.sessionId,
      });

      if (c.auto_page_view) {
        this.track('page_view', {}, { once: true });
      }
      return this;
    },

    _payload: function (eventName, extra) {
      const cfg = this._config || {};
      const utms = this.utms || applyUTMFallback(null);
      const payload = Object.assign({
        event_name: eventName,
        event_id: uuid(),
        page_variation: cfg.page_variation || 'unknown',
        page_path: global.location.pathname,
        page_url: global.location.href,
        session_id: this.sessionId,
        timestamp: new Date().toISOString(),
        utm_source: utms.utm_source,
        utm_medium: utms.utm_medium,
        utm_campaign: utms.utm_campaign,
        utm_content: utms.utm_content,
        utm_term: utms.utm_term,
        fbp: readCookie('_fbp'),
        fbc: readCookie('_fbc'),
      }, extra || {});
      validatePayload(payload);
      return payload;
    },

    track: function (eventName, extra, opts) {
      if (!this._initialized) {
        log('WARN', 'track_before_init', { eventName: eventName });
        return null;
      }
      const options = opts || {};
      const dedupKey = options.dedupKey || ('track:' + eventName);
      const ttl = options.once ? DEDUP_ONCE_TTL_MS : (options.ttlMs || DEDUP_CLICK_TTL_MS);

      if (dedupIsLocked(dedupKey)) {
        log('INFO', 'track_deduped', { dedupKey: dedupKey });
        return null;
      }
      dedupLock(dedupKey, ttl);

      let payload;
      try { payload = this._payload(eventName, extra); }
      catch (err) { log('ERROR', 'invalid_payload', { error: String(err), missing: err.missing }); return null; }

      try { if (global.gtag) global.gtag('event', eventName, payload); }
      catch (e) { log('ERROR', 'gtag_error', { error: String(e) }); }

      try { if (global.fbq) global.fbq('trackCustom', eventName, payload, { eventID: payload.event_id }); }
      catch (e) { log('ERROR', 'fbq_error', { error: String(e) }); }

      log('INFO', 'track_fired', { eventName: eventName, event_id: payload.event_id });
      return payload;
    },

    conversion: function (eventName, extra, opts) {
      const self = this;
      if (!this._initialized) {
        return Promise.reject(new Error('Tracking3F3N not initialized'));
      }
      const options = opts || {};
      const dedupKey = options.dedupKey || ('conv:' + eventName);

      if (dedupIsLocked(dedupKey)) {
        log('INFO', 'conversion_deduped', { dedupKey: dedupKey });
        return Promise.resolve({ deduped: true });
      }
      // Lock preventivo contra duplo-clique in-flight.
      dedupLock(dedupKey, DEDUP_ONCE_TTL_MS);

      let payload;
      try { payload = this._payload(eventName, extra); }
      catch (err) {
        dedupRelease(dedupKey);
        log('ERROR', 'conversion_invalid_payload', { error: String(err), missing: err.missing });
        return Promise.reject(err);
      }

      const webhookUrl = this._config.webhook_url;
      const webhookPromise = webhookUrl
        ? sendWithRetry(webhookUrl, payload, this._config.retry)
        : Promise.resolve(null);

      return webhookPromise
        .then(function () {
          try { if (global.gtag) global.gtag('event', eventName, payload); }
          catch (e) { log('ERROR', 'gtag_error', { error: String(e) }); }

          try { if (global.fbq) global.fbq('track', eventName, payload, { eventID: payload.event_id }); }
          catch (e) { log('ERROR', 'fbq_error', { error: String(e) }); }

          log('INFO', 'conversion_fired', { eventName: eventName, event_id: payload.event_id });
          return payload;
        })
        .catch(function (err) {
          // Libera lock para permitir retry manual (ex: usuário clica novamente)
          dedupRelease(dedupKey);
          log('ERROR', 'conversion_failed', { eventName: eventName, error: String(err) });
          throw err;
        });
    },

    reset: function () {
      storage.del(STORAGE_DEDUP);
      log('INFO', 'dedup_reset');
    },

    _debug: function () {
      return {
        version: VERSION,
        initialized: this._initialized,
        config: this._config,
        utms: this.utms,
        sessionId: this.sessionId,
        dedup: dedupMap(),
      };
    },
  };

  // ═════════════════════════════ FACADE (one-liner) ═════════════════════════════

  /**
   * Uso: initTracking({ page: 'capturaA' });
   *
   * Lê IDs de window.__ENV__ (GA4_ID, PIXEL_ID, WEBHOOK_URL, UTM_TTL_DAYS).
   * Aceita overrides: initTracking({ page, ga4_id, pixel_id, webhook_url, ttl_days, auto_page_view }).
   */
  function initTracking(opts) {
    const o = opts || {};
    const env = global.__ENV__ || {};
    return Tracking3F3N.init({
      ga4_id: o.ga4_id || env.GA4_ID || null,
      pixel_id: o.pixel_id || env.PIXEL_ID || null,
      webhook_url: o.webhook_url || env.WEBHOOK_URL || null,
      page_variation: o.page || o.page_variation || null,
      ttl_days: o.ttl_days || Number(env.UTM_TTL_DAYS) || 30,
      auto_page_view: o.auto_page_view !== false,
      retry: o.retry || DEFAULT_RETRY,
    });
  }

  global.Tracking3F3N = Tracking3F3N;
  global.initTracking = initTracking;
})(window);
