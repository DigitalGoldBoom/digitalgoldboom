/**
 * Scenery — the page's backdrop plates. Each scene takes an optional `src`:
 * when the Director's ultra-real Higgsfield render exists, it renders as a
 * full-bleed next/image (the real film frame); without it, the code-built
 * composite is the fallback so nothing ever renders empty.
 * House rules held: matte, no glow on rock/gold; light comes from the scene.
 *
 * Server-safe (no hooks) — stars are deterministic so SSR/CSR match.
 */

import Image from "next/image";

function seededStars(count: number, seedStart: number) {
  let seed = seedStart;
  const rand = () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };
  return Array.from({ length: count }, () => ({
    x: rand() * 100,
    y: rand() * 55,
    r: 0.4 + rand() * 0.9,
    o: 0.25 + rand() * 0.55,
  }));
}

const STARS = seededStars(90, 42);

/** Night (S1) / dawn (S7) mountain. Real plate via `src`; composite fallback.
    Layers carry data-depth for parallax (real plate = one gentle 0.4× layer). */
export function MountainScene({ variant, src }: { variant: "night" | "dawn"; src?: string }) {
  const dawn = variant === "dawn";
  if (src) {
    return (
      <div aria-hidden className="absolute inset-0 overflow-hidden">
        <div data-depth="0.4" className="absolute inset-[-8%_0]">
          <Image
            src={src}
            alt=""
            fill
            sizes="100vw"
            priority={!dawn}
            className="object-cover"
          />
        </div>
      </div>
    );
  }
  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden">
      {/* Sky */}
      <div
        data-depth="0.2"
        className="absolute inset-[-10%_0_0_0]"
        style={{
          background: dawn
            ? "linear-gradient(180deg, #171226 0%, #2b1d33 45%, #4a2c3a 72%, #6b4340 100%)"
            : "linear-gradient(180deg, #05050a 0%, #0a0c1a 55%, #10131f 100%)",
        }}
      >
        {!dawn && (
          <svg
            className="absolute inset-0 h-full w-full"
            preserveAspectRatio="none"
            viewBox="0 0 100 100"
          >
            {STARS.map((s, i) => (
              <circle key={i} cx={s.x} cy={s.y} r={s.r * 0.12} fill={`rgba(231,231,238,${s.o})`} />
            ))}
          </svg>
        )}
        {dawn && (
          <div
            className="absolute inset-x-0 bottom-0 h-[55%]"
            style={{
              background:
                "radial-gradient(60% 55% at 50% 100%, rgba(232,140,58,0.35), rgba(232,178,58,0.12) 55%, transparent 75%)",
            }}
          />
        )}
      </div>

      {/* Far ridge */}
      <div
        data-depth="0.5"
        className="absolute inset-x-[-4%] bottom-0 h-[52%]"
        style={{
          background: dawn ? "#221a24" : "#0b0d16",
          clipPath:
            "polygon(0 68%, 9% 52%, 18% 60%, 27% 38%, 38% 55%, 47% 30%, 58% 50%, 66% 36%, 76% 54%, 86% 42%, 100% 58%, 100% 100%, 0 100%)",
        }}
      />
      {/* Main mountain */}
      <div
        data-depth="0.5"
        className="absolute inset-x-[-4%] bottom-0 h-[46%]"
        style={{
          background: dawn
            ? "linear-gradient(180deg, #2a1f26 0%, #171218 100%)"
            : "linear-gradient(180deg, #101322 0%, #07070d 100%)",
          clipPath:
            "polygon(0 82%, 7% 66%, 15% 74%, 24% 46%, 33% 62%, 44% 24%, 55% 52%, 63% 40%, 73% 60%, 83% 48%, 92% 64%, 100% 56%, 100% 100%, 0 100%)",
        }}
      />
      {dawn && (
        /* Sunrise rim light on the main ridge — matte, from the sky, not the rock */
        <div
          className="absolute inset-x-[-4%] bottom-0 h-[46%]"
          style={{
            background: "linear-gradient(180deg, rgba(232,140,58,0.22), transparent 30%)",
            clipPath:
              "polygon(0 82%, 7% 66%, 15% 74%, 24% 46%, 33% 62%, 44% 24%, 55% 52%, 63% 40%, 73% 60%, 83% 48%, 92% 64%, 100% 56%, 100% 100%, 0 100%)",
          }}
        />
      )}
      {/* Foreground ridge */}
      <div
        data-depth="0.85"
        className="absolute inset-x-[-6%] bottom-[-2%] h-[22%]"
        style={{
          background: dawn ? "#100c10" : "#050508",
          clipPath:
            "polygon(0 55%, 12% 40%, 25% 58%, 39% 34%, 52% 52%, 67% 30%, 80% 50%, 91% 38%, 100% 48%, 100% 100%, 0 100%)",
        }}
      />
    </div>
  );
}

/** Underground cross-section (the descent plate). Real plate via `src`. */
export function StrataScene({ src }: { src?: string }) {
  if (src) {
    return (
      <div aria-hidden className="absolute inset-0 overflow-hidden">
        <Image src={src} alt="" fill sizes="100vw" className="object-cover" />
      </div>
    );
  }
  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden" style={{ background: "#08070a" }}>
      <div
        className="absolute inset-0"
        style={{
          background: [
            "linear-gradient(178deg,",
            "#0d0c12 0%, #0d0c12 16%,",
            "#131019 16.5%, #131019 31%,",
            "#0f0d13 31.5%, #0f0d13 45%,",
            "#16121a 45.5%, #16121a 58%,",
            "#0e0c11 58.5%, #0e0c11 71%,",
            "#141118 71.5%, #141118 84%,",
            "#0c0b10 84.5%, #0c0b10 100%)",
          ].join(" "),
        }}
      />
      {/* The vein: narrow, DULL matte gold in the rock — cool scene light, zero glow */}
      <div
        className="absolute left-[18%] top-[30%] h-[46%] w-[3px] rotate-[14deg]"
        style={{ background: "linear-gradient(180deg, transparent, #6e5a26 18%, #7d6528 52%, #5c4c21 82%, transparent)" }}
      />
      <div
        className="absolute left-[19.5%] top-[42%] h-[24%] w-[2px] rotate-[24deg]"
        style={{ background: "linear-gradient(180deg, transparent, #6e5a26 30%, #55461e 75%, transparent)" }}
      />
      {/* Cool ambient light from above */}
      <div
        className="absolute inset-0"
        style={{ background: "radial-gradient(80% 40% at 50% 0%, rgba(90,110,150,0.10), transparent 65%)" }}
      />
    </div>
  );
}
