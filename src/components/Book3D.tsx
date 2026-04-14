"use client";

import { useEffect, useRef } from "react";
import { track } from "@vercel/analytics";

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
      if (!interactedRef.current) {
        interactedRef.current = true;
        track("book3d_interaction");
      }
    }

    function onLeave() {
      targetRef.current.ry = REST_ROT_Y;
      targetRef.current.rx = REST_ROT_X;
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

  // DIAGNOSTIC VERSION — bright solid colors per face, no images.
  // Goal: find out which faces are being rendered so we know if the
  // bug is "face missing from DOM" vs "face occluded" vs "image broken".
  const face = (color: string): React.CSSProperties => ({
    position: "absolute",
    overflow: "hidden",
    background: color,
    border: "2px solid white",
    color: "white",
    fontFamily: "monospace",
    fontSize: 14,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  });

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
          {/* FRONT — RED */}
          <div style={{ ...face("#E63946"), width: W, height: H, top: 0, left: 0, transform: `translateZ(${D / 2}px)` }}>FRONT</div>
          {/* BACK — GREEN */}
          <div style={{ ...face("#2A9D8F"), width: W, height: H, top: 0, left: 0, transform: `rotateY(180deg) translateZ(${D / 2}px)` }}>BACK</div>
          {/* SPINE — BLUE */}
          <div style={{ ...face("#1E40AF"), width: D, height: H, top: 0, left: (W - D) / 2, transform: `rotateY(-90deg) translateZ(${W / 2}px)` }}>SPINE</div>
          {/* PAGES RIGHT — YELLOW */}
          <div style={{ ...face("#EAB308"), width: D, height: H, top: 0, left: (W - D) / 2, transform: `rotateY(90deg) translateZ(${W / 2}px)` }}>EDGE</div>
          {/* PAGES TOP — MAGENTA */}
          <div style={{ ...face("#D946EF"), width: W, height: D, top: (H - D) / 2, left: 0, transform: `rotateX(90deg) translateZ(${H / 2}px)` }}>TOP</div>
          {/* PAGES BOTTOM — CYAN */}
          <div style={{ ...face("#06B6D4"), width: W, height: D, top: (H - D) / 2, left: 0, transform: `rotateX(-90deg) translateZ(${H / 2}px)` }}>BOTTOM</div>
        </div>
      </div>
    </div>
  );
}
