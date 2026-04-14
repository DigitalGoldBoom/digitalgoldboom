"use client";

import { useRef } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import SectionImage from "@/components/SectionImage";

const FORCES = [
  { n: "01", title: "Gold is having its moment.", body: "Central banks are buying. Retail is rediscovering it. The oldest store of value is quietly back at the centre of the conversation." },
  { n: "02", title: "Blockchain finally grew up.", body: "Real-world asset tokenization moved from crypto fantasy to where the institutional trillions are actually going." },
  { n: "03", title: "A new generation wants in — without the guilt.", body: "For the first time, gold is available without the extraction, displacement, and environmental cost that locked younger investors out." },
];

export default function Convergence() {
  const sectionRef = useRef<HTMLElement>(null);
  useScrollReveal(sectionRef);

  return (
    <section ref={sectionRef} className="relative py-14 md:py-[88px] overflow-hidden">
      <SectionImage
        src="/images/earth-cubes/earth-cube-global-field.png"
        alt=""
        position="full"
        opacity={0.12}
        parallax={0.4}
      />
      <div className="max-w-[1100px] mx-auto px-6 md:px-12 relative z-10">
        <p data-reveal className="text-[10px] font-semibold tracking-[0.2em] uppercase text-gold mb-6 text-center">THE HALLEY&rsquo;S COMET ALIGNMENT</p>
        <h2 data-reveal className="text-tp font-extrabold tracking-[-0.03em] leading-[1.3] text-center mx-auto" style={{ fontSize: "clamp(2rem, 4.2vw, 3.25rem)" }}>
          Three forces.<br />
          <span className="text-gold">Same window.</span>
        </h2>
        <p data-reveal className="mt-8 text-ts leading-[1.7] text-center max-w-[56ch] mx-auto">
          For the first time in history, three trillion-dollar forces are aligning at once. Most people only see one of them. Until it&rsquo;s too late.
        </p>
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 items-stretch">
          {FORCES.map((f) => (
            <div key={f.n} data-reveal className="border-t border-border pt-8 flex flex-col h-full">
              <span className="font-mono text-gold text-sm tracking-[0.1em]">{f.n}</span>
              <h3 className="mt-4 text-tp font-bold tracking-[-0.015em] leading-[1.2] min-h-[3.2em]" style={{ fontSize: "clamp(1.1rem, 1.6vw, 1.35rem)" }}>{f.title}</h3>
              <p className="mt-3 text-ts leading-[1.65] text-[0.95rem]">{f.body}</p>
            </div>
          ))}
        </div>
        <p data-reveal className="mt-16 text-center text-tp font-semibold max-w-[58ch] mx-auto leading-[1.55]" style={{ fontSize: "clamp(1.05rem, 1.4vw, 1.2rem)" }}>
          When three <span className="text-gold">trillion-dollar</span> forces converge like this — gold, blockchain, and a generation that refuses to trade the planet for their portfolio — the window to <em className="text-gold not-italic">understand</em> it closes faster than the window to act on it.
        </p>
      </div>
    </section>
  );
}
