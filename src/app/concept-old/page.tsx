import Image from "next/image";
import Book3D from "@/components/Book3D";
import WaitlistForm from "./_components/WaitlistForm";

/* ============================================================
   Concept Old — Digital Gold Boom long-form sales page
   Dark web3 institutional, Orbitron display / Exo 2 body
   MASTER.md tokens adapted to the dark-mode directive.
   ============================================================ */

const GOLD = "#D4A843";
const VOID = "#0A0A0F";
const SURFACE1 = "#111118";
const SURFACE2 = "#1A1A24";
const HAIRLINE = "rgba(255,255,255,0.08)";
const GOLD_GHOST = "rgba(212,168,67,0.22)";
const TEXT1 = "#F5F5F7";
const TEXT2 = "#C6C6CC";
const TEXT3 = "#9A9AA0";

const displayFont = { fontFamily: "var(--font-orbitron), sans-serif" } as const;
const bodyFont = { fontFamily: "var(--font-exo2), sans-serif" } as const;
const monoFont = { fontFamily: "var(--font-orbitron), monospace" } as const;

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        ...monoFont,
        fontSize: 11,
        letterSpacing: "0.22em",
        textTransform: "uppercase",
        color: GOLD,
        display: "inline-flex",
        alignItems: "center",
        gap: 10,
        marginBottom: 20,
      }}
    >
      <span
        style={{
          display: "inline-block",
          width: 28,
          height: 1,
          background: GOLD,
        }}
      />
      {children}
    </div>
  );
}

function SectionTag({ num }: { num: string }) {
  return (
    <div
      style={{
        ...monoFont,
        fontSize: 10,
        letterSpacing: "0.3em",
        color: TEXT3,
      }}
    >
      § {num} / 12
    </div>
  );
}

/* ====== 01 — HERO ====== */
function Hero() {
  return (
    <section
      style={{
        position: "relative",
        minHeight: "100vh",
        overflow: "hidden",
        background:
          "radial-gradient(900px 700px at 72% 28%, rgba(212,168,67,0.10), transparent 60%), linear-gradient(180deg, #0A0A0F 0%, #050508 100%)",
        borderBottom: `1px solid ${HAIRLINE}`,
      }}
    >
      {/* Earth cube atmospheric layer */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.22,
          pointerEvents: "none",
        }}
      >
        <Image
          src="/images/earth-cubes/earth-cube-hero-pristine.png"
          alt=""
          fill
          priority
          sizes="100vw"
          style={{ objectFit: "cover", objectPosition: "right center" }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(90deg, #0A0A0F 0%, rgba(10,10,15,0.6) 55%, transparent 100%)",
          }}
        />
      </div>

      {/* vertical date rail */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 32,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "32px 0",
          ...monoFont,
          fontSize: 10,
          letterSpacing: "0.3em",
          color: TEXT3,
          writingMode: "vertical-rl",
        }}
        className="hide-on-mobile"
      >
        <span>DGB / WAITLIST / 2026</span>
        <span>NATGOLD DIGITAL · EST. 2019</span>
      </div>

      <div
        style={{
          position: "relative",
          maxWidth: 1280,
          margin: "0 auto",
          padding: "120px 24px 96px",
          display: "grid",
          gridTemplateColumns: "minmax(0, 1fr)",
          gap: 48,
        }}
      >
        <NavBar />
        <div style={{ maxWidth: 860 }}>
          <Eyebrow>Decoding the next gold rush</Eyebrow>
          <h1
            style={{
              ...displayFont,
              fontSize: "clamp(40px, 7vw, 84px)",
              lineHeight: 1.02,
              letterSpacing: "-0.02em",
              fontWeight: 500,
              margin: 0,
              color: TEXT1,
            }}
          >
            Missed Bitcoin?
            <br />
            <span style={{ fontStyle: "italic", fontWeight: 400, color: GOLD }}>
              Don&apos;t miss
            </span>{" "}
            digital gold mining.
          </h1>
          <p
            style={{
              ...bodyFont,
              fontSize: 19,
              lineHeight: 1.6,
              color: TEXT2,
              maxWidth: 640,
              marginTop: 32,
              fontWeight: 300,
            }}
          >
            Tokenization just triggered the biggest gold rush in history. This
            time it&apos;s digital, eco-friendly, and global.
          </p>
          <div style={{ marginTop: 40 }}>
            <WaitlistForm
              source="concept-old-hero"
              eventName="hero_email_submit"
            />
          </div>
        </div>
      </div>

      {/* bottom stat strip */}
      <div
        style={{
          position: "relative",
          borderTop: `1px solid ${HAIRLINE}`,
          background: "rgba(10,10,15,0.6)",
          backdropFilter: "blur(6px)",
        }}
      >
        <div
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            padding: "20px 24px",
            display: "grid",
            gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
            gap: 16,
            ...monoFont,
            fontSize: 11,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: TEXT3,
          }}
          className="hero-stats"
        >
          <span>$469M · Reserved</span>
          <span>17,466 · Investors</span>
          <span>162 · Countries</span>
          <span>10 · Patents Pending</span>
        </div>
      </div>
    </section>
  );
}

function NavBar() {
  return (
    <nav
      style={{
        position: "absolute",
        top: 24,
        left: 0,
        right: 0,
        padding: "0 24px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        maxWidth: 1280,
        margin: "0 auto",
      }}
    >
      <div
        style={{
          ...displayFont,
          fontSize: 13,
          letterSpacing: "0.24em",
          color: TEXT1,
          fontWeight: 600,
        }}
      >
        DGB<span style={{ color: GOLD }}>.</span>
      </div>
      <div
        style={{
          ...monoFont,
          fontSize: 10,
          letterSpacing: "0.24em",
          color: TEXT3,
          textTransform: "uppercase",
        }}
      >
        Waitlist · Open
      </div>
    </nav>
  );
}

