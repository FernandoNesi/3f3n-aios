import { NextResponse } from 'next/server';
import {
  fetchTotals,
  fetchPageStats,
  fetchCampaignStats,
} from '@/lib/queries';
import { computeSignals, insightsFromAI, type Insights } from '@/lib/insights';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// Cache em memória por processo (simples, reinicia com o server)
type CacheEntry = { at: number; data: Insights };
const cache = new Map<string, CacheEntry>();
const TTL_MS = (Number(process.env.INSIGHTS_CACHE_TTL) || 300) * 1000;

export async function GET(req: Request) {
  const url = new URL(req.url);
  const days = Math.max(1, Math.min(365, Number(url.searchParams.get('days')) || 30));
  const bust = url.searchParams.get('refresh') === '1';

  const key = `d:${days}`;
  const cached = cache.get(key);
  if (!bust && cached && Date.now() - cached.at < TTL_MS) {
    return NextResponse.json(cached.data, {
      headers: { 'X-Cache': 'HIT' },
    });
  }

  try {
    const [totals, pages, campaigns] = await Promise.all([
      fetchTotals(days),
      fetchPageStats(days),
      fetchCampaignStats(days),
    ]);

    const signals = computeSignals(pages, campaigns);
    const insights = await insightsFromAI({ days, totals, pages, campaigns, signals });

    cache.set(key, { at: Date.now(), data: insights });
    return NextResponse.json(insights, { headers: { 'X-Cache': 'MISS' } });
  } catch (err) {
    return NextResponse.json(
      { error: (err as Error).message },
      { status: 500 }
    );
  }
}
