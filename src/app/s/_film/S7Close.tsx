"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import ModulePanel from "./ModulePanel";
import TranscriptBlock from "./TranscriptBlock";
import FilmCTA from "./FilmCTA";
import { MountainScene } from "./Scenery";
import { useSectionView } from "./useSectionView";
import { PLATES } from "./plates";

/**
 * S7 — THE CLOSE (Module 4 + dawn). The counted callback: the SAME mountain
 * as S1, at sunrise — the day arc reaches 1.00 at the CTA and the seam
 * completes. Offer column enters once (stagger 80ms); the primary CTA is the
 * page's biggest button and is interactive from first paint. Price anchor is
 * a REAL price step only — static, quiet, no countdowns, nothing animated.
 */
export default function S7Close({
  closeCtaRef,
}: {
  closeCtaRef: React.RefObject<HTMLElement | null>;
}) {
  const sectionRef = useSectionView("close");
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(gsap.utils.toArray("[data-s7-enter]", scope.current!), {
          y: 20,
          opacity: 0,
          duration: 0.5,
          ease: "expo.out",
          stagger: 0.08,
          scrollTrigger: { trigger: scope.current, start: "top 75%", once: true },
        });
      });
    },
    { scope },
  );

  return (
    <section
      id="s-close"
      ref={(el) => {
        sectionRef.current = el;
      }}
      className="relative overflow-hidden py-24 md:py-32"
    >
      {/* Dawn mountain — the real plate when picked; composite fallback */}
      <div aria-hidden className="absolute inset-0 z-0 opacity-60 md:opacity-100">
        <MountainScene variant="dawn" src={PLATES.dawnMountain} />
      </div>
      {/* Text-contrast scrim (phone especially): AA over the image */}
      <div
        aria-hidden
        className="absolute inset-0 z-0"
        style={{ background: "linear-gradient(180deg, rgba(8,8,13,0.55), rgba(8,8,13,0.35) 55%, rgba(8,8,13,0.6))" }}
      />

      <div ref={scope} className="sfilm-contain relative z-10 max-w-[980px]">
        <p data-s7-enter className="v2-eyebrow mb-8">
          Read it for yourself
        </p>
        <h2
          data-s7-enter
          className="v2-display"
          style={{ fontSize: "clamp(2.1rem, 5.5vw, 4.25rem)", maxWidth: "16ch" }}
        >
          Understand it for the price of a paperback.
        </h2>

        <div data-s7-enter className="mt-10 max-w-[860px]">
          <ModulePanel
            section="close"
            module="m4"
            chip="04 · THE BOOK"
            title="The Book"
            promise="Somewhere solid to stand — why this book exists, from the author."
            duration="1:05"
          />
          <TranscriptBlock module="m4" />
        </div>

        <p data-s7-enter className="mt-9 max-w-[60ch] text-lg leading-relaxed" style={{ color: "var(--v2-dim)" }}>
          Digital Gold Boom is a one-time $37 — the early-reader launch price, in exchange for
          an honest review, before it moves to its regular $97. The complete book is delivered
          digitally the moment you check out.
        </p>

        <p data-s7-enter className="mt-5 flex max-w-[60ch] items-start gap-3 text-base leading-relaxed" style={{ color: "#F4F4F7" }}>
          <svg
            aria-hidden
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--v2-gold)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mt-1 shrink-0"
          >
            <path d="M22 11.08V12a10 10 0 11-5.93-9.14 M22 4L12 14.01l-3-3" />
          </svg>
          If the book is not worth your time, email within 60 days for a full refund. No
          questions asked.
        </p>

        <div
          data-s7-enter
          className="mt-10 flex flex-col items-start gap-4"
          ref={closeCtaRef as React.RefObject<HTMLDivElement>}
        >
          <FilmCTA
            section="close"
            className="v2-btn sfilm-cta-primary w-full sm:w-auto"
            label="Get the book — $37"
          />
          {/* Price anchor — REAL price step only, static, quiet */}
          <p className="text-sm" style={{ color: "var(--v2-dim)" }}>
            $37 today · <s>$97</s> regular
          </p>
        </div>

        <p data-s7-enter className="mt-7 max-w-[56ch] text-xs leading-relaxed" style={{ color: "var(--v2-dim)" }}>
          Secure checkout via LemonSqueezy. Educational content — not financial advice.
        </p>
      </div>
    </section>
  );
}
