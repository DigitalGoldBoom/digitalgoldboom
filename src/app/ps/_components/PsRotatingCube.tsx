"use client";

import Image from "next/image";

/**
 * PsRotatingCube — clone of the Framer hero "3D Cube": a 3D cube of project
 * photos with 1px green (rgb(0,255,0)) borders, looping a slow Y rotation
 * (Framer: tween 50s rotateY 360, parallax). Static on reduced-motion.
 * Size 420px (desktop) → fluid down. Pure CSS 3D, no JS loop.
 */

const CDN = "https://framerusercontent.com/images";
const FACES = [
  "wg2hAh9cZIuUctvPuhF63sSA",
  "sfuh2th51HvJy1lo0d5OTzuFw",
  "huTqWWz4mcyIVB3LoNhc3JnfCg",
  "RtRa4B7Fh1Wy7qj472XJ64Myig",
  "3rHk1mHhqMNgP6lIzqxtMXNIfI",
  "SIO3Vm8Mrg8BGvj66Le8b9dpMhI",
];
// transform per face for a cube of edge = var(--cube)
const TF = [
  "rotateY(0deg) translateZ(var(--half))",
  "rotateY(90deg) translateZ(var(--half))",
  "rotateY(180deg) translateZ(var(--half))",
  "rotateY(270deg) translateZ(var(--half))",
  "rotateX(90deg) translateZ(var(--half))",
  "rotateX(-90deg) translateZ(var(--half))",
];

export default function PsRotatingCube() {
  return (
    <div className="ps-cube-scene" aria-hidden>
      <div className="ps-cube">
        {FACES.map((id, i) => (
          <div key={id} className="ps-cube-face" style={{ transform: TF[i] }}>
            <Image src={`${CDN}/${id}.png`} alt="" fill sizes="420px" className="object-cover" />
          </div>
        ))}
      </div>

      <style jsx>{`
        .ps-cube-scene {
          --cube: clamp(220px, 30vw, 420px);
          --half: calc(var(--cube) / 2);
          width: var(--cube);
          height: var(--cube);
          perspective: 1600px;
        }
        .ps-cube {
          position: relative;
          width: 100%;
          height: 100%;
          transform-style: preserve-3d;
          animation: ps-cube-spin 50s linear infinite;
        }
        .ps-cube-face {
          position: absolute;
          inset: 0;
          overflow: hidden;
          border: 1px solid rgb(0, 255, 0);
          backface-visibility: hidden;
        }
        @keyframes ps-cube-spin {
          from {
            transform: rotateX(-12deg) rotateY(0deg);
          }
          to {
            transform: rotateX(-12deg) rotateY(360deg);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .ps-cube {
            animation: none;
            transform: rotateX(-12deg) rotateY(-28deg);
          }
        }
      `}</style>
    </div>
  );
}
