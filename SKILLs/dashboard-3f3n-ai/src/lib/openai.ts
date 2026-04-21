import OpenAI from 'openai';

let _client: OpenAI | null = null;

export function openai(): OpenAI | null {
  const key = process.env.OPENAI_API_KEY;
  if (!key) return null;
  if (!_client) _client = new OpenAI({ apiKey: key });
  return _client;
}

export const OPENAI_MODEL = process.env.OPENAI_MODEL || 'gpt-4o-mini';
