"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { track } from "@vercel/analytics";

/**
 * Book3D — 3D book using the Framer "Shiny 3D Book" assets + proportions,
 * with the Framer "3D Look" movement: perspective 1200 + smooth pointer-follow
 * tilt, plus a gentle idle float so it has life on touch devices too.
 * Six-face CSS box (preserve-3d). Reduced-motion aware.
 */

const FRONT = "/book3d-framer/cover-front.png";
const SPINE = "/book3d-framer/spine.png";
const EDGE_RIGHT = "/book3d-framer/pages-right.png";
const EDGE_TOP = "/book3d-framer/pages-top.png";
const EDGE_BOTTOM = "/book3d-framer/pages-bottom.png";

// Framer proportions: 352 x 517, spine 76 → scaled to fit layouts.
const W = 330;
const H = 485;
const D = 74;

const REST_ROT_Y = 22;
const REST_ROT_X = -6;
const MAX_ROT_Y = 26;
const MAX_ROT_X = 16;
const SENSITIVITY_X = 520;
const SENSITIVITY_Y = 380;
const LERP = 0.1;

export default function Book3D() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const cubeRef = useRef<HTMLDivElement>(null);
  const interactedRef = useRef(false);

  const targetRef = useRef({ ry: REST_ROT_Y, rx: REST_ROT_X });
  const currentRef = useRef({ ry: REST_ROT_Y, rx: REST_ROT_X });
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const cube = cubeRef.current;
    if (!wrap || !cube) return;

    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    function getCenter() {
      const r = cube!.getBoundingClientRect();
      return { cx: r.left + r.width / 2, cy: r.top + r.height / 2 };
    }

    function onMove(e: MouseEvent) {
      const { cx, cy } = getCenter();
      const nx = Math.max(-1, Math.min(1, (e.clientX - cx) / SENSITIVITY_X));
      const ny = Math.max(-1, Math.min(1, (e.clientY - cy) / SENSITIVITY_Y));
      targetRef.current.ry = REST_ROT_Y + nx * MAX_ROT_Y;
      targetRef.current.rx = REST_ROT_X - ny * MAX_ROT_X;
      if (!interactedRef.current) {
        interactedRef.current = true;
        track("book3d_interaction");
      }
    }

    function onLeave() {
      targetRef.current.ry = REST_ROT_Y;
      targetRef.current.rx = REST_ROT_X;
    }

    function tick(now: number) {
      const c = currentRef.current;
      const t = targetRef.current;
      c.ry += (t.ry - c.ry) * LERP;
      c.rx += (t.rx - c.rx) * LERP;
      // Gentle idle float layered on top (keeps the book alive on touch devices).
      const fy = reduceMotion ? 0 : Math.sin(now / 1500) * 2.4;
      const fx = reduceMotion ? 0 : Math.sin(now / 2100) * 1.4;
      cube!.style.transform = `rotateY(${(c.ry + fy).toFixed(2)}deg) rotateX(${(c.rx + fx).toFixed(2)}deg)`;
      rafRef.current = requestAnimationFrame(tick);
    }

    const hero = wrap.closest("section") ?? document.body;
    hero.addEventListener("mousemove", onMove as EventListener);
    hero.addEventListener("mouseleave", onLeave);
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      hero.removeEventListener("mousemove", onMove as EventListener);
      hero.removeEventListener("mouseleave", onLeave);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const faceBase: React.CSSProperties = { position: "absolute", backfaceVisibility: "hidden" };

  return (
    <div ref={wrapRef} style={{ display: "block", padding: "50px 40px", textAlign: "center" }}>
      <div
        style={{
          width: W,
          height: H,
          maxWidth: "78vw",
          margin: "0 auto",
          perspective: "1200px", // Framer "3D Look" perspective value
        }}
      >
        <div
          ref={cubeRef}
          style={{
            width: "100%",
            height: "100%",
            position: "relative",
            transformStyle: "preserve-3d",
            transform: `rotateY(${REST_ROT_Y}deg) rotateX(${REST_ROT_X}deg)`,
            willChange: "transform",
            filter: "drop-shadow(0 40px 60px rgba(0,0,0,0.55))",
          }}
        >
          {/* FRONT cover */}
          <div style={{ ...faceBase, width: W, height: H, top: 0, left: 0, transform: `translateZ(${D / 2}px)` }}>
            <Image src={FRONT} alt="Digital Gold Boom — book cover" fill style={{ objectFit: "cover" }} priority sizes="330px" />
            {/* shine highlight near the spine edge (Framer Cover "Highlight") */}
            <div
              aria-hidden
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(105deg, rgba(255,255,255,0.28) 0%, rgba(255,255,255,0.05) 12%, transparent 32%)",
                mixBlendMode: "screen",
                pointerEvents: "none",
              }}
            />
          </div>
          {/* BACK */}
          <div
            style={{
              ...faceBase,
              width: W,
              height: H,
              top: 0,
              left: 0,
              transform: `rotateY(180deg) translateZ(${D / 2}px)`,
              background: "linear-gradient(135deg, #0b36bf 0%, #07215e 100%)",
            }}
          />
          {/* SPINE (left) */}
          <div style={{ ...faceBase, width: D, height: H, top: 0, left: (W - D) / 2, transform: `rotateY(-90deg) translateZ(${W / 2}px)`, background: "#07215e" }}>
            <Image src={SPINE} alt="" fill style={{ objectFit: "cover" }} sizes="74px" />
          </div>
          {/* PAGES RIGHT */}
          <div style={{ ...faceBase, width: D, height: H, top: 0, left: (W - D) / 2, transform: `rotateY(90deg) translateZ(${W / 2}px)`, background: "#e9e2cf" }}>
            <Image src={EDGE_RIGHT} alt="" fill style={{ objectFit: "cover" }} sizes="74px" />
          </div>
          {/* PAGES TOP */}
          <div style={{ ...faceBase, width: W, height: D, top: (H - D) / 2, left: 0, transform: `rotateX(90deg) translateZ(${H / 2}px)`, background: "#e9e2cf" }}>
            <Image src={EDGE_TOP} alt="" fill style={{ objectFit: "cover" }} sizes="330px" />
          </div>
          {/* PAGES BOTTOM */}
          <div style={{ ...faceBase, width: W, height: D, top: (H - D) / 2, left: 0, transform: `rotateX(-90deg) translateZ(${H / 2}px)`, background: "#e9e2cf" }}>
            <Image src={EDGE_BOTTOM} alt="" fill style={{ objectFit: "cover" }} sizes="330px" />
          </div>
        </div>
      </div>
    </div>
  );
}
