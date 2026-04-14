"use client";

import { useRef } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const PEOPLE = [
  {
    role: "Former Chief of Staff",
    org: "U.S. Securities and Exchange Commission",
    tag: "SEC",
    detail: "Drafted enforcement policy for emerging-asset classifications.",
  },
  {
    role: "Former Counsel",
    org: "U.S. Commodity Futures Trading Commission",
    tag: "CFTC",
    detail: "Architected the regulatory framework for commodity-backed digital assets.",
  },
  {
    role: "Ex Mining Executive",
    org: "Barrick Gold · BHP",
    tag: "Barrick · BHP",
    detail: "Ran exploration programs on the world's largest gold and mineral portfolios.",
  },
];

export default function People() {
  const sectionRef = useRef<HTMLElement>(null);
  useScrollReveal(sectionRef);

  return (
    <section ref={sectionRef} className="section section-surface relative overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center max-w-[740px] mx-auto">
          <p data-reveal className="eyebrow mb-6">Who&rsquo;s behind it</p>
          <h2
            data-reveal
            className="display-lg text-tp"
            style={{ maxWidth: "20ch", margin: "0 auto" }}
          >
            Built by people who built <span style={{ color: "var(--accent-gold)" }}>the old system.</span>
          </h2>
          <p
            data-reveal
            className="mt-8 text-ts"
            style={{ fontSize: "1.0625rem", lineHeight: 1.7, maxWidth: "58ch", margin: "32px auto 0" }}
          >
            This isn&rsquo;t a crypto-anon project. It&rsquo;s being built by people retail investors already quietly <span className="text-tp font-semibold">trust</span> every day.
          </p>
        </div>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {PEOPLE.map((p) => (
            <article
              key={p.org}
              data-reveal
              className="group flex flex-col h-full"
              style={{
                background: "var(--bg-canvas)",
                border: "1px solid var(--border-base)",
                borderRadius: "var(--r-xl)",
                padding: "36px 32px",
                boxShadow: "var(--shadow-sm)",
                transition: "transform 240ms, box-shadow 240ms, border-color 240ms",
              }}
            >
              <div
                className="inline-flex items-center gap-2 mb-8 self-start"
                style={{
                  background: "var(--accent-gold-wash)",
                  border: "1px solid var(--border-gold)",
                  padding: "6px 12px",
                  borderRadius: "var(--r-sm)",
                }}
              >
                <span
                  className="font-mono"
                  style={{
                    fontSize: "10px",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "var(--accent-gold)",
                    fontWeight: 600,
                  }}
                >
                  {p.tag}
                </span>
              </div>

              <h3
                className="text-tp"
                style={{
                  fontSize: "clamp(1.25rem, 1.6vw, 1.5rem)",
                  fontWeight: 400,
                  letterSpacing: "-0.01em",
                  lineHeight: 1.25,
                  marginBottom: 10,
                }}
              >
                {p.role}
              </h3>
              <p
                className="text-tt font-mono"
                style={{ fontSize: "0.8125rem", letterSpacing: "0.02em", marginBottom: 20 }}
              >
                {p.org}
              </p>
              <div
                className="mt-auto pt-6 text-ts"
                style={{
                  fontSize: "0.875rem",
                  lineHeight: 1.6,
                  borderTop: "1px solid var(--border-base)",
                }}
              >
                {p.detail}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
