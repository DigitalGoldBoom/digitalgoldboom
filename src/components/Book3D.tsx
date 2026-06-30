"use client";

import { useEffect, useRef } from "react";
import { track } from "@vercel/analytics";
import { prefersReducedMotion } from "@/lib/reducedMotion";

/**
 * Book3D — the Framer "Shiny 3D Book" (project h7uVE54n7s54yca4fGmI, node UBnKjXaG8)
 * rebuilt from scratch as a TRUE CSS 3D box.
 *
 * Framer exposed the 29 pieces only as flat 2D layers (no rotation/Z data), so the
 * real depth is reconstructed here as six rotated faces of one box:
 *   front = blue cover + cover art + canvas texture + edge highlight
 *   back  = blue + magenta press-stripe + logo
 *   left  = spine        right = page edges        top/bottom = page edges
 * Book box 352×517, depth = Framer spine width 76. The green "Back 2" layer
 * (rgb 0,255,0) is a Framer dev placeholder and is intentionally not rendered.
 *
 * Motion = the Framer "3D Look" wrapper: perspective 1200, gentle pointer-follow
 * tilt, no auto-spin, no drag. Rebuilt lighter — transform-only, a single rAF that
 * runs ONLY while the book is moving and is paused when off-screen; touch /
 * no-hover / reduced-motion get a static 3/4 pose with no JS loop at all.
 *
 * Fully fluid: every dimension derives from one --bw width var via calc(), so it
 * scales across Desktop/Tablet/Phone with zero layout shift. JS writes only rotation.
 */

// Product artwork colours (the book's real cover — content, not UI tokens).
const BLUE = "rgb(11,54,191)"; // front cover / back label panel
const SPINE_DARK = "#06205c";
const MAGENTA = "rgb(128,3,69)";
const PAGE_CREAM = "#efe9da";
const EDGE_BLUE = "rgb(22,70,226)"; // front board edge line (Framer "edge lines" ×6)
const HARD_GREEN = "rgb(0,255,0)"; // fluro-green back hardcover board (Framer "Back 2")

// WebP — re-encoded from the Framer PNGs (590KB → 195KB, 67% lighter). These are CSS
// background images, so they ship raw (next/image doesn't touch them) — hence WebP directly.
const IMG = {
  cover: "/book3d-framer/cover-front-v2.webp",
  texture: "/book3d-framer/cover-texture.webp",
  spine: "/book3d-framer/spine.webp",
  pagesRight: "/book3d-framer/pages-right.webp",
  pagesTop: "/book3d-framer/pages-top.webp",
  pagesBottom: "/book3d-framer/pages-bottom.webp",
};

// Fluid geometry, all from one width var --bw (book box is 352 × 517 × 76).
const bw = "var(--bw)";
const k = (n: number) => `calc(${bw} * ${n} / 352)`; // scale a 352-space px value
const W = bw;
const H = k(517);
const D = k(76);
const HALF_W = `calc(${bw} / 2)`;
const HALF_H = k(258.5);
const HALF_D = k(38);

// Layered hardcover: front cover board (front) · inset page block (middle) · green
// INSIDE face of the back cover (a forward-facing plane at the back, larger than the
// pages, so the tilt reveals it as a real 3D green panel around the recessed pages).
const OV = 30; // overhang: covers are bigger than pages on right/top/bottom (the "step")
const PAGE_W = k(352 - OV); // pages inset on the right (flush on the spine/left)
const PAGE_H = k(517 - OV * 2); // pages inset top + bottom
const PAGE_HALF_W = k((352 - OV) / 2);
const PAGE_HALF_H = k((517 - OV * 2) / 2);
const PAGE_X = k(-OV / 2); // shift page block left so it stays flush with the spine
const FB = k(6); // front cover-board thickness (thin blue edge — looks like the board edge)
const FRONT_BOARD_Z = k(38 - 3); // centre of the front board slab (just behind the cover)
const PD = k(64); // page-block depth — spans the FULL interior (front board → back cover) so
// the top/bottom/right thickness reads as solid pages with no dark gap.
const BACK_Z = k(-33); // green INSIDE face of the back cover, just behind the page block

// 3D Look pose. Rest = iconic book 3/4: spine on the left, slight look-down so the
// top page edge shows. This pose holds on touch/no-mouse (which can't tilt it).
const PERSPECTIVE = 1200;
// Rest = near-front-on with a gentle turn to the right fore-edge so the fluro-green + blue
// hardcover sides are always visible (perfectly flat would hide every side). The pointer,
// measured from the centre of the SCREEN, swings it from here to show more spine / sides.
// Rest = FRONT-ON (cover straight at you) when the cursor is mid-screen. Moving the cursor
// pivots the book ACROSS centre: cursor left → turn to the right fore-edge (green inside
// cover); cursor right → turn the other way to reveal the SPINE on the left.
const REST_RY = 0;
const REST_RX = 0;
const MAX_RY = 46; // big enough to swing all the way round to the spine OR the fore-edge
const MAX_RX = 24; // up/down nod
// Horizontal swing is measured from the SCREEN centre (so the whole screen width pivots it
// spine↔fore-edge); the up/down nod is measured from the BOOK (so it works near the top).
const REACH_X = 0.5;
const REACH_Y = 0.4;
const LERP = 0.16;

