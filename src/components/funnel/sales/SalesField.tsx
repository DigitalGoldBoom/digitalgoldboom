"use client";

import { useEffect, useRef, useState } from "react";
import ShimmerDots from "@/components/ShimmerDots";

/**
 * SalesField — the page-wide background for the /v1 + /s sales funnel.
 *
 * Reuses the v2 fixed shimmer stack EXACTLY (ShimmerDots + top gold radial + vertical
 * darkening), then ELEVATES it with the funnel's "one big idea": a single slow deep-gold
 * "core glow" that travels DOWN the page as the reader scrolls, sitting behind the live
 * section so the active beat is always the brightest thing on screen ("verified gold, lit
 * from within"). The glow is moved with `transform: translateY` only — GPU-only, no layout,
 * no paint thrash.
 *
 * prefers-reduced-motion: the glow is static and centered; ShimmerDots already disables its
 * own animation under reduced-motion. Phone: shimmer opacity drops to 0.35 to protect the
 * contrast of stacked text (per the design spec).
 */
export default function SalesField() {
  const glowRef = useRef<HTMLDivElement>(null);
  const [shimmerOpacity, setShimmerOpacity] = useState(0.45);

  useEffect(() => {
    const phone = window.matchMedia?.("(max-width: 767px)").matches;
    setShimmerOpacity(phone ? 0.35 : 0.45);

    const glow = glowRef.current;
    if (!glow) return;

    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      glow.style.transform = "translate3d(0, 38vh, 0)"; // static, roughly centered
      return;
    }

    let raf = 0;
    let pending = false;
    const update = () => {
      pending = false;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      // Travel the glow from near the top of the viewport to near the bottom as we scroll.
      const y = -10 + p * 90; // -10vh -> 80vh
      glow.style.transform = `translate3d(0, ${y.toFixed(2)}vh, 0)`;
    };
    const onScroll = () => {
      if (pending) return;
      pending = true;
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div aria-hidden className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      <ShimmerDots opacity={shimmerOpacity} />
      {/* top gold radial (v2) */}
      <div
        className="absolute inset-0"
        style={{ background: "radial-gradient(80% 50% at 50% -5%, rgba(232,178,58,0.12), transparent 55%)" }}
      />
      {/* travelling "core glow" — the light from within (elevation over v2) */}
      <div
        ref={glowRef}
        className="absolute left-1/2 h-[70vh] w-[120vw] -translate-x-1/2"
        style={{
          top: 0,
          marginLeft: "-60vw",
          background: "radial-gradient(50% 50% at 50% 50%, rgba(232,178,58,0.10), rgba(232,178,58,0.04) 40%, transparent 70%)",
          willChange: "transform",
        }}
      />
      {/* vertical darkening (v2) — sits on top so text contrast holds */}
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(180deg, rgba(8,8,13,0.2), rgba(8,8,13,0.75))" }}
      />
    </div>
  );
}
