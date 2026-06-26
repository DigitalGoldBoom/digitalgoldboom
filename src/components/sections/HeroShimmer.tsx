"use client";

import { useEffect, useRef } from "react";

/**
 * HeroShimmer — faithful re-creation of the Digital Gold Boom Framer hero
 * background. Structure mirrors the Framer "Background" layer:
 *   near-black base  →  central glow image (real Framer asset)
 *   →  soft corner light washes  →  slowly drifting white particles.
 * All decorative, non-interactive, and reduced-motion aware.
 */
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
    let w = 0;
    let h = 0;
    let dpr = 1;

    // Framer "Gold Background" template colors: gold particles rgb(255,179,0)
    // (the dominant "Gold Shimmer" layer) plus white sparkle in the glow region.
    const GOLD = "255,179,0";
    const WHITE = "255,255,255";

    type Particle = { x: number; y: number; r: number; a: number; vy: number; vx: number; c: string };
    let parts: Particle[] = [];

    function seed() {
      // Density tuned to match Framer's gentle particle field.
      const count = Math.min(280, Math.max(70, Math.floor((w * h) / 8500)));
      parts = Array.from({ length: count }, () => {
        const gold = Math.random() < 0.65; // ~2/3 gold, 1/3 white — matches the template
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          r: 0.4 + Math.random() * 1.1,
          a: (gold ? 0.1 : 0.06) + Math.random() * (gold ? 0.42 : 0.34),
          vy: 6 + Math.random() * 14, // px / second, downward
          vx: -4 + Math.random() * 8, // slight lateral drift
          c: gold ? GOLD : WHITE,
        };
      });
    }

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    }

    function paintStatic() {
      ctx.clearRect(0, 0, w, h);
      for (const p of parts) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.c},${p.a})`;
        ctx.fill();
      }
    }

    let last = typeof performance !== "undefined" ? performance.now() : 0;
    function frame(now: number) {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      ctx.clearRect(0, 0, w, h);
      for (const p of parts) {
        p.y += p.vy * dt;
        p.x += p.vx * dt;
        if (p.y - p.r > h) {
          p.y = -p.r;
          p.x = Math.random() * w;
        }
        if (p.x < -2) p.x = w + 2;
        else if (p.x > w + 2) p.x = -2;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.c},${p.a})`;
        ctx.fill();
      }
      raf = requestAnimationFrame(frame);
    }

    resize();
    window.addEventListener("resize", resize, { passive: true });

    if (reduceMotion) {
      paintStatic();
    } else {
      raf = requestAnimationFrame(frame);
    }

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
      {/* Central glow — the real Framer asset */}
      <div
        className="absolute left-1/2 top-0 -translate-x-1/2"
        style={{
          width: "min(1440px, 150%)",
          aspectRatio: "1440 / 818",
          backgroundImage: "url(/hero-shimmer/glow-main.svg)",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "top center",
          mixBlendMode: "screen",
          opacity: 0.9,
          WebkitMaskImage:
            "linear-gradient(270deg, transparent 0%, #000 9%, #000 89%, transparent 100%)",
          maskImage:
            "linear-gradient(270deg, transparent 0%, #000 9%, #000 89%, transparent 100%)",
        }}
      />

      {/* Soft corner light washes (approximate Framer's two side glows; near-zero weight) */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 50% at 12% 6%, rgba(25,79,255,0.10) 0%, transparent 60%), radial-gradient(60% 50% at 88% 6%, rgba(25,79,255,0.10) 0%, transparent 60%)",
        }}
      />

      {/* Slowly drifting white particles */}
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

      {/* Bottom fade so the hero melts into the page below */}
      <div
        className="absolute inset-x-0 bottom-0 h-40"
        style={{ background: "linear-gradient(to bottom, transparent, #00020F)" }}
      />
    </div>
  );
}
