import { NextResponse } from 'next/server';
import { fetchLiveBundle } from '@/lib/live/sources';

export const runtime = 'edge';

const TTL_SECONDS = 300;

/**
 * GET /api/live/all
 * Aggregator: fans out to every upstream in parallel and returns a single
 * bundle ({ spot, aisc, biv, paxg, xaut, btcMcap, usDebt, rwaMcap, errors }).
 * Per-leg failures are isolated — individual upstream errors land in `errors`
 * rather than poisoning the whole response.
 */
export async function GET() {
  try {
    const bundle = await fetchLiveBundle();
    return NextResponse.json(bundle, {
      headers: {
        'Cache-Control': `s-maxage=${TTL_SECONDS}, stale-while-revalidate=${TTL_SECONDS * 2}`,
      },
    });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : 'aggregator failed' },
      { status: 502 },
    );
  }
}
