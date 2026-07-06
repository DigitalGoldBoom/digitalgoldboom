"use client";

import { useRef } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import VerdictLine from "./VerdictLine";

/**
 * S8 — THE HONEST BOOK. The quietest section on the page: near-plain type,
 * one thin gold rule, generous whitespace — the design gets out of the way of
 * the Chocó story. Sincerity by contrast. No portrait (no approved photo
 * asset in the repo; whitespace over decoration — never AI-generate the author).
 * Verdict line 3 of 4. Gold never lands on risk words.
 */
export default function SWitness() {
  const ref = useRef<HTMLElement>(null);
  useScrollReveal(ref, { stagger: 0.1 });

  return (
    <section id="cold-s8" ref={ref} className="cold-section">
      <div className="mx-auto w-full max-w-[62ch] px-6">
        <p data-reveal className="v2-eyebrow">Who wrote it</p>
        <h2
          data-reveal
          className="v2-display mt-6"
          style={{ fontSize: "clamp(1.9rem, 4vw, 3rem)" }}
        >
          Written from inside. It ends on the risks.
        </h2>
        <div
          data-reveal
          aria-hidden
          className="mt-8 h-px w-16"
          style={{ background: "var(--v2-gold)", opacity: 0.7 }}
        />
        <p data-reveal className="cold-body mt-8 !max-w-none">
          Andrew Fletcher was President of Great Eagle Gold — now NatBridge Resources, the first
          gold company built to align with this model — and has assessed hundreds of gold
          projects. In 2020 he walked away from a $30 million gold deal in Colombia after
          standing at the edge of a mercury-contaminated pit where workers, some of them
          teenagers, handled the material without protection. That day is where this book began.
        </p>
        <p data-reveal className="cold-body mt-6 !max-w-none">
          The two companies at the center cannot tell the whole story — one is heads-down
          building it, the other is publicly listed and limited in what it can say. This book is
          the one place it is told start to finish. And the final chapter is the risks: the
          hardest questions a skeptic can ask, stated at full strength, answered — one left
          openly unresolved.
        </p>
        <div data-reveal className="mt-10">
          <VerdictLine
            text="The one thing this book gives you that a pitch never will: the entire downside, in plain view."
            className="v2-display"
            style={{ fontSize: "clamp(1.35rem, 2.6vw, 1.9rem)", lineHeight: 1.25 }}
          />
        </div>
      </div>
    </section>
  );
}
