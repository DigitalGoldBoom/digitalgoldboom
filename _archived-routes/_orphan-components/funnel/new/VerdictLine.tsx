"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { prefersReducedMotion } from "@/lib/reducedMotion";

/**
 * VerdictLine — the kinetic word-landing treatment. Budget: exactly FOUR uses
 * on the page (design brief §3): S2 "The proof carried the price.", S5
 * "Not less. None.", S8 "the entire downside, in plain view.", S9 headline.
 *
 * Real text stays real: the wrapper carries the sentence for screen readers;
 * the word spans are aria-hidden. Words render VISIBLE and are hidden only
 * from JS on mount (no-JS ships the finished line).
 */
export default function VerdictLine({
  text,
  className,
  style,
}: {
  text: string;
  className?: string;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    if (el.getBoundingClientRect().top < window.innerHeight) return; // already painted

    const words = Array.from(el.querySelectorAll<HTMLElement>(".cold-verdict-word"));
    const ease = "cubic-bezier(0.22, 1, 0.36, 1)";
    words.forEach((w) => {
      w.style.opacity = "0";
      w.style.transform = "translate3d(0, 0.5em, 0)";
      w.style.transition = `opacity 0.5s ${ease}, transform 0.5s ${ease}`;
    });

    const io = new IntersectionObserver(
      (entries, obs) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        words.forEach((w, i) => {
          w.style.transitionDelay = `${(i * 0.09).toFixed(3)}s`;
          w.style.opacity = "1";
          w.style.transform = "translate3d(0, 0, 0)";
        });
        obs.disconnect();
      },
      { rootMargin: "0px 0px -15% 0px", threshold: 0.01 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const words = text.split(" ");
  return (
    <p ref={ref} className={className} style={style} aria-label={text}>
      <span aria-hidden="true">
        {words.map((w, i) => (
          <span key={i} className="cold-verdict-word">
            {w}
            {i < words.length - 1 ? " " : ""}
          </span>
        ))}
      </span>
    </p>
  );
}
