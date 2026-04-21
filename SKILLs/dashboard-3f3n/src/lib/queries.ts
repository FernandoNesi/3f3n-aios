import { supabase } from './supabase';

export type Totals = {
  visits: number;
  clicks: number;
  conversions: number;
  conversion_rate_pct: number | null;
};

export type PageStat = {
  page_variation: string;
  visits: number;
  clicks: number;
  conversions: number;
  conversion_rate_pct: number | null;
};

export type CampaignStat = {
  utm_campaign: string;
  utm_source: string;
  visits: number;
  conversions: number;
  conversion_rate_pct: number | null;
};

async function rpc<T>(fn: string, daysBack: number): Promise<T[]> {
  const { data, error } = await supabase.rpc(fn, { days_back: daysBack });
  if (error) throw new Error(`${fn} failed: ${error.message}`);
  return (data ?? []) as T[];
}

export async function fetchTotals(daysBack: number): Promise<Totals> {
  const rows = await rpc<Totals>('get_totals', daysBack);
  return rows[0] ?? { visits: 0, clicks: 0, conversions: 0, conversion_rate_pct: 0 };
}

export async function fetchPageStats(daysBack: number): Promise<PageStat[]> {
  return rpc<PageStat>('get_page_stats', daysBack);
}

export async function fetchCampaignStats(daysBack: number): Promise<CampaignStat[]> {
  return rpc<CampaignStat>('get_campaign_stats', daysBack);
}
