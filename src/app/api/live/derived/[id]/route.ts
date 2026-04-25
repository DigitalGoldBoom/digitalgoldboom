import { NextResponse, type NextRequest } from 'next/server';
import { z } from 'zod';
import { STATS_REGISTRY } from '@/data/stats-registry';
import { deriveById } from '@/lib/live/derive';
import { fetchLiveBundle } from '@/lib/live/sources';

export const runtime = 'edge';

const TTL_SECONDS = 300;

const ParamsSchema = z.object({ id: z.string().min(1).max(120) });

/**
 * GET /api/live/derived/[id]
 * Re-derives a single registry entry against the current live bundle and
 * returns the entry, the computed value, and the live source attribution.
 * Returns 404 if the id is unknown to the registry, 422 if the entry has no
 * derivation handler.
 */
export async function GET(
  _req: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const params = await context.params;
  const parsed = ParamsSchema.safeParse(params);
  if (!parsed.success) {
    return NextResponse.json({ error: 'invalid id parameter' }, { status: 400 });
  }
  const { id } = parsed.data;

  try {
    const bundle = await fetchLiveBundle();
    const result = deriveById(STATS_REGISTRY, bundle, id);
    if (!result) {
      return NextResponse.json({ error: `unknown stat id: ${id}` }, { status: 404 });
    }
    if (result.liveValue === undefined) {
      return NextResponse.json(
        {
          error: 'no derivation handler for this entry',
          entry: result.entry,
          liveSource: result.liveSource,
        },
        { status: 422 },
      );
    }
    return NextResponse.json(result, {
      headers: {
        'Cache-Control': `s-maxage=${TTL_SECONDS}, stale-while-revalidate=${TTL_SECONDS * 2}`,
      },
    });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : 'derivation failed' },
      { status: 502 },
    );
  }
}
