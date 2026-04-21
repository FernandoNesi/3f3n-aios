# GA4 Measurement Protocol (Server-Side via n8n)

Referência para disparo de eventos GA4 a partir do n8n após sucesso do webhook de lead. Garante duplicação server-side dos eventos críticos (conversão, purchase) — nunca confie apenas em client-side para eventos de receita.

## Endpoint

```
POST https://www.google-analytics.com/mp/collect
  ?measurement_id=<GA4_ID>
  &api_secret=<API_SECRET>
```

`api_secret` é gerado em: GA4 → Admin → Data Streams → Web Stream → Measurement Protocol API Secrets.

## Payload mínimo 3F3N

```json
{
  "client_id": "{{ $json.session_id }}",
  "user_id": "{{ $json.lead_id }}",
  "timestamp_micros": "{{ $now.toMillis() * 1000 }}",
  "non_personalized_ads": false,
  "events": [
    {
      "name": "generate_lead",
      "params": {
        "event_id": "{{ $json.event_id }}",
        "page_variation": "{{ $json.page_variation }}",
        "utm_source": "{{ $json.utm_source }}",
        "utm_medium": "{{ $json.utm_medium }}",
        "utm_campaign": "{{ $json.utm_campaign }}",
        "utm_content": "{{ $json.utm_content }}",
        "value": "{{ $json.value || 0 }}",
        "currency": "BRL",
        "engagement_time_msec": 100,
        "session_id": "{{ $json.session_id }}"
      }
    }
  ]
}
```

## Eventos Recomendados GA4 × 3F3N

| Evento GA4 | Quando disparar | Dimensões obrigatórias |
|------------|-----------------|-----------------------|
| `page_view` | Entrada na landing | page_variation, utm_* |
| `view_item` | Abriu modal da oferta | page_variation, utm_* |
| `generate_lead` | Webhook n8n OK | page_variation, utm_*, event_id |
| `begin_checkout` | Iniciou agendamento | page_variation, utm_* |
| `purchase` | Pagamento confirmado | page_variation, utm_*, value, event_id |

## Custom Dimensions (configurar no GA4)

Em **Admin → Custom Definitions → Create custom dimension** — scope: **Event**:

1. `page_variation`
2. `event_id`
3. `session_id`
4. `utm_content` (as 4 principais já entram como default; `utm_content` costuma precisar de custom dim para aparecer em relatórios)

Sem isso, os parâmetros chegam mas não são consultáveis em relatórios.

## Validação

Use o endpoint de debug antes de ir ao ar:

```
POST https://www.google-analytics.com/debug/mp/collect
```

Retorna `validationMessages` se o payload estiver malformado.

## Anti-padrões

- ❌ Disparar `purchase` client-side sem confirmação do gateway
- ❌ Omitir `client_id` (GA4 rejeita silenciosamente)
- ❌ Usar o mesmo `session_id` entre visitas (corrompe sessão)
- ❌ Enviar `user_id` sem consentimento (LGPD)
