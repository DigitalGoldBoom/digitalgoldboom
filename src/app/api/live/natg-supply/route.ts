import { NextResponse } from 'next/server';
import { fetchNatgSupply } from '@/lib/live/onchain';

export const runtime = 'edge';

const TTL_SECONDS = 300;

/**
 * GET /api/live/natg-supply — total NATG minted, read live from the Ethereum
 * mainnet contract's totalSupply(). This is the on-chain truth: it supersedes
 * any figure quoted in a press release.
 */
export async function GET() {
  try {
    const value = await fetchNatgSupply();
    return NextResponse.json(value, {
      headers: {
        'Cache-Control': `s-maxage=${TTL_SECONDS}, stale-while-revalidate=${TTL_SECONDS * 2}`,
      },
    });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : 'natg-supply fetch failed' },
      { status: 502 },
    );
  }
}
