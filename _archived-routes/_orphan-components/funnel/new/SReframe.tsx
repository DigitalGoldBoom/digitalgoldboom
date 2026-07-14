"use client";

import { useRef } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useDrawOnEnter } from "./hooks";
import VerdictLine from "./VerdictLine";

/**
 * S2 — THE REFRAME. The proof made physical: a drill core (SVG line art, the
 * code-only base state) beside the copy like evidence. The "$1 billion" fact
 * sits in its own pull-quote tile so skimmers get it even reading nothing else.
 * Verdict line 1 of 4: "The proof carried the price."
 */

function CoreSample({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 160 380"
      fill="none"
      aria-hidden="true"
    >
      {/* core cylinder */}
      <rect
        x="46"
        y="16"
        width="68"
        height="348"
        rx="34"
        stroke="rgba(232,178,58,0.4)"
        strokeWidth="1.5"
        pathLength={1}
        data-draw="stroke"
      />
      {/* the ellipse cap */}
      <ellipse
        cx="80"
        cy="50"
        rx="34"
        ry="12"
        stroke="rgba(232,178,58,0.28)"
        strokeWidth="1"
        pathLength={1}
        data-draw="stroke"
      />
      {/* the gold vein through the rock */}
      <path
        d="M50 120 C 70 150, 62 190, 86 220 S 104 290, 92 330"
        stroke="var(--v2-gold)"
        strokeWidth="2"
        opacity="0.8"
        pathLength={1}
        data-draw="stroke"
      />
      {/* faint strata ticks */}
      <path d="M48 170 H 112" stroke="rgba(255,255,255,0.12)" strokeWidth="1" pathLength={1} data-draw="stroke" />
      <path d="M48 250 H 112" stroke="rgba(255,255,255,0.12)" strokeWidth="1" pathLength={1} data-draw="stroke" />
    </svg>
  );
}

export default function SReframe() {
  const ref = useRef<HTMLElement>(null);
  useScrollReveal(ref, { stagger: 0.06 });
  useDrawOnEnter(ref, { duration: 0.9, stagger: 0.12 });

  const pullQuote = (
    <figure data-reveal className="v2-tile relative overflow-hidden p-6 md:p-7">
      {/* the gold thread passes through the tile's left border */}
      <span
        aria-hidden
        className="absolute bottom-0 left-0 top-0 w-[2px]"
        style={{ background: "linear-gradient(180deg, rgba(232,178,58,0.1), var(--v2-gold), rgba(232,178,58,0.1))" }}
      />
      <blockquote
        className="text-lg leading-relaxed md:text-xl"
        style={{ color: "#F4F4F7", fontWeight: 400 }}
      >
        In 2025, half of one verified Alaskan deposit sold for{" "}
        <span className="v2-gold">$1 billion in cash</span> — no mine on it, nothing in
        production.
      </blockquote>
    </figure>
  );

  return (
    <section id="cold-s2" ref={ref} className="cold-section">
      <div className="cold-wrap">
        <div className="grid grid-cols-1 items-start gap-12 md:grid-cols-[1.15fr_0.85fr] md:gap-16">
          <div>
            <p data-reveal className="v2-eyebrow">Start here</p>
            <h2
              data-reveal
              className="v2-display mt-6"
              style={{ fontSize: "clamp(1.9rem, 4.4vw, 3.4rem)", maxWidth: "18ch" }}
            >
              The digging was never the value. <span className="v2-gold">The proof was.</span>
            </h2>
            <p data-reveal className="cold-body mt-8">
              For six thousand years there was one way to turn gold in the ground into wealth:
              dig it out. Nobody asked whether the digging was the value — or just the delivery.
            </p>
            <p data-reveal className="cold-body mt-5">
              The industry already knows the answer. No serious money touches a gold deposit
              until independent geologists prove the gold is there; banks lend billions against
              that proof.
            </p>

            {/* Phone: the evidence sits exactly where the text would become a wall. */}
            <div className="mt-8 md:hidden">{pullQuote}</div>
            <div data-reveal className="mt-8 flex justify-center md:hidden" aria-hidden>
              <CoreSample className="h-[210px]" />
            </div>

            <div data-reveal className="mt-8">
              <VerdictLine
                text="The proof carried the price."
                className="v2-display"
                style={{ fontSize: "clamp(1.35rem, 2.6vw, 1.9rem)" }}
              />
              <p className="cold-body mt-2">The digging only ever moved the metal.</p>
            </div>

            <p data-reveal className="cold-loop mt-10">
              So if the proof is the value — why does every new ounce still cost a mine?
            </p>
          </div>

          {/* Desktop: core + pull-quote as the evidence column, sticky in view. */}
          <div className="hidden md:block">
            <div className="sticky top-28 flex flex-col items-center gap-10">
              <CoreSample className="h-[340px]" />
              <div className="w-full">{pullQuote}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
