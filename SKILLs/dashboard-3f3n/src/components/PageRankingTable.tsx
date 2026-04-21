import type { PageStat } from '@/lib/queries';

const fmt = (n: number | null | undefined) =>
  n == null ? '—' : n.toLocaleString('pt-BR');

const pct = (n: number | null) =>
  n == null ? '—' : `${Number(n).toFixed(2)}%`;

export function PageRankingTable({ rows }: { rows: PageStat[] }) {
  const best = rows[0]?.page_variation;

  return (
    <div className="rounded-xl border border-line bg-surface">
      <div className="flex items-center justify-between border-b border-line p-5">
        <h2 className="text-lg font-semibold text-white">Ranking de páginas</h2>
        {best && (
          <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
            🏆 Melhor: {best}
          </span>
        )}
      </div>
      <table className="w-full text-sm">
        <thead className="text-left text-xs uppercase tracking-wider text-muted">
          <tr>
            <th className="px-5 py-3">Página</th>
            <th className="px-5 py-3 text-right">Visitas</th>
            <th className="px-5 py-3 text-right">Cliques</th>
            <th className="px-5 py-3 text-right">Conversões</th>
            <th className="px-5 py-3 text-right">Taxa conv.</th>
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 && (
            <tr>
              <td colSpan={5} className="px-5 py-8 text-center text-muted">
                Sem dados no período.
              </td>
            </tr>
          )}
          {rows.map((r, i) => (
            <tr key={r.page_variation} className="border-t border-line">
              <td className="px-5 py-3 text-white">
                <span className="mr-2 text-muted">#{i + 1}</span>
                {r.page_variation}
              </td>
              <td className="px-5 py-3 text-right text-white">{fmt(r.visits)}</td>
              <td className="px-5 py-3 text-right text-white">{fmt(r.clicks)}</td>
              <td className="px-5 py-3 text-right text-white">{fmt(r.conversions)}</td>
              <td
                className={`px-5 py-3 text-right font-medium ${
                  i === 0 && r.conversion_rate_pct ? 'text-accent' : 'text-white'
                }`}
              >
                {pct(r.conversion_rate_pct)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
