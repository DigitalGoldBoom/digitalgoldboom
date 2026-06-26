"use client";

import { useEffect, useRef } from "react";

/**
 * ShimmerDots — the Framer "Shimmer Dot" effect (animated gold square grid).
 * Performance: capped DPR, throttled to ~30fps, and paused when off-screen or
 * when the tab is hidden — so it costs nothing until it's actually visible.
 */

const DOT = 4;
const GAP = 2;
const CELL = DOT + GAP;
const GOLD = "255,179,0";
const TIME_SPEED = 0.18;
const SPARSE = 0.08;
const FRAME = 1000 / 30; // throttle to 30fps

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
    let last = 0;
    let visible = true;
    let onScreen = true;

    function render() {
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
    }

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      render();
    }

    function loop(now: number) {
      raf = requestAnimationFrame(loop);
      if (!visible || !onScreen) return;
      if (now - last < FRAME) return;
      last = now;
      t -= TIME_SPEED;
      render();
    }

    resize();
    window.addEventListener("resize", resize, { passive: true });

    const onVis = () => {
      visible = document.visibilityState === "visible";
    };
    document.addEventListener("visibilitychange", onVis);

    const io = new IntersectionObserver(
      (entries) => {
        onScreen = entries.some((e) => e.isIntersecting);
      },
      { threshold: 0 },
    );
    io.observe(canvas);

    if (!reduceMotion) raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVis);
      io.disconnect();
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
