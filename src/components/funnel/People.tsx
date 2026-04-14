"use client";

import { useRef } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import SectionImage from "@/components/SectionImage";

const PEOPLE = [
  { role: "Former Chief of Staff", org: "U.S. Securities and Exchange Commission" },
  { role: "Former Counsel", org: "U.S. Commodity Futures Trading Commission" },
  { role: "Ex Mining Executive", org: "Barrick Gold · BHP" },
];

export default function People() {
  const sectionRef = useRef<HTMLElement>(null);
  useScrollReveal(sectionRef);

  return (
    <section ref={sectionRef} className="relative py-14 md:py-20 overflow-hidden">
      <SectionImage
        src="/images/concept/geologist.jpg"
        alt=""
        position="full"
        opacity={0.08}
        parallax={0.25}
      />
      <div className="max-w-[1100px] mx-auto px-6 md:px-12 relative z-10">
        <p data-reveal className="text-[10px] font-semibold tracking-[0.2em] uppercase text-gold mb-6 text-center">WHO&rsquo;S BEHIND IT</p>
        <h2 data-reveal className="text-tp font-extrabold tracking-[-0.03em] leading-[1.3] text-center max-w-[22ch] mx-auto" style={{ fontSize: "clamp(1.8rem, 3.6vw, 2.75rem)" }}>
          Built by people who built<br />
          <span className="text-gold">the old system.</span>
        </h2>
        <p data-reveal className="mt-8 text-ts leading-[1.7] text-center max-w-[58ch] mx-auto" style={{ fontSize: "clamp(1rem, 1.3vw, 1.125rem)" }}>
          This isn&rsquo;t a crypto-anon project. It&rsquo;s being built by people retail investors already quietly <span className="text-tp font-semibold">trust</span> every day.
        </p>
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-stretch">
          {PEOPLE.map((p) => (
            <div key={p.org} data-reveal className="border-t border-border pt-8 flex flex-col h-full text-center">
              <p className="text-tp font-bold tracking-[-0.015em] min-h-[2.6em] flex items-start justify-center" style={{ fontSize: "clamp(1.05rem, 1.4vw, 1.2rem)" }}>{p.role}</p>
              <p className="mt-3 text-tt text-[0.9rem] leading-[1.5] min-h-[3em]">{p.org}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
