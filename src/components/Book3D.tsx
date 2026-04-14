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

const REST_ROT_Y = 22;
const REST_ROT_X = -6;
const MAX_ROT_Y = 30;
const MAX_ROT_X = 18;
const SENSITIVITY_X = 480;
const SENSITIVITY_Y = 360;
const LERP = 0.12;

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

    function tick() {
      const c = currentRef.current;
      const t = targetRef.current;
      c.ry += (t.ry - c.ry) * LERP;
      c.rx += (t.rx - c.rx) * LERP;
      cube!.style.transform = `rotateY(${c.ry.toFixed(2)}deg) rotateX(${c.rx.toFixed(2)}deg)`;
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

  // Canonical CSS 3D book — minimal nesting, known-good structure.
  //
  // Layer 1 (wrapRef): plain block for centering. NO 3D properties here.
  // Layer 2 (sceneRef): explicit dims + perspective. This is the camera.
  // Layer 3 (cubeRef): explicit dims + preserve-3d + rotation transform.
  // Layer 4 (faces): six absolutely-positioned children of cubeRef.
  //
  // CRITICAL: NO `filter`, NO `overflow:hidden`, NO `position:absolute`
  // on the 3D-context elements. CSS filter and overflow:hidden break
  // preserve-3d propagation. position:absolute on the cube changes its
  // containing block in ways that flatten descendants.

  return (
    <div ref={wrapRef} style={{ display: "block", padding: "60px 50px", textAlign: "center" }}>
      <div
        style={{
          width: W,
          height: H,
          margin: "0 auto",
          perspective: "1600px",
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
          }}
        >
          {/* FRONT */}
          <div
            style={{
              position: "absolute",
              width: W,
              height: H,
              top: 0,
              left: 0,
              transform: `translateZ(${D / 2}px)`,
              backfaceVisibility: "hidden",
            }}
          >
            <Image src={FRONT} alt="Book cover" fill style={{ objectFit: "cover" }} priority sizes="320px" />
          </div>
          {/* BACK */}
          <div
            style={{
              position: "absolute",
              width: W,
              height: H,
              top: 0,
              left: 0,
              transform: `rotateY(180deg) translateZ(${D / 2}px)`,
              backfaceVisibility: "hidden",
            }}
          >
            <Image src={BACK} alt="Back cover" fill style={{ objectFit: "cover" }} sizes="320px" />
          </div>
          {/* SPINE (LEFT) */}
          <div
            style={{
              position: "absolute",
              width: D,
              height: H,
              top: 0,
              left: (W - D) / 2,
              transform: `rotateY(-90deg) translateZ(${W / 2}px)`,
              backfaceVisibility: "hidden",
              background: "#0E0E14",
            }}
          >
            <Image src={SPINE} alt="Spine" fill style={{ objectFit: "cover" }} sizes="70px" />
          </div>
          {/* PAGES RIGHT */}
          <div
            style={{
              position: "absolute",
              width: D,
              height: H,
              top: 0,
              left: (W - D) / 2,
              transform: `rotateY(90deg) translateZ(${W / 2}px)`,
              backfaceVisibility: "hidden",
              background: "#1A1A24",
            }}
          >
            <Image src={EDGE_RIGHT} alt="Page edges" fill style={{ objectFit: "cover" }} sizes="70px" />
          </div>
          {/* PAGES TOP */}
          <div
            style={{
              position: "absolute",
              width: W,
              height: D,
              top: (H - D) / 2,
              left: 0,
              transform: `rotateX(90deg) translateZ(${H / 2}px)`,
              backfaceVisibility: "hidden",
              background: "#1A1A24",
            }}
          >
            <Image src={EDGE_TOP} alt="Top pages" fill style={{ objectFit: "cover" }} sizes="320px" />
          </div>
          {/* PAGES BOTTOM */}
          <div
            style={{
              position: "absolute",
              width: W,
              height: D,
              top: (H - D) / 2,
              left: 0,
              transform: `rotateX(-90deg) translateZ(${H / 2}px)`,
              backfaceVisibility: "hidden",
              background: "#1A1A24",
            }}
          >
            <Image src={EDGE_BOTTOM} alt="Bottom pages" fill style={{ objectFit: "cover" }} sizes="320px" />
          </div>
        </div>
      </div>
    </div>
  );
}
