import { NextResponse } from 'next/server';
import { fetchNatGoldSnapshot } from '@/lib/live/sources';

export const runtime = 'edge';

const TTL_SECONDS = 300;

/**
 * GET /api/live/snapshot
 * Returns the unified NatGold snapshot ({ spot, aisc, biv, btcPrice }) — the
 * single upstream call that powers the dashboard's three locked anchors.
 */
export async function GET() {
  try {
    const snapshot = await fetchNatGoldSnapshot();
    return NextResponse.json(snapshot, {
      headers: {
        'Cache-Control': `s-maxage=${TTL_SECONDS}, stale-while-revalidate=${TTL_SECONDS * 2}`,
      },
    });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : 'snapshot fetch failed' },
      { status: 502 },
    );
  }
}
