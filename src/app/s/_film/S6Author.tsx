"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useSectionView } from "./useSectionView";

/**
 * S6 — WHO WROTE IT. After the heat: stillness. ONE animation — a single
 * 300ms whole-section fade — and the disclosure box has ZERO animation
 * (visibly un-designed reads as real; the box border is never gold).
 * Portrait: author-owned photo only (owed) — until it exists, the section is
 * single-column typographic. NO placeholder face, NO stock, NO AI likeness.
 */
export default function S6Author() {
  const sectionRef = useSectionView("author");
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(scope.current, {
          opacity: 0,
          duration: 0.3,
          scrollTrigger: { trigger: scope.current, start: "top 75%", once: true },
        });
      });
    },
    { scope },
  );

  return (
    <section
      id="s-author"
      ref={(el) => {
        sectionRef.current = el;
      }}
      className="relative py-24 md:py-32"
    >
      <div ref={scope} className="sfilm-contain relative z-10 max-w-[900px]">
        <p className="v2-eyebrow mb-8">Who wrote it</p>
        <h2 className="v2-display" style={{ fontSize: "clamp(1.9rem, 4.2vw, 3.25rem)", maxWidth: "18ch" }}>
          Written from inside, not from the sidelines.
        </h2>

        <p className="mt-8 max-w-[68ch] text-lg leading-relaxed" style={{ color: "var(--v2-dim)" }}>
          Andrew Fletcher was President of Great Eagle Gold — now NatBridge Resources, the
          first gold company built to align with this model — and has assessed hundreds of
          gold projects.
        </p>

        <blockquote
          className="mt-8 max-w-[62ch] border-l pl-6 text-lg leading-relaxed"
          style={{ borderColor: "var(--v2-line)", color: "#F4F4F7", fontWeight: 300 }}
        >
          In 2020 he walked away from a $30 million gold deal in Colombia after standing at
          the edge of a mercury-contaminated pit where workers, some of them teenagers,
          handled the material without protection. That day is where this book began.
        </blockquote>

        <p className="mt-8 max-w-[68ch] text-lg leading-relaxed" style={{ color: "var(--v2-dim)" }}>
          The two companies at the center of this shift cannot tell the whole story: one is
          heads-down building it, the other is publicly listed and limited in what it can say.
          This book is the one place the whole story is told, start to finish.
        </p>

        {/* The disclosure — quiet box, never gold, never animated */}
        <div
          className="mt-10 max-w-[62ch] rounded-xl border p-5"
          style={{ borderColor: "var(--v2-line)" }}
        >
          <p className="text-sm leading-relaxed" style={{ color: "var(--v2-dim)" }}>
            Educational — not financial advice.
          </p>
        </div>
      </div>
    </section>
  );
}
