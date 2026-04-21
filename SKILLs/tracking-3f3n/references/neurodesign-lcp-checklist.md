# Neurodesign × Tracking — Checklist de Performance

Princípio 6 do Neurodesign 3F3N: **latência é custo cognitivo**. Todo script de tracking é um candidato a ferir o LCP (Largest Contentful Paint). Este checklist é não-negociável antes de subir a skill para produção.

## Orçamento de Performance

| Métrica | Alvo 3F3N | Limite absoluto |
|---------|-----------|-----------------|
| LCP | < 2.0s | 2.5s |
| FID / INP | < 100ms | 200ms |
| CLS | < 0.05 | 0.1 |
| TBT (por script 3rd party) | < 50ms | 150ms |

## Checklist por Script

### GA4 (`gtag.js`)

- [ ] Carregado com `async`
- [ ] `config` com `{ send_page_view: false }` se for SPA (manual page_view via `gtag('event', 'page_view')`)
- [ ] Não carregar em páginas de thank-you se já disparou server-side
- [ ] Consent Mode v2 configurado (LGPD)

### Meta Pixel (`fbevents.js`)

- [ ] Snippet base com `async` (default do Meta já é)
- [ ] NÃO chamar `fbq('track', 'PageView')` duas vezes
- [ ] `advanced_matching` só se houver consentimento explícito
- [ ] `autoConfig` = false para evitar DOM scanning pesado

### UTM Latch (`utm-persistence.js`)

- [ ] Carregado com `defer`
- [ ] `init()` chamado em `window.load` (não em `DOMContentLoaded`)
- [ ] Não faz network request
- [ ] Size < 2KB gzipped

### Webhook n8n

- [ ] Chamado com `fetch({ keepalive: true })` — sobrevive ao unload
- [ ] Timeout client-side de 3s (não travar o "obrigado" do usuário)
- [ ] Retry server-side no n8n (não no browser)

## Ordem de Carregamento no `<head>`

```html
<!-- 1. Consent Mode (SÍNCRONO, antes de tudo) -->
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('consent', 'default', {
    'ad_storage': 'denied',
    'analytics_storage': 'denied',
    'wait_for_update': 500
  });
</script>

<!-- 2. GA4 (async) -->
<script async src="https://www.googletagmanager.com/gtag/js?id={{GA4_ID}}"></script>

<!-- 3. Meta Pixel (async, o próprio snippet injeta) -->
<script>/* pixel base */</script>

<!-- 4. UTM Latch 3F3N (defer) -->
<script defer src="/js/utm-persistence.js"></script>
```

## Validação antes de subir

- [ ] Rodar PageSpeed Insights — LCP < 2.5s em mobile 4G
- [ ] Lighthouse → "Third-party usage" < 200ms TBT total
- [ ] Chrome DevTools → Performance → nenhum script de tracking no caminho crítico
- [ ] `gtag` debug mode (`?debug_mode=1`) confirma eventos com `variation` + `archetype`
- [ ] Meta Events Manager → Test Events mostra client + server com mesmo `event_id`

## Red flags que quebram o LEVEL 1 Foundation

- 🚫 GTM carregando sem `async`
- 🚫 Pixel CAPI sem deduplicação (`event_id` ausente)
- 🚫 `document.write` em qualquer snippet
- 🚫 Mais de 3 scripts de tracking carregados síncronos
- 🚫 Evento de conversão disparando antes do OK do n8n
