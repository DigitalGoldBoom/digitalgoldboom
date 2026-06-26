"use client";

import { prefersReducedMotion } from "@/lib/reducedMotion";

/**
 * Shared gold dot-field renderer for the hero shimmer / falling-gold backgrounds.
 *
 * The old versions recomputed a full-screen grid every frame with ~5 Math.sin / Math.sqrt
 * per cell PLUS a fresh `rgba(...)` string per cell — millions of trig ops + GC churn per
 * second, the main-thread freeze that wrecked mobile. This rebuild keeps the EXACT look but:
 *   • precomputes the constant per-cell spatial phases + grain ONCE (on resize)
 *   • replaces Math.sin with a lookup table (LUT)
 *   • quantises alpha into a few buckets with PRECOMPUTED colour strings (no per-cell alloc)
 *   • is STATIC on mobile / touch / reduced-motion (one render, no rAF loop at all)
 *   • on desktop runs a capped-FPS rAF that pauses off-screen and when the tab is hidden
 */

const LUT_SIZE = 2048;
const LUT_MASK = LUT_SIZE - 1;
const LUT = new Float32Array(LUT_SIZE);
for (let i = 0; i < LUT_SIZE; i++) LUT[i] = Math.sin((i / LUT_SIZE) * Math.PI * 2);
const LUT_F = LUT_SIZE / (Math.PI * 2);
// `& LUT_MASK` on a (possibly negative) 32-bit int wraps to [0, LUT_SIZE) via two's complement.
const sinLut = (v: number) => LUT[((v * LUT_F) | 0) & LUT_MASK];

const BUCKETS = 24;

// Shared scroll state: one passive listener flips a flag while the page is scrolling so every
// dot-field pauses its render during scroll (smooth scroll), then resumes ~140ms after it stops.
let _scrolling = false;
let _scrollTimer: ReturnType<typeof setTimeout> | undefined;
let _scrollBound = false;
function isScrolling() {
  if (typeof window === "undefined") return false;
  if (!_scrollBound) {
    _scrollBound = true;
    window.addEventListener(
      "scroll",
      () => {
        _scrolling = true;
        if (_scrollTimer) clearTimeout(_scrollTimer);
        _scrollTimer = setTimeout(() => {
          _scrolling = false;
        }, 140);
      },
      { passive: true },
    );
  }
  return _scrolling;
}

export type DotFieldOptions = {
  cell: number;
  dot: number;
  rgb: [number, number, number];
  sparse: number;
  baseAlpha: number;
  alphaGain: number;
  maxAlpha: number;
  timeSpeed: number; // signed (direction of drift)
  fps?: number;
  sizeMode?: "window" | "client";
  /** Opaque background fill per frame (e.g. "#000000"). Omit for a transparent canvas. */
  bg?: string;
  /** Force animation off (default: off on touch / reduced-motion → static one-shot render). */
  forceStatic?: boolean;
};

