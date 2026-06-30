"use client";

import { useInView } from "@/components/funnel/sales/useInView";

/* ========================================================================
   Bespoke, CODE-ONLY visuals for /v1. Every one is:
   - on the v2 brand (gold accent, dark glass tiles, mono numerals)
   - compliance-safe (process/industry only — never a price-up / return chart)
   - reduced-motion-safe (useInView reports true immediately under reduce)
   - zero raster weight (CSS/SVG), so they cost ~nothing on Core Web Vitals
   ======================================================================== */

/* ── BEAT 5 — three steps with a gold thread that draws through them ────── */
export function StepFlow({
  steps,
}: {
  steps: { n: string; t: string; b: string }[];
}) {
  const { ref, inView } = useInView<HTMLDivElement>(0.25);
  return (
    <div ref={ref} className="relative">
      {/* DESKTOP rail — horizontal, threads along the node row; fill grows L→R */}
      <div aria-hidden className="pointer-events-none absolute left-0 right-0 hidden md:block" style={{ top: 34 }}>
        <div className="absolute inset-x-[12%] h-px" style={{ background: "var(--v2-line)" }} />
        <div
          className="absolute left-[12%] h-px origin-left"
          style={{
            right: "12%",
            background: "linear-gradient(90deg, var(--v2-gold), rgba(232,178,58,0.5))",
            transform: `scaleX(${inView ? 1 : 0})`,
            transition: "transform 1200ms cubic-bezier(0.22,0.61,0.36,1)",
            boxShadow: "0 0 12px rgba(232,178,58,0.5)",
          }}
        />
      </div>

      <ol className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {steps.map((s, i) => (
          <li key={s.n} className="relative">
            {/* MOBILE rail segment — vertical down the left edge between tiles */}
            {i < steps.length - 1 && (
              <span
                aria-hidden
                className="absolute left-[14px] top-[68px] w-px md:hidden"
                style={{
                  height: "calc(100% - 30px)",
                  background: "linear-gradient(180deg, var(--v2-gold), rgba(232,178,58,0.15))",
                  transform: `scaleY(${inView ? 1 : 0})`,
                  transformOrigin: "top",
                  transition: `transform 700ms cubic-bezier(0.22,0.61,0.36,1) ${i * 160}ms`,
                }}
              />
            )}
            <div className="v2-tile h-full p-8 md:p-9">
              <span
                className="relative z-10 mb-7 flex h-[30px] w-[30px] items-center justify-center rounded-full font-mono text-[12px]"
                style={{
                  color: inView ? "#08080d" : "var(--v2-faint)",
                  background: inView ? "var(--v2-gold)" : "transparent",
                  border: "1px solid var(--v2-gold)",
                  transition: `color 400ms ease ${300 + i * 200}ms, background 400ms ease ${300 + i * 200}ms`,
                  boxShadow: inView ? "0 0 16px rgba(232,178,58,0.45)" : "none",
                }}
              >
                {s.n}
              </span>
              <h3 style={{ fontSize: "clamp(1.4rem,2vw,1.75rem)", fontWeight: 400, color: "#F4F4F7", marginBottom: 10 }}>
                {s.t}
              </h3>
              <p className="leading-relaxed" style={{ color: "var(--v2-dim)", fontSize: "0.95rem" }}>
                {s.b}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

/* ── BEAT 6 — three industry forces converging into one gold node ──────── */
export function ConvergenceDiagram({ forces }: { forces: string[] }) {
  const { ref, inView } = useInView<HTMLDivElement>(0.35);
  // Three inbound strands from left edge → a node on the right.
  const rows = [22, 50, 78];
  return (
    <figure ref={ref} className="m-0">
      <div className="relative w-full" style={{ aspectRatio: "16 / 9" }}>
        <svg viewBox="0 0 100 56" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" aria-hidden>
          {rows.map((y, i) => {
            const len = 200;
            return (
              <path
                key={i}
                d={`M2 ${y * 0.56} C 40 ${y * 0.56}, 55 28, 86 28`}
                fill="none"
                stroke="url(#strand)"
                strokeWidth="0.6"
                strokeLinecap="round"
                style={{
                  strokeDasharray: len,
                  strokeDashoffset: inView ? 0 : len,
                  transition: `stroke-dashoffset 1100ms cubic-bezier(0.22,0.61,0.36,1) ${i * 220}ms`,
                }}
              />
            );
          })}
          <defs>
            <linearGradient id="strand" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0%" stopColor="rgba(232,178,58,0.05)" />
              <stop offset="100%" stopColor="rgba(232,178,58,0.85)" />
            </linearGradient>
          </defs>
        </svg>
        {/* the convergence node */}
        <span
          aria-hidden
          className="absolute rounded-full"
          style={{
            left: "86%",
            top: "50%",
            width: 18,
            height: 18,
            marginLeft: -9,
            marginTop: -9,
            background: "var(--v2-gold)",
            boxShadow: inView ? "0 0 28px 6px rgba(232,178,58,0.6)" : "0 0 0 rgba(232,178,58,0)",
            transform: `scale(${inView ? 1 : 0.3})`,
            transition: "transform 500ms cubic-bezier(0.22,0.61,0.36,1) 900ms, box-shadow 700ms ease 900ms",
          }}
        />
        {/* force labels — drawn in HTML, anchored to each strand's start */}
        {forces.map((f, i) => (
          <span
            key={f}
            className="absolute font-mono"
            style={{
              left: 0,
              top: `${rows[i] * 0.92}%`,
              transform: "translateY(-50%)",
              fontSize: "clamp(11px, 1.3vw, 14px)",
              color: "var(--v2-dim)",
              maxWidth: "52%",
              lineHeight: 1.3,
            }}
          >
            {f}
          </span>
        ))}
      </div>
      <figcaption className="sr-only">
        Three long-running industry forces — {forces.join(", ")} — converging into one moment.
      </figcaption>
    </figure>
  );
}

/* ── BEAT 7 — Cahuilla process timeline: nodes light along a gold rail ──── */
export function ProcessTimeline({ stages }: { stages: { t: string; b: string }[] }) {
  const { ref, inView } = useInView<HTMLOListElement>(0.25);
  return (
    <ol ref={ref} className="relative m-0 grid grid-cols-1 gap-6 md:grid-cols-4 md:gap-4">
      {/* DESKTOP rail */}
      <span aria-hidden className="absolute hidden h-px md:block" style={{ top: 9, left: "10%", right: "10%", background: "var(--v2-line)" }} />
      <span
        aria-hidden
        className="absolute hidden h-px origin-left md:block"
        style={{
          top: 9,
          left: "10%",
          right: "10%",
          background: "linear-gradient(90deg, var(--v2-gold), rgba(232,178,58,0.4))",
          transform: `scaleX(${inView ? 1 : 0})`,
          transition: "transform 1400ms cubic-bezier(0.22,0.61,0.36,1)",
        }}
      />
      {stages.map((s, i) => (
        <li key={s.t} className="relative pl-9 md:pl-0 md:pt-8">
          {/* MOBILE rail */}
          {i < stages.length - 1 && (
            <span aria-hidden className="absolute left-[8px] top-5 h-full w-px md:hidden" style={{ background: "var(--v2-line)" }} />
          )}
          <span
            aria-hidden
            className="absolute left-0 top-1 h-[18px] w-[18px] rounded-full md:left-1/2 md:top-0 md:-translate-x-1/2"
            style={{
              background: inView ? "var(--v2-gold)" : "#0a0a12",
              border: "1px solid var(--v2-gold)",
              boxShadow: inView ? "0 0 16px rgba(232,178,58,0.55)" : "none",
              transition: `background 400ms ease ${i * 280}ms, box-shadow 400ms ease ${i * 280}ms`,
            }}
          />
          <div className="md:text-center">
            <h3 style={{ fontSize: "1.05rem", fontWeight: 500, color: "#F4F4F7", marginBottom: 6 }}>{s.t}</h3>
            <p style={{ color: "var(--v2-dim)", fontSize: "0.875rem", lineHeight: 1.55 }}>{s.b}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

/* ── BEAT 3 — abstract "tightening" spiral accent (decorative, no labels) ─ */
export function SpiralAccent() {
  const { ref, inView } = useInView<HTMLDivElement>(0.4);
  // A few concentric tightening arcs — purely a visual metaphor for the squeeze.
  const rings = [44, 34, 25, 17, 10];
  return (
    <div ref={ref} aria-hidden className="relative mx-auto" style={{ width: "min(280px, 70vw)", aspectRatio: "1" }}>
      <svg viewBox="0 0 100 100" className="h-full w-full">
        {rings.map((r, i) => {
          const c = 2 * Math.PI * r;
          return (
            <circle
              key={r}
              cx="50"
              cy="50"
              r={r}
              fill="none"
              stroke="rgba(232,178,58,0.55)"
              strokeWidth={0.5 + i * 0.18}
              strokeLinecap="round"
              style={{
                strokeDasharray: c,
                strokeDashoffset: inView ? c * 0.18 : c,
                opacity: inView ? 0.35 + i * 0.12 : 0,
                transition: `stroke-dashoffset 1000ms cubic-bezier(0.22,0.61,0.36,1) ${i * 140}ms, opacity 700ms ease ${i * 140}ms`,
              }}
            />
          );
        })}
        <circle cx="50" cy="50" r="3" fill="var(--v2-gold)" style={{ opacity: inView ? 1 : 0, transition: "opacity 500ms ease 700ms" }} />
      </svg>
    </div>
  );
}
