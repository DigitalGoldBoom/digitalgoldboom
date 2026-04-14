"use client";

import { useRef } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function BitcoinParallel() {
  const sectionRef = useRef<HTMLElement>(null);
  useScrollReveal(sectionRef);

  return (
    <section ref={sectionRef} className="section section-dark relative overflow-hidden">
      <div className="max-w-[1100px] mx-auto px-6 md:px-12 relative z-10 text-center">
        <p data-reveal className="eyebrow mb-6" style={{ color: "var(--accent-gold)" }}>
          The early-adopter question
        </p>
        <h2
          data-reveal
          className="display-xl"
          style={{
            color: "var(--text-on-dark-primary)",
            maxWidth: "22ch",
            margin: "0 auto",
            fontWeight: 300,
          }}
        >
          Gold was money for <span style={{ color: "var(--accent-gold)" }}>6,000 years.</span>
        </h2>

        <div
          data-reveal
          className="mt-14 text-left mx-auto"
          style={{
            color: "var(--text-on-dark-secondary)",
            fontSize: "clamp(1.0625rem, 1.4vw, 1.25rem)",
            lineHeight: 1.7,
            maxWidth: "58ch",
          }}
        >
          <p>
            Bitcoin was the escape that didn&rsquo;t quite work. Digital gold mining is the step that finally moves the oldest store of value at the speed and reach of the modern one.
          </p>
        </div>

        <div
          data-reveal
          className="mt-16 inline-block"
          style={{
            borderTop: "1px solid rgba(202,138,4,0.4)",
            borderBottom: "1px solid rgba(202,138,4,0.4)",
            padding: "32px 48px",
          }}
        >
          <p
            style={{
              color: "var(--text-on-dark-primary)",
              fontSize: "clamp(1.25rem, 2vw, 1.875rem)",
              lineHeight: 1.35,
              fontWeight: 300,
              letterSpacing: "-0.015em",
              maxWidth: "32ch",
            }}
          >
            Gold only gets digitized <em className="italic" style={{ color: "var(--accent-gold)" }}>once.</em>
            <br />
            That&rsquo;s the thing to be early to.
          </p>
        </div>
      </div>
    </section>
  );
}
