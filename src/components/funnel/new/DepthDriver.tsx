"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { prefersReducedMotion } from "@/lib/reducedMotion";

/**
 * DepthDriver — the page's one structural system: "the descent to the proof".
 * A single page-spanning ScrollTrigger writes ONE root CSS variable per frame
 * (--cold-depth, 0 surface → 1 warm underground). Sections consume it in plain
 * CSS (two fixed alpha overlays rendered here). Nothing else animates page-wide.
 *
 * Also mounts Lenis smooth scroll — desktop fine-pointers only; native scroll
 * on touch and under reduced motion (hijacked touch scroll kills trust/INP).
 *
 * Reduced-motion / no-JS: the @property initial value in cold.css
 * (--cold-depth: 0.4, a settled mid-grade) IS the authored static state.
 */
export default function DepthDriver() {
  useEffect(() => {
    if (prefersReducedMotion()) return;

    const root = document.documentElement;
    const setDepth = gsap.quickSetter(root, "--cold-depth");

    const trigger = ScrollTrigger.create({
      start: 0,
      end: () => root.scrollHeight - window.innerHeight,
      scrub: true,
      onUpdate: (self) => setDepth(self.progress.toFixed(4)),
      onRefresh: (self) => setDepth(self.progress.toFixed(4)),
    });

    // Lenis: desktop fine pointers only. One clock, one scroll value (§1.2).
    let lenis: Lenis | null = null;
    let raf: ((t: number) => void) | null = null;
    if (window.matchMedia("(pointer: fine)").matches) {
      lenis = new Lenis({ lerp: 0.1 });
      lenis.on("scroll", ScrollTrigger.update);
      raf = (time: number) => lenis?.raf(time * 1000);
      gsap.ticker.add(raf);
      gsap.ticker.lagSmoothing(0);
    }

    return () => {
      trigger.kill();
      if (raf) gsap.ticker.remove(raf);
      lenis?.destroy();
      root.style.removeProperty("--cold-depth");
    };
  }, []);

  return (
    <>
      {/* The depth arc's only consumers: two fixed alpha overlays + grain. */}
      <div aria-hidden className="cold-rock-layer" />
      <div aria-hidden className="cold-warm-layer" />
      <div aria-hidden className="cold-grain" />
    </>
  );
}
