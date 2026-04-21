---
name: tracking-3f3n
description: Tracking core production-ready v3.0.0 para landings 3F3N (capturaA/B/C/…). Uso em 1 linha — `initTracking({ page })`. Payload flat validado, dedup inteligente com TTL, safe retry com backoff, storage 3-tier, _fbp/_fbc automáticos, logs JSON estruturados. Use quando precisar instrumentar uma landing nova, auditar tracking existente, ou padronizar telemetria entre múltiplos funis.
---

# Skill de Tracking 3F3N — Production-Ready

## Persona

Você é **Engenheiro de Dados Sênior** responsável pela telemetria 3F3N. Sua entrega é um padrão único, reutilizável em qualquer landing com **uma única linha** de bootstrap, resistente a falhas de rede, ITP, duplo-clique e payload malformado.

## Uso (1 linha)

```js
initTracking({ page: 'capturaA' });
```

Isso:
- Lê `GA4_ID`, `PIXEL_ID`, `WEBHOOK_URL` de `window.__ENV__`
- Captura/persiste UTMs (30d, com fallback)
- Garante cookies `_fbp`/`_fbc` (sintetizando se necessário)
- Dispara `page_view` automático (dedup `once`)
- Deixa `Tracking3F3N.track()` / `.conversion()` prontos para uso

Único valor que muda entre capturaA/B/C: o `page`.

## Regra de Ouro

> "O que não pode ser medido, não pode ser otimizado pelo AI OS."

Payload sempre **flat**. Sempre validado antes do disparo. Nunca perde lead por falha transiente de rede.

## Padrão de Evento (OBRIGATÓRIO, VALIDADO)

```js
{
  event_name:     "Lead",
  page_variation: "capturaA",
  utm_source:     "facebook",   // fallback: "direct"
  utm_medium:     "cpc",        // fallback: "none"
  utm_campaign:   "dor-cronica",// fallback: "organic"
  utm_content:    "criativo-3", // fallback: "none"
  event_id:       "uuid-...",   // dedup client↔CAPI
  timestamp:      "2026-04-21T12:34:56.789Z"
}
// + auto: utm_term, page_path, page_url, session_id, fbp, fbc
```

Campo ausente → `INVALID_PAYLOAD` antes de chegar no GA4/Pixel.

## Hardening Aplicado (v3.0.0)

| Categoria | Mecanismo |
|---|---|
| **Validação** | `validatePayload()` dispara `INVALID_PAYLOAD` com lista `missing[]` |
| **Dedup duplo-clique** | Lock TTL 3s por `event_name` |
| **Dedup permanente** | `{ once: true }` → TTL 365d |
| **Retry safe** | 3 tentativas, backoff exponencial (500/1000/2000ms), não retenta 4xx |
| **Lock release em falha** | Usuário pode clicar de novo após falha de webhook |
| **Storage 3-tier** | localStorage → sessionStorage → in-memory (sobrevive ITP/anônimo) |
| **_fbp sintético** | Gera `fb.1.{ts}.{rand}` e grava cookie 90d quando ausente |
| **_fbc derivado** | Captura `?fbclid` → `_fbc` automaticamente |
| **UTM fallback** | `direct`/`none`/`organic` — nunca envia campo vazio |
| **Logs estruturados** | JSON `{ ts, src, v, level, event, data }` — grep/Datadog-friendly |
| **init idempotente** | Segunda chamada é ignorada com log |
| **Auto page_view** | Disparado no `init` com `once` (configurável via `auto_page_view: false`) |

## Public API

```js
// 1. Facade 1-linha (recomendado)
initTracking({ page: 'capturaA' });

// 2. API completa (config explícito)
Tracking3F3N.init({ ga4_id, pixel_id, webhook_url, page_variation, ttl_days, retry });

// 3. Eventos de engajamento (dedup 3s por padrão)
Tracking3F3N.track('view_content', { content_name: 'oferta-x' });
Tracking3F3N.track('scroll_50', {}, { once: true });

// 4. Conversão — webhook-first com retry, Promise
await Tracking3F3N.conversion('Lead', { value: 150, currency: 'BRL' });

// 5. Debug
Tracking3F3N._debug();  // { initialized, config, utms, sessionId, dedup }
Tracking3F3N.reset();   // limpa dedup map
```

## Debug Mode

Ative de 3 formas:
- URL: `?debug_tracking=1`
- Global: `window.TRACKING_DEBUG = true`
- `.env`: `TRACKING_DEBUG=true`

Todos os logs saem em JSON:

```json
{"ts":"2026-04-21T...","src":"3F3N-Tracking","v":"3.0.0","level":"INFO","event":"conversion_fired","data":{"eventName":"Lead","event_id":"..."}}
```

## Constraints (não-negociáveis)

- ❌ Payload aninhado
- ❌ Evento sem validação prévia
- ❌ Conversão sem retry
- ❌ IDs hardcoded no HTML
- ✅ `initTracking({ page })` é a ÚNICA linha de bootstrap por landing
- ✅ Todo evento carrega os 8 campos obrigatórios
- ✅ 4xx não retenta; 5xx retenta com backoff
- ✅ Falha libera lock para retry manual

## Checklist de Validação (production)

**Sanidade**
- [ ] `.env` preenchido; zero IDs hardcoded
- [ ] `initTracking({ page: '...' })` é a única linha nova por landing
- [ ] `page` difere entre capturaA/B/C

**Debug**
- [ ] `?debug_tracking=1` imprime log JSON com `initialized: true`
- [ ] `Tracking3F3N._debug()` mostra 8 campos preenchidos
- [ ] Payload malformado retorna `INVALID_PAYLOAD` com `missing[]`

**GA4**
- [ ] DebugView recebe `page_view` automático
- [ ] Custom dimensions `page_variation`, `event_id`, `session_id` populadas
- [ ] Lead chega com 4 UTMs mesmo em tráfego direto (`direct/none/organic/none`)

**Meta**
- [ ] Events Manager: client + CAPI com **mesmo `event_id`** (dedup OK)
- [ ] `_fbp` presente mesmo no primeiro touch (cookie sintético)
- [ ] Link com `?fbclid=` gera `_fbc` automaticamente

**Resiliência**
- [ ] Webhook 500 → 3 tentativas com backoff exponencial
- [ ] Webhook 400 → falha imediata (sem retry)
- [ ] Duplo-clique em 3s → 1 evento
- [ ] Falha de webhook libera lock → clique seguinte funciona
- [ ] Safari anônimo: UTMs ainda funcionam (fallback sessionStorage/memória)

**Performance**
- [ ] Lighthouse mobile: LCP < 2.5s, TBT < 200ms
- [ ] `tracking-core.js` < 8KB gzipped
- [ ] Nenhum bloqueio do render principal

## Referências

- `references/tracking-core.js` — Engine v3.0.0
- `references/tracking-init-example.html` — Snippet de bootstrap (1 linha)
- `references/ga4-measurement-protocol.md` — Server-side GA4 via n8n
- `references/meta-pixel-events.md` — Pixel + CAPI + deduplicação
- `references/neurodesign-lcp-checklist.md` — Orçamento de performance
- `.env.example` — Contrato de variáveis
