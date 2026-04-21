type Props = {
  label: string;
  value: string | number;
  sub?: string;
  highlight?: boolean;
};

export function StatCard({ label, value, sub, highlight }: Props) {
  return (
    <div
      className={`rounded-xl border bg-surface p-5 ${
        highlight ? 'border-accent/50' : 'border-line'
      }`}
    >
      <div className="text-xs uppercase tracking-wider text-muted">{label}</div>
      <div
        className={`mt-2 text-3xl font-semibold ${
          highlight ? 'text-accent' : 'text-white'
        }`}
      >
        {value}
      </div>
      {sub && <div className="mt-1 text-sm text-muted">{sub}</div>}
    </div>
  );
}
