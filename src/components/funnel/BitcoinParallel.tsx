"use client";

import { useRef } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function BitcoinParallel() {
  const sectionRef = useRef<HTMLElement>(null);
  useScrollReveal(sectionRef);

  return (
    <section ref={sectionRef} className="relative py-14 md:py-[88px]">
      <div className="max-w-[900px] mx-auto px-6 md:px-12 text-center relative z-10">
        <h2 data-reveal className="text-tp font-extrabold tracking-[-0.03em] leading-[1.3]" style={{ fontSize: "clamp(2rem, 4.2vw, 3.5rem)" }}>
          The people who made money on Bitcoin<br />
          <span className="text-gold">understood it first.</span>
        </h2>
        <p data-reveal className="mt-10 text-ts leading-[1.75] max-w-[62ch] mx-auto" style={{ fontSize: "clamp(1.05rem, 1.4vw, 1.2rem)" }}>
          Same pattern. Same window. Different asset.
        </p>
        <div className="mt-8 space-y-5 text-ts leading-[1.75] max-w-[62ch] mx-auto text-left" style={{ fontSize: "clamp(1rem, 1.3vw, 1.125rem)" }}>
          <p data-reveal>Gold was money for 6,000 years. Bitcoin was the escape that didn&rsquo;t quite work. Digital gold mining is the step that finally moves the oldest store of value at the speed and reach of the modern one.</p>
          <p data-reveal className="text-tp font-semibold">Gold only gets digitized once. That&rsquo;s the thing to be early to.</p>
        </div>
      </div>
    </section>
  );
}
