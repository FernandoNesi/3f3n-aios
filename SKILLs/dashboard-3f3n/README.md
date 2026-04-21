# Dashboard 3F3N

Dashboard mínimo e funcional para o tracking 3F3N — mostra visitas, cliques, conversões, taxa de conversão, ranking de páginas e performance por campanha.

**Stack:** Next.js 14 (App Router) · TypeScript · Tailwind · Supabase

---

## 1. Setup Supabase (uma vez)

1. Abra o **SQL Editor** do seu projeto Supabase.
2. Cole e rode o conteúdo de [`supabase/schema.sql`](supabase/schema.sql).
   Isso cria:
   - tabela `public.events` (se não existir)
   - índices de performance
   - RLS + policy de leitura pelo `anon`
   - funções RPC: `get_totals`, `get_page_stats`, `get_campaign_stats`

3. Em **Project Settings → API**, copie:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public key` → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

> O `webhook_url` configurado no `tracking-core.js` (n8n) deve fazer um `INSERT` na tabela `events` com os campos do payload flat.

---

## 2. Rodar localmente

```bash
cp .env.local.example .env.local
# edite .env.local com as credenciais

npm install
npm run dev
```

Abra http://localhost:3000

---

## 3. Deploy (Vercel)

```bash
npm i -g vercel
vercel link
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
vercel --prod
```

Ou pelo painel:
1. **New Project** → importe este repositório
2. Em **Environment Variables**, adicione as duas chaves do `.env.local.example`
3. **Deploy**

---

## 4. Estrutura

```
dashboard-3f3n/
├── package.json
├── next.config.mjs
├── tsconfig.json
├── tailwind.config.ts
├── postcss.config.mjs
├── .env.local.example
├── supabase/
│   └── schema.sql         ← cole no Supabase SQL Editor
└── src/
    ├── app/
    │   ├── layout.tsx
    │   ├── page.tsx       ← dashboard (server component, SSR)
    │   └── globals.css
    ├── components/
    │   ├── StatCard.tsx
    │   ├── PageRankingTable.tsx
    │   ├── CampaignTable.tsx
    │   └── DateRangeFilter.tsx
    └── lib/
        ├── supabase.ts
        └── queries.ts     ← wrappers das RPCs
```

---

## 5. Classificação canônica de eventos

O dashboard classifica cada linha de `events` em 3 categorias:

| Categoria | `event_name` |
|-----------|--------------|
| **Visit** | `page_view` |
| **Conversion** | `Lead`, `Purchase`, `Schedule` |
| **Click / engajamento** | tudo que não for os dois acima |

Para incluir novos eventos de conversão (ex: `Qualified_Lead`), edite os 3 RPCs em `supabase/schema.sql`.

---

## 6. Filtro de período

Passe `?days=7` / `?days=30` / `?days=90` na URL. Default: 30 dias.

---

## 7. Taxa de conversão

```
conversion_rate_pct = conversions / visits × 100
```

Calculada por página e por campanha no server (SQL `filter` agregado, sem round-trip extra).
