"use client";

import { useRef } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import SectionImage from "@/components/SectionImage";

export default function PersonalStake() {
  const sectionRef = useRef<HTMLElement>(null);
  useScrollReveal(sectionRef);

  return (
    <section ref={sectionRef} className="relative py-14 md:py-[88px] overflow-hidden">
      <SectionImage
        src="/images/gold land.png"
        alt=""
        position="full"
        opacity={0.1}
        parallax={0.3}
      />
      <div className="max-w-[860px] mx-auto px-6 md:px-12 relative z-10">
        <p data-reveal className="text-[10px] font-semibold tracking-[0.2em] uppercase text-gold mb-6">WHY THIS MATTERS TO YOU</p>
        <h2 data-reveal className="text-tp font-extrabold tracking-[-0.03em] leading-[1.3]" style={{ fontSize: "clamp(2rem, 4.2vw, 3.25rem)" }}>
          Inflation is eating your savings.<br />
          <span className="text-gold">Crypto was supposed to be the escape.</span>
        </h2>
        <div className="mt-10 space-y-6 text-ts leading-[1.75] max-w-[62ch]" style={{ fontSize: "clamp(1rem, 1.3vw, 1.125rem)" }}>
          <p data-reveal>Inflation is grinding through your savings. The world is getting less stable, not more. The hedges you used to trust are doing less of the job every year.</p>
          <p data-reveal>Crypto was meant to be the escape. Meme coins. Rug pulls. Nothing real behind them. It burned trust without replacing anything.</p>
          <p data-reveal><span className="text-tp font-semibold">Gold has been a proven safe haven for 6,000 years.</span> A real asset. Real value. The protection people reached for every time fiat broke down. The problem was always access — until now.</p>
        </div>
        <p data-reveal className="mt-10 max-w-[62ch] text-tp font-semibold leading-[1.55] border-l-2 border-gold pl-6" style={{ fontSize: "clamp(1.05rem, 1.4vw, 1.2rem)" }}>
          Digital gold mining is the access. The 6,000-year safe haven delivered the way crypto promised but never did — real asset, real protection against inflation, tradable anywhere — without the speculation trap and without the planet cost.
        </p>
      </div>
    </section>
  );
}
