"use client";

import { useRef } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function PersonalStake() {
  const sectionRef = useRef<HTMLElement>(null);
  useScrollReveal(sectionRef);

  return (
    <section ref={sectionRef} className="section section-canvas relative">
      <div className="max-w-[760px] mx-auto px-6 md:px-12 text-center relative z-10">
        <p data-reveal className="eyebrow mb-8">Why this matters to you</p>
        <h2
          data-reveal
          className="display-lg text-tp"
          style={{ maxWidth: "20ch", margin: "0 auto" }}
        >
          Inflation is eating your savings.
          <br />
          <span style={{ color: "var(--accent-gold)" }}>Crypto was the escape that didn&rsquo;t work.</span>
        </h2>

        <div
          data-reveal
          className="mt-12 space-y-6 text-ts text-left mx-auto"
          style={{ fontSize: "1.0625rem", lineHeight: 1.75, maxWidth: "62ch" }}
        >
          <p>
            Inflation is grinding through your savings. The world is getting less stable, not more. The hedges you used to trust are doing less of the job every year.
          </p>
          <p>
            Crypto was meant to be the escape. Meme coins. Rug pulls. Nothing real behind them. It burned trust without replacing anything.
          </p>
          <p>
            <span className="text-tp font-semibold">Gold has been a proven safe haven for 6,000 years.</span> Real asset. Real value. The protection people reached for every time fiat broke down. The problem was always access — until now.
          </p>
        </div>

        <div data-reveal className="mt-16 mx-auto relative" style={{ maxWidth: "68ch" }}>
          <div
            className="absolute left-0 top-0 bottom-0 w-[3px] rounded-full"
            style={{ background: "var(--accent-gold)" }}
          />
          <blockquote
            className="pl-10 text-left text-tp italic font-light"
            style={{
              fontSize: "clamp(1.125rem, 1.8vw, 1.5rem)",
              lineHeight: 1.55,
              letterSpacing: "-0.01em",
            }}
          >
            Digital gold mining brings gold into the 21st century by combining it with blockchain — unlocking its value without environmental or social damage, and aligning the oldest asset in the world with how investors actually operate in 2026.
          </blockquote>
        </div>
      </div>
    </section>
  );
}
