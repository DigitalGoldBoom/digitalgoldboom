"use client";

import { useEffect, useRef, useState } from "react";
import { track } from "@vercel/analytics";

const W = 354;
const H = 538;
const D = 46;

const MAX_ROT_Y = 26;
const MAX_ROT_X = 20;
const REST_ROT_Y = 14;
const REST_ROT_X = 0;
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

  const sheenRef = useRef({ x: 50, y: 50 });
  const [sheen, setSheen] = useState({ x: 50, y: 50 });

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

      const el = boxRef.current;
      if (el) {
        const r = el.getBoundingClientRect();
        const sx = ((e.clientX - r.left) / r.width) * 100;
        const sy = ((e.clientY - r.top) / r.height) * 100;
        sheenRef.current = {
          x: Math.max(0, Math.min(100, sx)),
          y: Math.max(0, Math.min(100, sy)),
        };
      }

      if (!interactedRef.current) {
        interactedRef.current = true;
        track("book3d_interaction");
      }
    }

    function onLeave() {
      targetRef.current.ry = REST_ROT_Y;
      targetRef.current.rx = REST_ROT_X;
      sheenRef.current = { x: 50, y: 50 };
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
      setSheen({ ...sheenRef.current });
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

  // Face styles — CSS-only, no image dependencies
  const darkFace: React.CSSProperties = {
    background: "linear-gradient(135deg, #0A0A0F 0%, #1A1A24 100%)",
    border: "1px solid rgba(212, 168, 67, 0.25)",
  };
  const edgeFace: React.CSSProperties = {
    background: "linear-gradient(180deg, #0E0E14 0%, #05050A 100%)",
    border: "1px solid rgba(255, 255, 255, 0.05)",
  };
  const pageEdge: React.CSSProperties = {
    background:
      "repeating-linear-gradient(90deg, #1F1F26 0px, #0E0E14 1px, #1F1F26 2px)",
  };

  return (
    <div
      ref={wrapRef}
      style={{
        perspective: 1400,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "40px",
      }}
    >
      <div
        ref={boxRef}
        style={{
          transformStyle: "preserve-3d",
          transform: `rotateY(${REST_ROT_Y}deg) rotateX(${REST_ROT_X}deg)`,
          willChange: "transform",
          filter: "drop-shadow(0 30px 60px rgba(0,0,0,0.6))",
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
          {/* FRONT — typographic cover */}
          <div
            style={{
              ...abs,
              ...darkFace,
              width: W,
              height: H,
              top: 0,
              left: 0,
              transform: `translateZ(${D / 2}px)`,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              padding: "48px 40px",
            }}
          >
            {/* Top eyebrow */}
            <div
              style={{
                fontSize: "10px",
                letterSpacing: "0.2em",
                fontWeight: 600,
                color: "#D4A843",
                fontFamily: "var(--font-geist-mono), monospace",
              }}
            >
              NATGOLD DIGITAL
            </div>

            {/* Title stack */}
            <div>
              <div
                style={{
                  fontSize: "clamp(32px, 5vw, 48px)",
                  fontWeight: 800,
                  color: "#F5F5F7",
                  letterSpacing: "-0.04em",
                  lineHeight: 1.0,
                  fontFamily: "var(--font-jakarta), sans-serif",
                }}
              >
                DIGITAL
              </div>
              <div
                style={{
                  fontSize: "clamp(42px, 6.5vw, 68px)",
                  fontWeight: 800,
                  color: "#D4A843",
                  letterSpacing: "-0.05em",
                  lineHeight: 1.0,
                  marginTop: "4px",
                  fontFamily: "var(--font-jakarta), sans-serif",
                }}
              >
                GOLD
              </div>
              <div
                style={{
                  fontSize: "clamp(32px, 5vw, 48px)",
                  fontWeight: 800,
                  color: "#F5F5F7",
                  letterSpacing: "-0.04em",
                  lineHeight: 1.0,
                  marginTop: "4px",
                  fontFamily: "var(--font-jakarta), sans-serif",
                }}
              >
                BOOM
              </div>
              {/* Gold underline */}
              <div
                style={{
                  width: "60%",
                  height: "2px",
                  background: "#D4A843",
                  marginTop: "16px",
                }}
              />
            </div>

            {/* Bottom byline */}
            <div
              style={{
                fontSize: "11px",
                letterSpacing: "0.15em",
                color: "#9A9AA0",
                textTransform: "uppercase",
                fontFamily: "var(--font-geist-mono), monospace",
              }}
            >
              Andrew Fletcher
            </div>

            {/* Sheen overlay */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                pointerEvents: "none",
                background: `radial-gradient(circle at ${sheen.x}% ${sheen.y}%, rgba(255,255,255,0.08) 0%, transparent 55%)`,
              }}
            />
          </div>

          {/* BACK */}
          <div
            style={{
              ...abs,
              ...darkFace,
              width: W,
              height: H,
              top: 0,
              left: 0,
              transform: `rotateY(180deg) translateZ(${D / 2}px)`,
            }}
          />

          {/* SPINE (LEFT) */}
          <div
            style={{
              ...abs,
              ...edgeFace,
              width: D,
              height: H,
              top: 0,
              left: (W - D) / 2,
              transform: `rotateY(-90deg) translateZ(${W / 2}px)`,
            }}
          />

          {/* PAGES RIGHT */}
          <div
            style={{
              ...abs,
              ...pageEdge,
              width: D,
              height: H,
              top: 0,
              left: (W - D) / 2,
              transform: `rotateY(90deg) translateZ(${W / 2}px)`,
            }}
          />

          {/* PAGES TOP */}
          <div
            style={{
              ...abs,
              ...pageEdge,
              width: W,
              height: D,
              top: (H - D) / 2,
              left: 0,
              transform: `rotateX(90deg) translateZ(${H / 2}px)`,
            }}
          />

          {/* PAGES BOTTOM */}
          <div
            style={{
              ...abs,
              ...pageEdge,
              width: W,
              height: D,
              top: (H - D) / 2,
              left: 0,
              transform: `rotateX(-90deg) translateZ(${H / 2}px)`,
            }}
          />
        </div>
      </div>
    </div>
  );
}
