# Meta Pixel — Standard Events 3F3N

Referência dos eventos padrão do Meta (Facebook/Instagram) aplicados aos funis 3F3N. **Sempre duplicar server-side via Conversions API (CAPI)** para eventos de receita.

## Client-Side (Pixel base)

Instalar no `<head>` com `async`:

```html
<script>
!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
document,'script','https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '{{PIXEL_ID}}');
fbq('track', 'PageView');
</script>
```

## Mapa de Eventos 3F3N

| Meta Standard Event | Gatilho 3F3N | Custom Data Obrigatório |
|---------------------|--------------|------------------------|
| `PageView` | Carregamento da landing | — |
| `ViewContent` | Scroll ≥ 50% na oferta | `content_name`, `variation`, `archetype` |
| `Lead` | Webhook n8n OK (form submit) | `variation`, `archetype`, `value` |
| `Schedule` | Agendamento confirmado | `variation`, `archetype` |
| `Purchase` | Pagamento confirmado | `value`, `currency`, `variation`, `archetype` |

## Exemplo Client-Side

```javascript
fbq('track', 'Lead', {
  content_name: 'landing-dor-cronica-v1',
  content_category: 'saude',
  value: 150.00,
  currency: 'BRL'
}, {
  eventID: '{{ event_id_uuid }}'  // necessário para deduplicação com CAPI
});
```

## Server-Side (Conversions API via n8n)

```
POST https://graph.facebook.com/v19.0/{{PIXEL_ID}}/events
  ?access_token={{CAPI_ACCESS_TOKEN}}
```

Payload:

```json
{
  "data": [
    {
      "event_name": "Lead",
      "event_time": "{{ Math.floor(Date.now()/1000) }}",
      "event_id": "{{ event_id_uuid }}",
      "action_source": "website",
      "event_source_url": "{{ $json.page_url }}",
      "user_data": {
        "em": ["{{ sha256($json.email) }}"],
        "ph": ["{{ sha256($json.phone) }}"],
        "client_ip_address": "{{ $json.ip }}",
        "client_user_agent": "{{ $json.user_agent }}",
        "fbp": "{{ $json.fbp_cookie }}"
      },
      "custom_data": {
        "variation": "{{ $json.variation }}",
        "archetype": "{{ $json.archetype }}",
        "utm_source": "{{ $json.utms.utm_source }}",
        "utm_campaign": "{{ $json.utms.utm_campaign }}",
        "value": "{{ $json.value }}",
        "currency": "BRL"
      }
    }
  ]
}
```

## Deduplicação (OBRIGATÓRIO)

Client e server devem enviar o **mesmo `event_id`** para o mesmo evento. Sem isso o Meta conta em dobro e queima seu ROAS. Gere um UUID no frontend, inclua no `fbq('track', ..., {eventID})`, e propague no payload do webhook n8n.

## Hash de PII (LGPD + Meta)

Antes de enviar para CAPI, aplicar `SHA-256` (lowercase, sem espaços) em:

- `em` (email)
- `ph` (telefone, formato E.164 sem `+`)
- `fn` (first name)
- `ln` (last name)

Fazer o hash no n8n, **nunca** no frontend.

## Anti-padrões

- ❌ Disparar `Lead` duas vezes (client + server) sem `event_id` compartilhado
- ❌ Enviar email/telefone em texto puro para CAPI
- ❌ Omitir `fbp`/`fbc` cookies (mata a match quality)
- ❌ Usar `Purchase` como proxy de `Lead`
