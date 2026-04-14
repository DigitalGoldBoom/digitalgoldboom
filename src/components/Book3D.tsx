"use client";

import { useRef } from "react";
import Image from "next/image";
import { track } from "@vercel/analytics";

const FRONT = "/images/Digital Gold Boom Cover (1).png";
const W = 320;
const H = 484;
const SPINE_W = 24;
const TOP_H = 8;

export default function Book3D() {
  const interactedRef = useRef(false);

  function onMove() {
    if (interactedRef.current) return;
    interactedRef.current = true;
    track("book3d_interaction");
  }

  return (
    <div
      onMouseMove={onMove}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "40px 30px",
      }}
    >
      <div
        style={{
          position: "relative",
          width: W + SPINE_W,
          height: H + TOP_H,
          filter: "drop-shadow(0 30px 60px rgba(0,0,0,0.7))",
        }}
      >
        {/* Top page edges — thin horizontal strip above the cover */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: SPINE_W,
            width: W,
            height: TOP_H,
            background:
              "repeating-linear-gradient(90deg, #1F1F26 0px, #0E0E14 1px, #1F1F26 2px)",
            transform: "skewX(-45deg)",
            transformOrigin: "bottom left",
            borderTop: "1px solid rgba(212, 168, 67, 0.35)",
          }}
        />
        {/* Spine — vertical gradient strip on the left of the cover */}
        <div
          style={{
            position: "absolute",
            top: TOP_H,
            left: 0,
            width: SPINE_W,
            height: H,
            background:
              "linear-gradient(90deg, #050508 0%, #1A1A22 35%, #2A2A33 65%, #0A0A10 100%)",
            transform: "skewY(-30deg)",
            transformOrigin: "bottom right",
            borderLeft: "1px solid rgba(212, 168, 67, 0.35)",
            boxShadow: "inset -2px 0 4px rgba(0,0,0,0.6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              transform: "rotate(-90deg)",
              whiteSpace: "nowrap",
              fontFamily: "var(--font-jakarta), sans-serif",
              fontSize: "11px",
              fontWeight: 800,
              letterSpacing: "0.2em",
              color: "#D4A843",
              textShadow: "0 0 6px rgba(212, 168, 67, 0.4)",
            }}
          >
            DIGITAL GOLD BOOM
          </div>
        </div>
        {/* Front cover */}
        <div
          style={{
            position: "absolute",
            top: TOP_H,
            left: SPINE_W,
            width: W,
            height: H,
            overflow: "hidden",
            boxShadow:
              "inset 0 0 0 1px rgba(212, 168, 67, 0.35), 0 0 60px rgba(212, 168, 67, 0.08)",
          }}
        >
          <Image
            src={FRONT}
            alt="Digital Gold Boom — Book Cover"
            fill
            style={{ objectFit: "cover" }}
            priority
            sizes="320px"
          />
          {/* Subtle sheen — top to bottom highlight */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.10) 0%, transparent 30%, transparent 70%, rgba(0,0,0,0.15) 100%)",
            }}
          />
        </div>
      </div>
    </div>
  );
}
