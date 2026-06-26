"use client";

import { useEffect, useRef } from "react";
import { createDotField } from "@/lib/dotField";

/**
 * FallingGold — the full-page gold dot-field background. Same look as before, but driven by
 * the shared optimised engine (LUT + precompute + bucketed colours; STATIC on mobile / touch /
 * reduced-motion so it costs ZERO per-frame work there — the old version froze low-end phones).
 */
export default function FallingGold() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    return createDotField(canvas, {
      cell: 7,
      dot: 2,
      rgb: [212, 168, 67],
      sparse: 0.1,
      baseAlpha: 0.15,
      alphaGain: 0.85,
      maxAlpha: 0.95,
      timeSpeed: 0.012,
      fps: 30,
      sizeMode: "window",
      bg: "#000000",
    });
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none"
      style={{ position: "fixed", inset: 0, zIndex: 0, opacity: 0.85 }}
    />
  );
}
