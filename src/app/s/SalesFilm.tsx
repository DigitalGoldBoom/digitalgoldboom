"use client";

import { useRef } from "react";
import GSAPProvider from "@/components/GSAPProvider";
import ScrollTracker from "@/components/ScrollTracker";
import WorldDriver from "./_film/WorldDriver";
import Seam from "./_film/Seam";
import GoldDust from "./_film/GoldDust";
import StickyBuy from "./_film/StickyBuy";
import S1Hero from "./_film/S1Hero";
import Descent from "./_film/Descent";
import S2Trillion from "./_film/S2Trillion";
import S3WhoBuilt from "./_film/S3WhoBuilt";
import S4WhyNow from "./_film/S4WhyNow";
import S5Inside from "./_film/S5Inside";
import S6Author from "./_film/S6Author";
import S7Close from "./_film/S7Close";

/**
 * /s — THE FILM PAGE. One continuous journey: down into the earth at night,
 * back out into dawn. Built to SALES-BUILD-PLAN-VIDEO-LED-2026-07-02.md.
 *
 * Two signature moments only: THE DESCENT (S1→S2 pin) and THE DAY ARC + SEAM
 * (scroll-driven world). Everything else is supporting cast. Global chrome =
 * the site Navbar/Footer (root layout, untouched). Video modules ship as
 * placeholder title boards; masters drop in as props (§ModulePanel).
 * Reduced-motion: every system has an authored static state (dusk mid-grade).
 */
export default function SalesFilm() {
  const heroCtaRef = useRef<HTMLElement | null>(null);
  const closeCtaRef = useRef<HTMLElement | null>(null);

  return (
    <GSAPProvider>
      <div className="v2 sfilm relative" style={{ overflowX: "clip" }}>
        {/* Global systems */}
        <GoldDust />
        <WorldDriver />
        <Seam />
        <ScrollTracker />

        {/* No z-index on main: sections' SCENERY layers must sit BELOW the fixed
            night/dawn overlays (z 2/3) so the day arc actually grades the imagery,
            while each section's CONTENT container carries z-10 above them
            (designer z-ladder: backgrounds 0 → dust 1 → overlays 2/3 → content 10). */}
        <main className="relative">
          <S1Hero heroCtaRef={heroCtaRef} />
          <Descent />
          <S2Trillion />
          <S3WhoBuilt />
          <S4WhyNow />
          <S5Inside />
          <S6Author />
          <S7Close closeCtaRef={closeCtaRef} />
        </main>

        <StickyBuy heroCtaRef={heroCtaRef} closeCtaRef={closeCtaRef} />
      </div>
    </GSAPProvider>
  );
}
