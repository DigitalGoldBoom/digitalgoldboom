import { NextResponse } from 'next/server';
import { fetchXaut } from '@/lib/live/sources';

export const runtime = 'edge';

const TTL_SECONDS = 300;

/** GET /api/live/xaut — Tether Gold price + market cap from CoinGecko. */
export async function GET() {
  try {
    const value = await fetchXaut();
    return NextResponse.json(value, {
      headers: {
        'Cache-Control': `s-maxage=${TTL_SECONDS}, stale-while-revalidate=${TTL_SECONDS * 2}`,
      },
    });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : 'xaut fetch failed' },
      { status: 502 },
    );
  }
}
