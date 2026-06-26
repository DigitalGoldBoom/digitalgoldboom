"use client";

import { useEffect, useRef } from "react";

/**
 * ShimmerDots — the Framer "Shimmer Dot" effect as a reusable background layer:
 * an animated grid of gold squares (4px, 2px gap, rgb(255,179,0)) that twinkle.
 * Transparent canvas — drop it as an absolute-inset layer behind content.
 * Reduced-motion aware.
 */

const DOT = 4;
const GAP = 2;
const CELL = DOT + GAP;
const GOLD = "255,179,0";
const TIME_SPEED = 0.18; // animation speed (2x)
const SPARSE = 0.08;

export default function ShimmerDots({ opacity = 0.85 }: { opacity?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return;
    const canvas: HTMLCanvasElement = cv;
    const c = canvas.getContext("2d", { alpha: true });
    if (!c) return;
    const ctx: CanvasRenderingContext2D = c;

    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    let raf = 0;
    let t = 0;
    let w = 0;
    let h = 0;
    let dpr = 1;

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function draw() {
      ctx.clearRect(0, 0, w, h);
      const cols = Math.ceil(w / CELL) + 1;
      const rows = Math.ceil(h / CELL) + 1;
      const t1 = t * 0.6;
      const t2 = t * 0.45;
      const t3 = t * 0.8;
      const t4 = t * 0.4;
      for (let y = 0; y < rows; y++) {
        const yy = y * CELL;
        for (let x = 0; x < cols; x++) {
          const hash = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453;
          const grain = hash - Math.floor(hash);
          const n =
            Math.sin(x * 0.45 + t1) +
            Math.sin(y * 0.55 + t2) +
            Math.sin((x + y) * 0.35 + t3) +
            Math.sin(Math.sqrt(x * x + y * y) * 0.25 + t4) +
            grain * 4 -
            2;
          const norm = (n + 6) / 12;
          if (norm < SPARSE) continue;
          const k = (norm - SPARSE) / (1 - SPARSE);
          const alpha = Math.min(0.92, 0.14 + k * k * 0.78);
          ctx.fillStyle = `rgba(${GOLD},${alpha.toFixed(3)})`;
          ctx.fillRect(x * CELL, yy, DOT, DOT);
        }
      }
      if (!reduceMotion) {
        t -= TIME_SPEED; // reversed direction
        raf = requestAnimationFrame(draw);
      }
    }

    resize();
    window.addEventListener("resize", resize, { passive: true });
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
      style={{ opacity }}
    />
  );
}
