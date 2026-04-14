"use client";

import { useRef } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useCountUp } from "@/hooks/useCountUp";

export default function Problem() {
  const sectionRef = useRef<HTMLElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);
  useScrollReveal(sectionRef);
  useCountUp(counterRef, {
    to: 22,
    duration: 1.6,
    format: (n) => `$${n.toFixed(1).replace(/\.0$/, "")}T`,
  });

  return (
    <section ref={sectionRef} className="section section-surface relative">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-12 lg:gap-20 items-start">
          {/* LEFT — headline + body */}
          <div>
            <p data-reveal className="eyebrow mb-6">The problem</p>
            <h2 data-reveal className="display-lg text-tp" style={{ maxWidth: "14ch" }}>
              Traditional gold mining is <span style={{ color: "var(--accent-gold)" }}>dying.</span>
            </h2>
            <div
              className="mt-10 space-y-6 text-ts"
              style={{ fontSize: "1.0625rem", lineHeight: 1.75, maxWidth: "56ch" }}
            >
              <p data-reveal>
                Environmental damage. Social displacement. Regulatory scrutiny. Investor flight. The book names six compounding forces the{" "}
                <span className="text-tp font-semibold gold-underline">Extraction S.P.I.R.A.L.&trade;</span> — a gravity well, not a cycle. One by one, the conditions that built the industry are shutting it down.
              </p>
              <p data-reveal>
                The cost the world no longer accepts — environmental, social, regulatory — is the cost the industry can&rsquo;t stop paying. And every year, that cost gets higher.
              </p>
            </div>
          </div>

          {/* RIGHT — giant stat callout card */}
          <div data-reveal className="lg:sticky lg:top-32">
            <div
              className="card-feature"
              style={{
                background: "var(--bg-surface)",
                border: "1px solid var(--border-gold)",
                borderRadius: "var(--r-2xl)",
                padding: "48px 40px",
                boxShadow: "var(--shadow-lg)",
              }}
            >
              <p
                className="eyebrow mb-6"
                style={{ color: "var(--text-tertiary)", fontSize: "10px" }}
              >
                Untouched · Verified · Stranded
              </p>
              <div
                ref={counterRef}
                className="font-mono tabular-nums"
                style={{
                  fontSize: "clamp(4rem, 10vw, 7.5rem)",
                  fontWeight: 300,
                  color: "var(--accent-gold)",
                  lineHeight: 0.9,
                  letterSpacing: "-0.04em",
                }}
              >
                $22T
              </div>
              <p
                className="mt-6 text-tp font-medium"
                style={{ fontSize: "1.125rem", lineHeight: 1.5 }}
              >
                Geologically verified gold in the ground
              </p>
              <p
                className="mt-3 text-tt"
                style={{ fontSize: "0.875rem", lineHeight: 1.6 }}
              >
                Enough to reset the financial order. Locked behind an extraction model the world is walking away from.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
