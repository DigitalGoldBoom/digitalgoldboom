"use client";

import { useEffect, useRef, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { onWorldUpdate } from "./filmBus";

/**
 * THE SEAM — the one continuous gold element: a 2px thread that grows with
 * scroll (fill transform reads --seam-progress straight from CSS; zero JS on
 * the fill). JS here only places the 7 waypoint nodes and flips their
 * passed-state (idempotent, once per crossing, one-shot pulse).
 * Desktop/tablet: fixed left rail. Phone: 2px top progress bar with ticks.
 * Reduced-motion: film.css renders the static hairline; no JS state changes.
 */

const NODE_SECTIONS = [
  "s-hero",
  "s-trillion",
  "s-who-built",
  "s-why-now",
  "s-inside",
  "s-author",
  "s-close",
];

export default function Seam() {
  const [fractions, setFractions] = useState<number[]>([]);
  const railRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const passed = useRef<boolean[]>([]);

  useEffect(() => {
    const compute = () => {
      // Same denominator as the WorldDriver: the FILM ends at #s-close bottom,
      // so node fractions live in the trigger's 0–1 progress domain.
      const close = document.getElementById("s-close");
      const pageMax = document.documentElement.scrollHeight - window.innerHeight;
      const max = close
        ? Math.min(pageMax, close.offsetTop + close.offsetHeight - window.innerHeight)
        : pageMax;
      if (max <= 0) return;
      setFractions(
        NODE_SECTIONS.map((id) => {
          const el = document.getElementById(id);
          if (!el) return 0;
          const top = el.getBoundingClientRect().top + window.scrollY;
          return Math.min(1, Math.max(0, top / max));
        }),
      );
    };
    compute();
    // Recompute when ScrollTrigger re-measures (fonts, images, resize).
    const onRefresh = () => compute();
    ScrollTrigger.addEventListener("refresh", onRefresh);
    let t: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(t);
      t = setTimeout(compute, 200);
    };
    window.addEventListener("resize", onResize, { passive: true });
    return () => {
      ScrollTrigger.removeEventListener("refresh", onRefresh);
      window.removeEventListener("resize", onResize);
      clearTimeout(t);
    };
  }, []);

  useEffect(() => {
    passed.current = fractions.map(() => false);
    const flip = (container: HTMLElement | null, selector: string) => {
      if (!container) return () => {};
      return onWorldUpdate((_d, seam) => {
        const nodes = container.querySelectorAll<HTMLElement>(selector);
        nodes.forEach((node, i) => {
          const hit = seam >= (fractions[i] ?? 2);
          if (hit && !passed.current[i]) {
            passed.current[i] = true;
            node.dataset.passed = "true";
            node.dataset.pulse = "true";
          } else if (!hit && passed.current[i]) {
            passed.current[i] = false;
            node.dataset.passed = "false";
            delete node.dataset.pulse;
          }
        });
      });
    };
    const offRail = flip(railRef.current, ".sfilm-seam-node");
    const offBar = flip(barRef.current, ".sfilm-seam-bar-tick");
    return () => {
      offRail();
      offBar();
    };
  }, [fractions]);

  // The descent's one narrative flourish: the seam tip pulses once when the
  // thread "connects to the vein" (fired by the Descent timeline via event).
  useEffect(() => {
    const fill = fillRef.current;
    if (!fill) return;
    const onPulse = () => {
      fill.dataset.pulse = "true";
      setTimeout(() => delete fill.dataset.pulse, 450);
    };
    window.addEventListener("sfilm:seam-pulse", onPulse);
    return () => window.removeEventListener("sfilm:seam-pulse", onPulse);
  }, []);

  return (
    <>
      {/* Desktop / tablet rail */}
      <div ref={railRef} aria-hidden className="sfilm-seam">
        <div className="sfilm-seam-track" />
        <div ref={fillRef} className="sfilm-seam-fill" />
        {fractions.map((f, i) => (
          <div
            key={NODE_SECTIONS[i]}
            className="sfilm-seam-node"
            style={{ top: `${(f * 100).toFixed(2)}%` }}
          />
        ))}
      </div>
      {/* Phone top bar */}
      <div ref={barRef} aria-hidden className="sfilm-seam-bar">
        <div className="sfilm-seam-bar-fill" />
        {fractions.map((f, i) => (
          <div
            key={NODE_SECTIONS[i]}
            className="sfilm-seam-bar-tick"
            style={{ left: `${(f * 100).toFixed(2)}%` }}
          />
        ))}
      </div>
    </>
  );
}
