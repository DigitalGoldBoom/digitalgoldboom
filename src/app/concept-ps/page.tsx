import Image from "next/image";
import Book3D from "@/components/Book3D";
import WaitlistForm from "./_components/WaitlistForm";

// Concept PS — Authority Navy + Premium Gold on PlayStation gallery rhythm.
// Tokens (MASTER.md):
//   Primary   #0F172A   Secondary #334155   CTA #CA8A04
//   Background #F8FAFC  Text #020617
// Typography: Playfair Display (display, weight 300 at scale) + Inter (body)
// Structural philosophy (DESIGN.md): three-surface alternation (navy / stone /
// cream), weight-300 quiet-authority headlines, gallery whitespace, 1.2× CTA
// signature, disciplined radius scale.

const NAVY = "#0F172A";
const NAVY_DEEP = "#020617";
const SECONDARY = "#334155";
const GOLD = "#CA8A04";
const GOLD_SOFT = "#D4A84A";
const CANVAS = "#F8FAFC";
const STONE = "#EEF0F4";
const INK = "#020617";
const MUTED = "#64748B";
const HAIRLINE = "rgba(15,23,42,0.12)";
const HAIRLINE_ON_DARK = "rgba(248,250,252,0.14)";

// Shared typography styles
const display = {
  fontFamily: "var(--font-playfair), Georgia, serif",
  fontWeight: 300,
  letterSpacing: "-0.01em",
  lineHeight: 1.08,
};
const body = {
  fontFamily: "var(--font-inter), system-ui, sans-serif",
};
const eyebrow = {
  fontFamily: "var(--font-inter), system-ui, sans-serif",
  fontSize: "11px",
  fontWeight: 500,
  letterSpacing: "0.22em",
  textTransform: "uppercase" as const,
};

