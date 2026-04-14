"use client";

import { useRef } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useCountUp } from "@/hooks/useCountUp";
import SectionImage from "@/components/SectionImage";

export default function Problem() {
  const sectionRef = useRef<HTMLElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  useScrollReveal(sectionRef);
  useCountUp(counterRef, {
    to: 22,
    duration: 1.4,
    format: (n) => `$${n.toFixed(1).replace(/\.0$/, "")} trillion`,
  });

  return (
    <section ref={sectionRef} className="relative py-14 md:py-[88px] overflow-hidden">
      <SectionImage
        src="/images/earth-cubes/earth-cube-destruction.png"
        alt=""
        position="corner-br"
        opacity={0.22}
        parallax={0.35}
        maxWidth={700}
      />
      <div className="max-w-[860px] mx-auto px-6 md:px-12 relative z-10">
        <p data-reveal className="text-[10px] font-semibold tracking-[0.2em] uppercase text-gold mb-6">THE PROBLEM</p>
        <h2 data-reveal className="text-tp font-extrabold tracking-[-0.03em] leading-[1.3]" style={{ fontSize: "clamp(2rem, 4.2vw, 3.25rem)" }}>
          Traditional gold mining is dying.
        </h2>
        <div className="mt-10 space-y-6 text-ts leading-[1.75] max-w-[62ch]" style={{ fontSize: "clamp(1rem, 1.3vw, 1.125rem)" }}>
          <p data-reveal>Environmental damage. Social displacement. Regulatory scrutiny. Investor flight. Six compounding forces the book names the <span className="text-tp font-semibold spiral-underline">Extraction S.P.I.R.A.L.&trade;</span> — a gravity well, not a cycle. One by one, the conditions that built the industry are shutting it down.</p>
          <p data-reveal>
            Meanwhile,{" "}
            <span className="text-tp font-semibold">
              <span ref={counterRef}>$22 trillion</span> of geologically verified gold
            </span>{" "}
            sits in the ground — and the industry can&rsquo;t reach it without paying a cost the world no longer accepts.
          </p>
        </div>
      </div>
      <style jsx>{`
        .spiral-underline {
          background-image: linear-gradient(to right, rgba(212, 168, 67, 0.6), rgba(212, 168, 67, 0.6));
          background-size: 100% 2px;
          background-repeat: no-repeat;
          background-position: 0 100%;
          padding-bottom: 2px;
        }
      `}</style>
    </section>
  );
}
