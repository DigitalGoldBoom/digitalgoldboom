import Image from "next/image";

/**
 * PsRotatingCube — clone of the Framer hero "3D Cube": project photos with 1px
 * green (rgb(0,255,0)) borders, slow Y rotation (Framer ~50s). Styles live in
 * ps.css (render-blocking, so faces never flash unstyled on load). Static on
 * reduced-motion. Pure CSS 3D, no JS.
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
            <Image
              src={`${CDN}/${id}.png`}
              alt=""
              fill
              sizes="(max-width: 640px) 220px, (max-width: 1024px) 400px, 420px"
              // Only the front face is the LCP candidate — prioritise just that one so it
              // isn't diluted; the other 5 faces (sides/back, seen later as it spins) lazy-load.
              priority={i === 0}
              fetchPriority={i === 0 ? "high" : "auto"}
              loading={i === 0 ? "eager" : "lazy"}
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
