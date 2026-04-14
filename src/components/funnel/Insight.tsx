"use client";

import { useRef } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function Insight() {
  const sectionRef = useRef<HTMLElement>(null);
  useScrollReveal(sectionRef);

  return (
    <section ref={sectionRef} className="section section-canvas relative">
      <div className="max-w-[960px] mx-auto px-6 md:px-12 relative z-10 text-center">
        <p data-reveal className="eyebrow mb-8">The reframe</p>
        <h2
          data-reveal
          className="display-xl text-tp"
          style={{ maxWidth: "18ch", margin: "0 auto" }}
        >
          Gold mining <em className="italic font-light" style={{ color: "var(--accent-gold)" }}>already</em> runs on
          <br />
          verification, not extraction.
        </h2>

        <div
          data-reveal
          className="mt-14 text-ts text-left mx-auto"
          style={{ fontSize: "1.0625rem", lineHeight: 1.75, maxWidth: "58ch" }}
        >
          <p>
            <span className="text-tp font-semibold">No billion-dollar gold investment happens without geological verification first.</span> Every major mine, every institutional portfolio, every deposit that ever made it into the system started with a geologist proving the gold exists.
          </p>
          <p className="mt-5">
            Verification is the backbone. Extraction is the part everyone <em className="text-tp not-italic font-semibold">assumed</em> was non-negotiable.
          </p>
        </div>

        <p
          data-reveal
          className="mt-14 display-md text-tp inline-block"
          style={{ fontWeight: 400, letterSpacing: "-0.01em" }}
        >
          It isn&rsquo;t. <span style={{ color: "var(--accent-gold)" }}>Not anymore.</span>
        </p>
      </div>
    </section>
  );
}
