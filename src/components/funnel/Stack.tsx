"use client";

import { useRef } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const ITEMS = [
  { name: "Digital Gold Boom", desc: "The full book. Every stat sourced, every claim traceable, the complete case from top to bottom.", value: "$39" },
  { name: "Industry Intelligence Updates", desc: "One year of periodic updates as the digital gold mining space evolves — new deposits, new partners, new milestones.", value: "$199 / yr" },
];

export default function Stack() {
  const sectionRef = useRef<HTMLElement>(null);
  useScrollReveal(sectionRef);

  return (
    <section ref={sectionRef} className="relative py-14 md:py-[88px]">
      <div className="max-w-[900px] mx-auto px-6 md:px-12 relative z-10">
        <p data-reveal className="text-[10px] font-semibold tracking-[0.2em] uppercase text-gold mb-4 text-center">WHAT WAITLIST MEMBERS GET</p>
        <h2 data-reveal className="text-tp font-extrabold tracking-[-0.03em] leading-[1.3] text-center max-w-[22ch] mx-auto" style={{ fontSize: "clamp(1.8rem, 3.8vw, 3rem)" }}>$238 of value. $0 to join.</h2>
        <div data-reveal className="mt-14 border border-border rounded-lg overflow-hidden">
          {ITEMS.map((item, i) => (
            <div key={item.name} data-reveal className={`p-8 md:p-10 flex items-start justify-between gap-6 ${i !== ITEMS.length - 1 ? "border-b border-border" : ""}`}>
              <div className="flex-1">
                <h3 className="text-tp font-bold text-lg md:text-xl tracking-[-0.015em]">{item.name}</h3>
                <p className="mt-2 text-ts text-[0.95rem] leading-[1.6]">{item.desc}</p>
              </div>
              <span className="font-mono text-gold text-lg md:text-xl tabular-nums shrink-0">{item.value}</span>
            </div>
          ))}
          <div data-reveal className="bg-[#0E0E14] p-8 md:p-10 flex items-center justify-between gap-6 border-t border-border">
            <span className="text-tp font-bold text-lg md:text-xl">Total value</span>
            <span className="font-mono text-tp text-lg md:text-xl tabular-nums line-through opacity-60">$238</span>
          </div>
          <div data-reveal className="bg-[#0E0E14] p-8 md:p-10 flex items-center justify-between gap-6 border-t border-border">
            <span className="text-gold font-bold text-lg md:text-xl">Waitlist price</span>
            <span className="font-mono text-gold text-2xl md:text-3xl tabular-nums font-semibold">$0</span>
          </div>
        </div>
        <p data-reveal className="mt-6 text-center text-tt text-xs">Free until the book drops. $39 after. No spam.</p>
      </div>
    </section>
  );
}
