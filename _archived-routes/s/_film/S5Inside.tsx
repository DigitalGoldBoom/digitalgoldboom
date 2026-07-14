"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Book3D from "@/components/Book3D";
import { useSectionView } from "./useSectionView";

/**
 * S5 — INSIDE THE BOOK. The machine opened: 2×2 bullet tiles + the book as an
 * object. Book3D is the EXISTING component, unmodified (the R3F/turntable book
 * was cut by the effect-density budget — designer's demotion list). Icons are
 * inline SVG (Lucide paths) — no icon dependency added to the route.
 */

const BULLETS = [
  {
    icon: (
      // trending-down
      <path d="M22 17l-8.5-8.5-5 5L2 7m20 10h-6m6 0v-6" />
    ),
    text: "Why the old way of producing gold is breaking down — and why record prices make it worse, not better.",
  },
  {
    icon: (
      // layers
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 12l10 5 10-5M2 17l10 5 10-5" />
    ),
    text: "How verified, in-ground gold becomes a digital asset, step by step — the proof, the approval gate, the mint.",
  },
  {
    icon: (
      // map-pin
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 1116 0z M12 13a3 3 0 100-6 3 3 0 000 6z" />
    ),
    text: "Two real gold deposits — Cahuilla in California and Friday in Idaho — moving through the model right now.",
  },
  {
    icon: (
      // check-circle
      <path d="M22 11.08V12a10 10 0 11-5.93-9.14 M22 4L12 14.01l-3-3" />
    ),
    text: "The honest risks, named at full strength, with every figure sourced to a primary record you can check.",
  },
];

export default function S5Inside() {
  const sectionRef = useSectionView("inside");
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set("[data-s5-tile]", { y: 28, opacity: 0 });
        ScrollTrigger.batch("[data-s5-tile]", {
          start: "top 80%",
          once: true,
          onEnter: (els) =>
            gsap.to(els, { y: 0, opacity: 1, duration: 0.6, ease: "expo.out", stagger: 0.09 }),
        });
      });
    },
    { scope },
  );

  return (
    <section
      id="s-inside"
      ref={(el) => {
        sectionRef.current = el;
      }}
      className="relative py-24 md:py-32"
    >
      <div ref={scope} className="sfilm-contain relative z-10">
        <p className="v2-eyebrow mb-8">Inside the book</p>
        <h2 className="v2-display" style={{ fontSize: "clamp(1.9rem, 4.2vw, 3.25rem)", maxWidth: "16ch" }}>
          The whole machine, opened up.
        </h2>

        <div className="mt-12 grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {BULLETS.map((b, i) => (
              <div key={i} data-s5-tile className="v2-tile p-7">
                <svg
                  aria-hidden
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="var(--v2-gold)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mb-5"
                >
                  {b.icon}
                </svg>
                <p className="text-[0.95rem] leading-relaxed" style={{ color: "var(--v2-dim)" }}>
                  {b.text}
                </p>
              </div>
            ))}
          </div>

          <div className="flex flex-col items-center gap-6">
            <Book3D />
            <p className="text-sm" style={{ color: "var(--v2-dim)" }}>
              17 chapters in two sections. Written in plain English.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
