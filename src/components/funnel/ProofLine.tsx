"use client";

import { useRef } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const STATS = [
  { v: "$469M", l: "Reserved", c: "Pre-market token reservations before a single public listing." },
  { v: "17,466", l: "Investors", c: "Real people who put real capital behind the model." },
  { v: "162", l: "Countries", c: "Global reach without a single paid advertisement." },
  { v: "10", l: "Patents", c: "Patents pending on the origination process itself." },
  { v: "7yr", l: "Built", c: "Seven years spent building the system before going public." },
];

export default function ProofLine() {
  const sectionRef = useRef<HTMLElement>(null);
  useScrollReveal(sectionRef);

  return (
    <section ref={sectionRef} className="section section-canvas relative overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 relative z-10">
        {/* Header block */}
        <div className="text-center max-w-[780px] mx-auto">
          <p data-reveal className="eyebrow mb-6">
            Pre-market token reservations &amp; milestones
          </p>
          <h2
            data-reveal
            className="display-lg text-tp"
            style={{ maxWidth: "22ch", margin: "0 auto" }}
          >
            The numbers behind a category that hasn&rsquo;t gone{" "}
            <span style={{ color: "var(--accent-gold)" }}>public yet.</span>
          </h2>
        </div>

        {/* Data dashboard — 5-col stat grid with vertical dividers */}
        <div
          data-reveal
          className="mt-20 relative"
          style={{
            background: "var(--bg-surface)",
            borderRadius: "var(--r-2xl)",
            border: "1px solid var(--border-base)",
            boxShadow: "var(--shadow-lg)",
            overflow: "hidden",
          }}
        >
          {/* Terminal-style header bar */}
          <div
            className="flex items-center justify-between px-6 py-4"
            style={{
              borderBottom: "1px solid var(--border-base)",
              background: "var(--bg-surface-elevated)",
            }}
          >
            <div
              className="font-mono flex items-center gap-3"
              style={{ fontSize: "11px", color: "var(--text-tertiary)", letterSpacing: "0.1em" }}
            >
              <span
                className="inline-block w-2 h-2 rounded-full"
                style={{ background: "var(--accent-gold)" }}
              />
              <span>LIVE · VERIFIED</span>
            </div>
            <div
              className="font-mono"
              style={{ fontSize: "11px", color: "var(--text-tertiary)", letterSpacing: "0.08em" }}
            >
              NatGold Digital Pre-Market
            </div>
          </div>

          {/* Stat grid */}
          <div className="grid grid-cols-2 md:grid-cols-5">
            {STATS.map((s, i) => (
              <div
                key={s.l}
                className="flex flex-col justify-between gap-5 px-6 py-10 md:py-14 md:px-8"
                style={{
                  borderRight:
                    i < STATS.length - 1 ? "1px solid var(--border-base)" : undefined,
                  borderBottom: i < 4 ? "1px solid var(--border-base)" : undefined,
                }}
              >
                <div>
                  <div
                    className="font-mono tabular-nums whitespace-nowrap"
                    style={{
                      fontSize: "clamp(2rem, 4vw, 3.25rem)",
                      fontWeight: 300,
                      color: "var(--accent-gold)",
                      lineHeight: 0.95,
                      letterSpacing: "-0.025em",
                    }}
                  >
                    {s.v}
                  </div>
                  <div
                    className="mt-4 font-mono"
                    style={{
                      fontSize: "10px",
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      color: "var(--text-tertiary)",
                      fontWeight: 600,
                    }}
                  >
                    {s.l}
                  </div>
                </div>
                <p className="text-ts" style={{ fontSize: "0.8125rem", lineHeight: 1.55 }}>
                  {s.c}
                </p>
              </div>
            ))}
          </div>
        </div>

        <p
          data-reveal
          className="mt-10 text-center text-tt"
          style={{ fontSize: "0.8125rem", maxWidth: "58ch", margin: "40px auto 0" }}
        >
          Every figure traces to NatGold Digital&rsquo;s public pre-market reservation timeline. Independently verifiable on request.
        </p>
      </div>
    </section>
  );
}
