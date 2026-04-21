/**
 * 3F3N Tracking Core — v2.0.0
 *
 * Single source of truth for GA4 + Meta Pixel + UTMs + A/B variations
 * across capturaA, capturaB, capturaC (and any future landing).
 *
 * Guarantees:
 *   - Flat payload (GA4 & Pixel compatible)
 *   - Standard fields on EVERY event: event_name, page_variation,
 *     utm_source, utm_medium, utm_campaign, utm_content
 *   - UTM fallback (never leaves fields empty)
 *   - UTM persistence (localStorage, configurable TTL)
 *   - event_id UUID shared between client + CAPI (dedup)
 *   - Fire-once guard (anti duplo-clique)
 *   - Debug mode: ?debug_tracking=1 OR window.TRACKING_DEBUG=true
 *   - Webhook-first conversions (mirrors only after backend 200 OK)
 *
 * Usage per landing:
 *   <script defer src="/js/tracking-core.js"></script>
 *   <script>
 *     window.addEventListener('load', () => {
 *       Tracking3F3N.init({
 *         ga4_id:         window.__ENV__.GA4_ID,
 *         pixel_id:       window.__ENV__.PIXEL_ID,
 *         webhook_url:    window.__ENV__.WEBHOOK_URL,
 *         page_variation: 'capturaA',   // ← obrigatório por página
 *         ttl_days:       30,
 *       });
 *       Tracking3F3N.track('page_view', {}, { once: true });
 *     });
 *   </script>
 */

