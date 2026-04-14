"use client";

import { useRef } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const FORCES = [
  {
    n: "01",
    scale: "$13T",
    title: "Gold is having its moment.",
    body: "Central banks are buying. Retail is rediscovering it. The oldest store of value is quietly back at the centre of the conversation.",
  },
  {
    n: "02",
    scale: "$2T",
    title: "Blockchain finally grew up.",
    body: "Real-world asset tokenization moved from crypto fantasy to where the institutional trillions are actually going.",
  },
  {
    n: "03",
    scale: "1.8B",
    title: "A new generation wants in — without the guilt.",
    body: "For the first time, gold is available without the extraction, displacement, and environmental cost that locked younger investors out.",
  },
];

export default function Convergence() {
  const sectionRef = useRef<HTMLElement>(null);
  useScrollReveal(sectionRef);

  return (
    <section ref={sectionRef} className="section section-deep relative overflow-hidden">
      {/* Atmospheric wash */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(1200px 800px at 50% 0%, rgba(202,138,4,0.08), transparent 50%)",
        }}
      />

      <div className="max-w-[1200px] mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center max-w-[760px] mx-auto">
          <p data-reveal className="eyebrow mb-6" style={{ color: "var(--accent-gold)" }}>
            The Halley&rsquo;s Comet alignment
          </p>
          <h2
            data-reveal
            className="display-xl"
            style={{ color: "var(--text-on-dark-primary)", maxWidth: "14ch", margin: "0 auto" }}
          >
            Three forces.
            <br />
            <span style={{ color: "var(--accent-gold)" }}>Same window.</span>
          </h2>
          <p
            data-reveal
            className="mt-8"
            style={{
              color: "var(--text-on-dark-secondary)",
              fontSize: "1.0625rem",
              lineHeight: 1.7,
              maxWidth: "58ch",
              margin: "32px auto 0",
            }}
          >
            For the first time in history, three trillion-dollar forces are aligning at once. Most people only see one of them. Until it&rsquo;s too late.
          </p>
        </div>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {FORCES.map((f) => (
            <article
              key={f.n}
              data-reveal
              className="relative flex flex-col h-full"
              style={{
                background: "rgba(255,255,255,0.04)",
                backdropFilter: "blur(16px)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "var(--r-2xl)",
                padding: "40px 32px",
                boxShadow: "0 12px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.06)",
              }}
            >
              <div
                className="font-mono mb-4"
                style={{
                  fontSize: "11px",
                  letterSpacing: "0.18em",
                  color: "var(--accent-gold)",
                  fontWeight: 600,
                }}
              >
                FORCE {f.n}
              </div>
              <div
                className="font-mono tabular-nums mb-6"
                style={{
                  fontSize: "clamp(2.5rem, 4vw, 3.5rem)",
                  fontWeight: 300,
                  color: "var(--accent-gold)",
                  lineHeight: 0.95,
                  letterSpacing: "-0.03em",
                }}
              >
                {f.scale}
              </div>
              <h3
                style={{
                  color: "var(--text-on-dark-primary)",
                  fontSize: "clamp(1.125rem, 1.6vw, 1.375rem)",
                  fontWeight: 400,
                  lineHeight: 1.25,
                  letterSpacing: "-0.01em",
                  marginBottom: 16,
                }}
              >
                {f.title}
              </h3>
              <p
                style={{
                  color: "var(--text-on-dark-secondary)",
                  fontSize: "0.9375rem",
                  lineHeight: 1.65,
                }}
              >
                {f.body}
              </p>
            </article>
          ))}
        </div>

        <p
          data-reveal
          className="mt-20 text-center mx-auto"
          style={{
            color: "var(--text-on-dark-primary)",
            fontSize: "clamp(1.125rem, 1.6vw, 1.375rem)",
            lineHeight: 1.55,
            maxWidth: "62ch",
            fontWeight: 300,
          }}
        >
          When three{" "}
          <span style={{ color: "var(--accent-gold)", fontWeight: 500 }}>trillion-dollar</span> forces converge like this, the window to{" "}
          <em className="italic" style={{ color: "var(--accent-gold)" }}>
            understand
          </em>{" "}
          it closes faster than the window to act on it.
        </p>
      </div>
    </section>
  );
}
