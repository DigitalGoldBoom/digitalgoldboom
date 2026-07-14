"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Reveal — fades + lifts its children in when they scroll into view, once.
 *
 * Deliberately not GSAP: this page has 17 identical reveals and nothing scrubbed or pinned, so an
 * IntersectionObserver is both lighter and enough. Opacity/transform only, so it never triggers
 * layout. The reduced-motion path is handled in CSS (.chp-reveal), which pins the element to its
 * final state — so a reduced-motion visitor sees the content immediately, never a blank page.
 */
export default function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  /** ms — stagger a group by passing 0 / 90 / 180 … */
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      // Fire a little before the element is fully on screen so the motion reads as arrival,
      // not as a pop after the reader is already looking at it.
      { rootMargin: "0px 0px -12% 0px", threshold: 0.05 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`chp-reveal ${shown ? "is-in" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
