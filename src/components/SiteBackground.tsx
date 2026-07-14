"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { createDotField } from "@/lib/dotField";
import { isPixelShovelView } from "@/lib/pixelshovel";

/**
 * SiteBackground — the ONE gold shimmer field for the whole site.
 *
 * Mounted once in the root layout (outside the routed page), so it stays mounted across every
 * client navigation — the canvas keeps its animation state and NEVER re-pops or re-computes when
 * you move between pages. That is what makes the field feel continuous, exactly like Framer's
 * single global background (before, every page mounted its own canvas → a fresh pop-in each route).
 *
 * Look is identical to the old per-page ShimmerDots (same gold, grid, density, opacity 0.45) but
 * driven by the optimised engine (LUT + precomputed per-cell constants + bucketed colours, capped
 * FPS, paused off-screen / while scrolling, static on touch + reduced-motion).
 *
 * The gold glow + vignette are plain gradient divs → server-rendered, so they paint instantly on
 * first load over the dark base (no white flash). Only the canvas dots arrive after hydration, and
 * they EASE in (fadeInField) over that already-correct base, so there is no visible pop.
 *
 * It sits at z-0 behind everything. Pages that should show it (home + the Vault pages) carry a
 * transparent base so it shows through.
 *
 * PIXELSHOVEL PAINTS OVER IT — so it does not run there. /ps lays an opaque black background on top
 * of this canvas: the field was invisible on every PixelShovel page and STILL being animated, frame
 * after frame, under an opaque sheet. A phone was compositing a full-screen canvas nobody could see
 * while GSAP scrubbed a pinned 3D section on top of it, and that is a large part of why scrolling
 * /ps stuttered. Unmounting it there changes nothing a visitor can see, on either site — the
 * shimmer's look, grid and frame rate on the Digital Gold Boom pages are untouched.
 */
export default function SiteBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pathname = usePathname();
  const skip = isPixelShovelView(pathname);

  useEffect(() => {
    if (skip) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    return createDotField(canvas, {
      cell: 6, // DOT 4 + GAP 2 — identical grid to the old ShimmerDots
      dot: 4,
      rgb: [255, 179, 0],
      sparse: 0.08,
      baseAlpha: 0.14,
      alphaGain: 0.78,
      maxAlpha: 0.92,
      timeSpeed: 0.18,
      fps: 30,
      sizeMode: "window", // fills the viewport regardless of layout flow
    });
  }, [skip]);

  // Nothing at all on PixelShovel — not the canvas, not the gradient divs. It is all under an
  // opaque sheet there, and an invisible layer still costs a phone real frames.
  if (skip) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 overflow-hidden"
      // Negative z: the field sits just above the dark page base and BELOW all page content.
      // Transparent pages (home + Vault) reveal it; every opaque page (funnels, /ps, the cinematic
      // experiences) paints over it and is untouched — no per-page sealing needed.
      style={{ contain: "strict", zIndex: -10 }}
    >
      {/* gold glow from the top — instant (server-rendered) */}
      <div
        className="absolute inset-0"
        style={{ background: "radial-gradient(80% 50% at 50% -5%, rgba(232,178,58,0.12), transparent 55%)" }}
      />
      {/* the shimmer dots — ease in over the dark base, never pop */}
      <canvas
        ref={canvasRef}
        className="site-bg-canvas absolute inset-0 h-full w-full"
        style={{ opacity: 0.45 }}
      />
      {/* darkening vignette so content stays legible — instant (server-rendered) */}
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(180deg, rgba(8,8,13,0.2), rgba(8,8,13,0.75))" }}
      />
    </div>
  );
}
