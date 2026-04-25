import { NextResponse } from 'next/server';
import { fetchRwaMcap } from '@/lib/live/sources';

export const runtime = 'edge';

const TTL_SECONDS = 3_600;

/**
 * GET /api/live/rwa-mcap — Tokenized RWA total market cap, sourced from
 * DefiLlama's free public API (sum of all protocols with category === 'RWA').
 * Returns a stale fallback ($35B, the book's snapshot value) if upstream fails.
 */
export async function GET() {
  try {
    const value = await fetchRwaMcap();
    return NextResponse.json(value, {
      headers: {
        'Cache-Control': `s-maxage=${TTL_SECONDS}, stale-while-revalidate=${TTL_SECONDS * 2}`,
      },
    });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : 'rwa-mcap fetch failed' },
      { status: 502 },
    );
  }
}
