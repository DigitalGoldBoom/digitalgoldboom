"use client";

import { useEffect, useRef } from "react";
import { track } from "@vercel/analytics";

/**
 * Book3D — reconstructed PIECE-FOR-PIECE from the Framer "Shiny 3D Book"
 * (node UBnKjXaG8): every layer at its exact offset/size/fill, staged in Z so
 * the Framer "3D Look" tilt (node reN_yYpir: perspective 1200, pointer-follow,
 * sensitivity ~5, no auto-drift) reveals the spine / page edges / green back.
 *
 * Layers (book box 352x517), back -> front:
 *   Back 2 (green) | Back (blue + magenta stripe + logo) | Spine (l-38) |
 *   Pages Top (t-22) / Bottom (b-22) / Right (r-10) | blue edge lines |
 *   Cover (blue base + cover art + canvas texture + highlight)
 */

const BOOK_W = 352;
const BOOK_H = 517;

const BLUE = "rgb(11,54,191)";
const BLUE_EDGE = "rgb(22,70,226)";
const GREEN = "rgb(0,255,0)";
const MAGENTA = "rgb(128,3,69)";

const IMG = {
  cover: "/book3d-framer/cover-front.png",
  texture: "/book3d-framer/cover-texture.png",
  spine: "/book3d-framer/spine.png",
  pagesRight: "/book3d-framer/pages-right.png",
  pagesTop: "/book3d-framer/pages-top.png",
  pagesBottom: "/book3d-framer/pages-bottom.png",
};

// Framer "3D Look"
const PERSPECTIVE = 1200;
const REST_RY = 18;
const REST_RX = -6;
const MAX_RY = 24;
const MAX_RX = 14;
const SENS_X = 540;
const SENS_Y = 400;
const LERP = 0.1;

export default function Book3D() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const bookRef = useRef<HTMLDivElement>(null);
  const interacted = useRef(false);
  const target = useRef({ ry: REST_RY, rx: REST_RX });
  const current = useRef({ ry: REST_RY, rx: REST_RX });
  const raf = useRef<number | null>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const book = bookRef.current;
    if (!wrap || !book) return;

    function center() {
      const r = book!.getBoundingClientRect();
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
      book!.style.transform = `rotateY(${c.ry.toFixed(2)}deg) rotateX(${c.rx.toFixed(2)}deg)`;
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

  const L = (s: React.CSSProperties): React.CSSProperties => ({ position: "absolute", ...s });
  const cover = (src: string): React.CSSProperties => ({
    backgroundImage: `url(${src})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  });

  return (
    <div ref={wrapRef} style={{ display: "block", padding: "60px 56px", textAlign: "center" }}>
      <div style={{ width: BOOK_W, height: BOOK_H, maxWidth: "82vw", margin: "0 auto", perspective: `${PERSPECTIVE}px` }}>
        <div
          ref={bookRef}
          style={{
            position: "relative",
            width: BOOK_W,
            height: BOOK_H,
            transformStyle: "preserve-3d",
            transform: `rotateY(${REST_RY}deg) rotateX(${REST_RX}deg)`,
            willChange: "transform",
            filter: "drop-shadow(0 46px 64px rgba(0,0,0,0.6))",
          }}
        >
          {/* Back 2 — green hardcover (backmost) */}
          <div style={L({ right: "-0.03px", bottom: "-0.5px", width: BOOK_W, height: BOOK_H, background: GREEN, transform: "translateZ(-40px)", borderRadius: 3 })} />

          {/* Back — blue, with magenta stripe + logo */}
          <div style={L({ left: 0, top: 0, width: 340, height: BOOK_H, background: BLUE, transform: "translateZ(-36px)", borderRadius: 3 })}>
            <div style={L({ left: 156, top: 276, width: 40, height: 21, background: MAGENTA, borderRadius: 2 })} />
            <div style={L({ left: 163, top: 242, width: 23, height: 30, background: MAGENTA, borderRadius: 2 })} />
            <div style={L({ inset: 0, backgroundImage: `url(${IMG.texture})`, backgroundSize: "cover", opacity: 0.19, mixBlendMode: "overlay" })} />
          </div>

          {/* Spine — sticks out left */}
          <div style={L({ left: "-38px", top: 0, width: 76, height: BOOK_H, background: "#06205c", transform: "translateZ(-14px)", ...cover(IMG.spine) })} />

          {/* Page blocks — stick out top / bottom / right */}
          <div style={L({ left: 0, top: "-22px", width: 329, height: 65, transform: "translateZ(-8px)", ...cover(IMG.pagesTop) })} />
          <div style={L({ left: 0, bottom: "-22px", width: 329, height: 69, transform: "translateZ(-8px)", ...cover(IMG.pagesBottom) })} />
          <div style={L({ right: "-10px", top: 10, width: 66, height: 496, transform: "translateZ(-8px)", ...cover(IMG.pagesRight) })} />

          {/* Blue hardcover edge lines */}
          <div style={L({ right: 0, top: 0, width: BOOK_W, height: 4, background: BLUE_EDGE, transform: "translateZ(2px)" })} />
          <div style={L({ left: 0, bottom: 0, width: BOOK_W, height: 4, background: BLUE_EDGE, transform: "translateZ(2px)" })} />
          <div style={L({ right: "-2px", top: 0, width: 4, height: 518, background: BLUE_EDGE, transform: "translateZ(2px)" })} />

          {/* Cover — blue base + cover art + canvas texture + highlight (frontmost) */}
          <div style={L({ left: 0, top: 0, width: 351, height: BOOK_H, background: BLUE, transform: "translateZ(6px)", overflow: "hidden", borderRadius: 3 })}>
            <div style={L({ left: "-1px", top: 0, width: BOOK_W, height: BOOK_H, ...cover(IMG.cover) })} />
            <div style={L({ inset: 0, backgroundImage: `url(${IMG.texture})`, backgroundSize: "cover", opacity: 0.19, mixBlendMode: "overlay" })} />
            <div style={L({ left: 1, top: 0, width: 18, height: BOOK_H, background: "linear-gradient(90deg, rgba(255,255,255,0.28) 0%, rgba(255,255,255,0) 100%)" })} />
          </div>
        </div>
      </div>
    </div>
  );
}
