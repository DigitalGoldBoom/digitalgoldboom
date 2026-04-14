"use client";

import { useRef } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import SectionImage from "@/components/SectionImage";

export default function Insight() {
  const sectionRef = useRef<HTMLElement>(null);
  useScrollReveal(sectionRef);

  return (
    <section ref={sectionRef} className="relative py-14 md:py-[88px] overflow-hidden">
      <SectionImage
        src="/images/earth-cubes/earth-cube-verification.png"
        alt=""
        position="corner-tl"
        opacity={0.2}
        parallax={0.3}
        maxWidth={680}
      />
      <div className="max-w-[860px] mx-auto px-6 md:px-12 relative z-10">
        <p data-reveal className="text-[10px] font-semibold tracking-[0.2em] uppercase text-gold mb-6">THE REFRAME</p>
        <h2 data-reveal className="text-tp font-extrabold tracking-[-0.03em] leading-[1.3]" style={{ fontSize: "clamp(2rem, 4.2vw, 3.25rem)" }}>
          Gold mining <span className="italic font-extrabold insight-glow">already</span> runs on<br />
          <span className="text-gold">verification, not extraction.</span>
        </h2>
        <div className="mt-10 space-y-6 text-ts leading-[1.75] max-w-[62ch]" style={{ fontSize: "clamp(1rem, 1.3vw, 1.125rem)" }}>
          <p data-reveal><span className="text-tp font-semibold">No billion-dollar gold investment happens without geological verification first.</span> Every major mine, every institutional portfolio, every deposit that ever made it into the system started with a geologist proving the gold exists.</p>
          <p data-reveal>Verification is the backbone. Extraction is the part everyone <em className="text-tp not-italic font-semibold">assumed</em> was non-negotiable.</p>
          <p data-reveal className="text-tp font-semibold border-l-2 border-gold pl-6">It isn&rsquo;t. Not anymore.</p>
        </div>
      </div>
      <style jsx>{`
        .insight-glow {
          color: #D4A843;
          text-shadow: 0 0 24px rgba(212, 168, 67, 0.45);
        }
      `}</style>
    </section>
  );
}
