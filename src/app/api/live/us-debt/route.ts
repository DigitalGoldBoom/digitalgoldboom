import { NextResponse } from 'next/server';
import { fetchUsDebt } from '@/lib/live/sources';

export const runtime = 'edge';

const TTL_SECONDS = 86_400;

/** GET /api/live/us-debt — US Treasury total public debt outstanding. */
export async function GET() {
  try {
    const value = await fetchUsDebt();
    return NextResponse.json(value, {
      headers: {
        'Cache-Control': `s-maxage=${TTL_SECONDS}, stale-while-revalidate=${TTL_SECONDS * 2}`,
      },
    });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : 'us-debt fetch failed' },
      { status: 502 },
    );
  }
}
