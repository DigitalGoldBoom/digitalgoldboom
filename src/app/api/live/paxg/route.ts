import { NextResponse } from 'next/server';
import { fetchPaxg } from '@/lib/live/sources';

export const runtime = 'edge';

const TTL_SECONDS = 300;

/** GET /api/live/paxg — Paxos Gold price + market cap from CoinGecko. */
export async function GET() {
  try {
    const value = await fetchPaxg();
    return NextResponse.json(value, {
      headers: {
        'Cache-Control': `s-maxage=${TTL_SECONDS}, stale-while-revalidate=${TTL_SECONDS * 2}`,
      },
    });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : 'paxg fetch failed' },
      { status: 502 },
    );
  }
}
