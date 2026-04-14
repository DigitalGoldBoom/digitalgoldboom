"use client";

import { useRef } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const STEPS = [
  { n: "01", t: "Verify", b: "Independent geological proof of in-ground gold resources." },
  { n: "02", t: "Tokenize", b: "The verified ownership of gold becomes a digital asset on-chain." },
  { n: "03", t: "Trade", b: "Anyone, anywhere. 24/7. No extraction. No ESG cost." },
];

export default function Solution() {
  const sectionRef = useRef<HTMLElement>(null);
  useScrollReveal(sectionRef);

  return (
    <section ref={sectionRef} className="section section-dark relative overflow-hidden">
      {/* Radial warm wash for atmosphere */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(900px 600px at 80% 30%, rgba(202,138,4,0.08), transparent 60%)",
        }}
      />

      <div className="max-w-[1200px] mx-auto px-6 md:px-12 relative z-10">
        {/* Top block: headline + body */}
        <div className="max-w-[780px]">
          <p data-reveal className="eyebrow mb-6" style={{ color: "var(--accent-gold)" }}>
            The solution
          </p>
          <h2
            data-reveal
            className="display-xl"
            style={{ color: "var(--text-on-dark-primary)", maxWidth: "18ch" }}
          >
            Blockchain finally matured enough to <span style={{ color: "var(--accent-gold)" }}>bypass extraction.</span>
          </h2>

          <div
            data-reveal
            className="mt-10 space-y-6"
            style={{
              color: "var(--text-on-dark-secondary)",
              fontSize: "1.0625rem",
              lineHeight: 1.75,
              maxWidth: "62ch",
            }}
          >
            <p>
              Take the geologically verified in-ground gold. Tokenize it on-chain. You&rsquo;ve eliminated every problem extraction creates — environmental, social, financial — while keeping the part that actually matters: the verified ownership of real gold.
            </p>
            <p style={{ color: "var(--text-on-dark-primary)", fontWeight: 500 }}>
              That&rsquo;s digital gold mining.
              <br />
              <span style={{ color: "var(--accent-gold)" }}>Gold that never needs to leave the ground to be owned.</span>
            </p>
          </div>
        </div>

        {/* Official definition — glass card */}
        <div
          data-reveal
          className="mt-16 relative"
          style={{
            background: "rgba(255,255,255,0.04)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(202,138,4,0.25)",
            borderRadius: "var(--r-2xl)",
            padding: "40px 48px",
            boxShadow: "0 20px 60px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)",
          }}
        >
          <div className="absolute left-0 top-10 bottom-10 w-[3px] rounded-r-full" style={{ background: "var(--accent-gold)" }} />
          <p
            className="eyebrow mb-5"
            style={{ color: "var(--accent-gold)", fontSize: "10px" }}
          >
            The official definition
          </p>
          <p
            style={{
              color: "var(--text-on-dark-primary)",
              fontSize: "clamp(1.0625rem, 1.4vw, 1.25rem)",
              lineHeight: 1.65,
              fontWeight: 300,
              maxWidth: "72ch",
            }}
          >
            Digital gold mining is a patent-pending process developed by{" "}
            <span style={{ color: "var(--accent-gold)", fontWeight: 600 }}>NatGold Digital</span> that tokenizes in-ground verified gold deposits into an eco-friendly, gold-backed digital asset for the modern investor — without environmental destruction or social displacement.
          </p>
        </div>

        {/* 3-step horizontal flow */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {STEPS.map((s, i) => (
            <div
              key={s.n}
              data-reveal
              className="relative"
              style={{
                background: "rgba(255,255,255,0.03)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "var(--r-xl)",
                padding: "36px 32px",
                transition: "border-color 240ms, transform 240ms",
              }}
            >
              {/* Connector arrow between cards on desktop */}
              {i < STEPS.length - 1 && (
                <div
                  aria-hidden
                  className="hidden md:block absolute -right-4 top-1/2 -translate-y-1/2"
                  style={{
                    width: 24,
                    height: 1,
                    background: "linear-gradient(90deg, rgba(202,138,4,0.6), transparent)",
                  }}
                />
              )}
              <div
                className="font-mono mb-5"
                style={{
                  fontSize: "11px",
                  letterSpacing: "0.18em",
                  color: "var(--accent-gold)",
                  fontWeight: 600,
                }}
              >
                STEP {s.n}
              </div>
              <h3
                style={{
                  color: "var(--text-on-dark-primary)",
                  fontSize: "1.625rem",
                  fontWeight: 400,
                  letterSpacing: "-0.01em",
                  lineHeight: 1.2,
                  marginBottom: 16,
                }}
              >
                {s.t}
              </h3>
              <p
                style={{
                  color: "var(--text-on-dark-secondary)",
                  fontSize: "0.9375rem",
                  lineHeight: 1.65,
                }}
              >
                {s.b}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
