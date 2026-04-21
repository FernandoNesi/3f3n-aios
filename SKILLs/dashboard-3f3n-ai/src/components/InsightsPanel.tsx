'use client';

import { useEffect, useState } from 'react';
import { DecisionCard } from './DecisionCard';

type Decision = { target: string; reason: string } | null;
type Problem = { severity: 'low' | 'med' | 'high'; title: string; detail: string };

type Insights = {
  generated_at: string;
  days: number;
  source: 'openai' | 'rules';
  scale:  Decision;
  fix:    Decision;
  invest: Decision;
  problems: Problem[];
  actions:  string[];
};

const SEVERITY_STYLES: Record<Problem['severity'], string> = {
  low:  'border-line text-muted',
  med:  'border-warn/40 text-warn',
  high: 'border-danger/40 text-danger',
};

export function InsightsPanel({ days }: { days: number }) {
  const [data, setData] = useState<Insights | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const load = async (bust = false) => {
    if (bust) setRefreshing(true);
    else setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `/api/insights?days=${days}${bust ? '&refresh=1' : ''}`,
        { cache: 'no-store' }
      );
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = (await res.json()) as Insights;
      setData(json);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    load(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [days]);

  return (
    <section className="space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-white">Insights da IA</h2>
          <p className="mt-1 text-sm text-muted">
            Qual página escalar · qual corrigir · qual campanha investir
            {data && (
              <span className="ml-2 rounded-full border border-line px-2 py-0.5 text-xs">
                {data.source === 'openai' ? 'OpenAI' : 'Regras'}
              </span>
            )}
          </p>
        </div>
        <button
          onClick={() => load(true)}
          disabled={refreshing || loading}
          className="rounded-lg border border-line bg-surface px-4 py-2 text-sm text-white hover:border-accent disabled:opacity-50"
        >
          {refreshing ? 'Atualizando…' : 'Atualizar'}
        </button>
      </header>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <DecisionCard
          kind="scale"
          target={data?.scale?.target}
          reason={data?.scale?.reason}
          loading={loading}
        />
        <DecisionCard
          kind="fix"
          target={data?.fix?.target}
          reason={data?.fix?.reason}
          loading={loading}
        />
        <DecisionCard
          kind="invest"
          target={data?.invest?.target}
          reason={data?.invest?.reason}
          loading={loading}
        />
      </div>

      {error && (
        <div className="rounded-xl border border-danger/40 bg-surface p-4 text-sm text-danger">
          Falha ao carregar insights: {error}
        </div>
      )}

      {data && data.problems.length > 0 && (
        <div className="rounded-xl border border-line bg-surface">
          <div className="border-b border-line p-5">
            <h3 className="text-base font-semibold text-white">Problemas detectados</h3>
          </div>
          <ul className="divide-y divide-line">
            {data.problems.map((p, i) => (
              <li key={i} className="flex gap-4 p-5">
                <span
                  className={`mt-0.5 rounded border px-2 py-0.5 text-xs font-semibold uppercase ${SEVERITY_STYLES[p.severity]}`}
                >
                  {p.severity}
                </span>
                <div>
                  <div className="font-medium text-white">{p.title}</div>
                  <div className="mt-1 text-sm text-muted">{p.detail}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {data && data.actions.length > 0 && (
        <div className="rounded-xl border border-line bg-surface p-5">
          <h3 className="text-base font-semibold text-white">Ações recomendadas</h3>
          <ol className="mt-4 list-decimal space-y-2 pl-6 text-sm text-white marker:text-muted">
            {data.actions.map((a, i) => (
              <li key={i}>{a}</li>
            ))}
          </ol>
        </div>
      )}
    </section>
  );
}
