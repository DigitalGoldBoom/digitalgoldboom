"use client";

import { useEffect, useRef } from "react";
import { createDotField } from "@/lib/dotField";

/**
 * HeroShimmer — Framer "Shimmer Dot" gold grid behind the hero. Same look, driven by the
 * shared optimised engine: LUT + precomputed per-cell constants + bucketed colours, capped
 * FPS, paused off-screen, and STATIC (no rAF) on mobile / touch / reduced-motion.
 */
export default function HeroShimmer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    return createDotField(canvas, {
      cell: 6, // DOT 4 + GAP 2
      dot: 4,
      rgb: [255, 179, 0],
      sparse: 0.08,
      baseAlpha: 0.14,
      alphaGain: 0.78,
      maxAlpha: 0.92,
      timeSpeed: -0.18, // drifts the opposite way to FallingGold
      fps: 30,
      sizeMode: "client",
    });
  }, []);

  return (
    <div
      className="absolute inset-0 z-0 overflow-hidden pointer-events-none"
      aria-hidden="true"
      style={{ background: "#00020F" }}
    >
      <div
        className="absolute inset-x-0 top-0 h-[70%]"
        style={{
          background:
            "radial-gradient(80% 70% at 50% 0%, rgba(255,179,0,0.14) 0%, transparent 60%)",
        }}
      />
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" style={{ opacity: 0.85 }} />
      <div
        className="absolute inset-x-0 bottom-0 h-40"
        style={{ background: "linear-gradient(to bottom, transparent, #00020F)" }}
      />
    </div>
  );
}