export function createDotField(
  canvas: HTMLCanvasElement,
  opts: DotFieldOptions,
): () => void {
  const ctx = canvas.getContext("2d", { alpha: true });
  if (!ctx) return () => {};

  const { cell, dot, rgb, sparse, baseAlpha, alphaGain, maxAlpha, timeSpeed } = opts;
  const fps = opts.fps ?? 30;
  const frameMs = 1000 / fps;
  const sizeMode = opts.sizeMode ?? "client";
  const invSparse = 1 / (1 - sparse);

  // Precomputed bucket colours — no per-cell string allocation in the hot loop.
  const colors: string[] = [];
  for (let b = 0; b < BUCKETS; b++) {
    const a = baseAlpha + ((b + 0.5) / BUCKETS) * (maxAlpha - baseAlpha);
    colors[b] = `rgba(${rgb[0]},${rgb[1]},${rgb[2]},${a.toFixed(3)})`;
  }
  const bScale = BUCKETS / (maxAlpha - baseAlpha);

  let w = 0;
  let h = 0;
  let cols = 0;
  let rows = 0;
  // Per-cell precomputed constants (filled on resize).
  let sa = new Float32Array(0);
  let sb = new Float32Array(0);
  let sc = new Float32Array(0);
  let sd = new Float32Array(0);
  let grain = new Float32Array(0);
  let px = new Int16Array(0);
  let py = new Int16Array(0);

  let t = 0;

  function precompute() {
    const n = cols * rows;
    sa = new Float32Array(n);
    sb = new Float32Array(n);
    sc = new Float32Array(n);
    sd = new Float32Array(n);
    grain = new Float32Array(n);
    px = new Int16Array(n);
    py = new Int16Array(n);
    let i = 0;
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        sa[i] = x * 0.45;
        sb[i] = y * 0.55;
        sc[i] = (x + y) * 0.35;
        sd[i] = Math.sqrt(x * x + y * y) * 0.25;
        const hash = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453;
        grain[i] = (hash - Math.floor(hash)) * 4 - 2;
        px[i] = x * cell;
        py[i] = y * cell;
        i++;
      }
    }
  }

  const bg = opts.bg;
  function render() {
    if (bg) {
      ctx!.fillStyle = bg;
      ctx!.fillRect(0, 0, w, h);
    } else {
      ctx!.clearRect(0, 0, w, h);
    }
    const t1 = t * 0.3;
    const t2 = t * 0.22;
    const t3 = t * 0.4;
    const t4 = t * 0.18;
    const n = cols * rows;
    for (let i = 0; i < n; i++) {
      const v =
        sinLut(sa[i] + t1) +
        sinLut(sb[i] + t2) +
        sinLut(sc[i] + t3) +
        sinLut(sd[i] + t4) +
        grain[i];
      const norm = (v + 6) * 0.08333;
      if (norm < sparse) continue;
      const kk = (norm - sparse) * invSparse;
      let alpha = baseAlpha + kk * kk * alphaGain;
      if (alpha > maxAlpha) alpha = maxAlpha;
      let b = ((alpha - baseAlpha) * bScale) | 0;
      if (b < 0) b = 0;
      else if (b >= BUCKETS) b = BUCKETS - 1;
      ctx!.fillStyle = colors[b];
      ctx!.fillRect(px[i], py[i], dot, dot);
    }
  }

  function resize() {
    const dpr =
      window.innerWidth < 768 ? 1 : Math.min(window.devicePixelRatio || 1, 1.5);
    w = sizeMode === "window" ? window.innerWidth : canvas.clientWidth;
    h = sizeMode === "window" ? window.innerHeight : canvas.clientHeight;
    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    if (sizeMode === "window") {
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
    }
    ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    cols = Math.ceil(w / cell) + 1;
    rows = Math.ceil(h / cell) + 1;
    precompute();
    render();
  }

  // STATIC only for reduced-motion (or explicit opt-out). Mobile now animates too — the engine
  // is light enough, and we PAUSE the render while the user is scrolling (see isScrolling) so
  // scrolling stays perfectly smooth on every device.
  const isStatic = opts.forceStatic || prefersReducedMotion();

  resize();
  window.addEventListener("resize", resize, { passive: true });

  if (isStatic) {
    return () => window.removeEventListener("resize", resize);
  }

  // ANIMATED mode (desktop): capped FPS, paused off-screen and when the tab is hidden.
  let raf = 0;
  let last = 0;
  let visible = true;
  let onScreen = true;

  const loop = (now: number) => {
    raf = requestAnimationFrame(loop);
    // Pause the (relatively heavy) canvas render while the page is scrolling so the main thread
    // and compositor are free for a smooth scroll. Resumes the instant scrolling stops.
    if (!visible || !onScreen || isScrolling()) return;
    if (now - last < frameMs) return;
    last = now;
    t += timeSpeed;
    render();
  };

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

  raf = requestAnimationFrame(loop);

  return () => {
    cancelAnimationFrame(raf);
    window.removeEventListener("resize", resize);
    document.removeEventListener("visibilitychange", onVis);
    io.disconnect();
  };
}
