"use client";

import { useEffect, useRef } from "react";

const CELL = 7;
const DOT = 2;
const GOLD_R = 212;
const GOLD_G = 168;
const GOLD_B = 67;
const SPARSE_THRESHOLD = 0.10;
const TIME_SPEED = 0.012;

export default function FallingGold() {
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
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    }

    function draw() {
      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, w, h);

      const cols = Math.ceil(w / CELL) + 1;
      const rows = Math.ceil(h / CELL) + 1;

      const t1 = t * 0.30;
      const t2 = t * 0.22;
      const t3 = t * 0.40;
      const t4 = t * 0.18;

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
            grain * 4 - 2;
          const norm = (n + 6) / 12;

          if (norm < SPARSE_THRESHOLD) continue;

          const k = (norm - SPARSE_THRESHOLD) / (1 - SPARSE_THRESHOLD);
          const alpha = Math.min(0.95, 0.15 + k * k * 0.85);

          ctx.fillStyle = `rgba(${GOLD_R},${GOLD_G},${GOLD_B},${alpha.toFixed(3)})`;
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
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        opacity: 0.85,
      }}
    />
  );
}
