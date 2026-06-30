"use client";

import { useRef } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function BitcoinParallel() {
  const sectionRef = useRef<HTMLElement>(null);
  useScrollReveal(sectionRef);

  return (
    <section ref={sectionRef} className="section section-dark relative overflow-hidden">
      <div className="max-w-[1100px] mx-auto px-6 md:px-12 relative z-10">
        <p data-reveal className="eyebrow mb-6" style={{ color: "var(--accent-gold)" }}>
          The early-adopter question
        </p>

        {/* Asymmetric: oversized headline left, supporting line right. */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.85fr] gap-8 lg:gap-16 lg:items-end">
          <h2
            data-reveal
            className="display-xl"
            style={{ color: "var(--text-on-dark-primary)", maxWidth: "14ch", fontWeight: 300 }}
          >
            Gold was money for <span style={{ color: "var(--accent-gold)" }}>6,000 years.</span>
          </h2>
          <p
            data-reveal
            style={{
              color: "var(--text-on-dark-secondary)",
              fontSize: "clamp(1.0625rem, 1.4vw, 1.25rem)",
              lineHeight: 1.7,
              maxWidth: "52ch",
            }}
          >
            Bitcoin was the escape that didn&rsquo;t quite work. Digital gold mining is the step that finally moves the oldest store of value at the speed and reach of the modern one.
          </p>
        </div>

        {/* Pull-quote with a gold accent bar (matches the Solution card's accent) — not a centered box. */}
        <div data-reveal className="mt-16 relative" style={{ paddingLeft: "clamp(20px, 4vw, 28px)" }}>
          <span
            aria-hidden
            className="absolute left-0 top-1 bottom-1"
            style={{ width: 3, borderRadius: 999, background: "var(--accent-gold)" }}
          />
          <p
            style={{
              color: "var(--text-on-dark-primary)",
              fontSize: "clamp(1.5rem, 2.8vw, 2.25rem)",
              lineHeight: 1.3,
              fontWeight: 300,
              letterSpacing: "-0.015em",
              maxWidth: "26ch",
            }}
          >
            Gold only gets digitized <em className="italic" style={{ color: "var(--accent-gold)" }}>once.</em> That&rsquo;s the thing to be early to.
          </p>
        </div>
      </div>
    </section>
  );
}
