import Image from "next/image";
import Book3D from "@/components/Book3D";
import WaitlistForm from "./_components/WaitlistForm";

// Design tokens (scoped inline — do not touch globals.css)
const C = {
  bg: "#FAFAF9",
  bgWarm: "#F5F2EC",
  ink: "#1C1917",
  inkDeep: "#0C0A09",
  muted: "#44403C",
  line: "rgba(28,25,23,0.12)",
  gold: "#CA8A04",
  goldSoft: "rgba(202,138,4,0.12)",
};

const FONT_BODY = "var(--font-plex), system-ui, sans-serif";
const FONT_MONO = "var(--font-plex-mono), ui-monospace, monospace";

// ───────────────────────────────────────────────────────────
// Local primitives
// ───────────────────────────────────────────────────────────

function Eyebrow({
  children,
  dark = false,
}: {
  children: React.ReactNode;
  dark?: boolean;
}) {
  return (
    <div
      className="inline-flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.22em]"
      style={{
        color: dark ? "rgba(250,250,249,0.65)" : "rgba(28,25,23,0.6)",
        fontFamily: FONT_BODY,
      }}
    >
      <span
        aria-hidden
        className="inline-block h-px w-8"
        style={{
          background: dark
            ? "rgba(250,250,249,0.4)"
            : "rgba(28,25,23,0.35)",
        }}
      />
      {children}
    </div>
  );
}

function SectionLabel({ n, dark = false }: { n: string; dark?: boolean }) {
  return (
    <span
      className="text-[10px] font-medium uppercase tracking-[0.28em]"
      style={{
        color: dark ? "rgba(250,250,249,0.5)" : "rgba(28,25,23,0.5)",
        fontFamily: FONT_MONO,
      }}
    >
      {n}
    </span>
  );
}

// ───────────────────────────────────────────────────────────
// NAVBAR (fresh, local)
// ───────────────────────────────────────────────────────────

function Navbar() {
  return (
    <header
      className="sticky top-0 z-50 w-full"
      style={{
        background: "rgba(250,250,249,0.72)",
        backdropFilter: "blur(16px) saturate(1.2)",
        WebkitBackdropFilter: "blur(16px) saturate(1.2)",
        borderBottom: `1px solid ${C.line}`,
        fontFamily: FONT_BODY,
      }}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
        <div className="flex items-center gap-3">
          <span
            aria-hidden
            className="inline-block h-2 w-2 rounded-full"
            style={{ background: C.gold }}
          />
          <span
            className="text-sm font-semibold tracking-tight"
            style={{ color: C.ink }}
          >
            Digital Gold Boom
          </span>
        </div>
        <a
          href="#waitlist"
          className="hidden cursor-pointer rounded-full px-4 py-2 text-xs font-semibold tracking-wide transition-all duration-300 sm:inline-block"
          style={{
            background: C.ink,
            color: C.bg,
          }}
        >
          Join waitlist
        </a>
      </div>
    </header>
  );
}

// ───────────────────────────────────────────────────────────
// 01 — HERO: asymmetric split with vertical rail + earth-cube
// ───────────────────────────────────────────────────────────