(function (global) {
  'use strict';

  const VERSION = '2.0.0';
  const STORAGE_KEY = '3f3n_utms';
  const SESSION_KEY = '3f3n_session';
  const DEDUP_KEY = '3f3n_fired_events';
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

  // ───────────── utilities ─────────────

  function isDebug() {
    if (global.TRACKING_DEBUG === true) return true;
    try {
      return new URLSearchParams(global.location.search).get('debug_tracking') === '1';
    } catch (_) {
      return false;
    }
  }

  function log() {
    if (!isDebug()) return;
    const args = Array.prototype.slice.call(arguments);
    args.unshift('[3F3N-Tracking]');
    // eslint-disable-next-line no-console
    console.log.apply(console, args);
  }

  function warn(msg, extra) {
    // eslint-disable-next-line no-console
    console.warn('[3F3N-Tracking] ' + msg, extra || '');
  }

  function uuid() {
    if (global.crypto && typeof global.crypto.randomUUID === 'function') {
      return global.crypto.randomUUID();
    }
    return (
      'evt_' +
      Date.now().toString(36) +
      '_' +
      Math.random().toString(36).slice(2, 10)
    );
  }

  function readCookie(name) {
    try {
      const m = document.cookie.match(
        new RegExp('(^|;\\s*)' + name + '=([^;]+)')
      );
      return m ? decodeURIComponent(m[2]) : null;
    } catch (_) {
      return null;
    }
  }

  // ───────────── UTM latch ─────────────

  function readUTMsFromURL() {
    try {
      const qs = new URLSearchParams(global.location.search);
      const found = {};
      let has = false;
      UTM_KEYS.forEach(function (k) {
        const v = qs.get(k);
        if (v) {
          found[k] = v;
          has = true;
        }
      });
      return has ? found : null;
    } catch (_) {
      return null;
    }
  }

  function readUTMsFromStorage() {
    try {
      const raw = global.localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      if (parsed.expiresAt && parsed.expiresAt < Date.now()) {
        global.localStorage.removeItem(STORAGE_KEY);
        return null;
      }
      return parsed.utms;
    } catch (_) {
      return null;
    }
  }

  function writeUTMsToStorage(utms, ttlDays) {
    try {
      global.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          utms: utms,
          capturedAt: Date.now(),
          expiresAt: Date.now() + ttlDays * 86400000,
        })
      );
    } catch (_) {
      /* private mode / quota */
    }
  }

  function applyFallback(utms) {
    const out = {};
    UTM_KEYS.forEach(function (k) {
      out[k] = (utms && utms[k]) || UTM_FALLBACK[k];
    });
    return out;
  }

  // ───────────── session + dedup ─────────────

  function ensureSessionId() {
    try {
      let sid = global.sessionStorage.getItem(SESSION_KEY);
      if (!sid) {
        sid =
          'sess_' +
          Date.now().toString(36) +
          '_' +
          Math.random().toString(36).slice(2, 10);
        global.sessionStorage.setItem(SESSION_KEY, sid);
      }
      return sid;
    } catch (_) {
      return 'sess_nostore_' + Date.now().toString(36);
    }
  }

  function firedEvents() {
    try {
      return JSON.parse(global.sessionStorage.getItem(DEDUP_KEY) || '[]');
    } catch (_) {
      return [];
    }
  }

  function markFired(key) {
    try {
      const arr = firedEvents();
      if (arr.indexOf(key) === -1) arr.push(key);
      global.sessionStorage.setItem(DEDUP_KEY, JSON.stringify(arr));
    } catch (_) {
      /* noop */
    }
  }

  function hasFired(key) {
    return firedEvents().indexOf(key) !== -1;
  }

  // ───────────── public API ─────────────

  const Tracking3F3N = {
    version: VERSION,
    _initialized: false,
    _config: null,
    sessionId: null,
    utms: null,

    init: function (config) {
      if (this._initialized) {
        log('init() ignored — already initialized');
        return this;
      }
      const c = Object.assign(
        {
          ga4_id: null,
          pixel_id: null,
          webhook_url: null,
          page_variation: null,
          ttl_days: 30,
        },
        config || {}
      );

      if (!c.page_variation) {
        warn('page_variation is REQUIRED — events will be tagged as "unknown"');
      }
      if (!c.webhook_url) warn('webhook_url not set — conversions will not be sent server-side');

      const fromURL = readUTMsFromURL();
      if (fromURL) writeUTMsToStorage(fromURL, c.ttl_days);

      this._config = c;
      this.sessionId = ensureSessionId();
      this.utms = applyFallback(readUTMsFromStorage());
      this._initialized = true;

      log('initialized', {
        version: VERSION,
        config: c,
        utms: this.utms,
        sessionId: this.sessionId,
      });
      return this;
    },

    /**
     * Build the STANDARD flat payload attached to every event.
     * Flat is non-negotiable: GA4 and Pixel both reject nested objects
     * as custom parameters.
     */
    _payload: function (eventName, extra) {
      const cfg = this._config || {};
      const utms = this.utms || applyFallback(null);
      return Object.assign(
        {
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
        },
        extra || {}
      );
    },

    /**
     * Non-conversion events (page_view, view_content, scroll, etc).
     * Fires client-side mirrors only. Use { once: true } to dedup.
     */
    track: function (eventName, extra, opts) {
      if (!this._initialized) {
        warn('track() called before init() — ignoring');
        return null;
      }
      const options = opts || {};
      const dedupKey = options.dedupKey || ('track:' + eventName);

      if (options.once && hasFired(dedupKey)) {
        log('dedup: skipping', dedupKey);
        return null;
      }
      if (options.once) markFired(dedupKey);

      const payload = this._payload(eventName, extra);

      try {
        if (global.gtag) global.gtag('event', eventName, payload);
      } catch (e) {
        log('gtag error', e);
      }
      try {
        if (global.fbq)
          global.fbq('trackCustom', eventName, payload, {
            eventID: payload.event_id,
          });
      } catch (e) {
        log('fbq error', e);
      }

      log('track', eventName, payload);
      return payload;
    },

    /**
     * Conversion events (lead, purchase, schedule).
     * Webhook-first: client-side mirrors ONLY fire after backend 200 OK.
     * Automatic dedup per eventName (override with opts.dedupKey).
     */
    conversion: function (eventName, extra, opts) {
      const self = this;
      if (!this._initialized) {
        return Promise.reject(new Error('Tracking3F3N not initialized'));
      }
      const options = opts || {};
      const dedupKey = options.dedupKey || ('conv:' + eventName);

      if (hasFired(dedupKey)) {
        log('dedup: conversion already fired', dedupKey);
        return Promise.resolve({ deduped: true });
      }
      // Mark BEFORE fetch — prevents double-submit during in-flight request.
      markFired(dedupKey);

      const payload = this._payload(eventName, extra);
      const webhookUrl = this._config.webhook_url;

      const webhookPromise = webhookUrl
        ? fetch(webhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
            keepalive: true,
          }).then(function (res) {
            if (!res.ok) throw new Error('webhook failed: ' + res.status);
            log('webhook OK', res.status);
            return res;
          })
        : Promise.resolve(null);

      return webhookPromise
        .then(function () {
          try {
            if (global.gtag) global.gtag('event', eventName, payload);
          } catch (e) {
            log('gtag error', e);
          }
          try {
            if (global.fbq)
              global.fbq('track', eventName, payload, {
                eventID: payload.event_id,
              });
          } catch (e) {
            log('fbq error', e);
          }
          log('conversion fired', eventName, payload);
          return payload;
        })
        .catch(function (err) {
          log('conversion failed', err);
          // Release dedup lock on failure so user can retry.
          try {
            const arr = firedEvents().filter(function (k) {
              return k !== dedupKey;
            });
            global.sessionStorage.setItem(DEDUP_KEY, JSON.stringify(arr));
          } catch (_) {}
          throw err;
        });
    },

    // Introspection (debug/tests)
    _debug: function () {
      return {
        version: VERSION,
        initialized: this._initialized,
        config: this._config,
        utms: this.utms,
        sessionId: this.sessionId,
        fired: firedEvents(),
      };
    },
  };

  global.Tracking3F3N = Tracking3F3N;
})(window);
