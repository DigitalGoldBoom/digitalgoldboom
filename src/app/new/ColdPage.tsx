"use client";

import GSAPProvider from "@/components/GSAPProvider";
import ShimmerDots from "@/components/ShimmerDots";
import DepthDriver from "@/components/funnel/new/DepthDriver";
import ThreadSegment from "@/components/funnel/new/ThreadSegment";
import CheckpointTracker from "@/components/funnel/new/CheckpointTracker";
import StickyBuyBar from "@/components/funnel/new/StickyBuyBar";
import SHero from "@/components/funnel/new/SHero";
import SReframe from "@/components/funnel/new/SReframe";
import SOldRoad from "@/components/funnel/new/SOldRoad";
import SModel from "@/components/funnel/new/SModel";
import SScorecard from "@/components/funnel/new/SScorecard";
import SWhyNow from "@/components/funnel/new/SWhyNow";
import SReceipts from "@/components/funnel/new/SReceipts";
import SWitness from "@/components/funnel/new/SWitness";
import SClose from "@/components/funnel/new/SClose";
import type { ColdVariant } from "@/components/funnel/new/variants";

const checkoutUrl = process.env.NEXT_PUBLIC_LS_CHECKOUT_URL;

/**
 * /new — the cold-traffic TEXT-ONLY sales page: "the descent to the proof".
 * Nine sections (copy: SALES-COPY-COLD-2026-07-06.md, PASS 95/100), one
 * product, one action. The reader's scroll performs the book's argument —
 * the page travels underground (--cold-depth) while one gold thread draws
 * from the hero to the buy button.
 */
export default function ColdPage({ variant }: { variant: ColdVariant }) {
  return (
    <GSAPProvider>
      <div className="v2 cold relative overflow-clip">
        {/* The world: a QUIET gold-dust field under a dark veil (fixed, cheap).
            The veil keeps body text on near-black — atmosphere is felt, not read over. */}
        <div aria-hidden className="pointer-events-none fixed inset-0 z-0">
          <ShimmerDots opacity={0.16} />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(5,5,8,0.6), rgba(8,8,13,0.82))",
            }}
          />
        </div>
        <DepthDriver />

        <main className="relative z-10">
          <SHero variant={variant} checkoutUrl={checkoutUrl} />
          <ThreadSegment height={90} />
          <SReframe />
          <ThreadSegment height={90} />
          <SOldRoad />
          <SModel />
          <SScorecard />
          <SWhyNow />
          <ThreadSegment height={90} />
          <SReceipts variant={variant.key} checkoutUrl={checkoutUrl} />
          <ThreadSegment height={90} />
          <SWitness />
          <ThreadSegment height={90} />
          <SClose variant={variant.key} checkoutUrl={checkoutUrl} />
        </main>

        <StickyBuyBar variant={variant.key} checkoutUrl={checkoutUrl} />
        <CheckpointTracker variant={variant.key} />
      </div>
    </GSAPProvider>
  );
}
