"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "@/lib/reducedMotion";

gsap.registerPlugin(ScrollTrigger);

type Position = "full" | "right" | "left" | "corner-br" | "corner-tl";

type SectionImageProps = {
  src: string;
  alt?: string;
  position?: Position;
  opacity?: number;
  parallax?: number;
  maxWidth?: number;
  priority?: boolean;
  sizes?: string;
};

export default function SectionImage({
  src,
  alt = "",
  position = "full",
  opacity = 0.5,
  parallax = 0.4,
  maxWidth = 900,
  priority = false,
  sizes = "(max-width: 768px) 100vw, 900px",
}: SectionImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    if (prefersReducedMotion()) return;
    if (parallax === 1) return;

    const section = el.closest("section");
    if (!section) return;

    const offset = 120;
    const tween = gsap.fromTo(
      el,
      { y: -offset * parallax },
      {
        y: offset * parallax,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      },
    );

    return () => {
      if (tween.scrollTrigger) tween.scrollTrigger.kill();
      tween.kill();
    };
  }, [parallax]);

  const positionStyles: React.CSSProperties = (() => {
    switch (position) {
      case "full":
        return { inset: 0 };
      case "right":
        return { top: 0, right: 0, bottom: 0, width: `${maxWidth}px` };
      case "left":
        return { top: 0, left: 0, bottom: 0, width: `${maxWidth}px` };
      case "corner-br":
        return { bottom: 0, right: 0, width: `${maxWidth}px`, height: `${maxWidth * 0.8}px` };
      case "corner-tl":
        return { top: 0, left: 0, width: `${maxWidth}px`, height: `${maxWidth * 0.8}px` };
    }
  })();

  const hideOnMobile =
    position === "right" || position === "left" || position === "corner-br" || position === "corner-tl";

  return (
    <div
      ref={containerRef}
      aria-hidden
      className={`pointer-events-none absolute ${hideOnMobile ? "hidden md:block" : ""}`}
      style={{
        ...positionStyles,
        opacity,
        zIndex: 1,
        willChange: "transform",
      }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        style={{ objectFit: "cover" }}
      />
    </div>
  );
}
