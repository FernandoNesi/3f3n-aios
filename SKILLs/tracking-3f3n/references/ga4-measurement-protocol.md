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
        "variation": "{{ $json.variation }}",
        "archetype": "{{ $json.archetype }}",
        "utm_source": "{{ $json.utms.utm_source }}",
        "utm_medium": "{{ $json.utms.utm_medium }}",
        "utm_campaign": "{{ $json.utms.utm_campaign }}",
        "utm_content": "{{ $json.utms.utm_content }}",
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

| Evento GA4 | Quando disparar | Dimensão de Closed-Loop |
|------------|-----------------|-------------------------|
| `page_view` | Entrada na landing | variation, archetype |
| `view_item` | Abriu modal da oferta | variation, archetype |
| `generate_lead` | Webhook n8n OK | variation, archetype, utms |
| `begin_checkout` | Iniciou agendamento | variation, archetype |
| `purchase` | Pagamento confirmado | variation, archetype, value |

## Custom Dimensions (configurar no GA4)

Em **Admin → Custom Definitions → Create custom dimension**:

1. `variation` — scope: Event
2. `archetype` — scope: Event
3. `session_id` — scope: Event

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
