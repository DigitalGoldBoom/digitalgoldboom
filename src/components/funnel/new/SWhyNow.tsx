"use client";

import { useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { useScrollReveal } from "@/hooks/useScrollReveal";

gsap.registerPlugin(MotionPathPlugin);

/**
 * S6 — WHY NOW. Three thin orbits that rotate into alignment as the reader
 * scrolls — the book's comet geometry, drawn quietly (rare and mechanical,
 * never urgent and salesy). The scroll performs the alignment.
 *
 * Static state (no-JS / reduced-motion): orbs authored AT the conjunction —
 * already aligned. Motion moves them back along their paths and scrubs them in.
 * Hover-teach (desktop only): hovering a force row brightens its orbit.
 */

// Three ellipses sharing one tilt; each path STARTS at its conjunction point
// (the right-hand ray), so motionPath end=1 is alignment.
const ORBITS = [
  { rx: 168, ry: 58, from: 0.42, key: "gold" },
  { rx: 118, ry: 42, from: 0.62, key: "rails" },
  { rx: 68, ry: 24, from: 0.8, key: "money" },
];
const CX = 200;
const CY = 200;
const TILT = -18;

function orbitPath(rx: number, ry: number): string {
  // Ellipse as two arcs, starting at the +x axis point of the tilted ellipse.
  const rad = (TILT * Math.PI) / 180;
  const sx = CX + rx * Math.cos(rad);
  const sy = CY + rx * Math.sin(rad);
  const ex = CX - rx * Math.cos(rad);
  const ey = CY - rx * Math.sin(rad);
  return `M ${sx} ${sy} A ${rx} ${ry} ${TILT} 1 0 ${ex} ${ey} A ${rx} ${ry} ${TILT} 1 0 ${sx} ${sy}`;
}

const FORCES = [
  {
    key: "gold",
    lead: "Gold",
    body: "— six thousand years old, and in 2025 it passed US Treasuries as the largest reserve asset central banks hold.",
  },
  {
    key: "rails",
    lead: "The rails",
    body: "— blockchain infrastructure now moving value for the largest names in finance, BlackRock and JPMorgan among them.",
  },
  {
    key: "money",
    lead: "The money",
    body: "— an estimated $124 trillion passing over the coming decades to a generation that holds gold at three times its grandparents’ rate, yet screens what it owns for environmental harm. They want the gold. They cannot defend the mine.",
  },
];

export default function SWhyNow() {
  const ref = useRef<HTMLElement>(null);
  const [hot, setHot] = useState<string | null>(null);
  useScrollReveal(ref);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: ref.current,
            start: "top 75%",
            end: "bottom 55%",
            scrub: 0.5,
          },
        });
        ORBITS.forEach((o, i) => {
          tl.fromTo(
            `[data-orb="${o.key}"]`,
            { motionPath: { path: `#cold-orbit-${o.key}`, start: o.from, end: o.from } },
            {
              motionPath: { path: `#cold-orbit-${o.key}`, start: o.from, end: 1 },
              ease: "none",
              duration: 1,
            },
            0,
          );
          void i;
        });
        // the conjunction glow arrives with the alignment
        tl.fromTo("[data-conjunction]", { opacity: 0 }, { opacity: 1, ease: "none", duration: 0.25 }, 0.75);
      });
    },
    { scope: ref },
  );

  const diagram = (
    <svg
      viewBox="0 0 400 400"
      role="img"
      aria-label="Three orbits aligning at a single point"
      className="h-auto w-full max-w-[420px]"
    >
      {ORBITS.map((o) => (
        <path
          key={o.key}
          id={`cold-orbit-${o.key}`}
          d={orbitPath(o.rx, o.ry)}
          fill="none"
          stroke={
            o.key === "gold"
              ? "rgba(232,178,58,0.6)"
              : o.key === "rails"
                ? "rgba(232,178,58,0.35)"
                : "rgba(255,255,255,0.25)"
          }
          strokeWidth={hot === o.key ? 1.75 : 1}
          style={{ transition: "stroke-width .2s ease, opacity .2s ease" }}
          opacity={hot && hot !== o.key ? 0.4 : 1}
        />
      ))}
      {/* orbs — authored at the conjunction (path start = the alignment ray) */}
      {ORBITS.map((o) => {
        const rad = (TILT * Math.PI) / 180;
        const x = CX + o.rx * Math.cos(rad);
        const y = CY + o.rx * Math.sin(rad);
        return (
          <circle
            key={o.key}
            data-orb={o.key}
            cx={x}
            cy={y}
            r={o.key === "money" ? 3 : 4}
            fill={o.key === "money" ? "#F4F4F7" : "var(--v2-gold)"}
          />
        );
      })}
      {/* the conjunction glow */}
      <circle
        data-conjunction
        cx={CX + ORBITS[0].rx * Math.cos((TILT * Math.PI) / 180) + 10}
        cy={CY + ORBITS[0].rx * Math.sin((TILT * Math.PI) / 180)}
        r="22"
        fill="url(#cold-conj-glow)"
      />
      <defs>
        <radialGradient id="cold-conj-glow">
          <stop offset="0%" stopColor="rgba(232,178,58,0.5)" />
          <stop offset="100%" stopColor="rgba(232,178,58,0)" />
        </radialGradient>
      </defs>
    </svg>
  );

  return (
    <section id="cold-s6" ref={ref} className="cold-section">
      <div className="cold-wrap">
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-[1.05fr_0.95fr] md:gap-16">
          <div className="order-2 md:order-1">
            <p data-reveal className="v2-eyebrow">Why now</p>
            <h2
              data-reveal
              className="v2-display mt-6"
              style={{ fontSize: "clamp(1.9rem, 4.4vw, 3.4rem)", maxWidth: "16ch" }}
            >
              Three separate clocks. <span className="v2-gold">One moment.</span>
            </h2>
            <div className="mt-8 flex flex-col gap-5">
              {FORCES.map((f) => (
                <p
                  key={f.key}
                  data-reveal
                  className="cold-body"
                  onPointerEnter={() => setHot(f.key)}
                  onPointerLeave={() => setHot(null)}
                >
                  <strong>{f.lead}</strong> {f.body}
                </p>
              ))}
            </div>
            <p data-reveal className="cold-body mt-6">
              Digital gold mining is where the three meet. Chapter 8 makes the case that this
              alignment happens once — then locks in place.
            </p>
            <p data-reveal className="mt-4 text-sm leading-relaxed" style={{ color: "var(--v2-faint)" }}>
              That is the author’s case, not settled fact; the book builds it so you can judge it.
            </p>
            <p data-reveal className="cold-loop mt-9">
              A case this size stands or falls on who is building it. So — who built it?
            </p>
          </div>
          <div className="order-1 flex max-h-[40svh] justify-center md:order-2 md:max-h-none">
            {diagram}
          </div>
        </div>
      </div>
    </section>
  );
}
