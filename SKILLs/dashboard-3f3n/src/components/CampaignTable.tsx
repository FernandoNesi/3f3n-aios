import type { CampaignStat } from '@/lib/queries';

const fmt = (n: number | null | undefined) =>
  n == null ? '—' : n.toLocaleString('pt-BR');

const pct = (n: number | null) =>
  n == null ? '—' : `${Number(n).toFixed(2)}%`;

export function CampaignTable({ rows }: { rows: CampaignStat[] }) {
  return (
    <div className="rounded-xl border border-line bg-surface">
      <div className="border-b border-line p-5">
        <h2 className="text-lg font-semibold text-white">Performance por campanha</h2>
        <p className="mt-1 text-sm text-muted">
          Agrupado por <code className="text-white">utm_campaign × utm_source</code>
        </p>
      </div>
      <table className="w-full text-sm">
        <thead className="text-left text-xs uppercase tracking-wider text-muted">
          <tr>
            <th className="px-5 py-3">Campanha</th>
            <th className="px-5 py-3">Source</th>
            <th className="px-5 py-3 text-right">Visitas</th>
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
          {rows.map((r) => (
            <tr
              key={`${r.utm_campaign}__${r.utm_source}`}
              className="border-t border-line"
            >
              <td className="px-5 py-3 text-white">{r.utm_campaign}</td>
              <td className="px-5 py-3 text-muted">{r.utm_source}</td>
              <td className="px-5 py-3 text-right text-white">{fmt(r.visits)}</td>
              <td className="px-5 py-3 text-right text-white">{fmt(r.conversions)}</td>
              <td className="px-5 py-3 text-right text-white">
                {pct(r.conversion_rate_pct)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
