"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import BuyButton from "@/components/BuyButton";
import { useViewPing } from "./hooks";
import type { ColdVariant } from "./variants";

/**
 * S1 — HERO ("the descent" begins). Signature moment 1.
 * LCP = the headline TEXT (words paint first); the underground scene is
 * layered CSS/SVG behind it — code-only base state that already looks designed.
 * Load choreography is pure CSS (cold.css): runs without JS, ends visible,
 * reduced-motion gets everything instantly. CTA is a real link from first paint.
 */
export default function SHero({
  variant,
  checkoutUrl,
}: {
  variant: ColdVariant;
  checkoutUrl?: string;
}) {
  const ctaWrapRef = useRef<HTMLDivElement>(null);
  const ctaZoneRef = useRef<HTMLDivElement>(null);
  useViewPing(ctaZoneRef, "s_hero_cta_view", { page: "new", variant: variant.key });

  // Magnetic CTA — desktop fine pointers only, max ~8px displacement.
  useEffect(() => {
    const zone = ctaZoneRef.current;
    const btn = ctaWrapRef.current;
    if (!zone || !btn) return;
    if (!window.matchMedia("(pointer: fine) and (prefers-reduced-motion: no-preference)").matches)
      return;

    const xTo = gsap.quickTo(btn, "x", { duration: 0.4, ease: "power3.out" });
    const yTo = gsap.quickTo(btn, "y", { duration: 0.4, ease: "power3.out" });
    const onMove = (e: PointerEvent) => {
      const r = btn.getBoundingClientRect();
      xTo(((e.clientX - (r.left + r.width / 2)) / r.width) * 16);
      yTo(((e.clientY - (r.top + r.height / 2)) / r.height) * 16);
    };
    const onLeave = () => {
      xTo(0);
      yTo(0);
    };
    zone.addEventListener("pointermove", onMove);
    zone.addEventListener("pointerleave", onLeave);
    return () => {
      zone.removeEventListener("pointermove", onMove);
      zone.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <section id="cold-s1" className="relative flex min-h-[100svh] items-center overflow-hidden">
      {/* The scene: dark earth in cross-section — a thin luminous horizon high in
          the frame, faint gold veins glowing in the rock below the CTA. */}
      <div aria-hidden className="absolute inset-0">
        {/* horizon line behind the headline */}
        <div
          className="absolute left-0 right-0"
          style={{
            top: "22%",
            height: 1,
            background:
              "linear-gradient(90deg, transparent, rgba(120,150,220,0.35) 30%, rgba(120,150,220,0.35) 70%, transparent)",
          }}
        />
        <div
          className="absolute left-0 right-0"
          style={{
            top: 0,
            height: "22%",
            background: "linear-gradient(180deg, rgba(24,32,64,0.35), transparent)",
          }}
        />
        {/* gold veins in the rock, below the fold's midpoint */}
        <svg
          className="absolute inset-x-0 bottom-0 h-[46%] w-full"
          viewBox="0 0 1200 420"
          preserveAspectRatio="none"
          fill="none"
        >
          <path
            className="cold-vein"
            d="M-20 80 C 180 120, 300 60, 470 130 S 780 240, 960 200 S 1150 280, 1240 250"
            stroke="var(--v2-gold)"
            strokeWidth="1.5"
            opacity="0.12"
          />
          <path
            className="cold-vein"
            d="M-20 220 C 220 260, 420 190, 620 280 S 900 380, 1240 330"
            stroke="var(--v2-gold)"
            strokeWidth="1"
            opacity="0.1"
            style={{ animationDelay: "4s" }}
          />
        </svg>
        {/* soft gold radial glow beneath — pulls the eye downward to scroll */}
        <div
          className="absolute inset-x-0 bottom-0 h-[40%]"
          style={{
            background:
              "radial-gradient(70% 90% at 50% 100%, rgba(232,178,58,0.12), transparent 70%)",
          }}
        />
      </div>

      <div className="cold-wrap relative z-10 mx-auto max-w-[760px] pb-16 pt-32 text-center">
        <p className="v2-eyebrow cold-intro-fade justify-center" data-order="1" style={{ display: "inline-flex" }}>
          A shift in the gold industry
        </p>
        <h1
          className="v2-display mt-7"
          style={{ fontSize: "clamp(2.5rem, 7.4vw, 5.25rem)" }}
        >
          <span className="cold-intro-mask">
            <span className="cold-intro-line" data-line="1">
              {variant.lines[0]}
            </span>
          </span>
          <span className="cold-intro-mask">
            <span className="cold-intro-line v2-gold" data-line="2">
              {variant.lines[1]}
            </span>
          </span>
        </h1>
        {/* LCP element — paints with the first frame, never animated. */}
        <p
          className="mx-auto mt-7 max-w-[34ch] text-lg leading-relaxed md:max-w-[54ch]"
          style={{ color: "var(--v2-dim)" }}
        >
          {variant.subhead}
        </p>
        <div ref={ctaZoneRef} className="cold-intro-fade mt-9 inline-block p-3" data-order="3">
          <div ref={ctaWrapRef} className="inline-block">
            <BuyButton
              checkoutUrl={checkoutUrl}
              label="Get the book — $37"
              event="s_hero_cta_click"
              eventProps={{ page: "new", variant: variant.key }}
              className="v2-btn w-full min-h-[52px] sm:w-auto"
            />
          </div>
        </div>
        <div className="cold-intro-fade" data-order="4">
          <p className="text-sm" style={{ color: "var(--v2-faint)" }}>
            Digital book · delivered instantly · 12-month money-back guarantee
          </p>
          <p className="mt-2 text-xs" style={{ color: "var(--v2-faint)" }}>
            Educational — not financial advice.
          </p>
        </div>
      </div>
    </section>
  );
}