/* ====== 02 — PERSONAL STAKE (split with image block) ====== */
function PersonalStake() {
  return (
    <section
      style={{
        position: "relative",
        background: VOID,
        padding: "120px 24px",
        borderBottom: `1px solid ${HAIRLINE}`,
      }}
    >
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "minmax(0,1fr) minmax(0,1.1fr)",
          gap: 72,
          alignItems: "center",
        }}
        className="split-2"
      >
        <div
          style={{
            position: "relative",
            aspectRatio: "4 / 5",
            borderRadius: 20,
            overflow: "hidden",
            border: `1px solid ${HAIRLINE}`,
          }}
        >
          <Image
            src="/images/earth-cubes/earth-cube-destruction.png"
            alt="Scarred earth cube"
            fill
            sizes="(max-width: 900px) 100vw, 540px"
            style={{ objectFit: "cover" }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(180deg, transparent 40%, rgba(10,10,15,0.85) 100%)",
            }}
          />
          <div
            style={{
              position: "absolute",
              left: 24,
              bottom: 24,
              ...monoFont,
              fontSize: 10,
              letterSpacing: "0.24em",
              textTransform: "uppercase",
              color: TEXT3,
            }}
          >
            Fig. 01 — Cost of extraction
          </div>
        </div>
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              marginBottom: 16,
            }}
          >
            <Eyebrow>Why this matters to you</Eyebrow>
            <SectionTag num="02" />
          </div>
          <h2
            style={{
              ...displayFont,
              fontSize: "clamp(28px, 4vw, 44px)",
              fontWeight: 500,
              lineHeight: 1.15,
              letterSpacing: "-0.015em",
              margin: 0,
              color: TEXT1,
            }}
          >
            Inflation is eating your savings.
            <br />
            <span style={{ color: GOLD }}>Crypto</span> was the escape that didn&apos;t work.
          </h2>
          <div
            style={{
              ...bodyFont,
              fontSize: 17,
              lineHeight: 1.7,
              color: TEXT2,
              marginTop: 32,
              fontWeight: 300,
              display: "flex",
              flexDirection: "column",
              gap: 20,
            }}
          >
            <p>
              Inflation is grinding through your savings. The world is getting
              less stable, not more. The hedges you used to trust are doing
              less of the job every year.
            </p>
            <p>
              Crypto was meant to be the escape. Meme coins. Rug pulls. Nothing
              real behind them. It burned trust without replacing anything.
            </p>
            <p style={{ color: TEXT1 }}>
              <strong style={{ color: GOLD, fontWeight: 600 }}>
                Gold has been a proven safe haven for 6,000 years.
              </strong>{" "}
              Real asset. Real value. The protection people reached for every
              time fiat broke down. The problem was always access — until now.
            </p>
          </div>
          <div
            style={{
              marginTop: 32,
              padding: "24px 28px",
              borderLeft: `2px solid ${GOLD}`,
              background: SURFACE1,
              borderRadius: 12,
              ...bodyFont,
              fontSize: 16,
              lineHeight: 1.65,
              color: TEXT1,
              fontWeight: 300,
            }}
          >
            Digital gold mining brings gold into the 21st century by combining
            it with blockchain — unlocking its value without environmental or
            social damage, and aligning the oldest asset in the world with how
            investors actually operate in 2026.
          </div>
        </div>
      </div>
    </section>
  );
}

/* ====== 03 — PROBLEM (asymmetric full-bleed with pulled quote) ====== */
function Problem() {
  return (
    <section
      style={{
        position: "relative",
        background: "#050508",
        padding: "140px 24px",
        overflow: "hidden",
        borderBottom: `1px solid ${HAIRLINE}`,
      }}
    >
      <div
        aria-hidden
        style={{ position: "absolute", inset: 0, opacity: 0.18 }}
      >
        <Image
          src="/images/earth-cubes/earth-cube-destruction.png"
          alt=""
          fill
          sizes="100vw"
          style={{ objectFit: "cover", objectPosition: "center" }}
        />
      </div>
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(60% 50% at 50% 50%, transparent, #050508 80%)",
        }}
      />
      <div
        style={{
          position: "relative",
          maxWidth: 960,
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 8 }}>
          <SectionTag num="03" />
        </div>
        <div style={{ display: "flex", justifyContent: "center", marginTop: 16 }}>
          <Eyebrow>The problem</Eyebrow>
        </div>
        <h2
          style={{
            ...displayFont,
            fontSize: "clamp(36px, 6vw, 72px)",
            fontWeight: 400,
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            margin: 0,
            color: TEXT1,
          }}
        >
          Traditional gold mining
          <br />
          <span style={{ color: GOLD, fontStyle: "italic" }}>is dying.</span>
        </h2>
        <p
          style={{
            ...bodyFont,
            fontSize: 18,
            lineHeight: 1.75,
            color: TEXT2,
            fontWeight: 300,
            maxWidth: 720,
            margin: "40px auto 0",
          }}
        >
          Environmental damage. Social displacement. Regulatory scrutiny.
          Investor flight. Six compounding forces the book names the{" "}
          <strong style={{ color: TEXT1, fontWeight: 500 }}>
            Extraction S.P.I.R.A.L.™
          </strong>{" "}
          — a gravity well, not a cycle. One by one, the conditions that built
          the industry are shutting it down.
        </p>
        <div
          style={{
            marginTop: 48,
            display: "inline-block",
            padding: "28px 40px",
            border: `1px solid ${GOLD_GHOST}`,
            borderRadius: 16,
            background: "rgba(17,17,24,0.6)",
            backdropFilter: "blur(10px)",
          }}
        >
          <div
            style={{
              ...monoFont,
              fontSize: 48,
              color: GOLD,
              letterSpacing: "-0.02em",
              fontVariantNumeric: "tabular-nums",
            }}
          >
            $22T
          </div>
          <div
            style={{
              ...monoFont,
              fontSize: 10,
              letterSpacing: "0.22em",
              color: TEXT3,
              textTransform: "uppercase",
              marginTop: 8,
            }}
          >
            Verified gold · Still in the ground
          </div>
        </div>
        <p
          style={{
            ...bodyFont,
            fontSize: 16,
            color: TEXT3,
            marginTop: 24,
            maxWidth: 640,
            marginInline: "auto",
            fontWeight: 300,
          }}
        >
          And the industry can&apos;t reach it without paying a cost the world
          no longer accepts.
        </p>
      </div>
    </section>
  );
}

