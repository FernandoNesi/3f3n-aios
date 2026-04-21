import type { Totals, PageStat, CampaignStat } from './queries';
import { openai, OPENAI_MODEL } from './openai';

// ─── Tipos da resposta ──────────────────────────────────────────────────

export type Decision = { target: string; reason: string };
export type Problem = {
  severity: 'low' | 'med' | 'high';
  title: string;
  detail: string;
};

export type Insights = {
  generated_at: string;
  days: number;
  source: 'openai' | 'rules';
  scale:   Decision | null;   // escalar
  fix:     Decision | null;   // corrigir
  invest:  Decision | null;   // investir
  problems: Problem[];
  actions:  string[];
};

// ─── Sinais determinísticos (fallback e âncora do prompt) ──────────────

export type Signals = {
  best_page: PageStat | null;
  worst_page: PageStat | null;
  high_click_low_conv: PageStat | null;
  zero_conversion_pages: PageStat[];
  best_campaign: CampaignStat | null;
  low_conv_campaigns: CampaignStat[];
};

const MIN_VISITS_TO_RANK = 30;

export function computeSignals(
  pages: PageStat[],
  campaigns: CampaignStat[]
): Signals {
  const ranked = pages.filter((p) => p.visits >= MIN_VISITS_TO_RANK);
  const byConvDesc = [...ranked].sort(
    (a, b) => (b.conversion_rate_pct ?? 0) - (a.conversion_rate_pct ?? 0)
  );

  const best_page = byConvDesc[0] ?? null;
  const worst_page = byConvDesc[byConvDesc.length - 1] ?? null;

  // Alto clique, baixa conversão: clicks/visits no top25 MAS conv_rate < 1%
  const engagementRatio = (p: PageStat) =>
    p.visits > 0 ? p.clicks / p.visits : 0;
  const highClickLowConv = ranked
    .filter(
      (p) =>
        engagementRatio(p) >= 0.4 &&
        (p.conversion_rate_pct ?? 0) < 1 &&
        p.conversions < 3
    )
    .sort((a, b) => engagementRatio(b) - engagementRatio(a));

  const zero_conversion_pages = ranked.filter(
    (p) => p.conversions === 0 && p.visits >= MIN_VISITS_TO_RANK
  );

  const rankedCampaigns = campaigns.filter((c) => c.visits >= MIN_VISITS_TO_RANK);
  const best_campaign = [...rankedCampaigns].sort(
    (a, b) => (b.conversion_rate_pct ?? 0) - (a.conversion_rate_pct ?? 0)
  )[0] ?? null;

  const low_conv_campaigns = rankedCampaigns.filter(
    (c) => (c.conversion_rate_pct ?? 0) < 0.5 && c.visits >= MIN_VISITS_TO_RANK * 3
  );

  return {
    best_page,
    worst_page,
    high_click_low_conv: highClickLowConv[0] ?? null,
    zero_conversion_pages,
    best_campaign,
    low_conv_campaigns,
  };
}

// ─── Fallback determinístico (quando OpenAI falha ou não tem key) ──────

