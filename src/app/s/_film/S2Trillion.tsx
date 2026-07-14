"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import NumberCounter from "@/components/NumberCounter";
import { StrataScene } from "./Scenery";
import { useSectionView } from "./useSectionView";
import { PLATES } from "./plates";

/**
 * S2 — THE $22 TRILLION. In the underground dark, the number assembles.
 * The $22,000,000,000,000 counter is the page's ONLY gold number.
 * "FOUND. VERIFIED. STUCK." = kinetic use 1 of 2 (masked word rise).
 * COMPLIANCE: the as-of caption lives in the SAME DOM block as the number —
 * it can never render without it. All static under reduced-motion (the
 * authored state: words visible, caption visible, counter at final value).
 */
export default function S2Trillion() {
  const sectionRef = useSectionView("trillion");
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Verdict words: masked rise, staggered 200ms, once at 50% in view.
        gsap.from("[data-verdict] > span > span", {
          yPercent: 110,
          duration: 0.4,
          ease: "expo.out",
          stagger: 0.2,
          delay: 1.1, // lands as the counter completes
          scrollTrigger: { trigger: scope.current, start: "top 60%", once: true },
        });
        gsap.from("[data-asof]", {
          opacity: 0,
          duration: 0.4,
          delay: 1.9,
          scrollTrigger: { trigger: scope.current, start: "top 60%", once: true },
        });
      });
    },
    { scope },
  );

  return (
    <section
      id="s-trillion"
      ref={(el) => {
        sectionRef.current = el;
      }}
      className="relative overflow-hidden py-24 md:py-32"
    >
      {/* Lingering cross-section backdrop at 20% — the section works as pure type */}
      <div aria-hidden className="absolute inset-0 z-0 opacity-20">
        <StrataScene src={PLATES.crossSection} />
      </div>

      <div ref={scope} className="sfilm-contain relative z-10 max-w-[1200px]">
        <p className="v2-eyebrow mb-8">What is happening</p>
        <h2 className="v2-display" style={{ fontSize: "clamp(1.9rem, 4.2vw, 3.25rem)", maxWidth: "18ch" }}>
          The digging was never the value. The proof was.
        </h2>
        <p className="mt-7 max-w-[65ch] text-lg leading-relaxed" style={{ color: "var(--v2-dim)" }}>
          Twenty-two trillion dollars of gold has already been found — drilled, verified, and
          documented in the ground. And almost none of it can move, because for six thousand
          years the only way to unlock gold was to dig it out. But no serious gold investment
          happens until independent geologists prove the gold is really there; banks finance
          billion-dollar mines on that proof. In 2025, half of one verified Alaskan deposit
          sold for $1 billion in cash, with no mine built. A new model stops at the proof: the
          verified gold is represented as a digital asset while the metal stays exactly where
          geology left it. The mountain stays standing.
        </p>

        {/* THE STAT BLOCK — number + verdict + as-of caption: ONE block, one trigger */}
        <div className="mt-16">
          <div className="sfilm-trillion" role="img" aria-label="22 trillion dollars">
            <span aria-hidden="true">
              <NumberCounter
                start={0}
                end={22_000_000_000_000}
                prefix="$"
                durationMs={1200}
                staticFirst
              />
            </span>
          </div>
          <p
            data-verdict
            className="mt-5 font-medium"
            style={{ fontSize: "clamp(1.1rem, 2.4vw, 1.75rem)", letterSpacing: "0.12em", color: "#F4F4F7" }}
          >
            {["FOUND.", "VERIFIED.", "STUCK."].map((w) => (
              <span key={w} className="sfilm-mask-line mr-3">
                <span className="inline-block">{w}</span>
              </span>
            ))}
          </p>
          <p data-asof className="mt-4 max-w-[60ch] text-sm leading-relaxed" style={{ color: "var(--v2-dim)" }}>
            Gold already drilled, verified, and documented in the ground worldwide — valued at
            the gold price of $5,194 an ounce on February 26, 2026, the reference date the book
            locks every figure to.
          </p>
        </div>
      </div>
    </section>
  );
}
