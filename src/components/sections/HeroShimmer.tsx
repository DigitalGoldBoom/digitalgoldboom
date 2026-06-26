"use client";

import { useEffect, useRef } from "react";

/**
 * HeroShimmer — replica of the Framer "Shimmer Dot" component used on the
 * Digital Gold Boom site: a full-area grid of small GOLD squares that twinkle.
 * Framer config: shape=Square, size=4px, gap=2px (→ 6px cell), color rgb(255,179,0),
 * animated (speed 30). Sits on a near-black base behind the hero content.
 */

const DOT = 4; // square size, px (Framer size=4)
const GAP = 2; // gap between squares, px (Framer gap=2)
const CELL = DOT + GAP; // 6px grid pitch
const GOLD = "255,179,0"; // Framer Shimmer Dot color
const TIME_SPEED = 0.05; // visibly animated twinkle/flow
const SPARSE = 0.08; // floor below which a cell stays dark

export default function HeroShimmer() {
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
        t += TIME_SPEED;
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
    <div
      className="absolute inset-0 z-0 overflow-hidden pointer-events-none"
      aria-hidden="true"
      style={{ background: "#00020F" }}
    >
      {/* Soft warm gold glow up top for depth */}
      <div
        className="absolute inset-x-0 top-0 h-[70%]"
        style={{
          background:
            "radial-gradient(80% 70% at 50% 0%, rgba(255,179,0,0.14) 0%, transparent 60%)",
        }}
      />

      {/* The gold Shimmer Dot grid */}
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" style={{ opacity: 0.85 }} />

      {/* Bottom fade so the hero melts into the page below */}
      <div
        className="absolute inset-x-0 bottom-0 h-40"
        style={{ background: "linear-gradient(to bottom, transparent, #00020F)" }}
      />
    </div>
  );
}
