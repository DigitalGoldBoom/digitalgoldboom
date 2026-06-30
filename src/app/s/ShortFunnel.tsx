"use client";

import Book3D from "@/components/Book3D";
import SalesField from "@/components/funnel/sales/SalesField";
import SalesCTA from "@/components/funnel/sales/SalesCTA";
import Reveal from "@/components/funnel/sales/Reveal";

/* COPY IS LOCKED — pasted verbatim from SALES-COPY-FINAL-v1-s.md (PAGE /s).
   One screen, one breath, one button. Same brand DNA as /v1, stripped for cold
   social traffic — minimal motion, fastest possible hook → explain → buy.
   Shares the /v1 hero visual (Book3D interim) so the A/B test measures structure,
   not art direction. */

export default function ShortFunnel() {
  return (
    <div className="v2 relative overflow-clip">
      <SalesField />

      <main className="relative z-10">
        <section className="relative flex min-h-[100svh] items-center">
          <div className="mx-auto w-full max-w-[1200px] px-6 md:px-10 py-28 lg:py-24">
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
              {/* TEXT — leads on every breakpoint (the headline is the LCP) */}
              <div>
                <Reveal as="div"><p className="v2-eyebrow mb-6">A shift in the gold industry</p></Reveal>
                <Reveal as="h1" delay={60} className="v2-display" style={{ fontSize: "clamp(2.6rem, 7vw, 5.25rem)" }}>
                  It&rsquo;s not gold.
                  <br />
                  It&rsquo;s not <span className="v2-gold">bitcoin.</span>
                </Reveal>
                <Reveal as="p" delay={120} className="mt-7 max-w-[46ch] text-lg leading-relaxed" style={{ color: "var(--v2-dim)" }}>
                  There is a real change underway in how the world&rsquo;s oldest asset works — and most people have never heard of it.
                </Reveal>

                <Reveal as="p" delay={160} className="mt-6 max-w-[52ch] leading-relaxed" style={{ color: "var(--v2-dim)" }}>
                  A way to independently verify a gold deposit and represent its value digitally — without mining it out of the ground. The book explains the whole thing in plain English, from someone who ran a gold company inside the shift.
                </Reveal>

                <Reveal delay={200} className="mt-7 flex flex-col gap-3">
                  <p className="leading-relaxed" style={{ color: "var(--v2-faint)", maxWidth: "52ch", fontSize: "0.95rem" }}>
                    Written by <span style={{ color: "#F4F4F7" }}>Andrew Fletcher</span>, former president of a gold company built to align with this model, who has assessed more than two hundred gold projects.
                  </p>
                  <p className="leading-relaxed" style={{ color: "var(--v2-faint)", maxWidth: "52ch", fontSize: "0.95rem" }}>
                    One book. Every statistic sourced to a record you can check — a real deposit followed through the model, and a full chapter that argues against its own case.
                  </p>
                </Reveal>

                <Reveal delay={240} className="mt-9">
                  <SalesCTA
                    event="s_hero_buy"
                    regular="97"
                    subline="Early-reader launch price, in exchange for an honest review. Read it before the first tokens trade on July 8, 2026."
                    deliveryLine="Delivered instantly · 12-month money-back guarantee · Educational, not financial advice"
                    fine={null}
                  />
                </Reveal>
              </div>

              {/* HERO VISUAL — shared with /v1 (Book3D interim, ONE asset across both pages).
                  SWAP POINT: replace <Book3D/> with the photoreal gold-mass when delivered. */}
              <Reveal delay={120} className="flex justify-center lg:justify-end">
                <Book3D />
              </Reveal>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
