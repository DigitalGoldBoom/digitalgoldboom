"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { track } from "@vercel/analytics";

const FRONT = "/images/Digital Gold Boom Cover (1).png";
const SPINE = "/images/DGB Spine.png";
const BACK = "/images/book-edges/back-cover.png";
const EDGE_RIGHT = "/images/book-edges/edge-right.png";
const EDGE_TOP = "/images/book-edges/edge-top.png";
const EDGE_BOTTOM = "/images/book-edges/edge-bottom.png";

const W = 320;
const H = 480;
const D = 70;

const MAX_ROT_Y = 30;
const MAX_ROT_X = 18;
const REST_ROT_Y = 22;
const REST_ROT_X = -6;
const SENSITIVITY_X = 480;
const SENSITIVITY_Y = 360;
const LERP = 0.12;

export default function Book3D() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const sheenRef = useRef<HTMLDivElement>(null);
  const interactedRef = useRef(false);

  const targetRef = useRef({ ry: REST_ROT_Y, rx: REST_ROT_X });
  const currentRef = useRef({ ry: REST_ROT_Y, rx: REST_ROT_X });
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    function getBookCenter() {
      const el = boxRef.current;
      if (!el) return { cx: 0, cy: 0 };
      const r = el.getBoundingClientRect();
      return { cx: r.left + r.width / 2, cy: r.top + r.height / 2 };
    }

    function onMove(e: MouseEvent) {
      const { cx, cy } = getBookCenter();
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;

      const nx = Math.max(-1, Math.min(1, dx / SENSITIVITY_X));
      const ny = Math.max(-1, Math.min(1, dy / SENSITIVITY_Y));

      targetRef.current.ry = REST_ROT_Y + nx * MAX_ROT_Y;
      targetRef.current.rx = REST_ROT_X - ny * MAX_ROT_X;

      const sheen = sheenRef.current;
      const box = boxRef.current;
      if (sheen && box) {
        const r = box.getBoundingClientRect();
        const sx = ((e.clientX - r.left) / r.width) * 100;
        const sy = ((e.clientY - r.top) / r.height) * 100;
        sheen.style.background = `radial-gradient(circle at ${Math.max(0, Math.min(100, sx))}% ${Math.max(0, Math.min(100, sy))}%, rgba(255,255,255,0.18) 0%, transparent 55%)`;
      }

      if (!interactedRef.current) {
        interactedRef.current = true;
        track("book3d_interaction");
      }
    }

    function onLeave() {
      targetRef.current.ry = REST_ROT_Y;
      targetRef.current.rx = REST_ROT_X;
      const sheen = sheenRef.current;
      if (sheen) {
        sheen.style.background = "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.10) 0%, transparent 55%)";
      }
    }

    function tick() {
      const c = currentRef.current;
      const t = targetRef.current;
      c.ry += (t.ry - c.ry) * LERP;
      c.rx += (t.rx - c.rx) * LERP;
      const el = boxRef.current;
      if (el) {
        el.style.transform = `rotateY(${c.ry.toFixed(2)}deg) rotateX(${c.rx.toFixed(2)}deg)`;
      }
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

  const abs: React.CSSProperties = { position: "absolute", overflow: "hidden" };

  return (
    <div
      ref={wrapRef}
      style={{
        perspective: 1600,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "60px",
      }}
    >
      <div
        ref={boxRef}
        style={{
          transformStyle: "preserve-3d",
          willChange: "transform",
          filter: "drop-shadow(0 30px 60px rgba(0,0,0,0.7))",
        }}
      >
        <div
          style={{
            width: W,
            height: H,
            position: "relative",
            transformStyle: "preserve-3d",
          }}
        >
          {/* FRONT */}
          <div style={{ ...abs, width: W, height: H, top: 0, left: 0, transform: `translateZ(${D / 2}px)` }}>
            <Image src={FRONT} alt="Book cover" fill style={{ objectFit: "cover" }} priority sizes="320px" />
            <div
              ref={sheenRef}
              style={{
                position: "absolute",
                inset: 0,
                pointerEvents: "none",
                background: "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.10) 0%, transparent 55%)",
              }}
            />
          </div>
          {/* BACK */}
          <div style={{ ...abs, width: W, height: H, top: 0, left: 0, transform: `rotateY(180deg) translateZ(${D / 2}px)` }}>
            <Image src={BACK} alt="Back cover" fill style={{ objectFit: "cover" }} sizes="320px" />
          </div>
          {/* SPINE (LEFT) */}
          <div style={{ ...abs, width: D, height: H, top: 0, left: (W - D) / 2, transform: `rotateY(-90deg) translateZ(${W / 2}px)`, background: "#0E0E14" }}>
            <Image src={SPINE} alt="Spine" fill style={{ objectFit: "cover" }} sizes="70px" />
          </div>
          {/* PAGES RIGHT */}
          <div style={{ ...abs, width: D, height: H, top: 0, left: (W - D) / 2, transform: `rotateY(90deg) translateZ(${W / 2}px)`, background: "#1A1A24" }}>
            <Image src={EDGE_RIGHT} alt="Page edges" fill style={{ objectFit: "cover" }} sizes="70px" />
          </div>
          {/* PAGES TOP */}
          <div style={{ ...abs, width: W, height: D, top: (H - D) / 2, left: 0, transform: `rotateX(90deg) translateZ(${H / 2}px)`, background: "#1A1A24" }}>
            <Image src={EDGE_TOP} alt="Top pages" fill style={{ objectFit: "cover" }} sizes="320px" />
          </div>
          {/* PAGES BOTTOM */}
          <div style={{ ...abs, width: W, height: D, top: (H - D) / 2, left: 0, transform: `rotateX(-90deg) translateZ(${H / 2}px)`, background: "#1A1A24" }}>
            <Image src={EDGE_BOTTOM} alt="Bottom pages" fill style={{ objectFit: "cover" }} sizes="320px" />
          </div>
        </div>
      </div>
    </div>
  );
}