/* ====== 04 — REFRAME (sidebar editorial) ====== */
function Reframe() {
  return (
    <section
      style={{
        background: VOID,
        padding: "120px 24px",
        borderBottom: `1px solid ${HAIRLINE}`,
      }}
    >
      <div
        style={{
          maxWidth: 1180,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "220px minmax(0, 1fr)",
          gap: 64,
        }}
        className="split-sidebar"
      >
        <div>
          <SectionTag num="04" />
          <div style={{ marginTop: 16 }}>
            <Eyebrow>The reframe</Eyebrow>
          </div>
          <div
            style={{
              marginTop: 32,
              ...monoFont,
              fontSize: 11,
              letterSpacing: "0.2em",
              color: TEXT3,
              lineHeight: 1.8,
              textTransform: "uppercase",
            }}
          >
            Insight
            <br />
            Verification
            <br />
            Not extraction
          </div>
        </div>
        <div>
          <h2
            style={{
              ...displayFont,
              fontSize: "clamp(30px, 4.4vw, 54px)",
              fontWeight: 400,
              lineHeight: 1.1,
              letterSpacing: "-0.015em",
              margin: 0,
              color: TEXT1,
            }}
          >
            Gold mining <em style={{ color: GOLD }}>already</em> runs on
            verification, not extraction.
          </h2>
          <p
            style={{
              ...bodyFont,
              fontSize: 18,
              lineHeight: 1.7,
              color: TEXT2,
              marginTop: 32,
              fontWeight: 300,
            }}
          >
            <strong style={{ color: TEXT1, fontWeight: 500 }}>
              No billion-dollar gold investment happens without geological
              verification first.
            </strong>{" "}
            Every major mine, every institutional portfolio, every deposit
            that ever made it into the system started with a geologist proving
            the gold exists.
          </p>
          <p
            style={{
              ...bodyFont,
              fontSize: 18,
              lineHeight: 1.7,
              color: TEXT2,
              marginTop: 20,
              fontWeight: 300,
            }}
          >
            Verification is the backbone. Extraction is the part everyone{" "}
            <em>assumed</em> was non-negotiable.
          </p>
          <div
            style={{
              marginTop: 40,
              paddingTop: 32,
              borderTop: `1px solid ${HAIRLINE}`,
              ...displayFont,
              fontSize: 28,
              fontWeight: 400,
              letterSpacing: "-0.01em",
              color: GOLD,
            }}
          >
            It isn&apos;t. Not anymore.
          </div>
        </div>
      </div>
    </section>
  );
}

