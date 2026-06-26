"use client";

import { useEffect, useRef } from "react";
import { track } from "@vercel/analytics";

/**
 * Book3D — Framer "Shiny 3D Book" rebuilt as a true 3D box so the angles are
 * coherent: six rotated faces (front cover, back, spine=left, page edges =
 * right/top/bottom) using the real Framer face images, depth = spine width 76.
 * Wrapped in the Framer "3D Look" (perspective 1200, pointer-follow tilt,
 * no auto-drift). Front cover = blue base + cover art + canvas texture + highlight.
 */

const W = 340;
const H = 500;
const D = 76; // Framer spine width = book thickness

const BLUE = "rgb(11,54,191)";
const DARK_BLUE = "#06205c";
const MAGENTA = "rgb(128,3,69)";

const IMG = {
  cover: "/book3d-framer/cover-front.png",
  texture: "/book3d-framer/cover-texture.png",
  spine: "/book3d-framer/spine.png",
  pagesRight: "/book3d-framer/pages-right.png",
  pagesTop: "/book3d-framer/pages-top.png",
  pagesBottom: "/book3d-framer/pages-bottom.png",
};

const PERSPECTIVE = 1200;
const REST_RY = 6; // near front-on; tilts both ways with the mouse
const REST_RX = -6;
const MAX_RY = 46; // mouse-left -> ~-40deg (reveals page edges), right -> spine
const MAX_RX = 22;
const SENS_X = 360; // smaller = more responsive to mouse position
const SENS_Y = 300;
const LERP = 0.17; // snappier / faster follow

export default function Book3D() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const interacted = useRef(false);
  const target = useRef({ ry: REST_RY, rx: REST_RX });
  const current = useRef({ ry: REST_RY, rx: REST_RX });
  const raf = useRef<number | null>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const box = boxRef.current;
    if (!wrap || !box) return;

    function center() {
      const r = box!.getBoundingClientRect();
      return { cx: r.left + r.width / 2, cy: r.top + r.height / 2 };
    }
    function onMove(e: MouseEvent) {
      const { cx, cy } = center();
      const nx = Math.max(-1, Math.min(1, (e.clientX - cx) / SENS_X));
      const ny = Math.max(-1, Math.min(1, (e.clientY - cy) / SENS_Y));
      target.current.ry = REST_RY + nx * MAX_RY;
      target.current.rx = REST_RX - ny * MAX_RX;
      if (!interacted.current) {
        interacted.current = true;
        track("book3d_interaction");
      }
    }
    function onLeave() {
      target.current.ry = REST_RY;
      target.current.rx = REST_RX;
    }
    function tick() {
      const c = current.current;
      const t = target.current;
      c.ry += (t.ry - c.ry) * LERP;
      c.rx += (t.rx - c.rx) * LERP;
      box!.style.transform = `translateZ(-${D / 2}px) rotateY(${c.ry.toFixed(2)}deg) rotateX(${c.rx.toFixed(2)}deg)`;
      raf.current = requestAnimationFrame(tick);
    }
    const scope = wrap.closest("section") ?? document.body;
    scope.addEventListener("mousemove", onMove as EventListener);
    scope.addEventListener("mouseleave", onLeave);
    raf.current = requestAnimationFrame(tick);
    return () => {
      scope.removeEventListener("mousemove", onMove as EventListener);
      scope.removeEventListener("mouseleave", onLeave);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, []);

  const face: React.CSSProperties = { position: "absolute", backfaceVisibility: "hidden" };
  const img = (src: string): React.CSSProperties => ({
    backgroundImage: `url(${src})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  });

  return (
    <div ref={wrapRef} style={{ display: "block", padding: "60px 56px", textAlign: "center" }}>
      <div style={{ position: "relative", width: W, height: H, maxWidth: "82vw", margin: "0 auto", perspective: `${PERSPECTIVE}px` }}>
        {/* Soft ground shadow (flat layer, not a filter on the 3D box) */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            left: "6%",
            right: "6%",
            bottom: "-5%",
            height: "16%",
            background: "radial-gradient(50% 50% at 50% 50%, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0) 70%)",
            filter: "blur(20px)",
          }}
        />
        <div
          ref={boxRef}
          style={{
            position: "relative",
            width: W,
            height: H,
            transformStyle: "preserve-3d",
            transform: `translateZ(-${D / 2}px) rotateY(${REST_RY}deg) rotateX(${REST_RX}deg)`,
            willChange: "transform",
          }}
        >
          {/* FRONT cover: blue base + art + texture + highlight */}
          <div style={{ ...face, width: W, height: H, left: 0, top: 0, transform: `translateZ(${D / 2}px)`, background: BLUE, overflow: "hidden", borderRadius: 3 }}>
            <div style={{ ...face, inset: 0, ...img(IMG.cover) }} />
            <div style={{ ...face, inset: 0, ...img(IMG.texture), opacity: 0.2, mixBlendMode: "overlay" }} />
            <div style={{ ...face, left: 0, top: 0, width: 18, height: H, background: "linear-gradient(90deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 100%)" }} />
          </div>

          {/* BACK: blue + magenta stripe + logo */}
          <div style={{ ...face, width: W, height: H, left: 0, top: 0, transform: `rotateY(180deg) translateZ(${D / 2}px)`, background: BLUE, borderRadius: 3 }}>
            <div style={{ ...face, left: "44%", top: "53%", width: 40, height: 21, background: MAGENTA, borderRadius: 2 }} />
            <div style={{ ...face, left: "46%", top: "46%", width: 23, height: 30, background: MAGENTA, borderRadius: 2 }} />
          </div>

          {/* SPINE = left face */}
          <div style={{ ...face, width: D, height: H, left: (W - D) / 2, top: 0, transform: `rotateY(-90deg) translateZ(${W / 2}px)`, background: DARK_BLUE, ...img(IMG.spine) }} />

          {/* RIGHT page edge */}
          <div style={{ ...face, width: D, height: H, left: (W - D) / 2, top: 0, transform: `rotateY(90deg) translateZ(${W / 2}px)`, background: "#efe9da", ...img(IMG.pagesRight) }} />

          {/* TOP page edge */}
          <div style={{ ...face, width: W, height: D, left: 0, top: (H - D) / 2, transform: `rotateX(90deg) translateZ(${H / 2}px)`, background: "#efe9da", ...img(IMG.pagesTop) }} />

          {/* BOTTOM page edge */}
          <div style={{ ...face, width: W, height: D, left: 0, top: (H - D) / 2, transform: `rotateX(-90deg) translateZ(${H / 2}px)`, background: "#efe9da", ...img(IMG.pagesBottom) }} />
        </div>
      </div>
    </div>
  );
}
