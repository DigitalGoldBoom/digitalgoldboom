"use client";

import { useRef } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import Book3D from "@/components/Book3D";

const SECTIONS = [
  { n: "01", title: "Why Gold No Longer Needs Mining", chapters: "Chapters 1–8 · The Inevitability Case", body: "Why the old extraction-based gold industry is structurally collapsing — environmental, social, and economic forces shutting it down at the exact moment trillions in verified gold sit untouched in the ground." },
  { n: "02", title: "The NatGold Digital Mining Ecosystem", chapters: "Chapters 9–16 · How It Works", body: "How NatGold Digital actually works. The team, the patents, the verification standards, the approval pipeline, the token economics — and the pre-market demand it has already attracted." },
  { n: "03", title: "The $1B Case Study: Cahuilla Gold Project", chapters: "Chapters 17–19 · Proof of Concept", body: "The first real deposit through the pipeline. The transaction details, the players, the financial and environmental scorecard — theory replaced with a real-world transaction." },
  { n: "04", title: "The Opportunity, Risks & Future", chapters: "Chapters 20–23 · What to Do Next", body: "An honest risk register, the investment options that exist today, a 10-year forecast, and the structural parallel between digital gold mining and the EV transition of the last decade." },
];

export default function Book() {
  const sectionRef = useRef<HTMLElement>(null);
  useScrollReveal(sectionRef);

  return (
    <section ref={sectionRef} className="section section-canvas relative overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 relative z-10">
        {/* Top split — Book3D + byline */}
        <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-12 lg:gap-20 items-center">
          <div data-reveal className="flex justify-center order-2 lg:order-1">
            <Book3D />
          </div>
          <div className="text-center lg:text-left max-w-[640px] mx-auto lg:mx-0 order-1 lg:order-2">
            <p data-reveal className="eyebrow mb-6">The book</p>
            <h2
              data-reveal
              className="display-xl text-tp"
              style={{ maxWidth: "14ch" }}
            >
              Digital Gold Boom.
            </h2>
            <p
              data-reveal
              className="mt-5"
              style={{
                color: "var(--accent-gold)",
                fontSize: "clamp(1rem, 1.4vw, 1.25rem)",
                fontWeight: 500,
                letterSpacing: "0.02em",
              }}
            >
              Tell all. Nothing held back.
            </p>
            <p
              data-reveal
              className="mt-10 text-ts"
              style={{ fontSize: "1.0625rem", lineHeight: 1.7 }}
            >
              Written by <span className="text-tp font-semibold">Andrew Fletcher</span> — former President of Great Eagle Gold Corp, now NatBridge Resources, which signed the first NatGold supply agreement.
            </p>
            <p
              data-reveal
              className="mt-6 italic font-light text-tp"
              style={{
                fontSize: "clamp(1.0625rem, 1.5vw, 1.25rem)",
                lineHeight: 1.55,
                letterSpacing: "-0.005em",
              }}
            >
              Once you see it, you can&rsquo;t unsee it. <span style={{ color: "var(--accent-gold)", fontStyle: "normal", fontWeight: 500 }}>It just makes sense.</span>
            </p>
          </div>
        </div>

        {/* Section divider */}
        <div
          className="my-20 relative"
          style={{
            height: 1,
            background: "linear-gradient(90deg, transparent, var(--border-base), transparent)",
          }}
        />

        {/* Chapter breakdown */}
        <div className="text-center mb-14">
          <p data-reveal className="eyebrow mb-5">Four sections · 23 chapters</p>
          <h3
            data-reveal
            className="display-md text-tp"
            style={{ maxWidth: "26ch", margin: "0 auto", fontWeight: 300 }}
          >
            One complete case, end to end.
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {SECTIONS.map((s) => (
            <article
              key={s.n}
              data-reveal
              style={{
                background: "var(--bg-surface)",
                border: "1px solid var(--border-base)",
                borderRadius: "var(--r-xl)",
                padding: "36px 32px",
                boxShadow: "var(--shadow-sm)",
                transition: "transform 240ms, box-shadow 240ms, border-color 240ms",
              }}
            >
              <div className="flex items-baseline justify-between gap-4 mb-5">
                <span
                  className="font-mono"
                  style={{
                    color: "var(--accent-gold)",
                    fontSize: "11px",
                    letterSpacing: "0.18em",
                    fontWeight: 600,
                    textTransform: "uppercase",
                  }}
                >
                  Section {s.n}
                </span>
                <span
                  className="font-mono text-tt"
                  style={{ fontSize: "10px", letterSpacing: "0.08em" }}
                >
                  {s.chapters}
                </span>
              </div>
              <h4
                className="text-tp"
                style={{
                  fontSize: "clamp(1.25rem, 1.8vw, 1.5rem)",
                  fontWeight: 500,
                  letterSpacing: "-0.01em",
                  lineHeight: 1.2,
                  marginBottom: 16,
                }}
              >
                {s.title}
              </h4>
              <p className="text-ts" style={{ fontSize: "0.9375rem", lineHeight: 1.65 }}>
                {s.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
