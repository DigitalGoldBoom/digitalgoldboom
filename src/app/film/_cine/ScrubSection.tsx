"use client";

import { createContext, useContext, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "./useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

/**
 * ScrubSection — a pinned, scroll-scrubbed canvas frame sequence.
 *
 * The wrapper is `heightVh` tall; the inner viewport is CSS-sticky. One
 * ScrollTrigger scrubs the wrapper 0→1 and (a) draws the matching frame of
 * the clip's WebP sequence onto a cover-fit canvas, (b) feeds the same
 * progress to every registered TextStep so copy reveals are exactly
 * reversible with the scroll.
 *
 * Frames live at /film/<clip>/(lg|sm)/NNN.webp (121 frames per 8s clip).
 * sm (800w) is picked on viewports ≤ 820px. Frames lazy-load when the
 * section is within two viewports; the poster shows until then.
 *
 * Reduced motion: no ScrollTrigger, no canvas — the poster renders as a
 * plain image and all steps show statically (cine.css handles the rest).
 */

type StepFn = (progress: number) => void;

const ScrubCtx = createContext<{
  register: (fn: StepFn) => () => void;
} | null>(null);

export function ScrubSection({
  clip,
  frames = 121,
  heightVh = 300,
  onProgress,
  children,
  backdrop,
  ariaLabel,
}: {
  /** Frame-sequence clip name, or null for a pinned text-only beat. */
  clip: string | null;
  frames?: number;
  heightVh?: number;
  onProgress?: (p: number) => void;
  children?: React.ReactNode;
  /** Optional custom backdrop layer (used instead of a frame sequence). */
  backdrop?: React.ReactNode;
  ariaLabel?: string;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const posterRef = useRef<HTMLImageElement>(null);
  const stepsRef = useRef<Set<StepFn>>(new Set());
  const reduced = useReducedMotion();

  // text-only pinned beats: drive progress/steps without any canvas work
  useEffect(() => {
    if (reduced || clip) return;
    const wrap = wrapRef.current;
    if (!wrap) return;
    const st = ScrollTrigger.create({
      trigger: wrap,
      start: "top bottom",
      end: "bottom top",
      scrub: true,
      onUpdate: () => {
        const total = wrap.offsetHeight - window.innerHeight;
        const passed = Math.min(
          Math.max(-wrap.getBoundingClientRect().top, 0),
          total,
        );
        const progress = total > 0 ? passed / total : 0;
        onProgress?.(progress);
        stepsRef.current.forEach((fn) => fn(progress));
      },
    });
    return () => st.kill();
  }, [clip, reduced, onProgress]);

  useEffect(() => {
    if (reduced || !clip) return;
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const size = window.innerWidth <= 820 ? "sm" : "lg";
    const srcW = size === "sm" ? 800 : 1600;
    const srcH = size === "sm" ? 450 : 900;
    const images: (HTMLImageElement | null)[] = new Array(frames).fill(null);
    let loadStarted = false;
    let lastDrawn = -1;
    let progress = 0;

    const sizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = wrap.clientWidth;
      const h = window.innerHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      lastDrawn = -1;
      draw();
    };

    // cover-fit draw of the best available frame at the current progress
    const draw = () => {
      const want = Math.min(frames - 1, Math.floor(progress * (frames - 1)));
      // nearest loaded frame at-or-below the target, so scrubs never flash blank
      let idx = want;
      while (idx > 0 && !images[idx]) idx--;
      const img = images[idx];
      if (!img || idx === lastDrawn) return;
      lastDrawn = idx;
      const cw = canvas.width;
      const ch = canvas.height;
      const scale = Math.max(cw / srcW, ch / srcH);
      const dw = srcW * scale;
      const dh = srcH * scale;
      ctx.drawImage(img, (cw - dw) / 2, (ch - dh) / 2, dw, dh);
      if (posterRef.current) posterRef.current.style.opacity = "0";
    };

    const loadFrames = () => {
      if (loadStarted) return;
      loadStarted = true;
      for (let i = 0; i < frames; i++) {
        const img = new Image();
        img.decoding = "async";
        img.src = `/film/${clip}/${size}/${String(i + 1).padStart(3, "0")}.webp`;
        img.onload = () => {
          images[i] = img;
          // repaint if this frame is at/near the playhead
          const want = Math.floor(progress * (frames - 1));
          if (Math.abs(want - i) < 3 || lastDrawn < want) {
            lastDrawn = -1;
            draw();
          }
        };
      }
    };

    sizeCanvas();

    const st = ScrollTrigger.create({
      trigger: wrap,
      start: "top bottom",
      end: "bottom top",
      scrub: true,
      onUpdate: () => {
        // progress across the PINNED span only: sticky viewport is pinned from
        // (top top) to (bottom bottom); full-trigger progress is remapped here
        // so 0 = pin start, 1 = pin end.
        const total = wrap.offsetHeight - window.innerHeight;
        const passed = Math.min(
          Math.max(-wrap.getBoundingClientRect().top, 0),
          total,
        );
        progress = total > 0 ? passed / total : 0;
        draw();
        onProgress?.(progress);
        stepsRef.current.forEach((fn) => fn(progress));
      },
    });

    // start loading when the section is within ~2 viewports
    const io = new IntersectionObserver(
      (es) => {
        if (es.some((e) => e.isIntersecting)) {
          loadFrames();
          io.disconnect();
        }
      },
      { rootMargin: "200% 0%" },
    );
    io.observe(wrap);

    window.addEventListener("resize", sizeCanvas);
    return () => {
      st.kill();
      io.disconnect();
      window.removeEventListener("resize", sizeCanvas);
    };
  }, [clip, frames, reduced, onProgress]);

  const register = (fn: StepFn) => {
    stepsRef.current.add(fn);
    return () => stepsRef.current.delete(fn);
  };

  return (
    <ScrubCtx.Provider value={{ register }}>
      <section
        ref={wrapRef}
        className="cine-scrub"
        style={{ height: reduced ? "auto" : `${heightVh}vh` }}
        aria-label={ariaLabel}
      >
        <div className="cine-sticky">
          {clip && (
            <>
              {/* poster fallback: shows until the first frame draws; IS the visual under reduced motion */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                ref={posterRef}
                className="cine-poster"
                src={`/film/${clip}/poster.webp`}
                alt=""
                aria-hidden
                style={{ transition: "opacity 0.3s ease" }}
              />
              {!reduced && <canvas ref={canvasRef} className="cine-canvas" />}
            </>
          )}
          {backdrop}
          <div className="cine-shade" />
          <div className="cine-overlay">{children}</div>
        </div>
      </section>
    </ScrubCtx.Provider>
  );
}

/**
 * TextStep — one piece of copy that lives inside a ScrubSection and fades
 * in/out over a progress window. `holdOut` keeps it on screen to the end
 * (for lines that must LAND, like the NATG reveal).
 */
export function TextStep({
  from,
  to,
  holdOut = false,
  className = "",
  children,
}: {
  from: number;
  to: number;
  holdOut?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const ctx = useContext(ScrubCtx);

  useEffect(() => {
    if (!ctx || !ref.current) return;
    const el = ref.current;
    const fadeSpan = Math.min(0.08, (to - from) / 3);
    return ctx.register((p) => {
      let o = 0;
      if (p >= from && p <= to) {
        const inO = Math.min(1, (p - from) / fadeSpan);
        const outO = holdOut ? 1 : Math.min(1, (to - p) / fadeSpan);
        o = Math.min(inO, outO);
      } else if (holdOut && p > to) {
        o = 1;
      }
      el.style.opacity = String(o);
      el.style.transform = `translateY(${(1 - o) * 18}px)`;
    });
  }, [ctx, from, to, holdOut]);

  return (
    <div ref={ref} className={`cine-step ${className}`}>
      {children}
    </div>
  );
}
