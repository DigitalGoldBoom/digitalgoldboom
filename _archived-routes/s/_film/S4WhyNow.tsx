"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import ModulePanel from "./ModulePanel";
import TranscriptBlock from "./TranscriptBlock";
import { useSectionView } from "./useSectionView";
import { PLATES as IMG } from "./plates";

/**
 * S4 — WHY NOW (Module 3 + the heat). The page's hottest section, DEMOTED to
 * supporting cast: plain opacity crossfades on the 3-plate backdrop (desktop
 * pin capped +=140%), and the page's ONE violent moment — "A $10 BILLION MINE.
 * GONE IN 39 DAYS." hard-cuts in (set(), no tween) at 15% of the pin. The
 * 29-year timeline draws itself (SVG dashoffset, scrubbed). Phone: NO pin —
 * static plate stack, the stat snaps once in view, timeline vertical.
 * No CTA here — the heat resolves into S5's substance (flat-authority voice).
 * Plates are interim code composites until the Director's renders land.
 */

// pit → crowd → gates: real Higgsfield plates via plates.ts; gradient fallback.
const PLATE_DEFS: { bg: string; src?: string }[] = [
  { bg: "radial-gradient(120% 90% at 30% 70%, #1a140f 0%, #0c0a09 60%), linear-gradient(180deg, #0f0c0a, #080709)", src: IMG.pit },
  { bg: "radial-gradient(100% 80% at 60% 40%, #16131b 0%, #0a090d 65%), linear-gradient(180deg, #0d0b10, #070609)", src: IMG.crowd },
  { bg: "linear-gradient(100deg, #0c0b10 0%, #14121a 45%, #0a090d 100%)", src: IMG.gates },
];