/* ====== 05 — SOLUTION (definition callout + 3 steps) ====== */
function Solution() {
  const steps = [
    {
      n: "01",
      title: "Verify",
      body: "Independent geological proof of in-ground gold resources.",
    },
    {
      n: "02",
      title: "Tokenize",
      body: "The verified ownership of gold becomes a digital asset on-chain.",
    },
    {
      n: "03",
      title: "Trade",
      body: "Anyone, anywhere. 24/7. No extraction. No ESG cost.",
    },
  ];
  return (
    <section
      style={{
        background: SURFACE1,
        padding: "120px 24px",
        borderBottom: `1px solid ${HAIRLINE}`,
      }}
    >
      <div style={{ maxWidth: 1180, margin: "0 auto" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            flexWrap: "wrap",
            gap: 24,
            marginBottom: 48,
          }}
        >
          <div>
            <Eyebrow>The solution</Eyebrow>
            <h2
              style={{
                ...displayFont,
                fontSize: "clamp(30px, 4.4vw, 52px)",
                fontWeight: 400,
                lineHeight: 1.1,
                letterSpacing: "-0.015em",
                margin: 0,
                color: TEXT1,
                maxWidth: 880,
              }}
            >
              Blockchain finally matured enough to{" "}
              <span style={{ color: GOLD }}>bypass extraction.</span>
            </h2>
          </div>
          <SectionTag num="05" />
        </div>

        <p
          style={{
            ...bodyFont,
            fontSize: 18,
            lineHeight: 1.7,
            color: TEXT2,
            maxWidth: 820,
            fontWeight: 300,
          }}
        >
          Take the geologically verified in-ground gold. Tokenize it on-chain.
          You&apos;ve eliminated every problem extraction creates —
          environmental, social, financial — while keeping the part that
          actually matters: the verified ownership of real gold.
        </p>
        <p
          style={{
            ...bodyFont,
            fontSize: 18,
            lineHeight: 1.7,
            color: TEXT2,
            maxWidth: 820,
            fontWeight: 300,
            marginTop: 16,
          }}
        >
          That&apos;s digital gold mining. Gold that never needs to leave the
          ground to be owned — without the environmental and social cost
          extraction always charged.
        </p>

        {/* Definition callout */}
        <div
          style={{
            marginTop: 56,
            padding: "40px 48px",
            background: VOID,
            border: `1px solid ${GOLD_GHOST}`,
            borderLeft: `3px solid ${GOLD}`,
            borderRadius: 20,
            position: "relative",
          }}
        >
          <div
            style={{
              ...monoFont,
              fontSize: 10,
              letterSpacing: "0.24em",
              textTransform: "uppercase",
              color: GOLD,
              marginBottom: 12,
            }}
          >
            Official definition
          </div>
          <p
            style={{
              ...displayFont,
              fontSize: "clamp(18px, 2.2vw, 24px)",
              lineHeight: 1.5,
              color: TEXT1,
              margin: 0,
              fontWeight: 400,
              letterSpacing: "-0.005em",
            }}
          >
            Digital gold mining is a patent-pending process developed by{" "}
            <span style={{ color: GOLD }}>NatGold Digital</span> that tokenizes
            in-ground verified gold deposits into an eco-friendly, gold-backed
            digital asset for the modern investor — without environmental
            destruction or social displacement.
          </p>
        </div>

        {/* Three steps */}
        <div
          style={{
            marginTop: 48,
            display: "grid",
            gridTemplateColumns: "repeat(3, minmax(0,1fr))",
            gap: 20,
          }}
          className="grid-3"
        >
          {steps.map((s) => (
            <div
              key={s.n}
              style={{
                padding: 32,
                background: VOID,
                border: `1px solid ${HAIRLINE}`,
                borderRadius: 20,
                minHeight: 220,
              }}
            >
              <div
                style={{
                  ...monoFont,
                  fontSize: 11,
                  letterSpacing: "0.22em",
                  color: GOLD,
                }}
              >
                {s.n} ·
              </div>
              <div
                style={{
                  ...displayFont,
                  fontSize: 28,
                  fontWeight: 500,
                  color: TEXT1,
                  marginTop: 16,
                  letterSpacing: "-0.005em",
                }}
              >
                {s.title}
              </div>
              <p
                style={{
                  ...bodyFont,
                  fontSize: 15,
                  lineHeight: 1.6,
                  color: TEXT2,
                  marginTop: 16,
                  fontWeight: 300,
                }}
              >
                {s.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ====== 06 — CONVERGENCE (data dashboard 3-column with big numerals) ====== */
function Convergence() {
  const forces = [
    {
      n: "01",
      title: "Gold is having its moment.",
      body: "Central banks are buying. Retail is rediscovering it. The oldest store of value is quietly back at the centre of the conversation.",
      img: "/images/earth-cubes/earth-cube-global-field.png",
    },
    {
      n: "02",
      title: "Blockchain finally grew up.",
      body: "Real-world asset tokenization moved from crypto fantasy to where the institutional trillions are actually going.",
      img: "/images/earth-cubes/earth-cube-tokenization.png",
    },
    {
      n: "03",
      title: "A new generation wants in — without the guilt.",
      body: "For the first time, gold is available without the extraction, displacement, and environmental cost that locked younger investors out.",
      img: "/images/earth-cubes/earth-cube-regeneration.png",
    },
  ];
  return (
    <section
      style={{
        background: VOID,
        padding: "140px 24px",
        borderBottom: `1px solid ${HAIRLINE}`,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.08,
          background:
            "radial-gradient(1200px 600px at 50% 100%, rgba(212,168,67,0.22), transparent 70%)",
        }}
      />
      <div
        style={{
          position: "relative",
          maxWidth: 1280,
          margin: "0 auto",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 32,
            marginBottom: 56,
          }}
        >
          <div style={{ maxWidth: 760 }}>
            <Eyebrow>The Halley&apos;s Comet alignment</Eyebrow>
            <h2
              style={{
                ...displayFont,
                fontSize: "clamp(32px, 5vw, 60px)",
                fontWeight: 400,
                lineHeight: 1.08,
                letterSpacing: "-0.02em",
                margin: 0,
                color: TEXT1,
              }}
            >
              Three forces. <span style={{ color: GOLD }}>Same window.</span>
            </h2>
            <p
              style={{
                ...bodyFont,
                fontSize: 18,
                lineHeight: 1.7,
                color: TEXT2,
                marginTop: 24,
                maxWidth: 640,
                fontWeight: 300,
              }}
            >
              For the first time in history, three trillion-dollar forces are
              aligning at once. Most people only see one of them. Until
              it&apos;s too late.
            </p>
          </div>
          <SectionTag num="06" />
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, minmax(0,1fr))",
            gap: 24,
          }}
          className="grid-3"
        >
          {forces.map((f) => (
            <div
              key={f.n}
              style={{
                background: SURFACE1,
                border: `1px solid ${HAIRLINE}`,
                borderRadius: 20,
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  position: "relative",
                  aspectRatio: "5 / 3",
                  overflow: "hidden",
                }}
              >
                <Image
                  src={f.img}
                  alt=""
                  fill
                  sizes="(max-width: 900px) 100vw, 33vw"
                  style={{ objectFit: "cover", opacity: 0.85 }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(180deg, transparent 40%, rgba(17,17,24,0.95) 100%)",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    top: 20,
                    left: 24,
                    ...monoFont,
                    fontSize: 36,
                    fontWeight: 500,
                    color: GOLD,
                    letterSpacing: "-0.02em",
                  }}
                >
                  {f.n}
                </div>
              </div>
              <div style={{ padding: 28 }}>
                <h3
                  style={{
                    ...displayFont,
                    fontSize: 20,
                    fontWeight: 500,
                    lineHeight: 1.3,
                    color: TEXT1,
                    margin: 0,
                    letterSpacing: "-0.005em",
                  }}
                >
                  {f.title}
                </h3>
                <p
                  style={{
                    ...bodyFont,
                    fontSize: 15,
                    lineHeight: 1.65,
                    color: TEXT2,
                    marginTop: 14,
                    fontWeight: 300,
                  }}
                >
                  {f.body}
                </p>
              </div>
            </div>
          ))}
        </div>

        <p
          style={{
            ...displayFont,
            fontSize: "clamp(18px, 2.4vw, 28px)",
            fontWeight: 400,
            lineHeight: 1.4,
            color: TEXT1,
            marginTop: 64,
            maxWidth: 820,
            letterSpacing: "-0.005em",
          }}
        >
          When three trillion-dollar forces converge like this,{" "}
          <span style={{ color: GOLD }}>
            the window to understand it closes faster than the window to act on
            it.
          </span>
        </p>
      </div>
    </section>
  );
}

/* ====== 07 — BITCOIN PARALLEL (hero-mirror, full-bleed centered) ====== */
function BitcoinParallel() {
  return (
    <section
      style={{
        background: "#050508",
        padding: "160px 24px",
        borderBottom: `1px solid ${HAIRLINE}`,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        aria-hidden
        style={{ position: "absolute", inset: 0, opacity: 0.12 }}
      >
        <Image
          src="/images/earth-cubes/earth-cube-playbook-monolith.png"
          alt=""
          fill
          sizes="100vw"
          style={{ objectFit: "cover" }}
        />
      </div>
      <div
        style={{
          position: "relative",
          maxWidth: 900,
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        <SectionTag num="07" />
        <h2
          style={{
            ...displayFont,
            fontSize: "clamp(32px, 5.5vw, 64px)",
            fontWeight: 400,
            lineHeight: 1.08,
            letterSpacing: "-0.02em",
            color: TEXT1,
            marginTop: 24,
          }}
        >
          Gold was money for{" "}
          <span style={{ color: GOLD }}>6,000 years.</span>
        </h2>
        <p
          style={{
            ...bodyFont,
            fontSize: 19,
            lineHeight: 1.7,
            color: TEXT2,
            marginTop: 40,
            maxWidth: 720,
            marginInline: "auto",
            fontWeight: 300,
          }}
        >
          Bitcoin was the escape that didn&apos;t quite work. Digital gold
          mining is the step that finally moves the oldest store of value at
          the speed and reach of the modern one.
        </p>
        <div
          style={{
            marginTop: 64,
            padding: "40px 32px",
            borderTop: `1px solid ${GOLD_GHOST}`,
            borderBottom: `1px solid ${GOLD_GHOST}`,
            maxWidth: 820,
            marginInline: "auto",
          }}
        >
          <p
            style={{
              ...displayFont,
              fontSize: "clamp(22px, 3vw, 34px)",
              lineHeight: 1.3,
              color: TEXT1,
              margin: 0,
              fontWeight: 400,
              letterSpacing: "-0.01em",
            }}
          >
            Gold only gets digitized{" "}
            <em style={{ color: GOLD }}>once.</em> That&apos;s the thing to be
            early to.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ====== 08 — PROOF LINE (5-col stat dashboard) ====== */
function ProofLine() {
  const stats = [
    { n: "$469M", label: "Reserved", body: "Pre-market token reservations before a single public listing." },
    { n: "17,466", label: "Investors", body: "Real people who put real capital behind the model." },
    { n: "162", label: "Countries", body: "Global reach without a single paid advertisement." },
    { n: "10", label: "Patents", body: "Patents pending on the origination process itself." },
    { n: "7 yr", label: "Built", body: "Seven years spent building the system before going public." },
  ];
  return (
    <section
      style={{
        background: VOID,
        padding: "120px 24px",
        borderBottom: `1px solid ${HAIRLINE}`,
      }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            flexWrap: "wrap",
            gap: 24,
            marginBottom: 56,
          }}
        >
          <div style={{ maxWidth: 720 }}>
            <Eyebrow>Pre-market token reservations &amp; milestones</Eyebrow>
            <h2
              style={{
                ...displayFont,
                fontSize: "clamp(28px, 4vw, 46px)",
                fontWeight: 400,
                lineHeight: 1.15,
                letterSpacing: "-0.015em",
                color: TEXT1,
                margin: 0,
              }}
            >
              The numbers behind a category{" "}
              <span style={{ color: GOLD }}>that hasn&apos;t gone public yet.</span>
            </h2>
          </div>
          <SectionTag num="08" />
        </div>

        <div
          style={{
            borderTop: `1px solid ${HAIRLINE}`,
            borderBottom: `1px solid ${HAIRLINE}`,
            display: "grid",
            gridTemplateColumns: "repeat(5, minmax(0,1fr))",
          }}
          className="grid-5-stats"
        >
          {stats.map((s, i) => (
            <div
              key={s.label}
              style={{
                padding: "40px 24px",
                borderLeft: i === 0 ? "none" : `1px solid ${HAIRLINE}`,
              }}
              className="stat-cell"
            >
              <div
                style={{
                  ...monoFont,
                  fontSize: "clamp(36px, 4vw, 56px)",
                  fontWeight: 500,
                  color: GOLD,
                  letterSpacing: "-0.02em",
                  fontVariantNumeric: "tabular-nums",
                  lineHeight: 1,
                }}
              >
                {s.n}
              </div>
              <div
                style={{
                  ...monoFont,
                  fontSize: 10,
                  fontWeight: 600,
                  letterSpacing: "0.24em",
                  textTransform: "uppercase",
                  color: TEXT2,
                  marginTop: 16,
                }}
              >
                {s.label}
              </div>
              <p
                style={{
                  ...bodyFont,
                  fontSize: 13,
                  lineHeight: 1.55,
                  color: TEXT3,
                  marginTop: 12,
                  fontWeight: 300,
                }}
              >
                {s.body}
              </p>
            </div>
          ))}
        </div>

        <p
          style={{
            ...monoFont,
            fontSize: 11,
            letterSpacing: "0.14em",
            color: TEXT3,
            marginTop: 32,
            textTransform: "uppercase",
          }}
        >
          Every figure traces to NatGold Digital&apos;s public pre-market
          reservation timeline. Independently verifiable on request.
        </p>
      </div>
    </section>
  );
}

/* ====== 09 — PEOPLE (3-profile credentials row) ====== */
function People() {
  const profiles = [
    {
      role: "Former Chief of Staff",
      inst: "U.S. Securities and Exchange Commission",
      ctx: "Drafted enforcement policy for emerging-asset classifications.",
    },
    {
      role: "Former Counsel",
      inst: "U.S. Commodity Futures Trading Commission",
      ctx: "Architected the regulatory framework for commodity-backed digital assets.",
    },
    {
      role: "Ex Mining Executive",
      inst: "Barrick Gold · BHP",
      ctx: "Ran exploration programs on the world's largest gold and mineral portfolios.",
    },
  ];
  return (
    <section
      style={{
        background: SURFACE1,
        padding: "120px 24px",
        borderBottom: `1px solid ${HAIRLINE}`,
      }}
    >
      <div style={{ maxWidth: 1180, margin: "0 auto" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 24,
            marginBottom: 48,
          }}
        >
          <div style={{ maxWidth: 760 }}>
            <Eyebrow>Who&apos;s behind it</Eyebrow>
            <h2
              style={{
                ...displayFont,
                fontSize: "clamp(28px, 4vw, 46px)",
                fontWeight: 400,
                lineHeight: 1.15,
                letterSpacing: "-0.015em",
                color: TEXT1,
                margin: 0,
              }}
            >
              Built by people who{" "}
              <span style={{ color: GOLD }}>built the old system.</span>
            </h2>
            <p
              style={{
                ...bodyFont,
                fontSize: 17,
                lineHeight: 1.7,
                color: TEXT2,
                marginTop: 20,
                fontWeight: 300,
              }}
            >
              This isn&apos;t a crypto-anon project. It&apos;s being built by
              people retail investors already quietly{" "}
              <strong style={{ color: TEXT1, fontWeight: 500 }}>trust</strong>{" "}
              every day.
            </p>
          </div>
          <SectionTag num="09" />
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, minmax(0,1fr))",
            gap: 20,
          }}
          className="grid-3"
        >
          {profiles.map((p) => (
            <div
              key={p.role}
              style={{
                padding: 36,
                background: VOID,
                border: `1px solid ${GOLD_GHOST}`,
                borderRadius: 20,
                minHeight: 260,
                position: "relative",
              }}
            >
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 12,
                  border: `1px solid ${GOLD_GHOST}`,
                  display: "grid",
                  placeItems: "center",
                  ...monoFont,
                  fontSize: 14,
                  color: GOLD,
                  fontWeight: 600,
                }}
              >
                ◆
              </div>
              <div
                style={{
                  ...displayFont,
                  fontSize: 20,
                  fontWeight: 500,
                  color: TEXT1,
                  marginTop: 24,
                  letterSpacing: "-0.005em",
                }}
              >
                {p.role}
              </div>
              <div
                style={{
                  ...monoFont,
                  fontSize: 11,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: GOLD,
                  marginTop: 10,
                }}
              >
                {p.inst}
              </div>
              <p
                style={{
                  ...bodyFont,
                  fontSize: 14,
                  lineHeight: 1.65,
                  color: TEXT2,
                  marginTop: 20,
                  fontWeight: 300,
                  fontStyle: "italic",
                }}
              >
                {p.ctx}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ====== 10 — BOOK (hero mirror with Book3D) ====== */
function Book() {
  const sections = [
    {
      n: "01",
      title: "Why Gold No Longer Needs Mining",
      meta: "Chapters 1–8 · The Inevitability Case",
      body: "Why the old extraction-based gold industry is structurally collapsing — environmental, social, and economic forces shutting it down at the exact moment trillions in verified gold sit untouched in the ground.",
    },
    {
      n: "02",
      title: "The NatGold Digital Mining Ecosystem",
      meta: "Chapters 9–16 · How It Works",
      body: "How NatGold Digital actually works. The team, the patents, the verification standards, the approval pipeline, the token economics — and the pre-market demand it has already attracted.",
    },
    {
      n: "03",
      title: "The $1B Case Study: Cahuilla Gold Project",
      meta: "Chapters 17–19 · Proof of Concept",
      body: "The first real deposit through the pipeline. The transaction details, the players, the financial and environmental scorecard — theory replaced with a real-world transaction.",
    },
    {
      n: "04",
      title: "The Opportunity, Risks & Future",
      meta: "Chapters 20–23 · What to Do Next",
      body: "An honest risk register, the investment options that exist today, a 10-year forecast, and the structural parallel between digital gold mining and the EV transition of the last decade.",
    },
  ];

  return (
    <section
      style={{
        background: VOID,
        padding: "140px 24px",
        borderBottom: `1px solid ${HAIRLINE}`,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(800px 600px at 30% 40%, rgba(212,168,67,0.08), transparent 70%)",
        }}
      />
      <div
        style={{
          position: "relative",
          maxWidth: 1280,
          margin: "0 auto",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 1.1fr) minmax(0, 1fr)",
            gap: 72,
            alignItems: "center",
          }}
          className="split-2"
        >
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 16,
              }}
            >
              <Eyebrow>The book</Eyebrow>
              <SectionTag num="10" />
            </div>
            <h2
              style={{
                ...displayFont,
                fontSize: "clamp(40px, 6vw, 72px)",
                fontWeight: 500,
                lineHeight: 1.02,
                letterSpacing: "-0.02em",
                color: TEXT1,
                margin: 0,
              }}
            >
              Digital Gold Boom.
            </h2>
            <div
              style={{
                ...displayFont,
                fontSize: "clamp(18px, 2vw, 22px)",
                color: GOLD,
                marginTop: 16,
                fontStyle: "italic",
                fontWeight: 400,
              }}
            >
              Tell all. Nothing held back.
            </div>
            <p
              style={{
                ...bodyFont,
                fontSize: 16,
                lineHeight: 1.7,
                color: TEXT2,
                marginTop: 32,
                maxWidth: 520,
                fontWeight: 300,
              }}
            >
              Written by <strong style={{ color: TEXT1, fontWeight: 500 }}>Andrew Fletcher</strong>{" "}
              — former President of Great Eagle Gold Corp, now NatBridge
              Resources, which signed the first NatGold supply agreement.
            </p>
            <p
              style={{
                ...displayFont,
                fontSize: 20,
                lineHeight: 1.4,
                color: TEXT1,
                marginTop: 32,
                fontWeight: 400,
                letterSpacing: "-0.005em",
                maxWidth: 480,
              }}
            >
              Once you see it, you can&apos;t unsee it.{" "}
              <em style={{ color: GOLD }}>It just makes sense.</em>
            </p>
          </div>

          {/* Book 3D placement */}
          <div
            style={{
              display: "grid",
              placeItems: "center",
              minHeight: 520,
            }}
          >
            <div className="book3d-desktop">
              <Book3D />
            </div>
            <div className="book3d-mobile">
              <Image
                src="/images/Digital Gold Boom Cover (1).png"
                alt="Digital Gold Boom book cover"
                width={360}
                height={548}
                style={{
                  width: "100%",
                  maxWidth: 320,
                  height: "auto",
                  borderRadius: 8,
                  boxShadow: "0 30px 80px rgba(0,0,0,0.6)",
                }}
              />
            </div>
          </div>
        </div>

        {/* 4 sections block */}
        <div
          style={{
            marginTop: 96,
            paddingTop: 64,
            borderTop: `1px solid ${HAIRLINE}`,
          }}
        >
          <div style={{ marginBottom: 48 }}>
            <Eyebrow>Four sections · 23 chapters</Eyebrow>
            <h3
              style={{
                ...displayFont,
                fontSize: "clamp(26px, 3.6vw, 40px)",
                fontWeight: 400,
                lineHeight: 1.15,
                color: TEXT1,
                margin: 0,
                letterSpacing: "-0.015em",
              }}
            >
              One complete case, end to end.
            </h3>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, minmax(0,1fr))",
              gap: 20,
            }}
            className="grid-2"
          >
            {sections.map((s) => (
              <div
                key={s.n}
                style={{
                  padding: 32,
                  background: SURFACE1,
                  border: `1px solid ${HAIRLINE}`,
                  borderRadius: 20,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                    marginBottom: 16,
                  }}
                >
                  <div
                    style={{
                      ...monoFont,
                      fontSize: 24,
                      color: GOLD,
                      fontWeight: 500,
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {s.n}
                  </div>
                  <div
                    style={{
                      ...monoFont,
                      fontSize: 10,
                      letterSpacing: "0.2em",
                      color: TEXT3,
                      textTransform: "uppercase",
                    }}
                  >
                    {s.meta}
                  </div>
                </div>
                <h4
                  style={{
                    ...displayFont,
                    fontSize: 22,
                    fontWeight: 500,
                    color: TEXT1,
                    margin: 0,
                    letterSpacing: "-0.005em",
                    lineHeight: 1.25,
                  }}
                >
                  {s.title}
                </h4>
                <p
                  style={{
                    ...bodyFont,
                    fontSize: 14,
                    lineHeight: 1.65,
                    color: TEXT2,
                    marginTop: 16,
                    fontWeight: 300,
                  }}
                >
                  {s.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ====== 11 — STACK (pricing table) ====== */
function Stack() {
  const items = [
    {
      title: "Digital Gold Boom",
      price: "$39",
      body: "The full book. Every stat sourced, every claim traceable, the complete case from top to bottom.",
    },
    {
      title: "The Primer",
      price: "$99",
      body: "Waitlist-only dummy's guide. The play-by-play of what digital gold mining is and how it works — condensed for one sitting.",
    },
    {
      title: "Industry Intelligence Updates",
      price: "$199 / yr",
      body: "One year of periodic updates as the digital gold mining space evolves — new deposits, new partners, new milestones.",
    },
  ];
  return (
    <section
      style={{
        background: "#050508",
        padding: "120px 24px",
        borderBottom: `1px solid ${HAIRLINE}`,
      }}
    >
      <div style={{ maxWidth: 1040, margin: "0 auto" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 24,
            marginBottom: 56,
          }}
        >
          <div>
            <Eyebrow>What waitlist members get</Eyebrow>
            <h2
              style={{
                ...displayFont,
                fontSize: "clamp(32px, 5vw, 60px)",
                fontWeight: 400,
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
                color: TEXT1,
                margin: 0,
              }}
            >
              $337 of value. <span style={{ color: GOLD }}>$0 to join.</span>
            </h2>
          </div>
          <SectionTag num="11" />
        </div>

        <div
          style={{
            border: `1px solid ${HAIRLINE}`,
            borderRadius: 20,
            overflow: "hidden",
            background: SURFACE1,
          }}
        >
          {items.map((it, i) => (
            <div
              key={it.title}
              style={{
                display: "grid",
                gridTemplateColumns: "minmax(0,1fr) auto",
                gap: 24,
                padding: "28px 32px",
                borderBottom: i === items.length - 1 ? "none" : `1px solid ${HAIRLINE}`,
                alignItems: "start",
              }}
            >
              <div>
                <h3
                  style={{
                    ...displayFont,
                    fontSize: 20,
                    fontWeight: 500,
                    color: TEXT1,
                    margin: 0,
                    letterSpacing: "-0.005em",
                  }}
                >
                  {it.title}
                </h3>
                <p
                  style={{
                    ...bodyFont,
                    fontSize: 14,
                    lineHeight: 1.65,
                    color: TEXT3,
                    marginTop: 10,
                    fontWeight: 300,
                    maxWidth: 640,
                  }}
                >
                  {it.body}
                </p>
              </div>
              <div
                style={{
                  ...monoFont,
                  fontSize: 20,
                  color: GOLD,
                  fontWeight: 500,
                  letterSpacing: "-0.005em",
                  whiteSpace: "nowrap",
                }}
              >
                {it.price}
              </div>
            </div>
          ))}

          {/* Total row muted */}
          <div
            style={{
              borderTop: `1px solid ${HAIRLINE}`,
              padding: "20px 32px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              background: "rgba(10,10,15,0.4)",
              ...monoFont,
              fontSize: 12,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: TEXT3,
              textDecoration: "line-through",
            }}
          >
            <span>Total value</span>
            <span>$337</span>
          </div>

          {/* Peak price row */}
          <div
            style={{
              padding: "40px 32px",
              background:
                "linear-gradient(180deg, rgba(212,168,67,0.14) 0%, rgba(212,168,67,0.04) 100%)",
              borderTop: `1px solid ${GOLD_GHOST}`,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 16,
            }}
          >
            <div
              style={{
                ...monoFont,
                fontSize: 11,
                letterSpacing: "0.24em",
                textTransform: "uppercase",
                color: GOLD,
              }}
            >
              Your price on the waitlist
            </div>
            <div
              style={{
                ...displayFont,
                fontSize: "clamp(48px, 7vw, 88px)",
                fontWeight: 600,
                color: GOLD,
                letterSpacing: "-0.03em",
                lineHeight: 1,
                fontVariantNumeric: "tabular-nums",
              }}
            >
              $0
            </div>
          </div>
        </div>

        <p
          style={{
            ...monoFont,
            fontSize: 11,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: TEXT3,
            marginTop: 24,
            textAlign: "center",
          }}
        >
          Free until the book drops. $39 after. No spam.
        </p>
      </div>
    </section>
  );
}

/* ====== 12 — FINAL CTA (hero mirror with form) ====== */
function FinalCTA() {
  return (
    <section
      style={{
        position: "relative",
        background: VOID,
        padding: "160px 24px 120px",
        overflow: "hidden",
      }}
    >
      <div
        aria-hidden
        style={{ position: "absolute", inset: 0, opacity: 0.16 }}
      >
        <Image
          src="/images/earth-cubes/earth-cube-global-field.png"
          alt=""
          fill
          sizes="100vw"
          style={{ objectFit: "cover" }}
        />
      </div>
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(900px 700px at 50% 50%, rgba(212,168,67,0.14), transparent 70%)",
        }}
      />
      <div
        style={{
          position: "relative",
          maxWidth: 900,
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        <SectionTag num="12" />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: 20,
          }}
        >
          <Eyebrow>Understand it before Wall Street does</Eyebrow>
        </div>
        <h2
          style={{
            ...displayFont,
            fontSize: "clamp(30px, 5vw, 60px)",
            fontWeight: 400,
            lineHeight: 1.08,
            letterSpacing: "-0.02em",
            color: TEXT1,
            margin: 0,
          }}
        >
          Missed Bitcoin? Don&apos;t wait to read about digital gold mining in
          the <span style={{ color: GOLD }}>Wall Street Journal.</span>
        </h2>
        <p
          style={{
            ...displayFont,
            fontSize: "clamp(20px, 2.6vw, 28px)",
            fontWeight: 400,
            color: GOLD,
            marginTop: 24,
            fontStyle: "italic",
          }}
        >
          Read it here first.
        </p>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: 48,
          }}
        >
          <WaitlistForm
            source="concept-old-final-cta"
            eventName="final_cta_email_submit"
          />
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer
      style={{
        background: "#050508",
        padding: "56px 24px 40px",
        borderTop: `1px solid ${HAIRLINE}`,
      }}
    >
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          gap: 20,
          ...monoFont,
          fontSize: 11,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: TEXT3,
        }}
      >
        <div>
          DGB<span style={{ color: GOLD }}>.</span> · Digital Gold Boom © 2026
        </div>
        <div>Written by Andrew Fletcher · NatBridge Resources</div>
      </div>
    </footer>
  );
}

export default function ConceptOldPage() {
  return (
    <main>
      <Hero />
      <PersonalStake />
      <Problem />
      <Reframe />
      <Solution />
      <Convergence />
      <BitcoinParallel />
      <ProofLine />
      <People />
      <Book />
      <Stack />
      <FinalCTA />
      <Footer />
      <style>{`
        .book3d-mobile { display: none; }
        .book3d-desktop { display: block; }
        @media (max-width: 900px) {
          .split-2 { grid-template-columns: minmax(0, 1fr) !important; gap: 48px !important; }
          .split-sidebar { grid-template-columns: minmax(0, 1fr) !important; gap: 32px !important; }
          .grid-3 { grid-template-columns: minmax(0, 1fr) !important; }
          .grid-2 { grid-template-columns: minmax(0, 1fr) !important; }
          .grid-5-stats { grid-template-columns: repeat(2, minmax(0,1fr)) !important; }
          .grid-5-stats .stat-cell { border-left: none !important; border-top: 1px solid ${HAIRLINE}; }
          .hero-stats { grid-template-columns: repeat(2, minmax(0,1fr)) !important; }
          .hide-on-mobile { display: none !important; }
          .book3d-desktop { display: none; }
          .book3d-mobile { display: block; width: 100%; }
        }
        @media (prefers-reduced-motion: reduce) {
          * { animation-duration: 0.001ms !important; transition-duration: 0.001ms !important; }
        }
      `}</style>
    </main>
  );
}