export default function Book3D() {
  const stageRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const interacted = useRef(false);
  const target = useRef({ ry: REST_RY, rx: REST_RX });
  const current = useRef({ ry: REST_RY, rx: REST_RX });
  const raf = useRef<number | null>(null);

  useEffect(() => {
    const box = boxRef.current;
    const stage = stageRef.current;
    if (!box || !stage) return;

    const setT = (ry: number, rx: number) => {
      box.style.transform = `rotateY(${ry}deg) rotateX(${rx}deg)`;
    };
    setT(REST_RY, REST_RX); // static 3/4 pose for everyone up front

    const noHover =
      typeof window !== "undefined" &&
      window.matchMedia?.("(hover: none), (pointer: coarse)").matches;

    // Reduced-motion: truly static — no animation at all.
    if (prefersReducedMotion()) return;

    // Touch / no-mouse devices have no cursor to follow, so give the book a gentle CSS
    // auto-rotate (GPU-only keyframes, ZERO per-frame JS) — it "moves" on mobile without the
    // per-frame rAF that used to choke low-end phones.
    if (noHover) {
      box.classList.add("book3d-float");
      return;
    }

    let running = false;
    let onScreen = true;

    // Pivot around the BOOK itself (Framer "3D Look" target = the holder): the book is at
    // rest when the cursor is over its centre and tilts TOWARD the cursor. This is why it now
    // responds up/down too — screen-centre pivoting failed because the book sits near the top.
    const center = () => {
      const r = box.getBoundingClientRect();
      return { cx: r.left + r.width / 2, cy: r.top + r.height / 2 };
    };
    const tick = () => {
      const c = current.current;
      const t = target.current;
      c.ry += (t.ry - c.ry) * LERP;
      c.rx += (t.rx - c.rx) * LERP;
      setT(Number(c.ry.toFixed(2)), Number(c.rx.toFixed(2)));
      if (Math.abs(t.ry - c.ry) < 0.04 && Math.abs(t.rx - c.rx) < 0.04) {
        running = false; // settled — stop burning frames
        return;
      }
      raf.current = requestAnimationFrame(tick);
    };
    const ensure = () => {
      if (!running && onScreen) {
        running = true;
        raf.current = requestAnimationFrame(tick);
      }
    };
    const onMove = (e: MouseEvent) => {
      const { cy } = center(); // book's vertical centre (so up/down nod works near the top)
      const screenCx = window.innerWidth / 2; // horizontal pivot is the SCREEN centre
      const nx = Math.max(-1, Math.min(1, (e.clientX - screenCx) / (window.innerWidth * REACH_X)));
      const ny = Math.max(-1, Math.min(1, (e.clientY - cy) / (window.innerHeight * REACH_Y)));
      target.current.ry = REST_RY + nx * MAX_RY;
      target.current.rx = REST_RX - ny * MAX_RX;
      if (!interacted.current) {
        interacted.current = true;
        track("book3d_interaction");
      }
      ensure();
    };
    const onLeave = () => {
      target.current.ry = REST_RY;
      target.current.rx = REST_RX;
      ensure();
    };

    // Listen on the whole window so the book responds to the cursor ANYWHERE on the page,
    // balanced from the centre of the screen (not just while hovering the hero). The
    // IntersectionObserver still pauses the rAF whenever the book scrolls out of view.
    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    const io = new IntersectionObserver(
      (entries) => {
        onScreen = entries.some((en) => en.isIntersecting);
        if (onScreen) ensure();
        else if (raf.current) {
          cancelAnimationFrame(raf.current);
          running = false;
        }
      },
      { threshold: 0 },
    );
    io.observe(box);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      io.disconnect();
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, []);

  // Every face is centred, then rotated + pushed out by half-depth.
  const face: React.CSSProperties = {
    position: "absolute",
    left: "50%",
    top: "50%",
    backfaceVisibility: "hidden",
  };
  const cover = (src: string): React.CSSProperties => ({
    backgroundImage: `url(${src})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  });
  const pages = (src: string): React.CSSProperties => ({
    background: PAGE_CREAM,
    ...cover(src),
  });

  return (
    <div
      ref={stageRef}
      style={
        {
          "--bw": "clamp(208px, 62vw, 352px)",
          width: W,
          height: H,
          position: "relative",
          margin: "0 auto",
          perspective: `${PERSPECTIVE}px`,
        } as React.CSSProperties
      }
    >
      {/* Soft ground shadow — flat layer beneath the box, not a filter on the 3D. */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          left: "2%",
          right: "2%",
          bottom: `calc(${H} * -0.06)`,
          height: `calc(${H} * 0.14)`,
          background:
            "radial-gradient(50% 50% at 50% 50%, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0) 70%)",
          filter: "blur(18px)",
        }}
      />

      <div
        ref={boxRef}
        style={{
          position: "absolute",
          inset: 0,
          transformStyle: "preserve-3d",
          transform: `rotateY(${REST_RY}deg) rotateX(${REST_RX}deg)`,
          willChange: "transform",
        }}
      >
        {/* FRONT — blue base + cover art + canvas texture (op .19) + edge highlight */}
        <div
          style={{
            ...face,
            width: W,
            height: H,
            transform: `translate(-50%,-50%) translateZ(${HALF_D})`,
            background: BLUE,
            borderRadius: 3,
            overflow: "hidden",
            boxShadow: "inset 0 0 1px rgba(0,0,0,0.4)",
          }}
        >
          <div style={{ position: "absolute", inset: 0, ...cover(IMG.cover) }} />
          <div
            style={{
              position: "absolute",
              inset: 0,
              ...cover(IMG.texture),
              opacity: 0.19,
              mixBlendMode: "overlay",
            }}
          />
        </div>

        {/* GREEN — the INSIDE face of the back cover, a forward-facing plane just behind the
            page block (so it's clearly VISIBLE green, not a dark void). Full size: flush on the
            left with the spine, overhangs the inset pages on the other three sides. */}
        <div
          style={{
            ...face,
            width: W,
            height: H,
            transform: `translate(-50%,-50%) translateZ(${BACK_Z})`,
            background: HARD_GREEN,
            borderRadius: 3,
            boxShadow: `inset 0 0 0 ${k(4)} ${EDGE_BLUE}`, // blue edge on the back cover
          }}
        />

        {/* OUTER BACK — the actual back of the book (faces away) + magenta press marks */}
        <div
          style={{
            ...face,
            width: W,
            height: H,
            transform: `translate(-50%,-50%) rotateY(180deg) translateZ(${HALF_D})`,
            background: HARD_GREEN,
            borderRadius: 3,
            overflow: "hidden",
          }}
        >
          <div style={{ position: "absolute", left: 0, top: 0, width: "96.6%", height: "50.7%", background: BLUE }} />
          <div style={{ position: "absolute", left: "44.3%", top: "53.4%", width: "11.4%", height: "4.1%", background: MAGENTA, borderRadius: 2, boxShadow: `0 0 14px ${MAGENTA}` }} />
          <div style={{ position: "absolute", left: "46.3%", top: "46.8%", width: "6.5%", height: "5.8%", background: MAGENTA, borderRadius: 2, boxShadow: `0 0 14px ${MAGENTA}` }} />
        </div>

        {/* LEFT — the spine binding (outer): the clean spine image, FULL height. Don't touch. */}
        <div
          style={{
            ...face,
            width: D,
            height: H,
            transform: `translate(-50%,-50%) rotateY(-90deg) translateZ(${HALF_W})`,
            background: SPINE_DARK,
            ...cover(IMG.spine),
          }}
        />

        {/* INSIDE SPINE — a green face on the BACKSIDE of the spine (just inside the binding),
            so when the book is angled you see the green inside of the spine instead of a void. */}
        <div
          style={{
            ...face,
            width: D,
            height: H,
            transform: `translate(-50%,-50%) translateX(${k(OV)}) rotateY(-90deg) translateZ(${HALF_W})`,
            background: HARD_GREEN,
          }}
        />

        {/* FRONT COVER-BOARD thickness — thin BLUE edges on right / top / bottom (the board) */}
        <div
          style={{
            ...face, width: FB, height: H,
            transform: `translate(-50%,-50%) rotateY(90deg) translateZ(${HALF_W}) translateX(${k(-35)})`,
            background: EDGE_BLUE,
          }}
        />
        <div
          style={{
            ...face, width: W, height: FB,
            transform: `translate(-50%,-50%) rotateX(90deg) translateZ(${HALF_H}) translateY(${FRONT_BOARD_Z})`,
            background: EDGE_BLUE,
          }}
        />
        <div
          style={{
            ...face, width: W, height: FB,
            transform: `translate(-50%,-50%) rotateX(-90deg) translateZ(${HALF_H}) translateY(${k(-35)})`,
            background: EDGE_BLUE,
          }}
        />

        {/* PAGE BLOCK fore-edges — inset (recessed) so the cover overhangs with a step. */}
        <div
          style={{
            ...face, width: PD, height: PAGE_H,
            transform: `translate(-50%,-50%) rotateY(90deg) translateZ(${PAGE_HALF_W})`,
            ...pages(IMG.pagesRight),
          }}
        />
        <div
          style={{
            ...face, width: PAGE_W, height: PD,
            transform: `translate(-50%,-50%) translateX(${PAGE_X}) rotateX(90deg) translateZ(${PAGE_HALF_H})`,
            ...pages(IMG.pagesTop),
          }}
        />
        <div
          style={{
            ...face, width: PAGE_W, height: PD,
            transform: `translate(-50%,-50%) translateX(${PAGE_X}) rotateX(-90deg) translateZ(${PAGE_HALF_H})`,
            ...pages(IMG.pagesBottom),
          }}
        />
      </div>
    </div>
  );
}
