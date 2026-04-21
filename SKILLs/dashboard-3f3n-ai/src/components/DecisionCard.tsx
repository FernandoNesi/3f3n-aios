type Props = {
  kind: 'scale' | 'fix' | 'invest';
  target: string | null | undefined;
  reason: string | null | undefined;
  loading?: boolean;
};

const META = {
  scale:  { label: 'Escalar',   color: 'text-accent', dot: 'bg-accent'  },
  fix:    { label: 'Corrigir',  color: 'text-warn',   dot: 'bg-warn'    },
  invest: { label: 'Investir',  color: 'text-white',  dot: 'bg-white'   },
};

export function DecisionCard({ kind, target, reason, loading }: Props) {
  const m = META[kind];
  return (
    <div className="rounded-xl border border-line bg-surface p-5">
      <div className="flex items-center gap-2">
        <span className={`h-2 w-2 rounded-full ${m.dot}`} />
        <span className={`text-xs font-semibold uppercase tracking-wider ${m.color}`}>
          {m.label}
        </span>
      </div>

      {loading ? (
        <>
          <div className="mt-3 h-6 w-32 animate-pulse rounded bg-line" />
          <div className="mt-2 h-4 w-48 animate-pulse rounded bg-line" />
        </>
      ) : target ? (
        <>
          <div className="mt-3 text-2xl font-semibold text-white">{target}</div>
          <p className="mt-2 text-sm text-muted">{reason}</p>
        </>
      ) : (
        <div className="mt-3 text-sm text-muted">Dados insuficientes.</div>
      )}
    </div>
  );
}