export default function ConceptPsPage() {
  return (
    <main
      style={{
        background: CANVAS,
        color: INK,
        ...body,
        fontSize: "16px",
        lineHeight: 1.6,
        overflowX: "hidden",
      }}
    >
      {/* ——— NAV ——— */}
      <ConceptNav />

      {/* ——— 01 HERO ——— split w/ vertical date rail */}
      <section
        style={{
          background: NAVY,
          color: CANVAS,
          borderBottom: `1px solid ${HAIRLINE_ON_DARK}`,
        }}
      >
        <div
          className="mx-auto px-6 md:px-12 lg:px-16"
          style={{ maxWidth: "1440px", paddingTop: "96px", paddingBottom: "96px" }}
        >
          <div className="grid grid-cols-12 gap-6 md:gap-10 items-center">
            {/* vertical date rail */}
            <aside className="hidden lg:flex col-span-1 flex-col items-start gap-6">
              <div
                style={{
                  ...eyebrow,
                  color: GOLD_SOFT,
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                }}
              >
                Vol. 01 · 2026
              </div>
              <div style={{ width: 1, height: 160, background: HAIRLINE_ON_DARK }} />
            </aside>

            <div className="col-span-12 lg:col-span-7">
              <div style={{ ...eyebrow, color: GOLD_SOFT }}>Decoding the next gold rush</div>
              <h1
                className="mt-6"
                style={{
                  ...display,
                  fontSize: "clamp(40px, 6.2vw, 84px)",
                  color: CANVAS,
                }}
              >
                Missed Bitcoin?
                <br />
                <em style={{ fontStyle: "italic", color: GOLD_SOFT }}>Don&rsquo;t miss</em>{" "}
                digital gold mining.
              </h1>
              <p
                className="mt-8 max-w-xl"
                style={{ color: "rgba(248,250,252,0.78)", fontSize: "18px", lineHeight: 1.6 }}
              >
                Tokenization just triggered the biggest gold rush in history. This time it&rsquo;s
                digital, eco-friendly, and global.
              </p>
              <div className="mt-10">
                <WaitlistForm source="concept-ps-hero" variant="dark" />
              </div>
            </div>

            <div className="col-span-12 lg:col-span-4 lg:col-start-9 hidden lg:block">
              <div
                style={{
                  position: "relative",
                  aspectRatio: "4/5",
                  borderRadius: "24px",
                  overflow: "hidden",
                  border: `1px solid ${HAIRLINE_ON_DARK}`,
                  boxShadow: "0 40px 80px rgba(0,0,0,0.45)",
                }}
              >
                <Image
                  src="/images/earth-cubes/earth-cube-hero-pristine.png"
                  alt="Pristine isometric earth cube with gold-veined bedrock"
                  fill
                  priority
                  sizes="(min-width: 1024px) 32vw, 100vw"
                  style={{ objectFit: "cover" }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ——— 02 PERSONAL STAKE ——— asymmetric editorial on cream ——— */}
      <section style={{ background: CANVAS, color: INK }}>
        <div
          className="mx-auto px-6 md:px-12 lg:px-16"
          style={{ maxWidth: "1280px", paddingTop: "120px", paddingBottom: "120px" }}
        >
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-12 md:col-span-4">
              <div style={{ ...eyebrow, color: GOLD }}>Why this matters to you</div>
              <h2
                className="mt-5"
                style={{ ...display, fontSize: "clamp(32px, 4.2vw, 52px)", color: NAVY }}
              >
                Inflation is eating your savings.
                <br />
                <span style={{ color: SECONDARY }}>
                  Crypto was the escape that didn&rsquo;t work.
                </span>
              </h2>
            </div>
            <div className="col-span-12 md:col-span-7 md:col-start-6">
              <div style={{ fontSize: "18px", color: SECONDARY, lineHeight: 1.7 }}>
                <p>
                  Inflation is grinding through your savings. The world is getting less stable,
                  not more. The hedges you used to trust are doing less of the job every year.
                </p>
                <p className="mt-5">
                  Crypto was meant to be the escape. Meme coins. Rug pulls. Nothing real behind
                  them. It burned trust without replacing anything.
                </p>
                <p className="mt-5">
                  <strong style={{ color: INK, fontWeight: 600 }}>
                    Gold has been a proven safe haven for 6,000 years.
                  </strong>{" "}
                  Real asset. Real value. The protection people reached for every time fiat broke
                  down. The problem was always access — until now.
                </p>
              </div>
              <div
                className="mt-10 pt-8"
                style={{
                  borderTop: `1px solid ${HAIRLINE}`,
                  fontSize: "19px",
                  color: NAVY,
                  fontStyle: "italic",
                  lineHeight: 1.55,
                }}
              >
                Digital gold mining brings gold into the 21st century by combining it with
                blockchain — unlocking its value without environmental or social damage, and
                aligning the oldest asset in the world with how investors actually operate in
                2026.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ——— 03 THE PROBLEM ——— full-bleed dark w/ image left, text right ——— */}
      <section style={{ background: NAVY_DEEP, color: CANVAS }}>
        <div
          className="mx-auto px-6 md:px-12 lg:px-16"
          style={{ maxWidth: "1440px", paddingTop: "120px", paddingBottom: "120px" }}
        >
          <div className="grid grid-cols-12 gap-10 items-center">
            <div className="col-span-12 md:col-span-6">
              <div
                style={{
                  position: "relative",
                  aspectRatio: "1/1",
                  borderRadius: "24px",
                  overflow: "hidden",
                  border: `1px solid ${HAIRLINE_ON_DARK}`,
                }}
              >
                <Image
                  src="/images/earth-cubes/earth-cube-destruction.png"
                  alt="Scarred, destroyed earth cross-section"
                  fill
                  sizes="(min-width: 768px) 48vw, 100vw"
                  style={{ objectFit: "cover" }}
                />
              </div>
            </div>
            <div className="col-span-12 md:col-span-6">
              <div style={{ ...eyebrow, color: GOLD_SOFT }}>The problem</div>
              <h2
                className="mt-5"
                style={{ ...display, fontSize: "clamp(34px, 4.6vw, 60px)", color: CANVAS }}
              >
                Traditional gold mining is dying.
              </h2>
              <p
                className="mt-8"
                style={{ color: "rgba(248,250,252,0.78)", fontSize: "18px", lineHeight: 1.7 }}
              >
                Environmental damage. Social displacement. Regulatory scrutiny. Investor flight.
                Six compounding forces the book names the{" "}
                <strong style={{ color: GOLD_SOFT, fontWeight: 600 }}>
                  Extraction S.P.I.R.A.L.™
                </strong>{" "}
                — a gravity well, not a cycle. One by one, the conditions that built the industry
                are shutting it down.
              </p>
              <p
                className="mt-5"
                style={{ color: "rgba(248,250,252,0.78)", fontSize: "18px", lineHeight: 1.7 }}
              >
                Meanwhile,{" "}
                <strong style={{ color: CANVAS, fontWeight: 600 }}>$22 trillion</strong> of
                geologically verified gold sits in the ground — and the industry can&rsquo;t
                reach it without paying a cost the world no longer accepts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ——— 04 THE REFRAME ——— sidebar kicker + oversized quote ——— */}
      <section style={{ background: STONE, color: INK }}>
        <div
          className="mx-auto px-6 md:px-12 lg:px-16"
          style={{ maxWidth: "1200px", paddingTop: "140px", paddingBottom: "140px" }}
        >
          <div className="grid grid-cols-12 gap-8">
            <aside className="col-span-12 md:col-span-3">
              <div style={{ ...eyebrow, color: GOLD }}>The reframe</div>
              <div
                className="mt-5"
                style={{
                  width: "48px",
                  height: "2px",
                  background: GOLD,
                }}
              />
              <p
                className="mt-6"
                style={{ fontSize: "13px", color: MUTED, lineHeight: 1.6 }}
              >
                Chapters 3–5
                <br />
                The Inevitability Case
              </p>
            </aside>
            <div className="col-span-12 md:col-span-9">
              <h2
                style={{
                  ...display,
                  fontSize: "clamp(32px, 4.4vw, 56px)",
                  color: NAVY,
                }}
              >
                Gold mining <em style={{ fontStyle: "italic", color: GOLD }}>already</em> runs
                on verification, not extraction.
              </h2>
              <p
                className="mt-10"
                style={{ fontSize: "19px", color: SECONDARY, lineHeight: 1.65, maxWidth: "46ch" }}
              >
                <strong style={{ color: INK, fontWeight: 600 }}>
                  No billion-dollar gold investment happens without geological verification first.
                </strong>{" "}
                Every major mine, every institutional portfolio, every deposit that ever made it
                into the system started with a geologist proving the gold exists.
              </p>
              <p
                className="mt-5"
                style={{ fontSize: "19px", color: SECONDARY, lineHeight: 1.65, maxWidth: "46ch" }}
              >
                Verification is the backbone. Extraction is the part everyone{" "}
                <em style={{ fontStyle: "italic" }}>assumed</em> was non-negotiable.
              </p>
              <div
                className="mt-10 inline-block"
                style={{
                  borderLeft: `3px solid ${GOLD}`,
                  paddingLeft: "20px",
                  ...display,
                  fontSize: "clamp(24px, 2.8vw, 34px)",
                  color: NAVY,
                }}
              >
                It isn&rsquo;t. Not anymore.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ——— 05 THE SOLUTION ——— 3-step tile strip + definition callout ——— */}
      <section style={{ background: CANVAS, color: INK }}>
        <div
          className="mx-auto px-6 md:px-12 lg:px-16"
          style={{ maxWidth: "1280px", paddingTop: "140px", paddingBottom: "140px" }}
        >
          <div className="max-w-3xl">
            <div style={{ ...eyebrow, color: GOLD }}>The solution</div>
            <h2
              className="mt-5"
              style={{ ...display, fontSize: "clamp(34px, 4.6vw, 58px)", color: NAVY }}
            >
              Blockchain finally matured enough to bypass extraction.
            </h2>
            <p
              className="mt-8"
              style={{ fontSize: "18px", color: SECONDARY, lineHeight: 1.7 }}
            >
              Take the geologically verified in-ground gold. Tokenize it on-chain. You&rsquo;ve
              eliminated every problem extraction creates — environmental, social, financial —
              while keeping the part that actually matters: the verified ownership of real gold.
            </p>
            <p
              className="mt-5"
              style={{ fontSize: "18px", color: SECONDARY, lineHeight: 1.7 }}
            >
              That&rsquo;s digital gold mining. Gold that never needs to leave the ground to be
              owned — without the environmental and social cost extraction always charged.
            </p>
          </div>

          {/* Definition callout */}
          <div
            className="mt-14"
            style={{
              background: NAVY,
              color: CANVAS,
              borderRadius: "24px",
              padding: "48px",
              borderLeft: `4px solid ${GOLD}`,
            }}
          >
            <div style={{ ...eyebrow, color: GOLD_SOFT }}>Official definition</div>
            <p
              className="mt-5"
              style={{
                ...display,
                fontSize: "clamp(22px, 2.4vw, 30px)",
                color: CANVAS,
                lineHeight: 1.4,
                maxWidth: "64ch",
              }}
            >
              Digital gold mining is a patent-pending process developed by{" "}
              <span style={{ color: GOLD_SOFT }}>NatGold Digital</span> that tokenizes in-ground
              verified gold deposits into an eco-friendly, gold-backed digital asset for the
              modern investor — without environmental destruction or social displacement.
            </p>
          </div>

          {/* Three steps */}
          <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                n: "01",
                label: "Verify",
                copy: "Independent geological proof of in-ground gold resources.",
                img: "/images/earth-cubes/earth-cube-verification.png",
              },
              {
                n: "02",
                label: "Tokenize",
                copy: "The verified ownership of gold becomes a digital asset on-chain.",
                img: "/images/earth-cubes/earth-cube-tokenization.png",
              },
              {
                n: "03",
                label: "Trade",
                copy: "Anyone, anywhere. 24/7. No extraction. No ESG cost.",
                img: "/images/earth-cubes/earth-cube-global-field.png",
              },
            ].map((s) => (
              <div
                key={s.n}
                style={{
                  background: "#FFFFFF",
                  borderRadius: "19px",
                  padding: "28px",
                  border: `1px solid ${HAIRLINE}`,
                  boxShadow: "0 4px 12px rgba(15,23,42,0.04)",
                }}
              >
                <div
                  style={{
                    position: "relative",
                    aspectRatio: "5/4",
                    borderRadius: "12px",
                    overflow: "hidden",
                    marginBottom: "20px",
                  }}
                >
                  <Image
                    src={s.img}
                    alt={`${s.label} step illustration`}
                    fill
                    sizes="(min-width: 768px) 30vw, 100vw"
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div
                  style={{
                    ...eyebrow,
                    color: GOLD,
                    fontSize: "12px",
                  }}
                >
                  {s.n} · {s.label}
                </div>
                <p className="mt-3" style={{ fontSize: "16px", color: SECONDARY, lineHeight: 1.55 }}>
                  {s.copy}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ——— 06 CONVERGENCE ——— dark panel, numbered rail on left, 3 forces ——— */}
      <section style={{ background: NAVY, color: CANVAS }}>
        <div
          className="mx-auto px-6 md:px-12 lg:px-16"
          style={{ maxWidth: "1280px", paddingTop: "140px", paddingBottom: "140px" }}
        >
          <div className="max-w-3xl">
            <div style={{ ...eyebrow, color: GOLD_SOFT }}>The Halley&rsquo;s Comet alignment</div>
            <h2
              className="mt-5"
              style={{ ...display, fontSize: "clamp(34px, 5vw, 64px)", color: CANVAS }}
            >
              Three forces. Same window.
            </h2>
            <p
              className="mt-8"
              style={{ fontSize: "19px", color: "rgba(248,250,252,0.78)", lineHeight: 1.65 }}
            >
              For the first time in history, three trillion-dollar forces are aligning at once.
              Most people only see one of them. Until it&rsquo;s too late.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                n: "01",
                title: "Gold is having its moment.",
                copy: "Central banks are buying. Retail is rediscovering it. The oldest store of value is quietly back at the centre of the conversation.",
              },
              {
                n: "02",
                title: "Blockchain finally grew up.",
                copy: "Real-world asset tokenization moved from crypto fantasy to where the institutional trillions are actually going.",
              },
              {
                n: "03",
                title: "A new generation wants in — without the guilt.",
                copy: "For the first time, gold is available without the extraction, displacement, and environmental cost that locked younger investors out.",
              },
            ].map((f) => (
              <div key={f.n} style={{ borderTop: `1px solid ${HAIRLINE_ON_DARK}`, paddingTop: "24px" }}>
                <div
                  style={{
                    ...display,
                    fontSize: "40px",
                    color: GOLD_SOFT,
                    lineHeight: 1,
                  }}
                >
                  {f.n}
                </div>
                <h3
                  className="mt-5"
                  style={{ ...display, fontSize: "24px", color: CANVAS, lineHeight: 1.25 }}
                >
                  {f.title}
                </h3>
                <p
                  className="mt-4"
                  style={{
                    fontSize: "15px",
                    color: "rgba(248,250,252,0.7)",
                    lineHeight: 1.65,
                  }}
                >
                  {f.copy}
                </p>
              </div>
            ))}
          </div>

          <div
            className="mt-16 pt-10"
            style={{
              borderTop: `1px solid ${HAIRLINE_ON_DARK}`,
              maxWidth: "60ch",
              ...display,
              fontSize: "clamp(22px, 2.4vw, 30px)",
              color: CANVAS,
              lineHeight: 1.35,
            }}
          >
            When three trillion-dollar forces converge like this, the window to understand it
            closes faster than the window to act on it.
          </div>
        </div>
      </section>

      {/* ——— 07 BITCOIN PARALLEL ——— centered gallery room, oversized pull quote ——— */}
      <section style={{ background: CANVAS, color: INK }}>
        <div
          className="mx-auto px-6 md:px-12 lg:px-16 text-center"
          style={{ maxWidth: "960px", paddingTop: "160px", paddingBottom: "160px" }}
        >
          <h2
            style={{ ...display, fontSize: "clamp(36px, 5.4vw, 68px)", color: NAVY }}
          >
            Gold was money for 6,000 years.
          </h2>
          <p
            className="mt-10 mx-auto"
            style={{
              fontSize: "19px",
              color: SECONDARY,
              lineHeight: 1.7,
              maxWidth: "56ch",
            }}
          >
            Bitcoin was the escape that didn&rsquo;t quite work. Digital gold mining is the step
            that finally moves the oldest store of value at the speed and reach of the modern
            one.
          </p>
          <div
            className="mt-16 mx-auto"
            style={{
              borderTop: `1px solid ${HAIRLINE}`,
              borderBottom: `1px solid ${HAIRLINE}`,
              padding: "48px 24px",
              maxWidth: "40ch",
            }}
          >
            <p
              style={{
                ...display,
                fontSize: "clamp(26px, 3.2vw, 40px)",
                color: NAVY,
                lineHeight: 1.3,
              }}
            >
              Gold only gets digitized{" "}
              <em style={{ fontStyle: "italic", color: GOLD }}>once</em>. That&rsquo;s the thing
              to be early to.
            </p>
          </div>
        </div>
      </section>

      {/* ——— 08 PROOF LINE ——— data dashboard grid w/ hairlines ——— */}
      <section style={{ background: STONE, color: INK }}>
        <div
          className="mx-auto px-6 md:px-12 lg:px-16"
          style={{ maxWidth: "1280px", paddingTop: "140px", paddingBottom: "140px" }}
        >
          <div className="grid grid-cols-12 gap-8 items-end">
            <div className="col-span-12 md:col-span-7">
              <div style={{ ...eyebrow, color: GOLD }}>
                Pre-market token reservations &amp; milestones
              </div>
              <h2
                className="mt-5"
                style={{ ...display, fontSize: "clamp(32px, 4.2vw, 52px)", color: NAVY }}
              >
                The numbers behind a category that hasn&rsquo;t gone public yet.
              </h2>
            </div>
          </div>

          <div
            className="mt-16 grid grid-cols-2 md:grid-cols-5"
            style={{
              borderTop: `1px solid ${HAIRLINE}`,
              borderLeft: `1px solid ${HAIRLINE}`,
            }}
          >
            {[
              { n: "$469M", label: "Reserved", sub: "Pre-market token reservations before a single public listing." },
              { n: "17,466", label: "Investors", sub: "Real people who put real capital behind the model." },
              { n: "162", label: "Countries", sub: "Global reach without a single paid advertisement." },
              { n: "10", label: "Patents", sub: "Patents pending on the origination process itself." },
              { n: "7 yr", label: "Built", sub: "Seven years spent building the system before going public." },
            ].map((stat) => (
              <div
                key={stat.label}
                style={{
                  borderRight: `1px solid ${HAIRLINE}`,
                  borderBottom: `1px solid ${HAIRLINE}`,
                  padding: "32px 24px",
                  background: "#FFFFFF",
                }}
              >
                <div
                  style={{
                    ...display,
                    fontSize: "clamp(32px, 3.6vw, 48px)",
                    color: NAVY,
                    lineHeight: 1,
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  {stat.n}
                </div>
                <div
                  className="mt-4"
                  style={{ ...eyebrow, fontSize: "10px", color: GOLD }}
                >
                  {stat.label}
                </div>
                <p
                  className="mt-3"
                  style={{ fontSize: "13px", color: MUTED, lineHeight: 1.55 }}
                >
                  {stat.sub}
                </p>
              </div>
            ))}
          </div>

          <p
            className="mt-8"
            style={{ fontSize: "13px", color: MUTED, fontStyle: "italic", maxWidth: "60ch" }}
          >
            Every figure traces to NatGold Digital&rsquo;s public pre-market reservation
            timeline. Independently verifiable on request.
          </p>
        </div>
      </section>

      {/* ——— 09 PEOPLE ——— three credential portraits, minimal ——— */}
      <section style={{ background: CANVAS, color: INK }}>
        <div
          className="mx-auto px-6 md:px-12 lg:px-16"
          style={{ maxWidth: "1280px", paddingTop: "140px", paddingBottom: "140px" }}
        >
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-12 md:col-span-5">
              <div style={{ ...eyebrow, color: GOLD }}>Who&rsquo;s behind it</div>
              <h2
                className="mt-5"
                style={{ ...display, fontSize: "clamp(32px, 4.4vw, 56px)", color: NAVY }}
              >
                Built by people who built the old system.
              </h2>
              <p
                className="mt-8"
                style={{ fontSize: "18px", color: SECONDARY, lineHeight: 1.65 }}
              >
                This isn&rsquo;t a crypto-anon project. It&rsquo;s being built by people retail
                investors already quietly{" "}
                <strong style={{ color: INK, fontWeight: 600 }}>trust</strong> every day.
              </p>
            </div>
            <div className="col-span-12 md:col-span-7">
              <ul
                style={{
                  borderTop: `1px solid ${HAIRLINE}`,
                }}
              >
                {[
                  {
                    role: "Former Chief of Staff",
                    inst: "U.S. Securities and Exchange Commission",
                    note: "Drafted enforcement policy for emerging-asset classifications.",
                  },
                  {
                    role: "Former Counsel",
                    inst: "U.S. Commodity Futures Trading Commission",
                    note: "Architected the regulatory framework for commodity-backed digital assets.",
                  },
                  {
                    role: "Ex Mining Executive",
                    inst: "Barrick Gold · BHP",
                    note: "Ran exploration programs on the world's largest gold and mineral portfolios.",
                  },
                ].map((p) => (
                  <li
                    key={p.role}
                    style={{
                      borderBottom: `1px solid ${HAIRLINE}`,
                      padding: "28px 0",
                      display: "grid",
                      gridTemplateColumns: "auto 1fr",
                      gap: "20px",
                      alignItems: "baseline",
                    }}
                  >
                    <div
                      style={{
                        ...display,
                        fontSize: "20px",
                        color: GOLD,
                        width: "40px",
                      }}
                    >
                      ·
                    </div>
                    <div>
                      <div style={{ ...display, fontSize: "22px", color: NAVY, lineHeight: 1.3 }}>
                        {p.role}
                      </div>
                      <div
                        className="mt-1"
                        style={{ ...eyebrow, fontSize: "11px", color: SECONDARY }}
                      >
                        {p.inst}
                      </div>
                      <p
                        className="mt-3"
                        style={{
                          fontSize: "15px",
                          color: MUTED,
                          lineHeight: 1.6,
                          fontStyle: "italic",
                        }}
                      >
                        {p.note}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ——— 10 THE BOOK ——— hero-mirror: Book3D left, content right, sub-block below ——— */}
      <section
        style={{
          background: NAVY_DEEP,
          color: CANVAS,
        }}
      >
        <div
          className="mx-auto px-6 md:px-12 lg:px-16"
          style={{ maxWidth: "1440px", paddingTop: "140px", paddingBottom: "140px" }}
        >
          <div className="grid grid-cols-12 gap-10 items-center">
            <div className="col-span-12 md:col-span-6 flex justify-center">
              {/* Desktop: Book3D; Mobile: static cover */}
              <div className="hidden md:block">
                <Book3D />
              </div>
              <div className="md:hidden" style={{ maxWidth: "280px", width: "100%" }}>
                <Image
                  src="/images/Digital Gold Boom Cover (1).png"
                  alt="Digital Gold Boom book cover"
                  width={560}
                  height={854}
                  style={{
                    width: "100%",
                    height: "auto",
                    borderRadius: "6px",
                    boxShadow: "0 30px 60px rgba(0,0,0,0.5)",
                  }}
                />
              </div>
            </div>
            <div className="col-span-12 md:col-span-6">
              <div style={{ ...eyebrow, color: GOLD_SOFT }}>The book</div>
              <h2
                className="mt-5"
                style={{ ...display, fontSize: "clamp(40px, 5.8vw, 76px)", color: CANVAS }}
              >
                Digital Gold Boom.
              </h2>
              <p
                className="mt-6"
                style={{
                  ...display,
                  fontSize: "clamp(20px, 2.2vw, 26px)",
                  color: GOLD_SOFT,
                  fontStyle: "italic",
                }}
              >
                Tell all. Nothing held back.
              </p>
              <p
                className="mt-8"
                style={{
                  fontSize: "17px",
                  color: "rgba(248,250,252,0.78)",
                  lineHeight: 1.65,
                  maxWidth: "52ch",
                }}
              >
                Written by{" "}
                <strong style={{ color: CANVAS, fontWeight: 600 }}>Andrew Fletcher</strong> —
                former President of Great Eagle Gold Corp, now NatBridge Resources, which signed
                the first NatGold supply agreement.
              </p>
              <p
                className="mt-8"
                style={{
                  ...display,
                  fontSize: "22px",
                  color: CANVAS,
                  lineHeight: 1.4,
                }}
              >
                Once you see it, you can&rsquo;t unsee it.{" "}
                <em style={{ fontStyle: "italic", color: GOLD_SOFT }}>It just makes sense.</em>
              </p>
            </div>
          </div>

          {/* Sub-block: four sections */}
          <div
            className="mt-24 pt-16"
            style={{ borderTop: `1px solid ${HAIRLINE_ON_DARK}` }}
          >
            <div className="grid grid-cols-12 gap-8 mb-12">
              <div className="col-span-12 md:col-span-5">
                <div style={{ ...eyebrow, color: GOLD_SOFT }}>Four sections · 23 chapters</div>
                <h3
                  className="mt-5"
                  style={{ ...display, fontSize: "clamp(28px, 3.6vw, 44px)", color: CANVAS }}
                >
                  One complete case, end to end.
                </h3>
              </div>
            </div>

            <ol className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  n: "01",
                  title: "Why Gold No Longer Needs Mining",
                  meta: "Chapters 1–8 · The Inevitability Case",
                  copy: "Why the old extraction-based gold industry is structurally collapsing — environmental, social, and economic forces shutting it down at the exact moment trillions in verified gold sit untouched in the ground.",
                },
                {
                  n: "02",
                  title: "The NatGold Digital Mining Ecosystem",
                  meta: "Chapters 9–16 · How It Works",
                  copy: "How NatGold Digital actually works. The team, the patents, the verification standards, the approval pipeline, the token economics — and the pre-market demand it has already attracted.",
                },
                {
                  n: "03",
                  title: "The $1B Case Study: Cahuilla Gold Project",
                  meta: "Chapters 17–19 · Proof of Concept",
                  copy: "The first real deposit through the pipeline. The transaction details, the players, the financial and environmental scorecard — theory replaced with a real-world transaction.",
                },
                {
                  n: "04",
                  title: "The Opportunity, Risks & Future",
                  meta: "Chapters 20–23 · What to Do Next",
                  copy: "An honest risk register, the investment options that exist today, a 10-year forecast, and the structural parallel between digital gold mining and the EV transition of the last decade.",
                },
              ].map((s) => (
                <li
                  key={s.n}
                  style={{
                    borderLeft: `2px solid ${GOLD}`,
                    paddingLeft: "24px",
                  }}
                >
                  <div style={{ ...eyebrow, color: GOLD_SOFT }}>{s.n}</div>
                  <h4
                    className="mt-3"
                    style={{ ...display, fontSize: "24px", color: CANVAS, lineHeight: 1.3 }}
                  >
                    {s.title}
                  </h4>
                  <div
                    className="mt-2"
                    style={{
                      ...eyebrow,
                      fontSize: "10px",
                      color: "rgba(248,250,252,0.55)",
                      fontStyle: "italic",
                      textTransform: "none",
                      letterSpacing: "0.04em",
                    }}
                  >
                    {s.meta}
                  </div>
                  <p
                    className="mt-4"
                    style={{
                      fontSize: "15px",
                      color: "rgba(248,250,252,0.72)",
                      lineHeight: 1.65,
                    }}
                  >
                    {s.copy}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ——— 11 THE STACK ——— pricing table, final price as the peak ——— */}
      <section style={{ background: STONE, color: INK }}>
        <div
          className="mx-auto px-6 md:px-12 lg:px-16"
          style={{ maxWidth: "1080px", paddingTop: "140px", paddingBottom: "140px" }}
        >
          <div className="text-center">
            <div style={{ ...eyebrow, color: GOLD }}>What waitlist members get</div>
            <h2
              className="mt-5"
              style={{ ...display, fontSize: "clamp(36px, 5vw, 64px)", color: NAVY }}
            >
              $337 of value. $0 to join.
            </h2>
          </div>

          <div
            className="mt-16"
            style={{
              background: "#FFFFFF",
              borderRadius: "24px",
              padding: "clamp(24px, 4vw, 48px)",
              boxShadow: "0 20px 50px rgba(15,23,42,0.08)",
              border: `1px solid ${HAIRLINE}`,
            }}
          >
            <ul>
              {[
                {
                  name: "Digital Gold Boom",
                  price: "$39",
                  note: "The full book. Every stat sourced, every claim traceable, the complete case from top to bottom.",
                },
                {
                  name: "The Primer",
                  price: "$99",
                  note: "Waitlist-only dummy’s guide. The play-by-play of what digital gold mining is and how it works — condensed for one sitting.",
                },
                {
                  name: "Industry Intelligence Updates",
                  price: "$199 / yr",
                  note: "One year of periodic updates as the digital gold mining space evolves — new deposits, new partners, new milestones.",
                },
              ].map((item, i, arr) => (
                <li
                  key={item.name}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr auto",
                    gap: "16px",
                    padding: "24px 0",
                    borderBottom: i < arr.length - 1 ? `1px solid ${HAIRLINE}` : "none",
                    alignItems: "baseline",
                  }}
                >
                  <div>
                    <div
                      style={{
                        ...display,
                        fontSize: "clamp(22px, 2.4vw, 28px)",
                        color: NAVY,
                        lineHeight: 1.3,
                      }}
                    >
                      {item.name}
                    </div>
                    <p
                      className="mt-2"
                      style={{ fontSize: "14px", color: MUTED, lineHeight: 1.55, maxWidth: "56ch" }}
                    >
                      {item.note}
                    </p>
                  </div>
                  <div
                    style={{
                      ...display,
                      fontSize: "clamp(22px, 2.4vw, 28px)",
                      color: SECONDARY,
                      fontVariantNumeric: "tabular-nums",
                    }}
                  >
                    {item.price}
                  </div>
                </li>
              ))}
            </ul>

            {/* Total row — muted, struck through */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
                marginTop: "32px",
                paddingTop: "24px",
                borderTop: `1px dashed ${HAIRLINE}`,
                color: MUTED,
              }}
            >
              <div style={{ ...eyebrow, fontSize: "11px", color: MUTED }}>Total value</div>
              <div
                style={{
                  ...display,
                  fontSize: "22px",
                  textDecoration: "line-through",
                  color: MUTED,
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                $337
              </div>
            </div>

            {/* Peak price row */}
            <div
              className="mt-8"
              style={{
                background: NAVY,
                borderRadius: "19px",
                padding: "clamp(24px, 4vw, 40px)",
                textAlign: "center",
                borderTop: `3px solid ${GOLD}`,
              }}
            >
              <div style={{ ...eyebrow, color: GOLD_SOFT }}>Your price on the waitlist</div>
              <div
                className="mt-4"
                style={{
                  ...display,
                  fontSize: "clamp(72px, 12vw, 140px)",
                  color: CANVAS,
                  lineHeight: 1,
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                $0
              </div>
              <p
                className="mt-6"
                style={{
                  fontSize: "13px",
                  color: "rgba(248,250,252,0.6)",
                  fontFamily: "var(--font-inter)",
                }}
              >
                Free until the book drops. $39 after. No spam.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ——— 12 FINAL CTA ——— dark hero mirror of section 01, centered ——— */}
      <section style={{ background: NAVY, color: CANVAS }}>
        <div
          className="mx-auto px-6 md:px-12 lg:px-16 text-center"
          style={{ maxWidth: "1080px", paddingTop: "160px", paddingBottom: "160px" }}
        >
          <div style={{ ...eyebrow, color: GOLD_SOFT }}>
            Understand it before Wall Street does
          </div>
          <h2
            className="mt-6 mx-auto"
            style={{
              ...display,
              fontSize: "clamp(36px, 5.2vw, 68px)",
              color: CANVAS,
              maxWidth: "20ch",
            }}
          >
            Missed Bitcoin? Don&rsquo;t wait to read about digital gold mining in the{" "}
            <em style={{ fontStyle: "italic", color: GOLD_SOFT }}>Wall Street Journal</em>.
          </h2>
          <p
            className="mt-8"
            style={{
              ...display,
              fontSize: "clamp(20px, 2.4vw, 28px)",
              color: "rgba(248,250,252,0.82)",
              fontStyle: "italic",
            }}
          >
            Read it here first.
          </p>
          <div className="mt-12 flex justify-center">
            <WaitlistForm source="concept-ps-final-cta" variant="dark" />
          </div>
        </div>
      </section>

      {/* ——— FOOTER ——— */}
      <ConceptFooter />
    </main>
  );
}

/* ————————————————————————————————————————————— */
/*  Nav + Footer                                  */
/* ————————————————————————————————————————————— */

function ConceptNav() {
  return (
    <header
      style={{
        background: "#0F172A",
        color: "#F8FAFC",
        borderBottom: "1px solid rgba(248,250,252,0.08)",
      }}
    >
      <div
        className="mx-auto px-6 md:px-12 lg:px-16 flex items-center justify-between"
        style={{ maxWidth: "1440px", height: "72px" }}
      >
        <div
          style={{
            fontFamily: "var(--font-playfair), Georgia, serif",
            fontWeight: 300,
            fontSize: "20px",
            letterSpacing: "0.01em",
          }}
        >
          Digital Gold Boom
        </div>
        <a
          href="#waitlist"
          className="hidden sm:inline-block"
          style={{
            ...{
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              fontSize: "11px",
              fontWeight: 500,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
            },
            color: "#D4A84A",
          }}
        >
          Vol. 01 · 2026
        </a>
      </div>
    </header>
  );
}

function ConceptFooter() {
  return (
    <footer
      style={{
        background: "#020617",
        color: "rgba(248,250,252,0.7)",
        borderTop: "1px solid rgba(248,250,252,0.08)",
      }}
    >
      <div
        className="mx-auto px-6 md:px-12 lg:px-16"
        style={{ maxWidth: "1440px", paddingTop: "64px", paddingBottom: "64px" }}
      >
        <div className="grid grid-cols-12 gap-8 items-start">
          <div className="col-span-12 md:col-span-6">
            <div
              style={{
                fontFamily: "var(--font-playfair), Georgia, serif",
                fontWeight: 300,
                fontSize: "28px",
                color: "#F8FAFC",
                lineHeight: 1.2,
              }}
            >
              Digital Gold Boom
            </div>
            <p
              className="mt-4"
              style={{
                fontFamily: "var(--font-inter), system-ui, sans-serif",
                fontSize: "14px",
                color: "rgba(248,250,252,0.6)",
                maxWidth: "40ch",
                lineHeight: 1.6,
              }}
            >
              A book by Andrew Fletcher. Decoding the next gold rush — tokenized, verified,
              eco-friendly.
            </p>
          </div>
          <div className="col-span-12 md:col-span-6 md:text-right">
            <p
              style={{
                fontFamily: "var(--font-inter), system-ui, sans-serif",
                fontSize: "12px",
                color: "rgba(248,250,252,0.5)",
              }}
            >
              © {new Date().getFullYear()} Digital Gold Boom. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
