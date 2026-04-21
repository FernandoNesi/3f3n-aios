import { StatCard } from '@/components/StatCard';
import { PageRankingTable } from '@/components/PageRankingTable';
import { CampaignTable } from '@/components/CampaignTable';
import { DateRangeFilter } from '@/components/DateRangeFilter';
import {
  fetchTotals,
  fetchPageStats,
  fetchCampaignStats,
} from '@/lib/queries';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const fmt = (n: number | null | undefined) =>
  n == null ? '—' : n.toLocaleString('pt-BR');

const pct = (n: number | null | undefined) =>
  n == null ? '—' : `${Number(n).toFixed(2)}%`;

export default async function Dashboard({
  searchParams,
}: {
  searchParams: { days?: string };
}) {
  const days = Math.max(1, Math.min(365, Number(searchParams.days) || 30));

  const [totals, pageStats, campaignStats] = await Promise.all([
    fetchTotals(days),
    fetchPageStats(days),
    fetchCampaignStats(days),
  ]);

  const best = pageStats[0];

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <header className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-white">Dashboard 3F3N</h1>
          <p className="mt-1 text-sm text-muted">
            Últimos {days} {days === 1 ? 'dia' : 'dias'} · tracking-core v3.0.0
          </p>
        </div>
        <DateRangeFilter current={days} />
      </header>

      <section className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Visitas" value={fmt(totals.visits)} />
        <StatCard label="Cliques" value={fmt(totals.clicks)} />
        <StatCard label="Conversões" value={fmt(totals.conversions)} />
        <StatCard
          label="Taxa de conversão"
          value={pct(totals.conversion_rate_pct)}
          highlight
          sub={best ? `Líder: ${best.page_variation}` : undefined}
        />
      </section>

      <section className="mb-8">
        <PageRankingTable rows={pageStats} />
      </section>

      <section>
        <CampaignTable rows={campaignStats} />
      </section>

      <footer className="mt-10 text-center text-xs text-muted">
        3F3N AI OS · dashboard-3f3n
      </footer>
    </main>
  );
}
