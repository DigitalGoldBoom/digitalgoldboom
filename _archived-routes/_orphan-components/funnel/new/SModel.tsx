"use client";

import { useRef } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useDrawOnEnter } from "./hooks";

/**
 * S4 — THE SECOND ROAD. The gold thread FORKS here (old road / new road) and
 * the three steps deal over each other on desktop (CSS sticky — zero JS,
 * perfect degradation). Phone: plain stacked cards (long pins break thumb
 * rhythm). Icons are code-only SVG line art that draws itself in — no AI icons.
 */

function IconVerify() {
  return (
    <svg width="56" height="56" viewBox="0 0 56 56" fill="none" aria-hidden="true">
      {/* drill core with check geometry */}
      <rect x="20" y="6" width="16" height="36" rx="8" stroke="var(--v2-gold)" strokeWidth="1.5" pathLength={1} data-draw="stroke" />
      <path d="M18 48 L 26 54 L 40 40" stroke="var(--v2-gold)" strokeWidth="1.5" pathLength={1} data-draw="stroke" />
    </svg>
  );
}
function IconCertify() {
  return (
    <svg width="56" height="56" viewBox="0 0 56 56" fill="none" aria-hidden="true">
      {/* three-seal ring — the unanimous committee */}
      <circle cx="28" cy="20" r="12" stroke="var(--v2-gold)" strokeWidth="1.5" pathLength={1} data-draw="stroke" />
      <circle cx="20" cy="34" r="12" stroke="var(--v2-gold)" strokeWidth="1.5" opacity="0.7" pathLength={1} data-draw="stroke" />
      <circle cx="36" cy="34" r="12" stroke="var(--v2-gold)" strokeWidth="1.5" opacity="0.7" pathLength={1} data-draw="stroke" />
    </svg>
  );
}
function IconTokenize() {
  return (
    <svg width="56" height="56" viewBox="0 0 56 56" fill="none" aria-hidden="true">
      {/* token disc above layered rock strata */}
      <circle cx="28" cy="14" r="9" stroke="var(--v2-gold)" strokeWidth="1.5" pathLength={1} data-draw="stroke" />
      <path d="M28 23 V 34" stroke="var(--v2-gold)" strokeWidth="1.5" pathLength={1} data-draw="stroke" />
      <path d="M10 38 H 46" stroke="rgba(232,178,58,0.7)" strokeWidth="1.5" pathLength={1} data-draw="stroke" />
      <path d="M13 44 H 43" stroke="rgba(232,178,58,0.45)" strokeWidth="1.5" pathLength={1} data-draw="stroke" />
      <path d="M16 50 H 40" stroke="rgba(232,178,58,0.25)" strokeWidth="1.5" pathLength={1} data-draw="stroke" />
    </svg>
  );
}

const STEPS = [
  {
    n: "01",
    verb: "VERIFY.",
    icon: <IconVerify />,
    body: "Independent geologists prove the gold exists, to the same reporting standards banks already lend billions against.",
  },
  {
    n: "02",
    verb: "CERTIFY.",
    icon: <IconCertify />,
    body: "An approval process built to reject, not rubber-stamp: independent technical and legal checks, an on-site inspection, a re-count of the gold, and a three-specialist committee that must vote yes unanimously. One no ends it.",
  },
  {
    n: "03",
    verb: "TOKENIZE.",
    icon: <IconTokenize />,
    body: "The verified ounces become digital tokens — NatGold Tokens (“NATG”) — while the metal stays where geology left it.",
    close: "Vaulted in the ground. Never mined.",
  },
];

export default function SModel() {
  const ref = useRef<HTMLElement>(null);
  useScrollReveal(ref, { stagger: 0.08 });
  useDrawOnEnter(ref, { duration: 0.6, stagger: 0.1 });

  return (
    <section id="cold-s4" ref={ref} className="cold-section">
      <div className="cold-wrap">
        {/* The fork: the thread splits into the two roads. */}
        <div className="mb-10 flex justify-center" aria-hidden>
          <svg width="160" height="90" viewBox="0 0 160 90" fill="none">
            <path d="M80 0 V 28" stroke="var(--v2-gold)" strokeWidth="1.5" pathLength={1} data-draw="stroke" />
            {/* old road — thin, grey-gold */}
            <path d="M80 28 C 60 44, 44 58, 36 90" stroke="rgba(232,178,58,0.35)" strokeWidth="1" pathLength={1} data-draw="stroke" />
            {/* new road — full gold, straight */}
            <path d="M80 28 C 96 44, 110 58, 118 90" stroke="var(--v2-gold)" strokeWidth="2" pathLength={1} data-draw="stroke" />
          </svg>
        </div>

        <p data-reveal className="v2-eyebrow">The model</p>
        <h2
          data-reveal
          className="v2-display mt-6"
          style={{ fontSize: "clamp(1.9rem, 4.4vw, 3.4rem)", maxWidth: "16ch" }}
        >
          The value moves. <span className="v2-gold">The gold doesn’t.</span>
        </h2>
        <p data-reveal className="cold-body mt-8">
          A new model — digital gold mining — stops at the proof. Three steps.
        </p>

        {/* The deck: sticky stack on desktop, plain stack on phone. Semantically an ordered list. */}
        <ol className="mt-12 grid list-none grid-cols-1 gap-6 md:gap-10">
          {STEPS.map((s) => (
            <li key={s.n} className="cold-deck-item">
              <div className="cold-step-card mx-auto max-w-[680px] p-7 md:p-10" data-reveal>
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <div className="v2-num" style={{ color: "var(--v2-gold)" }}>
                      STEP {s.n}
                    </div>
                    <h3
                      className="v2-display mt-4"
                      style={{ fontSize: "clamp(1.5rem, 2.6vw, 2rem)", letterSpacing: "0.02em" }}
                    >
                      {s.verb}
                    </h3>
                  </div>
                  <div className="shrink-0">{s.icon}</div>
                </div>
                <p className="cold-body mt-5">{s.body}</p>
                {s.close && (
                  <p
                    className="mt-5"
                    style={{ fontSize: "clamp(1.2rem, 2vw, 1.5rem)", fontWeight: 400, color: "#F4F4F7" }}
                  >
                    {s.close}
                  </p>
                )}
              </div>
            </li>
          ))}
        </ol>

        <p data-reveal className="cold-body mx-auto mt-12 max-w-[680px]">
          The proof, not the metal, is what moves. The book teaches every step in plain English —
          and what the model does and does not promise.
        </p>
        <p data-reveal className="cold-loop mx-auto mt-8 max-w-[680px]">
          Explained is not proven. So the book runs the test: both models, same deposit, same
          gold, same price.
        </p>
      </div>
    </section>
  );
}