function SectionHero() {
  return (
    <section
      id="waitlist"
      className="relative overflow-hidden"
      style={{ background: C.bg, color: C.ink }}
    >
      {/* ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 -top-40 h-[640px] w-[640px] rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, rgba(202,138,4,0.22), transparent)",
          filter: "blur(20px)",
        }}
      />
      <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-10 px-5 pb-20 pt-12 sm:px-8 lg:grid-cols-12 lg:gap-8 lg:pt-20">
        {/* Vertical rail */}
        <aside className="hidden lg:col-span-1 lg:block">
          <div className="sticky top-28 flex flex-col items-start gap-4">
            <SectionLabel n="01 / 12" />
            <div
              className="h-40 w-px"
              style={{ background: "rgba(28,25,23,0.2)" }}
            />
            <span
              className="[writing-mode:vertical-rl] text-[10px] uppercase tracking-[0.3em]"
              style={{
                color: "rgba(28,25,23,0.55)",
                fontFamily: FONT_MONO,
              }}
            >
              DGB · Waitlist 2026
            </span>
          </div>
        </aside>

        {/* Text column */}
        <div className="lg:col-span-7">
          <Eyebrow>Decoding the next gold rush</Eyebrow>
          <h1
            className="mt-6 text-5xl font-medium leading-[1.02] tracking-[-0.02em] sm:text-6xl lg:text-[88px]"
            style={{ color: C.inkDeep }}
          >
            Missed Bitcoin?
            <br />
            <span style={{ fontStyle: "italic", fontWeight: 400 }}>
              Don&apos;t miss
            </span>{" "}
            digital gold mining.
          </h1>
          <p
            className="mt-8 max-w-xl text-lg leading-relaxed"
            style={{ color: C.muted }}
          >
            Tokenization just triggered the biggest gold rush in history. This
            time it&apos;s digital, eco-friendly, and global.
          </p>
          <div className="mt-10">
            <WaitlistForm source="concept-d-hero" variant="hero" />
          </div>
        </div>

        {/* Visual column */}
        <div className="relative lg:col-span-4">
          <div
            className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl"
            style={{
              background: "linear-gradient(180deg,#F5F2EC 0%,#EDE7D8 100%)",
              border: `1px solid ${C.line}`,
              boxShadow: "0 40px 80px -40px rgba(28,25,23,0.35)",
            }}
          >
            <Image
              src="/images/earth-cubes/earth-cube-hero-pristine.png"
              alt="In-ground gold deposit, verified not extracted"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 33vw"
            />
            <div
              className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5"
              style={{
                background:
                  "linear-gradient(180deg,transparent,rgba(28,25,23,0.72))",
                color: C.bg,
              }}
            >
              <div>
                <div
                  className="text-[10px] uppercase tracking-[0.24em]"
                  style={{
                    color: "rgba(250,250,249,0.7)",
                    fontFamily: FONT_MONO,
                  }}
                >
                  Verified · In Ground
                </div>
                <div className="mt-1 text-sm font-medium">
                  $22T untouched resource
                </div>
              </div>
              <div
                className="rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em]"
                style={{ background: C.gold, color: C.ink }}
              >
                Live
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ───────────────────────────────────────────────────────────
// 02 — PERSONAL STAKE: editorial pull-quote block with side meta
// ───────────────────────────────────────────────────────────

function SectionPersonalStake() {
  return (
    <section
      className="relative"
      style={{ background: C.bg, color: C.ink, borderTop: `1px solid ${C.line}` }}
    >
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-5 py-24 sm:px-8 md:grid-cols-12 md:gap-16 md:py-32">
        <div className="md:col-span-4">
          <div className="md:sticky md:top-28">
            <SectionLabel n="02 / 12" />
            <div className="mt-4">
              <Eyebrow>Why this matters to you</Eyebrow>
            </div>
            <h2
              className="mt-6 text-3xl font-medium leading-[1.08] tracking-[-0.01em] md:text-[40px]"
              style={{ color: C.inkDeep }}
            >
              Inflation is eating your savings.
              <br />
              <span style={{ fontStyle: "italic" }}>
                Crypto was the escape that didn&apos;t work.
              </span>
            </h2>
          </div>
        </div>
        <div
          className="md:col-span-8"
          style={{ fontFamily: FONT_BODY, color: C.muted }}
        >
          <div className="space-y-6 text-lg leading-[1.65]">
            <p>
              Inflation is grinding through your savings. The world is getting
              less stable, not more. The hedges you used to trust are doing
              less of the job every year.
            </p>
            <p>
              Crypto was meant to be the escape. Meme coins. Rug pulls. Nothing
              real behind them. It burned trust without replacing anything.
            </p>
            <p style={{ color: C.ink }}>
              <strong style={{ fontWeight: 600 }}>
                Gold has been a proven safe haven for 6,000 years.
              </strong>{" "}
              Real asset. Real value. The protection people reached for every
              time fiat broke down. The problem was always access — until now.
            </p>
          </div>
          <div
            className="mt-10 border-l-2 pl-6 text-xl leading-[1.5]"
            style={{
              borderColor: C.gold,
              color: C.inkDeep,
              fontStyle: "italic",
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

// ───────────────────────────────────────────────────────────
// ACT II — PROBLEM → SOLUTION: dark tonal flip
// ───────────────────────────────────────────────────────────

// 03 — THE PROBLEM: full-bleed dark block with diagonal image
function SectionProblem() {
  return (
    <section
      className="relative overflow-hidden"
      style={{ background: C.inkDeep, color: C.bg }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(1200px 600px at 20% 10%, rgba(202,138,4,0.14), transparent), radial-gradient(800px 500px at 90% 90%, rgba(202,138,4,0.08), transparent)",
        }}
      />
      <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-12 px-5 py-24 sm:px-8 md:py-32 lg:grid-cols-2 lg:items-center">
        <div className="relative aspect-[5/4] w-full overflow-hidden rounded-3xl lg:order-2">
          <Image
            src="/images/earth-cubes/earth-cube-destruction.png"
            alt="Extraction damage to earth"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
            style={{ filter: "saturate(0.85)" }}
          />
        </div>
        <div className="lg:order-1">
          <SectionLabel n="03 / 12" dark />
          <div className="mt-4">
            <Eyebrow dark>The problem</Eyebrow>
          </div>
          <h2
            className="mt-6 text-4xl font-medium leading-[1.05] tracking-[-0.01em] md:text-[56px]"
            style={{ color: C.bg }}
          >
            Traditional gold mining
            <br />
            <span style={{ fontStyle: "italic", color: C.gold }}>
              is dying.
            </span>
          </h2>
          <div
            className="mt-8 space-y-5 text-lg leading-[1.65]"
            style={{ color: "rgba(250,250,249,0.76)" }}
          >
            <p>
              Environmental damage. Social displacement. Regulatory scrutiny.
              Investor flight. Six compounding forces the book names the{" "}
              <strong style={{ color: C.bg, fontWeight: 600 }}>
                Extraction S.P.I.R.A.L.™
              </strong>{" "}
              — a gravity well, not a cycle. One by one, the conditions that
              built the industry are shutting it down.
            </p>
            <p>
              Meanwhile,{" "}
              <strong style={{ color: C.gold, fontWeight: 600 }}>
                $22 trillion
              </strong>{" "}
              of geologically verified gold sits in the ground — and the
              industry can&apos;t reach it without paying a cost the world no
              longer accepts.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// 04 — REFRAME: centered insight with giant quotation rule
function SectionReframe() {
  return (
    <section
      className="relative"
      style={{ background: "#17130F", color: C.bg }}
    >
      <div className="mx-auto max-w-4xl px-5 py-28 text-center sm:px-8 md:py-36">
        <SectionLabel n="04 / 12" dark />
        <div className="mt-4 flex justify-center">
          <Eyebrow dark>The reframe</Eyebrow>
        </div>
        <h2
          className="mx-auto mt-8 max-w-3xl text-4xl font-medium leading-[1.08] tracking-[-0.01em] md:text-[56px]"
          style={{ color: C.bg }}
        >
          Gold mining <span style={{ fontStyle: "italic" }}>already</span> runs
          on verification, not extraction.
        </h2>
        <div
          className="mx-auto mt-10 max-w-2xl space-y-5 text-lg leading-[1.7]"
          style={{ color: "rgba(250,250,249,0.75)" }}
        >
          <p>
            <strong style={{ color: C.bg, fontWeight: 600 }}>
              No billion-dollar gold investment happens without geological
              verification first.
            </strong>{" "}
            Every major mine, every institutional portfolio, every deposit
            that ever made it into the system started with a geologist proving
            the gold exists.
          </p>
          <p>
            Verification is the backbone. Extraction is the part everyone{" "}
            <em>assumed</em> was non-negotiable.
          </p>
        </div>
        <div
          className="mx-auto mt-12 inline-block border-t pt-6 text-2xl font-medium tracking-[-0.01em] md:text-3xl"
          style={{
            borderColor: C.gold,
            color: C.gold,
            fontStyle: "italic",
          }}
        >
          It isn&apos;t. Not anymore.
        </div>
      </div>
    </section>
  );
}

// 05 — THE SOLUTION: three-step dashboard with callout definition
function SectionSolution() {
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
      className="relative"
      style={{ background: C.bg, color: C.ink }}
    >
      <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 md:py-32">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <SectionLabel n="05 / 12" />
            <div className="mt-4">
              <Eyebrow>The solution</Eyebrow>
            </div>
            <h2
              className="mt-6 text-4xl font-medium leading-[1.05] tracking-[-0.01em] md:text-[56px]"
              style={{ color: C.inkDeep }}
            >
              Blockchain finally matured enough to bypass extraction.
            </h2>
          </div>
          <div
            className="space-y-5 text-lg leading-[1.65] md:col-span-7"
            style={{ color: C.muted }}
          >
            <p>
              Take the geologically verified in-ground gold. Tokenize it
              on-chain. You&apos;ve eliminated every problem extraction
              creates — environmental, social, financial — while keeping the
              part that actually matters: the verified ownership of real gold.
            </p>
            <p style={{ color: C.ink }}>
              That&apos;s digital gold mining. Gold that never needs to leave
              the ground to be owned — without the environmental and social
              cost extraction always charged.
            </p>
          </div>
        </div>

        {/* Official definition callout */}
        <div
          className="mt-16 rounded-3xl p-8 md:p-12"
          style={{
            background:
              "linear-gradient(135deg, rgba(202,138,4,0.08), rgba(202,138,4,0.02))",
            border: `1px solid ${C.gold}`,
            backdropFilter: "blur(8px)",
          }}
        >
          <div
            className="text-[10px] font-semibold uppercase tracking-[0.28em]"
            style={{ color: C.gold, fontFamily: FONT_MONO }}
          >
            Official Definition
          </div>
          <p
            className="mt-4 text-xl leading-[1.5] md:text-2xl"
            style={{ color: C.inkDeep, fontStyle: "italic" }}
          >
            Digital gold mining is a patent-pending process developed by{" "}
            <strong style={{ fontStyle: "normal", fontWeight: 600 }}>
              NatGold Digital
            </strong>{" "}
            that tokenizes in-ground verified gold deposits into an
            eco-friendly, gold-backed digital asset for the modern investor —
            without environmental destruction or social displacement.
          </p>
        </div>

        {/* Steps row */}
        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
          {steps.map((s) => (
            <div
              key={s.n}
              className="group relative overflow-hidden rounded-2xl p-7 transition-all duration-500"
              style={{
                background: "rgba(28,25,23,0.03)",
                border: `1px solid ${C.line}`,
                backdropFilter: "blur(10px)",
              }}
            >
              <div
                className="flex items-baseline gap-3 text-[10px] uppercase tracking-[0.24em]"
                style={{ color: C.gold, fontFamily: FONT_MONO }}
              >
                <span>{s.n}</span>
                <span
                  className="h-px flex-1"
                  style={{ background: "rgba(202,138,4,0.35)" }}
                />
              </div>
              <div
                className="mt-4 text-2xl font-medium tracking-tight"
                style={{ color: C.inkDeep }}
              >
                {s.title}
              </div>
              <p
                className="mt-2 text-sm leading-[1.6]"
                style={{ color: C.muted }}
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

// 06 — CONVERGENCE: full-bleed dark with numbered horizontal force rail
function SectionConvergence() {
  const forces = [
    {
      n: "01",
      title: "Gold is having its moment.",
      body: "Central banks are buying. Retail is rediscovering it. The oldest store of value is quietly back at the center of the conversation.",
    },
    {
      n: "02",
      title: "Blockchain finally grew up.",
      body: "Real-world asset tokenization moved from crypto fantasy to where the institutional trillions are actually going.",
    },
    {
      n: "03",
      title: "A new generation wants in — without the guilt.",
      body: "For the first time, gold is available without the extraction, displacement, and environmental cost that locked younger investors out.",
    },
  ];
  return (
    <section
      className="relative overflow-hidden"
      style={{ background: C.ink, color: C.bg }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(rgba(202,138,4,0.3) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
      <div className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8 md:py-32">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <SectionLabel n="06 / 12" dark />
            <div className="mt-4">
              <Eyebrow dark>The Halley&apos;s Comet alignment</Eyebrow>
            </div>
            <h2
              className="mt-6 text-4xl font-medium leading-[1.05] tracking-[-0.01em] md:text-[56px]"
              style={{ color: C.bg }}
            >
              Three forces.
              <br />
              <span style={{ color: C.gold, fontStyle: "italic" }}>
                Same window.
              </span>
            </h2>
            <p
              className="mt-6 max-w-md text-lg leading-[1.65]"
              style={{ color: "rgba(250,250,249,0.72)" }}
            >
              For the first time in history, three trillion-dollar forces are
              aligning at once. Most people only see one of them. Until
              it&apos;s too late.
            </p>
          </div>
          <div className="md:col-span-7">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl">
              <Image
                src="/images/earth-cubes/earth-cube-global-field.png"
                alt="Planet-scale view"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-px md:grid-cols-3">
          {forces.map((f) => (
            <div
              key={f.n}
              className="p-8 transition-all duration-500"
              style={{
                background: "rgba(250,250,249,0.03)",
                border: "1px solid rgba(250,250,249,0.1)",
                backdropFilter: "blur(12px)",
              }}
            >
              <div
                className="text-5xl font-light tracking-tight"
                style={{ color: C.gold, fontFamily: FONT_MONO }}
              >
                {f.n}
              </div>
              <div
                className="mt-4 text-xl font-medium leading-tight"
                style={{ color: C.bg }}
              >
                {f.title}
              </div>
              <p
                className="mt-3 text-sm leading-[1.65]"
                style={{ color: "rgba(250,250,249,0.7)" }}
              >
                {f.body}
              </p>
            </div>
          ))}
        </div>

        <div
          className="mx-auto mt-16 max-w-2xl border-t pt-8 text-center text-lg italic leading-[1.5]"
          style={{
            borderColor: "rgba(202,138,4,0.4)",
            color: C.gold,
          }}
        >
          When three trillion-dollar forces converge like this, the window to
          understand it closes faster than the window to act on it.
        </div>
      </div>
    </section>
  );
}

// 07 — BITCOIN PARALLEL: editorial single-column with huge pull-quote
function SectionBitcoinParallel() {
  return (
    <section
      className="relative"
      style={{
        background: "linear-gradient(180deg,#1C1917 0%, #0C0A09 100%)",
        color: C.bg,
      }}
    >
      <div className="mx-auto max-w-4xl px-5 py-24 sm:px-8 md:py-32">
        <SectionLabel n="07 / 12" dark />
        <h2
          className="mt-6 text-5xl font-medium leading-[1.02] tracking-[-0.02em] md:text-[80px]"
          style={{ color: C.bg }}
        >
          Gold was money for
          <br />
          <span style={{ color: C.gold }}>6,000 years.</span>
        </h2>
        <p
          className="mt-10 max-w-2xl text-xl leading-[1.6]"
          style={{ color: "rgba(250,250,249,0.78)" }}
        >
          Bitcoin was the escape that didn&apos;t quite work. Digital gold
          mining is the step that finally moves the oldest store of value at
          the speed and reach of the modern one.
        </p>
        <div
          className="mt-14 border-l-4 pl-8 text-3xl leading-[1.25] md:text-[42px]"
          style={{
            borderColor: C.gold,
            color: C.bg,
            fontStyle: "italic",
            fontWeight: 300,
          }}
        >
          Gold only gets digitized <span style={{ color: C.gold }}>once</span>.
          <br />
          That&apos;s the thing to be early to.
        </div>
      </div>
    </section>
  );
}

// 08 — PROOF LINE: data dashboard — 5 stat tiles in mono grid
function SectionProofLine() {
  const stats = [
    { v: "$469M", label: "Reserved", body: "Pre-market token reservations before a single public listing." },
    { v: "17,466", label: "Investors", body: "Real people who put real capital behind the model." },
    { v: "162", label: "Countries", body: "Global reach without a single paid advertisement." },
    { v: "10", label: "Patents", body: "Patents pending on the origination process itself." },
    { v: "7 yr", label: "Built", body: "Seven years spent building the system before going public." },
  ];
  return (
    <section
      className="relative"
      style={{ background: C.bgWarm, color: C.ink }}
    >
      <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 md:py-32">
        <div className="max-w-3xl">
          <SectionLabel n="08 / 12" />
          <div className="mt-4">
            <Eyebrow>Pre-market token reservations &amp; milestones</Eyebrow>
          </div>
          <h2
            className="mt-6 text-4xl font-medium leading-[1.05] tracking-[-0.01em] md:text-[56px]"
            style={{ color: C.inkDeep }}
          >
            The numbers behind a category that hasn&apos;t gone public yet.
          </h2>
        </div>

        <div
          className="mt-14 grid grid-cols-2 overflow-hidden rounded-3xl md:grid-cols-5"
          style={{
            background: C.bg,
            border: `1px solid ${C.line}`,
            boxShadow: "0 40px 80px -50px rgba(28,25,23,0.25)",
          }}
        >
          {stats.map((s, i) => (
            <div
              key={s.label}
              className="p-7 md:p-8"
              style={{
                borderRight:
                  i < stats.length - 1 ? `1px solid ${C.line}` : "none",
                borderBottom:
                  // mobile row separators on 2-col
                  `1px solid ${C.line}`,
              }}
            >
              <div
                className="text-[10px] font-semibold uppercase tracking-[0.24em]"
                style={{ color: C.gold, fontFamily: FONT_MONO }}
              >
                {s.label}
              </div>
              <div
                className="mt-3 text-4xl font-medium tracking-[-0.02em] md:text-5xl"
                style={{
                  color: C.inkDeep,
                  fontFamily: FONT_MONO,
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {s.v}
              </div>
              <p
                className="mt-3 text-xs leading-[1.55]"
                style={{ color: C.muted }}
              >
                {s.body}
              </p>
            </div>
          ))}
        </div>
        <p
          className="mt-6 text-xs"
          style={{ color: "rgba(28,25,23,0.55)", fontFamily: FONT_MONO }}
        >
          Every figure traces to NatGold Digital&apos;s public pre-market
          reservation timeline. Independently verifiable on request.
        </p>
      </div>
    </section>
  );
}

// 09 — PEOPLE: three credential cards + lede
function SectionPeople() {
  const profiles = [
    {
      role: "Former Chief of Staff",
      org: "U.S. Securities and Exchange Commission",
      note: "Drafted enforcement policy for emerging-asset classifications.",
    },
    {
      role: "Former Counsel",
      org: "U.S. Commodity Futures Trading Commission",
      note: "Architected the regulatory framework for commodity-backed digital assets.",
    },
    {
      role: "Ex Mining Executive",
      org: "Barrick Gold · BHP",
      note: "Ran exploration programs on the world's largest gold and mineral portfolios.",
    },
  ];
  return (
    <section style={{ background: C.bg, color: C.ink }}>
      <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 md:py-32">
        <div className="grid grid-cols-1 items-end gap-10 md:grid-cols-12">
          <div className="md:col-span-6">
            <SectionLabel n="09 / 12" />
            <div className="mt-4">
              <Eyebrow>Who&apos;s behind it</Eyebrow>
            </div>
            <h2
              className="mt-6 text-4xl font-medium leading-[1.05] tracking-[-0.01em] md:text-[56px]"
              style={{ color: C.inkDeep }}
            >
              Built by people who built
              <br />
              <span style={{ fontStyle: "italic" }}>the old system.</span>
            </h2>
          </div>
          <p
            className="text-lg leading-[1.65] md:col-span-6"
            style={{ color: C.muted }}
          >
            This isn&apos;t a crypto-anon project. It&apos;s being built by
            people retail investors already quietly{" "}
            <strong style={{ color: C.ink, fontWeight: 600 }}>trust</strong>{" "}
            every day.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3">
          {profiles.map((p) => (
            <div
              key={p.role}
              className="group flex flex-col rounded-2xl p-8 transition-all duration-500"
              style={{
                background: "rgba(255,255,255,0.7)",
                border: `1px solid ${C.line}`,
                backdropFilter: "blur(12px)",
                boxShadow: "0 10px 30px -20px rgba(28,25,23,0.2)",
              }}
            >
              <div
                className="h-12 w-12 rounded-full"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(202,138,4,0.25), rgba(202,138,4,0.08))",
                  border: `1px solid ${C.gold}`,
                }}
              />
              <div
                className="mt-6 text-[10px] font-semibold uppercase tracking-[0.24em]"
                style={{ color: C.gold, fontFamily: FONT_MONO }}
              >
                Credential
              </div>
              <div
                className="mt-3 text-xl font-medium leading-tight"
                style={{ color: C.inkDeep }}
              >
                {p.role}
              </div>
              <div
                className="mt-1 text-sm"
                style={{ color: C.muted }}
              >
                {p.org}
              </div>
              <p
                className="mt-5 border-t pt-5 text-sm italic leading-[1.6]"
                style={{
                  borderColor: C.line,
                  color: C.muted,
                }}
              >
                {p.note}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// 10 — THE BOOK: hero-mirror — Book3D left, four sections right
function SectionBook() {
  const sections = [
    {
      n: "01",
      title: "Why Gold No Longer Needs Mining",
      chapters: "Chapters 1–8 · The Inevitability Case",
      body: "Why the old extraction-based gold industry is structurally collapsing — environmental, social, and economic forces shutting it down at the exact moment trillions in verified gold sit untouched in the ground.",
    },
    {
      n: "02",
      title: "The NatGold Digital Mining Ecosystem",
      chapters: "Chapters 9–16 · How It Works",
      body: "How NatGold Digital actually works. The team, the patents, the verification standards, the approval pipeline, the token economics — and the pre-market demand it has already attracted.",
    },
    {
      n: "03",
      title: "The $1B Case Study: Cahuilla Gold Project",
      chapters: "Chapters 17–19 · Proof of Concept",
      body: "The first real deposit through the pipeline. The transaction details, the players, the financial and environmental scorecard — theory replaced with a real-world transaction.",
    },
    {
      n: "04",
      title: "The Opportunity, Risks & Future",
      chapters: "Chapters 20–23 · What to Do Next",
      body: "An honest risk register, the investment options that exist today, a 10-year forecast, and the structural parallel between digital gold mining and the EV transition of the last decade.",
    },
  ];
  return (
    <section
      className="relative overflow-hidden"
      style={{ background: C.bgWarm, color: C.ink }}
    >
      <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 md:py-32">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-12">
          {/* Book visual column */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <SectionLabel n="10 / 12" />
              <div className="mt-4">
                <Eyebrow>The book</Eyebrow>
              </div>
              <h2
                className="mt-6 text-5xl font-medium leading-[1.02] tracking-[-0.02em] md:text-6xl"
                style={{ color: C.inkDeep }}
              >
                Digital Gold
                <br />
                Boom.
              </h2>
              <p
                className="mt-4 text-xl italic"
                style={{ color: C.gold }}
              >
                Tell all. Nothing held back.
              </p>

              {/* Desktop: Book3D. Mobile: fallback image */}
              <div className="relative mt-10 hidden h-[440px] w-full md:block">
                <Book3D />
              </div>
              <div className="relative mt-10 block md:hidden">
                <div
                  className="relative mx-auto aspect-[2/3] w-56 overflow-hidden rounded-lg"
                  style={{
                    boxShadow: "0 40px 80px -20px rgba(28,25,23,0.45)",
                  }}
                >
                  <Image
                    src="/images/Digital Gold Boom Cover (1).png"
                    alt="Digital Gold Boom book cover"
                    fill
                    sizes="224px"
                    className="object-cover"
                  />
                </div>
              </div>

              <p
                className="mt-8 text-sm leading-[1.65]"
                style={{ color: C.muted }}
              >
                Written by{" "}
                <strong style={{ color: C.ink, fontWeight: 600 }}>
                  Andrew Fletcher
                </strong>{" "}
                — former President of Great Eagle Gold Corp, now NatBridge
                Resources, which signed the first NatGold supply agreement.
              </p>
              <p
                className="mt-4 text-lg italic"
                style={{ color: C.inkDeep }}
              >
                Once you see it, you can&apos;t unsee it.{" "}
                <span style={{ color: C.gold }}>It just makes sense.</span>
              </p>
            </div>
          </div>

          {/* Four sections — stacked editorial list */}
          <div className="lg:col-span-7">
            <div className="mb-10">
              <div
                className="text-[10px] font-semibold uppercase tracking-[0.24em]"
                style={{ color: C.gold, fontFamily: FONT_MONO }}
              >
                Four sections · 23 chapters
              </div>
              <h3
                className="mt-3 text-3xl font-medium leading-tight tracking-[-0.01em] md:text-[40px]"
                style={{ color: C.inkDeep }}
              >
                One complete case, end to end.
              </h3>
            </div>
            <ol className="space-y-px">
              {sections.map((s) => (
                <li
                  key={s.n}
                  className="group grid grid-cols-[auto_1fr] gap-6 p-6 transition-all duration-500 md:p-7"
                  style={{
                    background: "rgba(255,255,255,0.55)",
                    borderTop: `1px solid ${C.line}`,
                    backdropFilter: "blur(10px)",
                  }}
                >
                  <div
                    className="text-4xl font-light tracking-tight md:text-5xl"
                    style={{
                      color: C.gold,
                      fontFamily: FONT_MONO,
                    }}
                  >
                    {s.n}
                  </div>
                  <div>
                    <div
                      className="text-xl font-medium leading-tight md:text-2xl"
                      style={{ color: C.inkDeep }}
                    >
                      {s.title}
                    </div>
                    <div
                      className="mt-1 text-[11px] uppercase tracking-[0.22em]"
                      style={{
                        color: C.muted,
                        fontFamily: FONT_MONO,
                      }}
                    >
                      {s.chapters}
                    </div>
                    <p
                      className="mt-3 text-sm leading-[1.65]"
                      style={{ color: C.muted }}
                    >
                      {s.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}

// 11 — THE STACK: pricing table with climaxing $0 row
function SectionStack() {
  const items = [
    {
      name: "Digital Gold Boom",
      price: "$39",
      body: "The full book. Every stat sourced, every claim traceable, the complete case from top to bottom.",
    },
    {
      name: "The Primer",
      price: "$99",
      body: "Waitlist-only dummy's guide. The play-by-play of what digital gold mining is and how it works — condensed for one sitting.",
    },
    {
      name: "Industry Intelligence Updates",
      price: "$199 / yr",
      body: "One year of periodic updates as the digital gold mining space evolves — new deposits, new partners, new milestones.",
    },
  ];
  return (
    <section
      className="relative"
      style={{ background: C.bg, color: C.ink }}
    >
      <div className="mx-auto max-w-4xl px-5 py-24 sm:px-8 md:py-32">
        <div className="text-center">
          <SectionLabel n="11 / 12" />
          <div className="mt-4 flex justify-center">
            <Eyebrow>What waitlist members get</Eyebrow>
          </div>
          <h2
            className="mt-6 text-4xl font-medium leading-[1.05] tracking-[-0.02em] md:text-[64px]"
            style={{ color: C.inkDeep }}
          >
            $337 of value.{" "}
            <span style={{ color: C.gold, fontStyle: "italic" }}>
              $0 to join.
            </span>
          </h2>
        </div>

        <div
          className="mt-14 overflow-hidden rounded-3xl"
          style={{
            background: "rgba(255,255,255,0.6)",
            border: `1px solid ${C.line}`,
            backdropFilter: "blur(14px)",
            boxShadow: "0 40px 80px -40px rgba(28,25,23,0.25)",
          }}
        >
          {items.map((it, i) => (
            <div
              key={it.name}
              className="grid grid-cols-[1fr_auto] items-start gap-6 p-6 md:grid-cols-[1fr_auto] md:p-8"
              style={{
                borderTop: i === 0 ? "none" : `1px solid ${C.line}`,
              }}
            >
              <div>
                <div
                  className="text-lg font-medium md:text-xl"
                  style={{ color: C.inkDeep }}
                >
                  {it.name}
                </div>
                <p
                  className="mt-2 max-w-lg text-sm leading-[1.6]"
                  style={{ color: C.muted }}
                >
                  {it.body}
                </p>
              </div>
              <div
                className="text-lg font-medium tabular-nums md:text-xl"
                style={{
                  color: C.inkDeep,
                  fontFamily: FONT_MONO,
                }}
              >
                {it.price}
              </div>
            </div>
          ))}

          {/* Total row — muted / struck */}
          <div
            className="grid grid-cols-[1fr_auto] items-center gap-6 p-6 md:p-8"
            style={{
              borderTop: `1px solid ${C.line}`,
              background: "rgba(28,25,23,0.03)",
            }}
          >
            <div
              className="text-[10px] font-semibold uppercase tracking-[0.24em]"
              style={{ color: C.muted, fontFamily: FONT_MONO }}
            >
              Total value
            </div>
            <div
              className="text-lg tabular-nums line-through"
              style={{
                color: "rgba(28,25,23,0.45)",
                fontFamily: FONT_MONO,
              }}
            >
              $337
            </div>
          </div>

          {/* Waitlist row — visual peak */}
          <div
            className="relative grid grid-cols-1 items-center gap-4 p-8 text-center md:grid-cols-[1fr_auto] md:p-10 md:text-left"
            style={{
              background:
                "linear-gradient(135deg, #1C1917 0%, #0C0A09 100%)",
              color: C.bg,
            }}
          >
            <div>
              <div
                className="text-[10px] font-semibold uppercase tracking-[0.28em]"
                style={{ color: C.gold, fontFamily: FONT_MONO }}
              >
                Your price on the waitlist
              </div>
              <div
                className="mt-2 text-lg"
                style={{ color: "rgba(250,250,249,0.7)" }}
              >
                Full stack. Zero cost. Until the book drops.
              </div>
            </div>
            <div
              className="text-6xl font-medium tabular-nums tracking-[-0.03em] md:text-7xl"
              style={{ color: C.gold, fontFamily: FONT_MONO }}
            >
              $0
            </div>
          </div>
        </div>
        <p
          className="mt-6 text-center text-xs"
          style={{ color: "rgba(28,25,23,0.55)", fontFamily: FONT_MONO }}
        >
          Free until the book drops. $39 after. No spam.
        </p>
      </div>
    </section>
  );
}

// 12 — FINAL CTA: dark full-bleed mirror of hero
function SectionFinalCTA() {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #0C0A09 0%, #1C1917 100%)",
        color: C.bg,
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-[600px] w-[800px] -translate-x-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, rgba(202,138,4,0.22), transparent)",
          filter: "blur(40px)",
        }}
      />
      <div className="relative mx-auto max-w-4xl px-5 py-28 text-center sm:px-8 md:py-40">
        <SectionLabel n="12 / 12" dark />
        <div className="mt-4 flex justify-center">
          <Eyebrow dark>Understand it before Wall Street does</Eyebrow>
        </div>
        <h2
          className="mx-auto mt-8 max-w-3xl text-4xl font-medium leading-[1.05] tracking-[-0.02em] md:text-[64px]"
          style={{ color: C.bg }}
        >
          Missed Bitcoin?{" "}
          <span style={{ fontStyle: "italic", color: C.gold }}>
            Don&apos;t wait
          </span>{" "}
          to read about digital gold mining in the Wall Street Journal.
        </h2>
        <p
          className="mx-auto mt-8 max-w-md text-xl"
          style={{ color: "rgba(250,250,249,0.72)" }}
        >
          Read it here first.
        </p>
        <div className="mt-12 flex justify-center">
          <WaitlistForm source="concept-d-final-cta" variant="final" />
        </div>
      </div>
    </section>
  );
}

// ───────────────────────────────────────────────────────────
// FOOTER (fresh, local)
// ───────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer
      className="relative"
      style={{
        background: C.inkDeep,
        color: "rgba(250,250,249,0.55)",
        fontFamily: FONT_BODY,
        borderTop: "1px solid rgba(250,250,249,0.08)",
      }}
    >
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-5 py-10 sm:flex-row sm:items-center sm:px-8">
        <div className="flex items-center gap-3">
          <span
            aria-hidden
            className="inline-block h-2 w-2 rounded-full"
            style={{ background: C.gold }}
          />
          <span
            className="text-sm font-semibold tracking-tight"
            style={{ color: C.bg }}
          >
            Digital Gold Boom
          </span>
        </div>
        <div
          className="text-xs tracking-wide"
          style={{ fontFamily: FONT_MONO }}
        >
          © 2026 Andrew Fletcher · All rights reserved
        </div>
      </div>
    </footer>
  );
}

// ───────────────────────────────────────────────────────────
// PAGE
// ───────────────────────────────────────────────────────────

export default function ConceptDPage() {
  return (
    <main
      style={{
        background: C.bg,
        color: C.ink,
        fontFamily: FONT_BODY,
      }}
    >
      <Navbar />
      {/* ACT I — HERO + STAKE */}
      <SectionHero />
      <SectionPersonalStake />
      {/* ACT II — PROBLEM → REFRAME → SOLUTION → CONVERGENCE → BITCOIN (dark) */}
      <SectionProblem />
      <SectionReframe />
      <SectionSolution />
      <SectionConvergence />
      <SectionBitcoinParallel />
      {/* ACT III — PROOF → PEOPLE → BOOK → STACK → CTA */}
      <SectionProofLine />
      <SectionPeople />
      <SectionBook />
      <SectionStack />
      <SectionFinalCTA />
      <Footer />
    </main>
  );
}
