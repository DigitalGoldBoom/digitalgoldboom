"use client";

import { useRef } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import SectionImage from "@/components/SectionImage";
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
    <section ref={sectionRef} className="relative py-14 md:py-[88px] overflow-hidden">
      <SectionImage
        src="/images/earth-cubes/earth-cube-regeneration.png"
        alt=""
        position="corner-tl"
        opacity={0.14}
        parallax={0.32}
        maxWidth={720}
      />
      <div className="max-w-[1100px] mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-12 lg:gap-14 items-center">
          <div data-reveal className="flex justify-center order-2 lg:order-1">
            <Book3D />
          </div>
          <div className="text-center lg:text-left max-w-[640px] mx-auto lg:mx-0 order-1 lg:order-2">
            <p data-reveal className="text-[10px] font-semibold tracking-[0.2em] uppercase text-gold mb-6">THE BOOK</p>
            <h2 data-reveal className="text-tp font-extrabold tracking-[-0.035em] leading-[1.3]" style={{ fontSize: "clamp(2.2rem, 4.8vw, 3.75rem)" }}>Digital Gold Boom.</h2>
            <p data-reveal className="mt-6 text-gold font-extrabold tracking-[0.05em] uppercase" style={{ fontSize: "clamp(1rem, 1.6vw, 1.35rem)" }}>Tell all. Nothing held back.</p>
            <p data-reveal className="mt-8 text-ts leading-[1.7]" style={{ fontSize: "clamp(1.05rem, 1.4vw, 1.2rem)" }}>
              Written by <span className="text-tp font-semibold">Andrew Fletcher</span> — former President of Great Eagle Gold Corp, now NatBridge Resources, which signed the first NatGold supply agreement.
            </p>
            <p data-reveal className="mt-6 text-tp font-semibold" style={{ fontSize: "clamp(1.05rem, 1.4vw, 1.2rem)" }}>
              Once you see it, you can&rsquo;t unsee it. <span className="text-gold">It just makes sense.</span>
            </p>
          </div>
        </div>
        <div className="mt-20">
          <p data-reveal className="text-[10px] font-semibold tracking-[0.2em] uppercase text-gold mb-4 text-center">FOUR SECTIONS · 23 CHAPTERS</p>
          <h3 data-reveal className="text-tp font-bold tracking-[-0.025em] leading-[1.15] text-center max-w-[24ch] mx-auto" style={{ fontSize: "clamp(1.4rem, 2.6vw, 2rem)" }}>One complete case, end to end.</h3>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {SECTIONS.map((s) => (
              <div key={s.n} data-reveal className="border border-border rounded-lg p-8 md:p-10 bg-[#0E0E14]">
                <div className="flex items-baseline justify-between gap-4 mb-4">
                  <span className="font-mono text-gold text-sm tracking-[0.1em]">SECTION {s.n}</span>
                  <span className="font-mono text-tt text-[10px] tracking-[0.1em] uppercase">{s.chapters}</span>
                </div>
                <h4 className="text-tp font-bold tracking-[-0.02em] leading-[1.15]" style={{ fontSize: "clamp(1.15rem, 1.85vw, 1.5rem)" }}>{s.title}</h4>
                <p className="mt-4 text-ts leading-[1.65] text-[0.95rem]">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
