"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import dynamic from "next/dynamic";
import { prefersReducedMotion } from "@/lib/reducedMotion";

// live 3D hero — client only (WebGL), lazy so it never blocks first paint
const Deposit3D = dynamic(() => import("../deposit/Deposit3D"), { ssr: false });

/**
 * DepositMedia — the centrepiece is now a PRE-RENDERED transparent turntable of the
 * one real Blender deposit model (the approved photoreal look baked onto real
 * geometry, orbited 360° => perfect loop, no morph). It's light (~0.9MB webm) and
 * works on every device — phones included — so no heavy WebGL/GLB.
 *   • motion allowed  -> the transparent looping <video> (poster shows instantly + on
 *     browsers without alpha-webm, e.g. iOS, the poster stays)
 *   • reduced-motion  -> the static transparent still (poster-3d.webp)
 * Both are the SAME model, so the look never downgrades.
 */
const NOOP = () => () => {};
function motionOK() {
  if (typeof window === "undefined") return false;
  return !prefersReducedMotion();
}

function DepositMedia() {
  // false on the server; real value on the client — no setState-in-effect
  const animate = useSyncExternalStore(NOOP, motionOK, () => false);

  if (!animate) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        className="dep-poster-3d"
        src="/deposit/poster-3d.webp"
        alt="A floating chunk of Idaho gold-country ground — pine landscape on top, a gold-bearing quartz vein in the granite below."
      />
    );
  }
  // live, draggable 3D model (real geometry) — replaces the pre-rendered video
  return <Deposit3D />;
}

/**
 * DepositHero — a Sutéra-style technical hero reworked for digital gold mining.
 * The rotating 3D deposit (real Idaho granite + gold-quartz vein, QP-vetted) is
 * the centrepiece; a flat "instrument" layer of framed panels, wired nodes, a
 * crosshair grid, mono labels and a live clock floats over it.
 *
 * DRAFT COPY: evergreen, no invented numbers, hero = the new industry, sells the
 * book. Final money copy routes through dgb-funnel-copywriter → dgb-copy-chief →
 * dgb-fact-verifier before this ships.
 */

// crosshair positions across the stage (in %)
const CROSSES = [
  [22, 40],
  [50, 40],
  [78, 40],
  [22, 78],
  [50, 78],
  [78, 78],
];

// wired nodes: node point (nx,ny) → label box (lx,ly), all in % of the stage.
// `path` is an SVG polyline in the same % space (drawn in a 100x100 viewBox).
const NODES = [
  {
    // left of the deposit
    nx: 33,
    ny: 52,
    lx: 4,
    ly: 44,
    align: "left" as const,
    path: "M33,52 L18,52 L18,46 L5,46",
    label: (
      <>
        The gold is already here —
        <br />
        <span className="g">verified, in the ground.</span>
      </>
    ),
  },
  {
    // top-centre, clear of the right-hand panels
    nx: 50,
    ny: 41,
    lx: 38,
    ly: 12,
    align: "left" as const,
    path: "M50,41 L50,20 L40,20 L40,15",
    label: (
      <>
        Verification is the backbone
        <br />
        the industry already banks
        <br />
        <span className="g">billions on.</span>
      </>
    ),
  },
  {
    // below the deposit, centre
    nx: 52,
    ny: 61,
    lx: 43,
    ly: 84,
    align: "left" as const,
    path: "M52,61 L52,80 L45,80 L45,84",
    label: (
      <>
        Proven, tokenized —
        <br />
        <span className="g">and left untouched.</span>
      </>
    ),
  },
];

