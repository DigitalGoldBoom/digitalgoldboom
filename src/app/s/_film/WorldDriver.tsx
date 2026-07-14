"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { prefersReducedMotion } from "@/lib/reducedMotion";
import { setWorld } from "./filmBus";

/**
 * WorldDriver — the page's one structural system (Signature B).
 * A single page-spanning ScrollTrigger writes TWO root CSS variables per frame:
 *   --seam-progress  = raw scroll progress (the gold thread)
 *   --daylight       = piecewise night→dawn grade keyed to SECTION waypoints
 * Sections consume them in plain CSS (two fixed alpha overlays); the dust field
 * and seam nodes subscribe via filmBus. Nothing else animates page-wide.
 *
 * Also mounts Lenis smooth scroll — desktop fine-pointers only, native scroll
 * on touch and under reduced-motion (library #1 failure mode: hijacked touch).
 *
 * Reduced-motion: none of this runs; the @property initial values in film.css
 * (--daylight: 0.35 dusk, static seam) ARE the authored static state.
 */

/** --daylight value when the given section's top reaches the viewport top. */
const WAYPOINTS: { id: string; daylight: number }[] = [
  { id: "s-hero", daylight: 0 },
  { id: "s-trillion", daylight: 0.05 },
  { id: "s-who-built", daylight: 0.18 },
  { id: "s-why-now", daylight: 0.3 },
  { id: "s-inside", daylight: 0.55 }, // why_now end→0.40 interpolates naturally toward this
  { id: "s-author", daylight: 0.72 },
  { id: "s-close", daylight: 0.85 },
];

export default function WorldDriver() {
  useEffect(() => {
    if (prefersReducedMotion()) return;

    const root = document.documentElement;
    const setDaylight = gsap.quickSetter(root, "--daylight");
    const setSeam = gsap.quickSetter(root, "--seam-progress");
    const setSeamVisible = gsap.quickSetter(root, "--seam-visible");

    // The film ENDS at the bottom of S7 (the global Footer is not part of it).
    const filmEnd = () => {
      const close = document.getElementById("s-close");
      const max = root.scrollHeight - window.innerHeight;
      if (!close) return max;
      return Math.min(max, close.offsetTop + close.offsetHeight - window.innerHeight);
    };

    // Piecewise (scrollFraction → daylight) pairs, recomputed whenever layout settles.
    let pairs: [number, number][] = [
      [0, 0],
      [1, 1],
    ];
    const computePairs = () => {
      // Denominator = the FILM's scroll length (ends at #s-close bottom), so the
      // waypoint fractions live in the same 0–1 domain as the trigger's progress.
      const max = filmEnd();
      if (max <= 0) return;
      const pts: [number, number][] = [[0, 0]];
      for (const wp of WAYPOINTS) {
        const el = document.getElementById(wp.id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top + window.scrollY;
        pts.push([Math.min(1, Math.max(0, top / max)), wp.daylight]);
      }
      pts.push([1, 1]); // dawn completes at the film's end (the S7 CTA area)
      pts.sort((a, b) => a[0] - b[0]);
      pairs = pts;
    };

    const daylightAt = (p: number): number => {
      for (let i = 1; i < pairs.length; i++) {
        if (p <= pairs[i][0]) {
          const [x0, y0] = pairs[i - 1];
          const [x1, y1] = pairs[i];
          if (x1 === x0) return y1;
          return y0 + ((p - x0) / (x1 - x0)) * (y1 - y0);
        }
      }
      return 1;
    };

    const update = (self: { progress: number; end: number }) => {
      const seam = self.progress;
      const d = daylightAt(seam);
      setSeam(seam.toFixed(4));
      setDaylight(d.toFixed(4));
      setSeamVisible(window.scrollY > self.end + 40 ? "0" : "1");
      setWorld(d, seam);
    };

    const trigger = ScrollTrigger.create({
      start: 0,
      end: filmEnd,
      scrub: true,
      onRefresh: (self) => {
        computePairs();
        update(self); // initial/refresh write — first paint sits at the true waypoint
      },
      onUpdate: update,
    });
    computePairs();
    update(trigger);

    // Past the film's end the trigger stops updating, so the reversible rail
    // fade needs its own cheap scroll check (footer region only).
    const onFooterScroll = () => setSeamVisible(window.scrollY > trigger.end + 40 ? "0" : "1");
    window.addEventListener("scroll", onFooterScroll, { passive: true });

    // Lenis: desktop fine pointers only. One clock, one scroll value (playbook §1.2).
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
      window.removeEventListener("scroll", onFooterScroll);
      trigger.kill();
      if (raf) gsap.ticker.remove(raf);
      lenis?.destroy();
      root.style.removeProperty("--daylight");
      root.style.removeProperty("--seam-progress");
      root.style.removeProperty("--seam-visible");
    };
  }, []);

  return (
    <>
      {/* The day arc's only consumers: two fixed alpha overlays (GPU-free). */}
      <div aria-hidden className="sfilm-night-layer" />
      <div aria-hidden className="sfilm-dawn-layer" />
    </>
  );
}
