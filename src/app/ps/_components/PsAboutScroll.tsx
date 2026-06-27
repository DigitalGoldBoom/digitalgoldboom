"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * PsAboutScroll — node-exact rebuild of the Framer "About" section: a 300vh PINNED
 * 3D scroll sequence. The giant "DIGITAL GOLD MINING" heading (Inter 700, 160px,
 * -0.06em) fades out; a 3D card prism enters (scale 0.4→1, y up, rotateX -45→0) then
 * rotates on X (~320°) cycling the 4 cards: We Educate → Influence → Invest → Connect.
 * Reduced-motion: a static, readable 2×2 grid (no pin).
 */

const CARDS = [
  { n: "01", title: "We Educate.", body: "Making digital gold mining simple to understand. We help the world see gold's future clearly." },
  { n: "02", title: "We Influence.", body: "Creating media and technology that advance the Digital Gold Boom. Turning ideas into influence and opportunity." },
  { n: "03", title: "We Invest.", body: "Backing projects that power the NatGold ecosystem. Focused on innovation, integrity, and long-term value." },
  { n: "04", title: "We Connect.", body: "Linking investors, partners, and pioneers. Accelerating the movement toward a digital gold economy." },
];

function Card({ n, title, body }: { n: string; title: string; body: string }) {
  return (
    <div
      className="flex h-full w-full flex-col justify-center gap-3 px-8 md:px-12"
      style={{
        background: "rgb(13,13,13)",
        border: "1px solid rgba(255,255,255,0.12)",
        borderRadius: "var(--ps-r-card)",
      }}
    >
      <span style={{ color: "var(--ps-accent)", fontFamily: "var(--font-ps-manrope)", fontSize: 14 }}>{n}</span>
      <h3 className="text-[clamp(1.6rem,3vw,2.5rem)]">{title}</h3>
      <p className="max-w-[46ch] text-[var(--ps-text-2)]">{body}</p>
    </div>
  );
}

export default function PsAboutScroll() {
  const root = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const prismRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const faces = CARDS.length;
      const radius = 150; // half the face height (300px) for a 4-face X prism @90°

      // place faces around an X-axis prism
      gsap.set(prismRef.current!.children, {
        position: "absolute",
        inset: 0,
        backfaceVisibility: "hidden",
      });
      Array.from(prismRef.current!.children).forEach((face, i) => {
        gsap.set(face, { rotateX: i * 90, transformOrigin: "50% 50%", z: radius });
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current!,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.6,
        },
      });

      // heading fades + lifts away early
      tl.fromTo(headingRef.current!, { opacity: 1, y: 0 }, { opacity: 0, y: -120, duration: 0.18, ease: "power2.in" }, 0);

      // stage entrance: from far/below/tilted to front
      tl.fromTo(
        stageRef.current!,
        { scale: 0.4, yPercent: 60, rotateX: -45, opacity: 0 },
        { scale: 1, yPercent: 0, rotateX: 0, opacity: 1, duration: 0.22, ease: "power2.out" },
        0.05
      );

      // prism rotates through the faces (0 → last face) across the rest of the scroll
      tl.to(prismRef.current!, { rotateX: -(faces - 1) * 90, duration: 0.7, ease: "none" }, 0.28);
    },
    { scope: root }
  );

  return (
    <section ref={root} id="about" className="ps-about-section">
      <div className="ps-about-pin flex flex-col items-center justify-center px-5">
        <h2
          ref={headingRef}
          className="ps-about-heading ps-about-motion pointer-events-none absolute text-center"
          style={{
            fontFamily: "var(--font-ps-inter)",
            fontWeight: 700,
            fontSize: "clamp(2.75rem, 12vw, 160px)",
            letterSpacing: "-0.06em",
            lineHeight: "0.9em",
            color: "#fff",
          }}
        >
          DIGITAL GOLD MINING
        </h2>

        {/* 3D stage */}
        <div ref={stageRef} className="ps-about-motion" style={{ perspective: "1400px", width: "min(960px, 92vw)" }}>
          <div
            ref={prismRef}
            style={{ position: "relative", width: "100%", height: "300px", transformStyle: "preserve-3d" }}
          >
            {CARDS.map((c) => (
              <Card key={c.n} {...c} />
            ))}
          </div>
        </div>

        {/* Static fallback grid for reduced-motion (CSS-shown only when motion reduced) */}
        <div className="ps-about-fallback ps-wrap grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
          {CARDS.map((c) => (
            <div key={c.n} className="h-[200px]">
              <Card {...c} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