export function insightsFromRules(
  days: number,
  signals: Signals
): Insights {
  const problems: Problem[] = [];

  if (signals.high_click_low_conv) {
    const p = signals.high_click_low_conv;
    problems.push({
      severity: 'high',
      title: `${p.page_variation}: engajamento alto, conversão baixa`,
      detail: `${p.clicks} cliques em ${p.visits} visitas mas apenas ${p.conversions} conversões (${p.conversion_rate_pct ?? 0}%). Problema está no form/oferta, não no topo.`,
    });
  }

  signals.zero_conversion_pages.forEach((p) => {
    problems.push({
      severity: 'med',
      title: `${p.page_variation} sem nenhuma conversão`,
      detail: `${p.visits} visitas, 0 conversões. Confirmar se o form está disparando o evento Lead.`,
    });
  });

  signals.low_conv_campaigns.slice(0, 3).forEach((c) => {
    problems.push({
      severity: 'med',
      title: `Campanha "${c.utm_campaign}" com conversão < 0.5%`,
      detail: `${c.visits} visitas via ${c.utm_source}, apenas ${c.conversions} conversões. Revisar criativo ou segmentação.`,
    });
  });

  const actions: string[] = [];
  if (signals.best_page)
    actions.push(`Escalar verba em ${signals.best_page.page_variation} (conv ${signals.best_page.conversion_rate_pct}%)`);
  if (signals.high_click_low_conv)
    actions.push(`Revisar CTA/form de ${signals.high_click_low_conv.page_variation} — gargalo pós-clique`);
  if (signals.best_campaign)
    actions.push(`Dobrar investimento em "${signals.best_campaign.utm_campaign}"`);
  if (signals.worst_page && signals.worst_page !== signals.best_page)
    actions.push(`Pausar/reescrever ${signals.worst_page.page_variation}`);

  return {
    generated_at: new Date().toISOString(),
    days,
    source: 'rules',
    scale: signals.best_page
      ? {
          target: signals.best_page.page_variation,
          reason: `Taxa ${signals.best_page.conversion_rate_pct}% em ${signals.best_page.visits} visitas.`,
        }
      : null,
    fix: signals.high_click_low_conv
      ? {
          target: signals.high_click_low_conv.page_variation,
          reason: `Engaja mas não converte — gargalo no form/oferta.`,
        }
      : signals.worst_page && signals.worst_page !== signals.best_page
      ? {
          target: signals.worst_page.page_variation,
          reason: `Pior taxa de conversão (${signals.worst_page.conversion_rate_pct}%).`,
        }
      : null,
    invest: signals.best_campaign
      ? {
          target: signals.best_campaign.utm_campaign,
          reason: `Melhor ROI: ${signals.best_campaign.conversion_rate_pct}% conv via ${signals.best_campaign.utm_source}.`,
        }
      : null,
    problems,
    actions,
  };
}

// ─── Enriquecimento via OpenAI (opcional) ──────────────────────────────

export async function insightsFromAI(params: {
  days: number;
  totals: Totals;
  pages: PageStat[];
  campaigns: CampaignStat[];
  signals: Signals;
}): Promise<Insights> {
  const client = openai();
  const fallback = insightsFromRules(params.days, params.signals);

  if (!client) return fallback;

  const system = `Você é um analista sênior de growth marketing da 3F3N. Analisa dados de tracking próprio e retorna insights acionáveis em JSON. Seja direto, numérico e concreto. Nada de jargão vazio.`;

  const user = `Últimos ${params.days} dias.

TOTAIS:
${JSON.stringify(params.totals)}

PÁGINAS (ranking por taxa de conversão):
${JSON.stringify(params.pages.slice(0, 10))}

CAMPANHAS (top 10):
${JSON.stringify(params.campaigns.slice(0, 10))}

SINAIS DETECTADOS POR REGRA:
${JSON.stringify(params.signals)}

Retorne JSON válido com este schema exato:
{
  "scale":   { "target": "<page_variation>", "reason": "<1 frase, numérica>" },
  "fix":     { "target": "<page_variation>", "reason": "<1 frase, numérica>" },
  "invest":  { "target": "<utm_campaign>",   "reason": "<1 frase, numérica>" },
  "problems": [
    { "severity": "low|med|high", "title": "<6-10 palavras>", "detail": "<1-2 frases com números>" }
  ],
  "actions": [ "<ação concreta 1>", "<ação concreta 2>", "<ação concreta 3>" ]
}

Regras:
- Use nomes exatos de page_variation e utm_campaign dos dados acima
- Se um campo não tiver dado suficiente, use null (nunca inventar)
- No máximo 5 problems e 5 actions
- Português brasileiro`;

  try {
    const res = await client.chat.completions.create({
      model: OPENAI_MODEL,
      temperature: 0.2,
      response_format: { type: 'json_object' },
      messages: [
        { role: 'system', content: system },
        { role: 'user', content: user },
      ],
    });

    const content = res.choices[0]?.message?.content;
    if (!content) return fallback;

    const parsed = JSON.parse(content);
    return {
      generated_at: new Date().toISOString(),
      days: params.days,
      source: 'openai',
      scale: parsed.scale ?? fallback.scale,
      fix: parsed.fix ?? fallback.fix,
      invest: parsed.invest ?? fallback.invest,
      problems: Array.isArray(parsed.problems) ? parsed.problems.slice(0, 5) : fallback.problems,
      actions: Array.isArray(parsed.actions) ? parsed.actions.slice(0, 5) : fallback.actions,
    };
  } catch (err) {
    console.error('[insights] OpenAI failed, using rules fallback:', err);
    return fallback;
  }
}