function useClock() {
  const [t, setT] = useState("");
  useEffect(() => {
    const tick = () =>
      setT(
        new Date()
          .toLocaleTimeString("en-US", { hour12: false })
          .replace(/:/g, " "),
      );
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return t;
}

export default function DepositHero2() {
  const clock = useClock();

  return (
    <div className="dep-root">
      <div className="dep-grain" aria-hidden />

      <div className="dep-stage">
        {/* grid + rules */}
        <div className="dep-grid" aria-hidden>
          {CROSSES.map(([x, y], i) => (
            <span
              key={i}
              className="dep-cross"
              style={{ left: `${x}%`, top: `${y}%` }}
            />
          ))}
        </div>
        <div className="dep-rule-v" aria-hidden />
        <div className="dep-rule-h" aria-hidden />

        {/* the rotating deposit — real 3D, transparent, seamless, perfect loop */}
        <div
          className="dep-video"
          role="img"
          aria-label="A slowly rotating 3D chunk of Idaho gold-country ground: pine landscape on top, a gold-bearing quartz vein in the granite below."
        >
          <DepositMedia />
        </div>

        {/* wires (desktop) */}
        <svg
          className="dep-wire"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden
        >
          {NODES.map((n, i) => (
            <path key={i} d={n.path} vectorEffect="non-scaling-stroke" />
          ))}
        </svg>

        {/* top chrome */}
        <div className="dep-top">
          <div className="dep-wordmark">DIGITAL&nbsp;GOLD</div>
          <div className="dep-center-tab">
            <span className="dep-pill">See the proof</span>
            <svg className="dep-globe" viewBox="0 0 44 44" aria-hidden>
              <circle cx="22" cy="22" r="16" fill="none" stroke="var(--ink)" />
              <ellipse cx="22" cy="22" rx="7" ry="16" fill="none" stroke="var(--ink)" />
              <line x1="6" y1="22" x2="38" y2="22" stroke="var(--ink)" />
              <line x1="9" y1="14" x2="35" y2="14" stroke="var(--ink)" />
              <line x1="9" y1="30" x2="35" y2="30" stroke="var(--ink)" />
            </svg>
          </div>
          <div className="dep-clock dep-label dep-mut">
            LOCAL TIME
            <br />
            <span style={{ color: "var(--ink)" }}>{clock}</span>
          </div>
        </div>

        {/* headline */}
        <h1 className="dep-headline">
          Gold,
          <br />
          without
          <br />
          the <span className="g">mine.</span>
        </h1>

        {/* wired node labels */}
        {NODES.map((n, i) => (
          <div className="dep-node dep-node-group" key={i}>
            <span
              className="dep-node-sq"
              style={{ left: `${n.nx}%`, top: `${n.ny}%` }}
            />
            <div
              className="dep-node-label dep-label"
              style={{
                left: `${n.lx}%`,
                top: `${n.ly}%`,
                textAlign: n.align,
              }}
            >
              {n.label}
            </div>
          </div>
        ))}

        {/* NATGOLD etymology panel */}
        <div className="dep-panel dep-panel-natgold">
          <div className="dep-panel-head">
            <span>NATGOLD</span>
            <span className="x">/01</span>
          </div>
          <div className="dep-panel-body dep-label" style={{ textTransform: "none" }}>
            NAT (natural)
            <br />
            + GOLD (the metal)
            <br />
            <br />
            <span className="dep-arrow">→</span> gold, <span className="g">verified in place</span>
          </div>
        </div>

        {/* method panel */}
        <div className="dep-panel dep-panel-method">
          <div className="dep-panel-head">
            <span>NOT A MINE — A METHOD</span>
            <span className="x">✕</span>
          </div>
          <div className="dep-panel-body">
            A new industry is being built around the world&rsquo;s oldest asset:
            verified, in-ground gold represented digitally — without digging it
            out. The book tells the whole story, in plain English.
            <br />
            <a className="dep-cta" href="/book">
              Read the book — $37
            </a>
          </div>
        </div>

        {/* the four moves */}
        <div className="dep-threads">
          <div className="dep-threads-diagram" aria-hidden />
          <div>
            <div className="dep-threads-title">[ THE FOUR MOVES ]</div>
            {[
              ["01.", "(VERIFICATION)", "The backbone of mining"],
              ["02.", "(TOKENIZATION)", "Gold, represented digitally"],
              ["03.", "(THE INDUSTRY)", "Digital gold mining"],
              ["04.", "(THE RECORD)", "Written down in the book"],
            ].map(([n, k, t]) => (
              <div className="dep-thread-row dep-label" key={n}>
                <span className="n">{n}</span> {k}
                <span className="hatch" />
                <span className="t">{t}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
