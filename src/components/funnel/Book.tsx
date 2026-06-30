"use client";

import { useRef } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import Book3D from "@/components/Book3D";

// Current book = 17 chapters in 2 sections + a closing chapter (Operation
// Condense). Section titles verbatim from the published book PDF. The former
// Section 3 (Cahuilla) and Section 4 moved to Book 2, so they are not shown here.
const SECTIONS = [
  { n: "01", kicker: "Section 01", title: "The Inevitability of Digital Gold Mining", chapters: "Chapters 1–8", body: "Why the old extraction-based gold industry is structurally collapsing — environmental, social, and economic forces shutting it down at the exact moment trillions in verified gold sit untouched in the ground. The case that connecting that value digitally, rather than extracting it, is the inevitable next step." },
  { n: "02", kicker: "Section 02", title: "The NatGold Digital Gold Mining Ecosystem", chapters: "Chapters 9–16", body: "How NatGold Digital actually works. The team, the patents, the verification standards, the approval pipeline, the token economics — and the pre-market demand it has already attracted." },
  { n: "03", kicker: "The closer", title: "The Road Ahead: The Challenges, Answered", chapters: "Chapter 17", body: "The honest reckoning. The nine hardest questions a skeptic would press — can you sell when you want, is the gold really there, what if the company fails — each answered with the same machine the rest of the book builds, and the decision placed in the reader's hands." },
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
          <p data-reveal className="eyebrow mb-5">Two sections · 17 chapters</p>
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
                  {s.kicker}
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
