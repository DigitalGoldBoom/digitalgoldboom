"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import VerdictLine from "./VerdictLine";

/**
 * S5 — THE HEAD-TO-HEAD. Signature moment 2: the pinned two-roads split.
 * Desktop pins (≤120vh) while the four verdict rows rise in one at a time,
 * old value left / new value right, the gold thread running down between.
 * Phone: NO pin — four stacked versus-cards, fully scannable.
 *
 * Design laws carried from copy-chief D2: a multiple NEVER separates from its
 * denominator (the ROI row shows $1.23B→1.39× | $51M→21× as one unit, with the
 * benchmark caption in the same unit). No charts, no green arrows anywhere.
 * Static state (no-JS / reduced-motion / phone): all rows visible.
 */

type Row = {
  label: string;
  old: string;
  new: string;
  newVerdict?: boolean; // row 4 carries verdict line 3 of 4
  caption?: string;
};

const ROWS: Row[] = [
  {
    label: "Time to a tradeable asset",
    old: "23+ years the old way (29 in the US)",
    new: "About six months.",
  },
  {
    label: "Cost to prove the gold",
    old: "$51 million — both roads pay it. Then the old road spends $249 million more to build the mine, $300 million in all.",
    new: "The new road stops at the proof.",
  },
  {
    label: "Return on every cash dollar put at risk",
    old: "The old road puts $1.23 billion at risk across the project’s life — building, operating, cleaning up — and returns roughly 1.39×.",
    new: "The new road puts $51 million at risk and returns roughly 21×.",
    caption:
      "(Same measure both sides: net value against total cash at risk, per the book’s benchmark.)",
  },
  {
    label: "To produce one ounce",
    old: "Roughly 124 tonnes of rock moved, 21,000 litres of water, 9 kilograms of cyanide.",
    new: "None of it.",
    newVerdict: true,
  },
];

export default function SScorecard() {
  const ref = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  useScrollReveal(ref, { selector: "[data-reveal-s5]" });

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      // Desktop + motion only: the pin. Everyone else already sees all rows.
      mm.add("(prefers-reduced-motion: no-preference) and (min-width: 810px)", () => {
        const rows = gsap.utils.toArray<HTMLElement>("[data-s5-row]");
        gsap
          .timeline({
            scrollTrigger: {
              trigger: pinRef.current,
              start: "top 88px", // clear the fixed nav
              end: () => `+=${Math.round(window.innerHeight * 1.2)}`, // ≤120vh pin cap
              pin: true,
              scrub: 0.5,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          })
          .from(rows, {
            autoAlpha: 0,
            y: 16,
            stagger: 0.6,
            duration: 0.5,
            ease: "none",
          });
      });
    },
    { scope: ref },
  );

  return (
    <section id="cold-s5" ref={ref} className="cold-section">
      <div className="cold-wrap">
        <p data-reveal-s5 className="v2-eyebrow">The scorecard</p>
        <h2
          data-reveal-s5
          className="v2-display mt-6"
          style={{ fontSize: "clamp(1.9rem, 4.4vw, 3.4rem)", maxWidth: "18ch" }}
        >
          Same deposit. Two roads. <span className="v2-gold">Nowhere to hide.</span>
        </h2>
        <p data-reveal-s5 className="cold-body mt-6">
          One benchmark deposit — one million verified ounces — run down both roads, on
          published industry averages.
        </p>
      </div>

      {/* Only the ROWS block pins (heading scrolls away first — the pinned
          content must fit one viewport). */}
      <div ref={pinRef}>
        <div className="cold-wrap py-4 md:py-8">
          {/* Column headers — desktop split only. */}
          <div className="hidden grid-cols-[1fr_48px_1fr] md:grid">
            <div className="v2-num text-right" style={{ letterSpacing: "0.18em" }}>
              THE OLD ROAD
            </div>
            <div />
            <div className="v2-num" style={{ color: "var(--v2-gold)", letterSpacing: "0.18em" }}>
              DIGITAL GOLD MINING
            </div>
          </div>

          <div className="relative mt-4 md:mt-2">
            {/* the gold thread runs down BETWEEN the columns */}
            <div
              aria-hidden
              className="cold-roads-divider absolute bottom-0 left-1/2 top-0 hidden -translate-x-1/2 md:block"
            />
            <div className="flex flex-col gap-5 md:gap-0">
              {ROWS.map((r) => (
                <div key={r.label} data-s5-row>
                  {/* Desktop: split row. Phone: one versus-card, old over new. */}
                  <div className="v2-tile p-6 md:my-4 md:border-0 md:bg-transparent md:p-0">
                    {/* row label — centered above both columns on desktop */}
                    <div className="v2-num mb-3 md:mb-4 md:text-center" style={{ letterSpacing: "0.14em" }}>
                      {r.label}
                    </div>
                    <div className="md:grid md:grid-cols-[1fr_48px_1fr] md:items-start">
                      <div className="md:pr-4 md:text-right">
                        <p className="cold-row-value cold-road-old md:ml-auto md:max-w-[44ch]">{r.old}</p>
                      </div>
                      <div aria-hidden className="v2-divider my-5 md:hidden" />
                      <div className="hidden md:block" />
                      <div className="md:pl-4">
                        {r.newVerdict ? (
                          <div>
                            <p className="cold-row-value cold-road-new">None of it.</p>
                            <VerdictLine
                              text="Not less. None."
                              className="v2-display mt-1"
                              style={{ fontSize: "clamp(1.2rem, 2vw, 1.5rem)" }}
                            />
                          </div>
                        ) : (
                          <p className="cold-row-value cold-road-new">{r.new}</p>
                        )}
                        {r.caption && (
                          <p className="mt-2 text-xs leading-relaxed" style={{ color: "var(--v2-faint)" }}>
                            {r.caption}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="cold-wrap">
        {/* the old path frays out after the verdict */}
        <div className="mt-6 flex justify-center md:mt-10" aria-hidden>
          <svg className="cold-fray" width="120" height="70" viewBox="0 0 120 70" fill="none">
            <path d="M30 0 C 28 22, 20 34, 8 46" strokeWidth="1" strokeDasharray="3 6" />
            <path d="M30 0 C 34 20, 30 32, 24 44" strokeWidth="0.75" strokeDasharray="2 8" />
            <path d="M90 0 V 70" stroke="var(--v2-gold)" strokeWidth="2" />
          </svg>
        </div>

        {/* The honesty line — a trust asset; visible, never behind interaction. */}
        <p data-reveal-s5 className="mx-auto mt-8 max-w-[58ch] text-sm leading-relaxed" style={{ color: "var(--v2-faint)" }}>
          The book shows every input — including where the old road still wins, and what it
          costs to get there.
        </p>
        <p data-reveal-s5 className="cold-loop mx-auto mt-8">
          Better on one deposit is not the same as inevitable. What makes it inevitable is
          timing.
        </p>
      </div>
    </section>
  );
}
