"use client";

import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "@/lib/reducedMotion";
import { world } from "./filmBus";

/**
 * GOLD DUST — the page's single atmosphere layer (ShimmerDots elevated to a
 * drifting particle field). Canvas 2D, 30fps, DPR≤2, pauses when hidden or
 * offscreen. Density/brightness scale with --daylight (sparse in the dark,
 * catching light at dawn) read from filmBus — never getComputedStyle per frame.
 * Drift speed responds mildly to scroll velocity (lerped ±20%).
 * The descent dims it via --dust-opacity (dust lives in AIR only, house rule).
 * Reduced-motion: ONE static frame, loop never starts. Defers 1s after mount
 * so it can't compete with the LCP.
 */

const GOLD = "232,178,58";
const FRAME = 1000 / 30;

type P = { x: number; y: number; r: number; vy: number; vx: number; tw: number };

function particleCount(): number {
  const mem = (navigator as { deviceMemory?: number }).deviceMemory ?? 8;
  if (mem < 4) return 24;
  const w = window.innerWidth;
  if (w < 768) return 40;
  if (w < 1024) return 70;
  return 120;
}

export default function GoldDust() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let dpr = 1;
    let parts: P[] = [];
    let raf = 0;
    let last = 0;
    let visible = true;
    let onScreen = true;
    let lastScrollY = window.scrollY;
    let speedFactor = 1;

    // Deterministic pseudo-random so SSR/CSR/replays don't diverge.
    let seed = 7;
    const rand = () => {
      seed = (seed * 16807) % 2147483647;
      return (seed - 1) / 2147483646;
    };

    const build = () => {
      parts = Array.from({ length: particleCount() }, () => ({
        x: rand() * w,
        y: rand() * h,
        r: 0.6 + rand() * 1.6,
        vy: -(0.08 + rand() * 0.25),
        vx: (rand() - 0.5) * 0.12,
        tw: rand() * Math.PI * 2,
      }));
    };

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      build();
      draw(0);
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      const daylight = world.daylight;
      // Sparse & dim at night → denser & brighter at dawn. Alpha cap 0.5.
      const visCount = Math.round(parts.length * (0.55 + daylight * 0.45));
      const base = 0.12 + daylight * 0.3;
      for (let i = 0; i < visCount; i++) {
        const p = parts[i];
        const twinkle = 0.7 + 0.3 * Math.sin(t * 0.001 + p.tw);
        const alpha = Math.min(0.5, base * twinkle);
        ctx.fillStyle = `rgba(${GOLD},${alpha.toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const step = (now: number) => {
      raf = requestAnimationFrame(step);
      if (!visible || !onScreen) return;
      if (now - last < FRAME) return;
      last = now;

      // Scroll-velocity response, lerped (±20%).
      const sy = window.scrollY;
      const dv = Math.min(1, Math.abs(sy - lastScrollY) / 60);
      lastScrollY = sy;
      speedFactor += (1 + dv * 0.2 - speedFactor) * 0.1;

      for (const p of parts) {
        p.y += p.vy * speedFactor * 1.4;
        p.x += p.vx * speedFactor;
        if (p.y < -4) {
          p.y = h + 4;
          p.x = rand() * w;
        }
        if (p.x < -4) p.x = w + 4;
        if (p.x > w + 4) p.x = -4;
      }
      draw(now);
    };

    resize();
    window.addEventListener("resize", resize, { passive: true });
    const onVis = () => {
      visible = document.visibilityState === "visible";
    };
    document.addEventListener("visibilitychange", onVis);
    const io = new IntersectionObserver((es) => {
      onScreen = es.some((e) => e.isIntersecting);
    });
    io.observe(canvas);

    let start: ReturnType<typeof setTimeout> | undefined;
    if (!prefersReducedMotion()) {
      // Defer 1s so the field never competes with the LCP.
      start = setTimeout(() => {
        raf = requestAnimationFrame(step);
      }, 1000);
    }

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(start);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVis);
      io.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className="sfilm-dust" />;
}