export default function S4WhyNow() {
  const sectionRef = useSectionView("why_now");
  const scope = useRef<HTMLDivElement>(null);
  const verdictRef = useRef<HTMLParagraphElement>(null);
  const timelineRef = useRef<SVGPathElement>(null);
  const timelineVRef = useRef<SVGPathElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(
        {
          motion: "(prefers-reduced-motion: no-preference)",
          desktop: "(min-width: 1024px)",
          wide: "(min-width: 768px)",
        },
        (ctx) => {
          const { motion, desktop, wide } = ctx.conditions as {
            motion: boolean;
            desktop: boolean;
            wide: boolean;
          };
          if (!motion) return; // reduced motion: static stack, timeline pre-drawn via CSS
          const plates = gsap.utils.toArray<HTMLElement>("[data-s4-plate]", scope.current!);

          if (wide) {
            // Sticky-scrubbed stat block over crossfading plates (sticky, not
            // pinned — pinning registered as CLS; see Descent.tsx). Track:
            // desktop 240svh (≈ +=140%) · tablet 200svh (plan's +=100%).
            gsap.set("[data-s4-stage]", { height: `${desktop ? 240 : 200}svh` });
            const tl = gsap.timeline({
              scrollTrigger: {
                trigger: "[data-s4-stage]",
                start: "top top",
                end: "bottom bottom",
                scrub: 1,
                invalidateOnRefresh: true,
              },
              defaults: { ease: "none" },
            });
            // Opacity-only crossfades: pit 0–33 → crowd 25–66 → gates 60–100.
            tl.fromTo(plates[0], { opacity: 1 }, { opacity: 0, duration: 0.33 }, 0)
              .fromTo(plates[1], { opacity: 0 }, { opacity: 1, duration: 0.2 }, 0.25)
              .to(plates[1], { opacity: 0, duration: 0.21 }, 0.45)
              .fromTo(plates[2], { opacity: 0 }, { opacity: 1, duration: 0.4 }, 0.6);
            // THE ONE HARD CUT — set() at 15%, then a 150ms settle.
            tl.set(verdictRef.current, { opacity: 1, visibility: "visible" }, 0.15).fromTo(
              verdictRef.current,
              { scale: 1.04 },
              { scale: 1, duration: 0.04, ease: "power1.out" },
              0.15,
            );
          } else {
            // Phone: no pin — the verdict snaps in once, in view.
            gsap.set(verdictRef.current, { opacity: 0, visibility: "hidden" });
            gsap.to(verdictRef.current, {
              opacity: 1,
              visibility: "visible",
              duration: 0.01,
              scrollTrigger: { trigger: verdictRef.current, start: "top 75%", once: true },
            });
          }

          // The 29-year timeline draw (its own trigger, both variants).
          const path = wide ? timelineRef.current : timelineVRef.current;
          if (path) {
            gsap.to(path, {
              "--draw": 0,
              ease: "none",
              scrollTrigger: {
                trigger: "[data-s4-timeline]",
                start: "top 70%",
                end: wide ? "+=60vh" : "+=50vh",
                scrub: 0.5,
              },
            });
          }

          if (wide) gsap.set(verdictRef.current, { opacity: 0, visibility: "hidden" });
        },
      );
    },
    { scope },
  );

  return (
    <section
      id="s-why-now"
      ref={(el) => {
        sectionRef.current = el;
      }}
      className="relative py-24 md:py-0"
    >
      <div ref={scope}>
        <div className="sfilm-contain relative z-10 md:pt-28">
          <p className="v2-eyebrow mb-8">Why now</p>
          <h2 className="v2-display" style={{ fontSize: "clamp(1.9rem, 4.2vw, 3.25rem)", maxWidth: "20ch" }}>
            The world still wants gold. It no longer wants the digging.
          </h2>
          <div className="mt-10 max-w-[860px]">
            <ModulePanel
              section="why_now"
              module="m3"
              chip="03 · WHY NOW"
              title="Why Now"
              promise="In 2023, a ten-billion-dollar mine was erased in thirty-nine days."
              duration="1:15"
            />
            <TranscriptBlock module="m3" />
          </div>
        </div>

        {/* The heat stage: a tall track (height set by JS when motion is on) with a
            sticky viewport — plates crossfade behind the verdict (≥768px) / static
            stack on phone. Sticky, never pinned (CLS). */}
        <div data-s4-stage className="relative mt-14">
          <div className="md:sticky md:top-0 md:flex md:h-svh md:flex-col md:justify-center">
            {/* Plates — absolute stack ≥768px, static triptych rows on phone */}
            <div className="relative z-0 hidden md:block md:absolute md:inset-0" aria-hidden>
              {PLATE_DEFS.map((p, i) => (
                <div
                  key={i}
                  data-s4-plate
                  className="absolute inset-0"
                  style={{ background: p.bg, opacity: i === 0 ? 1 : 0, willChange: "opacity" }}
                >
                  {p.src && (
                    <Image src={p.src} alt="" fill sizes="100vw" className="object-cover" />
                  )}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-1 gap-3 px-6 md:hidden" aria-hidden>
              {PLATE_DEFS.map((p, i) => (
                <div
                  key={i}
                  className="relative h-36 overflow-hidden rounded-xl"
                  style={{ background: p.bg }}
                >
                  {p.src && (
                    <Image src={p.src} alt="" fill sizes="100vw" className="object-cover" />
                  )}
                </div>
              ))}
            </div>

            {/* The hard-landing verdict + timeline + body */}
            <div className="sfilm-contain relative z-10 py-14 md:py-0">
            <p
              ref={verdictRef}
              className="v2-display"
              style={{ fontSize: "clamp(1.75rem, 5.5vw, 4rem)", maxWidth: "16ch" }}
            >
              A $10 BILLION MINE.
              <br />
              <span className="v2-gold" style={{ color: "#F4F4F7" }}>GONE IN 39 DAYS.</span>
            </p>

            {/* 29-year timeline */}
            <div data-s4-timeline className="mt-14">
              <p className="v2-num mb-4">A NEW U.S. MINE — DISCOVERY TO PRODUCTION, ON AVERAGE</p>
              {/* Horizontal (≥768px) */}
              <svg
                className="hidden h-16 w-full md:block"
                viewBox="0 0 1000 60"
                preserveAspectRatio="none"
                role="img"
                aria-label="Twenty-nine years — the average time from discovery to production for a new United States mine"
              >
                <path
                  ref={timelineRef}
                  className="sfilm-timeline-path"
                  d="M10 30 H 990"
                  pathLength={1}
                />
                {Array.from({ length: 30 }, (_, y) => (
                  <line
                    key={y}
                    x1={10 + (y * 980) / 29}
                    x2={10 + (y * 980) / 29}
                    y1={y % 5 === 0 ? 18 : 24}
                    y2={30}
                    stroke="rgba(232,178,58,0.4)"
                    strokeWidth={1}
                  />
                ))}
                <text x="10" y="52" fill="rgba(231,231,238,0.5)" fontSize="12">YEAR 0 — DISCOVERY</text>
                <text x="990" y="52" fill="rgba(231,231,238,0.8)" fontSize="12" textAnchor="end">YEAR 29 — PRODUCTION</text>
              </svg>
              {/* Vertical (phone) */}
              <svg
                className="block h-64 w-14 md:hidden"
                viewBox="0 0 60 500"
                preserveAspectRatio="none"
                role="img"
                aria-label="Twenty-nine years — the average time from discovery to production for a new United States mine"
              >
                <path
                  ref={timelineVRef}
                  className="sfilm-timeline-path"
                  d="M30 10 V 490"
                  pathLength={1}
                />
                {Array.from({ length: 30 }, (_, y) => (
                  <line
                    key={y}
                    y1={10 + (y * 480) / 29}
                    y2={10 + (y * 480) / 29}
                    x1={y % 5 === 0 ? 16 : 22}
                    x2={30}
                    stroke="rgba(232,178,58,0.4)"
                    strokeWidth={1}
                  />
                ))}
              </svg>
              <p className="mt-2 text-sm md:hidden" style={{ color: "var(--v2-dim)" }}>
                Year 0, discovery — year 29, production.
              </p>
            </div>

            <p className="mt-12 max-w-[68ch] text-lg leading-relaxed" style={{ color: "var(--v2-dim)" }}>
              The old way of producing gold is breaking down. The easy ore is gone — each new
              ounce moves more rock, does more damage, and draws more opposition. In 2023
              Panama shut down an operating $10 billion mine in 39 days. In the United States,
              a new mine now averages 29 years from discovery to production. Record gold
              prices tighten the squeeze instead of easing it. The book maps the whole
              machine — six compounding forces the author calls the Extraction S.P.I.R.A.L. —
              and what happens when a second road opens.
            </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
