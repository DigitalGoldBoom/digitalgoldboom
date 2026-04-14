"use client";

import { useRef } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const ITEMS = [
  {
    name: "Digital Gold Boom",
    desc: "The full book. Every stat sourced, every claim traceable, the complete case from top to bottom.",
    value: "$39",
  },
  {
    name: "The Primer",
    desc: "Waitlist-only dummy's guide. The play-by-play of what digital gold mining is and how it works — condensed for one sitting.",
    value: "$99",
  },
  {
    name: "Industry Intelligence Updates",
    desc: "One year of periodic updates as the digital gold mining space evolves — new deposits, new partners, new milestones.",
    value: "$199 / yr",
  },
];

export default function Stack() {
  const sectionRef = useRef<HTMLElement>(null);
  useScrollReveal(sectionRef);

  return (
    <section ref={sectionRef} className="section section-surface relative">
      <div className="max-w-[960px] mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center max-w-[640px] mx-auto">
          <p data-reveal className="eyebrow mb-6">What waitlist members get</p>
          <h2
            data-reveal
            className="display-lg text-tp"
            style={{ maxWidth: "22ch", margin: "0 auto" }}
          >
            <span className="font-mono tabular-nums" style={{ fontWeight: 300 }}>$337</span> of value.
            <br />
            <span style={{ color: "var(--accent-gold)" }}>
              <span className="font-mono tabular-nums" style={{ fontWeight: 300 }}>$0</span> to join.
            </span>
          </h2>
        </div>

        <div
          data-reveal
          className="mt-16 overflow-hidden"
          style={{
            background: "var(--bg-canvas)",
            border: "1px solid var(--border-base)",
            borderRadius: "var(--r-2xl)",
            boxShadow: "var(--shadow-lg)",
          }}
        >
          {ITEMS.map((item, i) => (
            <div
              key={item.name}
              className="flex items-start justify-between gap-8 px-8 md:px-12 py-8 md:py-10"
              style={{
                borderBottom: i < ITEMS.length - 1 ? "1px solid var(--border-base)" : undefined,
              }}
            >
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span
                    className="font-mono"
                    style={{
                      fontSize: "10px",
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      color: "var(--text-tertiary)",
                      fontWeight: 600,
                    }}
                  >
                    Item {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3
                  className="text-tp"
                  style={{
                    fontSize: "clamp(1.125rem, 1.5vw, 1.375rem)",
                    fontWeight: 500,
                    letterSpacing: "-0.01em",
                    lineHeight: 1.25,
                  }}
                >
                  {item.name}
                </h3>
                <p
                  className="mt-3 text-ts"
                  style={{ fontSize: "0.9375rem", lineHeight: 1.6, maxWidth: "60ch" }}
                >
                  {item.desc}
                </p>
              </div>
              <div
                className="font-mono tabular-nums shrink-0 text-right"
                style={{
                  fontSize: "clamp(1.25rem, 1.8vw, 1.625rem)",
                  color: "var(--text-primary)",
                  fontWeight: 300,
                  letterSpacing: "-0.01em",
                }}
              >
                {item.value}
              </div>
            </div>
          ))}

          <div
            className="flex items-center justify-between gap-6 px-8 md:px-12 py-7"
            style={{
              background: "var(--bg-surface-elevated)",
              borderTop: "1px solid var(--border-base)",
            }}
          >
            <span
              className="text-tp"
              style={{ fontSize: "0.9375rem", fontWeight: 500, letterSpacing: "0.01em" }}
            >
              Total value
            </span>
            <span
              className="font-mono tabular-nums text-tt"
              style={{
                fontSize: "1.25rem",
                textDecoration: "line-through",
                fontWeight: 300,
                opacity: 0.7,
              }}
            >
              $337
            </span>
          </div>

          <div
            className="flex items-center justify-between gap-6 px-8 md:px-12 py-9"
            style={{
              background: "linear-gradient(135deg, rgba(202,138,4,0.08), rgba(202,138,4,0.02))",
              borderTop: "1px solid var(--border-gold)",
            }}
          >
            <span
              className="text-tp"
              style={{
                fontSize: "1rem",
                fontWeight: 500,
                letterSpacing: "0.01em",
              }}
            >
              Your price on the waitlist
            </span>
            <span
              className="font-mono tabular-nums"
              style={{
                fontSize: "clamp(2.25rem, 3.5vw, 3rem)",
                color: "var(--accent-gold)",
                fontWeight: 300,
                letterSpacing: "-0.02em",
                lineHeight: 1,
              }}
            >
              $0
            </span>
          </div>
        </div>

        <p
          data-reveal
          className="mt-6 text-center text-tt"
          style={{ fontSize: "0.8125rem" }}
        >
          Free until the book drops. $39 after. No spam.
        </p>
      </div>
    </section>
  );
}
