"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { StrataScene } from "./Scenery";
import { PLATES } from "./plates";

/**
 * S1→S2 — THE DESCENT (Signature A, the page's ONE scrubbed set piece).
 * Scroll pushes the camera into the rock: the cross-section scales 1.0→1.6
 * (desktop) with a vignette that closes then opens; the S2 eyebrow fades in
 * over the last 15%; at 55% the seam tip pulses once; dust dims to 0 by 20%
 * (dust lives in AIR only).
 *
 * STICKY, NOT PINNED (QA bug 7): ScrollTrigger pinning re-parents into
 * position:fixed and registered as layout shift (measured CLS 2.0). The inner
 * viewport is position:sticky inside a tall track — zero layout mutation,
 * CLS-exempt — and the timeline scrubs against the track. The track is 100svh
 * in HTML/no-JS/reduced-motion/low-end (static section, the authored state)
 * and is raised by JS only when full motion is allowed:
 * desktop 250svh (≈ +=150%) · tablet 220svh (+=120%) · phone 175svh (+=75%).
 */
export default function Descent() {
  const scope = useRef<HTMLElement>(null);
  const plateRef = useRef<HTMLDivElement>(null);
  const vignetteRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      const nav = navigator as { deviceMemory?: number; connection?: { saveData?: boolean } };
      const lowEnd = (nav.deviceMemory ?? 8) < 4 || nav.connection?.saveData === true;
      if (lowEnd) return; // 100svh static plate — already the authored fallback

      const mm = gsap.matchMedia();
      mm.add(
        {
          motion: "(prefers-reduced-motion: no-preference)",
          desktop: "(min-width: 1024px)",
          tablet: "(min-width: 768px) and (max-width: 1023px)",
        },
        (ctx) => {
          const { motion, desktop, tablet } = ctx.conditions as {
            motion: boolean;
            desktop: boolean;
            tablet: boolean;
          };
          if (!motion) return; // reduced motion: static 100svh section, nothing runs

          const trackH = desktop ? 250 : tablet ? 220 : 175;
          const maxScale = desktop ? 1.6 : tablet ? 1.45 : 1.3;
          gsap.set(scope.current, { height: `${trackH}svh` });

          const setDust = gsap.quickSetter(document.documentElement, "--dust-opacity");
          let pulsed = false;

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: scope.current,
              start: "top top",
              end: "bottom bottom",
              scrub: 1,
              invalidateOnRefresh: true,
              onUpdate: (self) => {
                // Dust fades out by 20% of the descent, returns after (air rule).
                setDust(String(Math.max(0, 1 - self.progress / 0.2).toFixed(3)));
                if (self.progress >= 0.55 && !pulsed) {
                  pulsed = true;
                  window.dispatchEvent(new Event("sfilm:seam-pulse"));
                }
              },
              onLeave: () => setDust("1"),
              onLeaveBack: () => setDust("1"),
            },
            defaults: { ease: "none" },
          });

          // 0→40%: descend; vignette closes. 40→70%: eyes adjust. 70→100%: settle.
          tl.fromTo(
            plateRef.current,
            { scale: 1, yPercent: 0 },
            { scale: maxScale, yPercent: -6, duration: 1 },
            0,
          )
            .fromTo(vignetteRef.current, { opacity: 0 }, { opacity: 0.7, duration: 0.4 }, 0)
            .to(vignetteRef.current, { opacity: 0.2, duration: 0.3 }, 0.4)
            .fromTo(
              eyebrowRef.current,
              { opacity: 0, y: 12 },
              { opacity: 1, y: 0, duration: 0.15 },
              0.85,
            );
        },
      );
    },
    { scope },
  );

  return (
    /* The track: 100svh static by default; JS raises it when motion is on. */
    <section ref={scope} aria-hidden className="relative h-[100svh]">
      {/* The sticky viewport */}
      <div className="sticky top-0 h-svh overflow-hidden">
        <div
          ref={plateRef}
          className="sfilm-descent-plate absolute inset-0 z-0"
          style={{ willChange: "transform" }}
        >
          <StrataScene src={PLATES.crossSection} />
        </div>
        {/* Closing/opening vignette */}
        <div
          ref={vignetteRef}
          className="pointer-events-none absolute inset-0"
          style={{
            opacity: 0,
            background:
              "radial-gradient(120% 90% at 50% 50%, transparent 30%, rgba(3,3,6,0.9) 78%)",
          }}
        />
        {/* The S2 eyebrow, arriving at the bottom of the descent (decorative preview —
            the semantic eyebrow lives in S2 itself) */}
        <p
          ref={eyebrowRef}
          className="v2-eyebrow absolute bottom-14 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap"
          style={{ opacity: 0 }}
        >
          What is happening
        </p>
      </div>
    </section>
  );
}
