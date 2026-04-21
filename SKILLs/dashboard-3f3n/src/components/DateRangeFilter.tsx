import Link from 'next/link';

const OPTIONS = [
  { days: 1,  label: 'Hoje' },
  { days: 7,  label: '7d' },
  { days: 30, label: '30d' },
  { days: 90, label: '90d' },
];

export function DateRangeFilter({ current }: { current: number }) {
  return (
    <div className="inline-flex overflow-hidden rounded-lg border border-line bg-surface">
      {OPTIONS.map((o) => {
        const active = o.days === current;
        return (
          <Link
            key={o.days}
            href={`/?days=${o.days}`}
            className={`px-4 py-2 text-sm transition ${
              active
                ? 'bg-accent text-ink font-semibold'
                : 'text-muted hover:text-white'
            }`}
          >
            {o.label}
          </Link>
        );
      })}
    </div>
  );
}
