# Dashboard 3F3N · AI

Dashboard de decisão rápida com insights automáticos via OpenAI.
Responde em < 5s três perguntas:

- **Qual página escalar?**
- **Qual página corrigir?**
- **Qual campanha investir?**

Projeto **separado** do `dashboard-3f3n` (sem IA), para A/B entre as duas abordagens.

---

## Stack

- Next.js 14 (App Router, TypeScript)
- Supabase (RPCs de agregação SQL)
- OpenAI (insights estruturados em JSON)
- Tailwind
- Fallback determinístico (regras) quando a key OpenAI não está configurada ou a chamada falha

---

## Arquitetura

```
┌─ tracking-core.js (landings) ──► webhook n8n ──► INSERT events ─┐
                                                                    │
                                                                    ▼
                                                            Supabase (events)
                                                                    │
┌──────────────────── dashboard-3f3n-ai ────────────────────────────┤
│                                                                    │
│  /app/page.tsx  (Server Component, SSR)                            │
│    ├─ fetchTotals()       ──► supabase.rpc('get_totals')           │
│    ├─ fetchPageStats()    ──► supabase.rpc('get_page_stats')       │
│    └─ fetchCampaignStats()──► supabase.rpc('get_campaign_stats')   │
│                                                                    │
│  /components/InsightsPanel (Client)                                │
│    └─ GET /api/insights?days=30                                    │
│         ├─ reusa as 3 queries acima                                │
│         ├─ computeSignals() (determinístico)                       │
│         └─ insightsFromAI() ──► OpenAI (JSON mode) ── fallback ──► │
│                                                                    │
└────────────────────────────────────────────────────────────────────┘
```

**Duas camadas de resposta:**

1. **Sinais determinísticos** (`src/lib/insights.ts` → `computeSignals`) — calcula best/worst page, alto-clique/baixa-conversão, campanhas fracas, etc. É a **âncora** — nunca inventa dado.
2. **Enriquecimento pela IA** — recebe sinais + dados brutos e escreve o `reason` de cada decisão em 1 frase numérica, além de `problems` e `actions` acionáveis.

Se a OpenAI falhar ou não tiver key → retorna direto a camada 1. O dashboard nunca quebra.

---

## Setup

### 1. Supabase

Cole `supabase/schema.sql` no SQL Editor. Cria tabela `events`, índices, RLS read-only, e 3 RPCs: `get_totals`, `get_page_stats`, `get_campaign_stats`.

### 2. Variáveis

```bash
cp .env.local.example .env.local
```

Preencher:
- `NEXT_PUBLIC_SUPABASE_URL` + `NEXT_PUBLIC_SUPABASE_ANON_KEY` (Project Settings → API)
- `OPENAI_API_KEY` (obrigatório para insights da IA; sem ele, cai no fallback de regras)
- `OPENAI_MODEL` (default: `gpt-4o-mini`)
- `INSIGHTS_CACHE_TTL` em segundos (default: `300` — evita estourar custo)

### 3. Rodar

```bash
npm install
npm run dev        # http://localhost:3000
```

### 4. Deploy (Vercel)

```bash
vercel link
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
vercel env add OPENAI_API_KEY
vercel env add OPENAI_MODEL
vercel --prod
```

---

## Estrutura

```
dashboard-3f3n-ai/
├── package.json · next.config.mjs · tsconfig.json
├── tailwind.config.ts · postcss.config.mjs
├── .env.local.example · README.md
├── supabase/
│   └── schema.sql
└── src/
    ├── app/
    │   ├── layout.tsx
    │   ├── page.tsx             ← SSR: totais + tabelas + <InsightsPanel />
    │   ├── globals.css
    │   └── api/insights/
    │       └── route.ts         ← GET /api/insights (server, OpenAI)
    ├── components/
    │   ├── StatCard.tsx
    │   ├── PageRankingTable.tsx
    │   ├── CampaignTable.tsx
    │   ├── DateRangeFilter.tsx
    │   ├── DecisionCard.tsx     ← Escalar / Corrigir / Investir
    │   └── InsightsPanel.tsx    ← client, consome /api/insights
    └── lib/
        ├── supabase.ts
        ├── queries.ts           ← wrappers das 3 RPCs
        ├── openai.ts            ← client singleton
        └── insights.ts          ← signals + fallback + OpenAI
```

---

## Endpoint `/api/insights`

```
GET /api/insights?days=30         → usa cache (TTL INSIGHTS_CACHE_TTL)
GET /api/insights?days=30&refresh=1 → força regenerar
```

Resposta:

```json
{
  "generated_at": "2026-04-21T12:34:56.789Z",
  "days": 30,
  "source": "openai",
  "scale":  { "target": "capturaA", "reason": "8.4% conv em 1240 visitas..." },
  "fix":    { "target": "capturaC", "reason": "45% engajamento mas 0.3% conv..." },
  "invest": { "target": "dor-cronica-fb", "reason": "ROI: 6.8% conv via facebook..." },
  "problems": [
    {
      "severity": "high",
      "title": "capturaC: engajamento alto, conversão baixa",
      "detail": "540 cliques em 1100 visitas mas apenas 3 conversões (0.27%)."
    }
  ],
  "actions": [
    "Escalar verba em capturaA (conv 8.4%)",
    "Revisar form de capturaC — gargalo pós-clique",
    "Dobrar investimento em 'dor-cronica-fb'"
  ]
}
```

Header `X-Cache: HIT|MISS` indica se veio do cache.

---

## Classificação canônica de eventos

| Categoria | `event_name` |
|-----------|--------------|
| Visit | `page_view` |
| Click | `cta_click`, `view_content`, `scroll_50`, etc. (qualquer custom) |
| Conversion | `Lead`, `Purchase`, `Schedule`, `conversion` |

Para adicionar novos tipos: edite os 3 RPCs em `supabase/schema.sql` (uma única linha do `IN (...)`).

---

## Custo & rate limiting

- Cache em memória por processo, TTL 5min (configurável via `INSIGHTS_CACHE_TTL`)
- `temperature: 0.2` + `response_format: json_object` (poucas variações, barato)
- `gpt-4o-mini` default: ~$0.15/1M tokens input — insights caros < $0.001 por chamada

---

## Ordem de decisão do analista

1. Bate os olhos nas **3 Decision Cards** (Escalar / Corrigir / Investir) — decisão em ~2s
2. Lê **Problemas detectados** para entender o contexto
3. Segue o numerado em **Ações recomendadas**

Dados → decisão, automaticamente.
