-- 3F3N Tracking Dashboard — Supabase Schema
-- Rode uma vez no SQL Editor do Supabase.

-- ─── Tabela de eventos (se ainda não existir) ────────────────────────────
create table if not exists public.events (
  id           bigserial primary key,
  event_name     text        not null,
  page_variation text,
  utm_source     text,
  utm_medium     text,
  utm_campaign   text,
  utm_content    text,
  event_id       text,
  "timestamp"    timestamptz not null default now(),
  raw            jsonb
);

create index if not exists idx_events_timestamp      on public.events ("timestamp" desc);
create index if not exists idx_events_page_variation on public.events (page_variation);
create index if not exists idx_events_event_name     on public.events (event_name);
create index if not exists idx_events_utm_campaign   on public.events (utm_campaign);

-- ─── RLS: leitura pelo anon key (ajuste se for proteger) ─────────────────
alter table public.events enable row level security;

drop policy if exists "read events" on public.events;
create policy "read events"
  on public.events for select
  using (true);

-- ─── Classificação canônica de eventos ────────────────────────────────────
-- visit      = 'page_view'
-- conversion = 'Lead' | 'Purchase' | 'Schedule'
-- click      = qualquer outro evento nomeado (engajamento)

-- ─── Cards do topo (totais globais) ───────────────────────────────────────
create or replace function public.get_totals(days_back int default 30)
returns table (
  visits              bigint,
  clicks              bigint,
  conversions         bigint,
  conversion_rate_pct numeric
)
language sql stable as $$
  select
    count(*) filter (where event_name = 'page_view')                                    as visits,
    count(*) filter (where event_name not in ('page_view','Lead','Purchase','Schedule')) as clicks,
    count(*) filter (where event_name in ('Lead','Purchase','Schedule'))                 as conversions,
    round(
      count(*) filter (where event_name in ('Lead','Purchase','Schedule'))::numeric
      / nullif(count(*) filter (where event_name = 'page_view'), 0) * 100,
      2
    ) as conversion_rate_pct
  from public.events
  where "timestamp" >= now() - make_interval(days => days_back);
$$;

-- ─── Ranking de páginas (capturaA/B/C) ───────────────────────────────────
create or replace function public.get_page_stats(days_back int default 30)
returns table (
  page_variation      text,
  visits              bigint,
  clicks              bigint,
  conversions         bigint,
  conversion_rate_pct numeric
)
language sql stable as $$
  select
    coalesce(page_variation, '(unknown)') as page_variation,
    count(*) filter (where event_name = 'page_view')                                    as visits,
    count(*) filter (where event_name not in ('page_view','Lead','Purchase','Schedule')) as clicks,
    count(*) filter (where event_name in ('Lead','Purchase','Schedule'))                 as conversions,
    round(
      count(*) filter (where event_name in ('Lead','Purchase','Schedule'))::numeric
      / nullif(count(*) filter (where event_name = 'page_view'), 0) * 100,
      2
    ) as conversion_rate_pct
  from public.events
  where "timestamp" >= now() - make_interval(days => days_back)
  group by page_variation
  order by conversion_rate_pct desc nulls last, visits desc;
$$;

-- ─── Performance por campanha ────────────────────────────────────────────
create or replace function public.get_campaign_stats(days_back int default 30)
returns table (
  utm_campaign        text,
  utm_source          text,
  visits              bigint,
  conversions         bigint,
  conversion_rate_pct numeric
)
language sql stable as $$
  select
    coalesce(utm_campaign, '(none)')  as utm_campaign,
    coalesce(utm_source,   '(direct)') as utm_source,
    count(*) filter (where event_name = 'page_view')                     as visits,
    count(*) filter (where event_name in ('Lead','Purchase','Schedule')) as conversions,
    round(
      count(*) filter (where event_name in ('Lead','Purchase','Schedule'))::numeric
      / nullif(count(*) filter (where event_name = 'page_view'), 0) * 100,
      2
    ) as conversion_rate_pct
  from public.events
  where "timestamp" >= now() - make_interval(days => days_back)
  group by utm_campaign, utm_source
  order by conversions desc, visits desc;
$$;

-- ─── Grant para o anon key poder chamar RPCs ─────────────────────────────
grant execute on function public.get_totals(int)         to anon, authenticated;
grant execute on function public.get_page_stats(int)     to anon, authenticated;
grant execute on function public.get_campaign_stats(int) to anon, authenticated;
