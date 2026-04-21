/**
 * 3F3N UTM Persistence Latch
 *
 * Captura UTMs da URL no primeiro touch e persiste em localStorage
 * por TTL configurável (default 30d). Em touches subsequentes,
 * mantém o first-touch a menos que novos UTMs venham na URL.
 *
 * Uso:
 *   <script defer src="/js/utm-persistence.js"></script>
 *   <script>window.addEventListener('load', () => Tracking3F3N.init({ ttlDays: 30 }));</script>
 */

(function (global) {
  'use strict';

  const STORAGE_KEY = '3f3n_utms';
  const SESSION_KEY = '3f3n_session';
  const UTM_PARAMS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];

  function readFromURL() {
    const qs = new URLSearchParams(global.location.search);
    const found = {};
    let has = false;
    UTM_PARAMS.forEach((k) => {
      const v = qs.get(k);
      if (v) {
        found[k] = v;
        has = true;
      }
    });
    return has ? found : null;
  }

  function readFromStorage() {
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

  function writeToStorage(utms, ttlDays) {
    const payload = {
      utms: utms,
      capturedAt: Date.now(),
      expiresAt: Date.now() + ttlDays * 24 * 60 * 60 * 1000,
    };
    try {
      global.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch (_) {
      /* noop: storage quota / private mode */
    }
  }

  function ensureSessionId() {
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
  }

  const Tracking3F3N = {
    init(opts) {
      const ttlDays = (opts && opts.ttlDays) || 30;
      const fromURL = readFromURL();
      if (fromURL) writeToStorage(fromURL, ttlDays);
      this.sessionId = ensureSessionId();
      this.utms = readFromStorage() || {};
      return this;
    },

    getContext(extra) {
      return Object.assign(
        {
          session_id: this.sessionId,
          page: global.location.pathname,
          timestamp: new Date().toISOString(),
          utms: this.utms || {},
        },
        extra || {}
      );
    },

    // Dispara conversão APENAS após confirmação do webhook n8n.
    async fireConversion({ webhookUrl, eventName, variation, archetype, payload }) {
      const body = Object.assign(
        this.getContext({
          event_name: eventName,
          variation: variation,
          archetype: archetype,
        }),
        payload || {}
      );

      const res = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
        keepalive: true,
      });

      if (!res.ok) throw new Error('Webhook n8n falhou: ' + res.status);

      // Client-side mirrors — só depois do OK do backend:
      if (global.gtag) global.gtag('event', eventName, body);
      if (global.fbq) global.fbq('track', eventName, body);

      return res.json().catch(() => ({ ok: true }));
    },
  };

  global.Tracking3F3N = Tracking3F3N;
})(window);
