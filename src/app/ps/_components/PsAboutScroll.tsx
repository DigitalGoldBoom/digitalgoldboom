"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { PS_WORDMARK } from "./psAssets";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// A phone's address bar sliding away fires a resize. By default ScrollTrigger answers a resize by
// re-measuring every trigger mid-scroll, and a scrubbed, pinned 300svh section re-measured under
// the reader's thumb is a visible lurch. The viewport did not really change — the browser chrome
// did — so the honest answer is to ignore it. (The CSS is sized in svh for the same reason.)
ScrollTrigger.config({ ignoreMobileResize: true });

/**
 * PsAboutScroll — Framer "About / DIGITAL GOLD MINING": 300vh PINNED 3D scroll.
 * A gold wireframe cube spins up top; the 160px heading + a green scroll bullet fade
 * out; a 3D card prism enters (scale 0.4→1, up, rotateX -45→0) then rotates on X
 * cycling the 4 cards. Cards: transparent w/ green border, green title, PixelShovel
 * wordmark, giant faint number watermark. Reduced-motion → static 2×2 grid.
 */

const CARDS = [
  { n: "01", title: "We Educate.", body: "Making digital gold mining simple to understand. We help the world see gold's future clearly." },
  { n: "02", title: "We Influence.", body: "Creating media and technology that advance the Digital Gold Boom. Turning ideas into influence and opportunity." },
  { n: "03", title: "We Invest.", body: "Backing projects that power the NatGold ecosystem. Focused on innovation, integrity, and long-term value." },
  { n: "04", title: "We Connect.", body: "Linking investors, partners, and pioneers. Accelerating the movement toward a digital gold economy." },
];

// 4-face X-axis prism (radius = half the 240px face height)
const FACE_TF = [
  "rotateX(0deg) translateZ(120px)",
  "rotateX(90deg) translateZ(120px)",
  "rotateX(180deg) translateZ(120px)",
  "rotateX(270deg) translateZ(120px)",
];

// gold wireframe cube — 6 faces; depth = --gh (half the responsive cube size)
const CUBE6 = [
  "rotateY(0deg) translateZ(var(--gh))",
  "rotateY(90deg) translateZ(var(--gh))",
  "rotateY(180deg) translateZ(var(--gh))",
  "rotateY(270deg) translateZ(var(--gh))",
  "rotateX(90deg) translateZ(var(--gh))",
  "rotateX(-90deg) translateZ(var(--gh))",
];

function Card({ n, title, body }: { n: string; title: string; body: string }) {
  return (
    <div className="ps-about-card">
      <Image src={PS_WORDMARK} alt="PixelShovel" width={132} height={22} className="h-[18px] w-auto self-start opacity-80" />
      <h3 className="ps-about-card-title">{title}</h3>
      <p className="ps-about-card-body">{body}</p>
      <span className="ps-about-card-num" aria-hidden>{n}</span>
    </div>
  );
}

export default function PsAboutScroll() {
  const root = useRef<HTMLElement>(null);
  const fadeGroup = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const prismRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      Array.from(prismRef.current!.children).forEach((face, i) => {
        gsap.set(face, { position: "absolute", inset: 0, backfaceVisibility: "hidden", transform: FACE_TF[i] });
      });
      const tl = gsap.timeline({
        scrollTrigger: { trigger: root.current!, start: "top top", end: "bottom bottom", scrub: 0.6 },
      });
      // gold cube + heading + bullet fade out (opacity only — matches Framer)
      tl.to(fadeGroup.current!, { opacity: 0, duration: 0.18, ease: "power2.in" }, 0);
      // stage enters from far/below/tilted
      tl.fromTo(
        stageRef.current!,
        { scale: 0.4, yPercent: 55, rotateX: -45, opacity: 0 },
        { scale: 1, yPercent: 0, rotateX: 0, opacity: 1, duration: 0.22, ease: "power2.out" },
        0.05
      );
      // prism rotates through the 4 faces
      tl.to(prismRef.current!, { rotateX: -(CARDS.length - 1) * 90, duration: 0.7, ease: "none" }, 0.28);
    },
    { scope: root }
  );

  return (
    <section ref={root} id="about" className="ps-about-section">
      <div className="ps-about-pin">
        {/* fade group: gold cube + heading + scroll bullet */}
        <div ref={fadeGroup} className="ps-about-motion ps-about-fadegroup">
          <div className="ps-goldcube" aria-hidden>
            {/* 5 nested cubes, alternating spin direction + speed (Framer RotatingCubes: totalCubes 5) */}
            {[1, 0.8, 0.6, 0.4, 0.22].map((s, li) => (
              <div key={li} className="ps-goldcube-layer" style={{ transform: `scale(${s})` }}>
                <div
                  className="ps-goldcube-spin"
                  style={{ animationDuration: `${11 + li * 3}s`, animationDirection: li % 2 ? "reverse" : "normal" }}
                >
                  {CUBE6.map((tf, i) => (
                    <div key={i} className="ps-goldcube-face" style={{ transform: tf }} />
                  ))}
                </div>
              </div>
            ))}
          </div>
          <h2 className="ps-about-heading">DIGITAL GOLD MINING</h2>
          <div className="ps-about-bullet" aria-hidden>
            <span />
          </div>
        </div>

        {/* 3D card prism */}
        <div ref={stageRef} className="ps-about-motion ps-about-stage">
          <div ref={prismRef} className="ps-about-prism">
            {CARDS.map((c) => (
              <Card key={c.n} {...c} />
            ))}
          </div>
        </div>

        {/* reduced-motion static grid */}
        <div className="ps-about-fallback ps-wrap">
          {CARDS.map((c) => (
            <div key={c.n} style={{ minHeight: 200 }}>
              <Card {...c} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
