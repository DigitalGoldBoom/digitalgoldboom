"use client";

import Book3D from "@/components/Book3D";
import NumberCounter from "@/components/NumberCounter";
import SalesField from "@/components/funnel/sales/SalesField";
import SalesCTA from "@/components/funnel/sales/SalesCTA";
import Reveal from "@/components/funnel/sales/Reveal";

/* /v3 — VSL-derived long-form sales page, REDESIGNED with the taste skill
   (design-taste-frontend). Dials VARIANCE 8 / MOTION 7 / DENSITY 3.
   Copy is LOCKED (SALES-COPY-v3.md, 15 beats) — words unchanged, only the layout,
   hierarchy and motion are rebalanced for conversion. Bold editorial web3 on the v2
   dark-gold brand. All breakpoints + reduced-motion safe (Reveal/NumberCounter/useInView
   degrade to final state). STATUS: copy still DRAFT (7 open [VERIFY] flags); Beat 12 demand
   figures are compliance-sensitive; page is noindex. Pricing: $37 early-reader, regular $97. */

/* ── shared, taste-driven primitives ──────────────────────────────────── */

// One giant editorial statement. Used sparingly as the "stop the scroll" moments.
function Statement({
  children,
  align = "left",
  max = "20ch",
}: {
  children: React.ReactNode;
  align?: "left" | "center";
  max?: string;
}) {
  return (
    <Reveal
      as="h2"
      className="v2-display"
      style={{
        fontSize: "clamp(2.4rem, 6vw, 5rem)",
        lineHeight: 1.02,
        maxWidth: max,
        marginInline: align === "center" ? "auto" : undefined,
        textAlign: align,
      }}
    >
      {children}
    </Reveal>
  );
}

function Lead({ children, max = "60ch", className = "" }: { children: React.ReactNode; max?: string; className?: string }) {
  return (
    <Reveal as="p" delay={80} className={`text-lg leading-relaxed ${className}`} style={{ color: "var(--v2-dim)", maxWidth: max }}>
      {children}
    </Reveal>
  );
}

// A single oversized stat that counts up on scroll. The big-number drama the page was missing.
function BigStat({
  value,
  count,
  label,
  className = "",
}: {
  value?: React.ReactNode;
  count?: { start: number; end: number; prefix?: string; suffix?: string };
  label: React.ReactNode;
  className?: string;
}) {
  return (
    <Reveal className={className}>
      <div
        className="v2-display font-mono v2-gold"
        style={{ fontSize: "clamp(3.5rem, 11vw, 8.5rem)", lineHeight: 0.86, fontVariantNumeric: "tabular-nums" }}
      >
        {count ? <NumberCounter start={count.start} end={count.end} prefix={count.prefix} suffix={count.suffix} /> : value}
      </div>
      <div className="mt-4 text-base" style={{ color: "var(--v2-faint)", maxWidth: "30ch" }}>
        {label}
      </div>
    </Reveal>
  );
}

function Section({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <section className={`mx-auto w-full max-w-[1320px] px-6 md:px-10 py-24 md:py-32 ${className}`}>{children}</section>;
}

function Divider() {
  return (
    <div className="mx-auto max-w-[1320px] px-6 md:px-10">
      <div className="v2-divider" />
    </div>
  );
}

export default function V3Funnel() {
  return (
    <div className="v2 relative overflow-clip">
      <SalesField />

      <main className="relative z-10">
        {/* ════ BEAT 1 · HERO — asymmetric split, giant type ════ */}
        <section className="relative flex min-h-[100svh] items-center">
          <div className="mx-auto w-full max-w-[1320px] px-6 md:px-10 pt-24 pb-20">
            <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12">
              <div>
                <Reveal as="div"><p className="v2-eyebrow mb-7">A shift in the gold industry</p></Reveal>
                <Reveal as="h1" delay={50} className="v2-display" style={{ fontSize: "clamp(2.8rem, 7.4vw, 6rem)", lineHeight: 0.96 }}>
                  It&rsquo;s not gold.
                  <br />
                  It&rsquo;s not <span className="v2-gold">bitcoin.</span>
                </Reveal>
                <Reveal as="p" delay={110} className="mt-8 max-w-[46ch] leading-relaxed" style={{ color: "var(--v2-dim)", fontSize: "clamp(1.05rem, 1.5vw, 1.2rem)" }}>
                  Twenty-two trillion dollars of gold has already been found, verified, and sitting in the ground right now. For six thousand years there was one way to reach it: dig it up. This book is about <span style={{ color: "#F4F4F7" }}>the other way.</span>
                </Reveal>
                <Reveal delay={170} className="mt-10">
                  <SalesCTA event="v3_hero_buy" regular="97" />
                </Reveal>
              </div>
              <div className="flex justify-center lg:justify-end">
                <Book3D />
              </div>
            </div>
          </div>
        </section>

        {/* ════ BEAT 2 · AUTHORITY — editorial, credential strip (no eyebrow) ════ */}
        <Section>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
            <Statement max="18ch">
              I walked away from a gold deal at a mercury pit. Then I went looking for a <span className="v2-gold">better way.</span>
            </Statement>
            <div className="lg:pt-4">
              <Lead>
                In 2020, in the Chocó region of Colombia, Andrew Fletcher stood at the edge of a mining pit where workers, some of them teenagers, handled mercury with their bare hands, and walked away from the deal. He had spent his career finding gold: President of Great Eagle Gold, now NatBridge Resources, and the assessor of more than two hundred gold projects across multiple continents. The kind of mine that deal would have built is the kind being shut down by protests around the world. This book is written from inside that industry, by someone who watched the old way of producing gold start to break.
              </Lead>
              <Reveal delay={140}>
                <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 font-mono" style={{ fontSize: "0.8rem", color: "var(--v2-faint)", letterSpacing: "0.04em", textTransform: "uppercase" }}>
                  <span>Former President, Great Eagle Gold</span>
                  <span>Now NatBridge Resources</span>
                  <span>200+ projects assessed</span>
                </div>
              </Reveal>
            </div>
          </div>
        </Section>

        <Divider />

        {/* ════ BEAT 3 · THE BIND — full-bleed statement + the bind as counter-panel ════ */}
        <Section>
          <Statement align="center" max="26ch">
            Gold is the one money that is <span className="v2-gold">no one&rsquo;s promise to break.</span>
          </Statement>
          <Lead className="mx-auto mt-9 text-center" max="64ch">
            The dollar in your account is a promise from a government. A bond is a promise from a state. The cash in a bank is a promise from the bank. Gold is the one thing in that pile that is a promise from no one. It isn&rsquo;t at the edge of the financial system, it is the floor under it. In 2025, the world&rsquo;s central banks held more of their reserves in gold than in U.S. government debt, for the first time since 1996.
          </Lead>

          <Reveal delay={120}>
            <div className="mt-16 rounded-[24px] p-8 md:p-12" style={{ border: "1px solid var(--v2-line)", background: "rgba(255,255,255,0.018)" }}>
              <p className="v2-display" style={{ fontSize: "clamp(1.6rem, 3vw, 2.5rem)", maxWidth: "24ch" }}>
                Here is the bind the whole book <span className="v2-gold">breaks open.</span>
              </p>
              <p className="mt-6 text-lg leading-relaxed" style={{ color: "var(--v2-dim)", maxWidth: "62ch" }}>
                The capital that wants gold most, the trillions that now screen every asset for the damage it does, cannot hold it. New gold means a new mine: forest cleared, rock blasted, a river downstream paying the price. The asset that capital wants is shut out by the one thing standing between them: how it is produced.
              </p>
              <p className="mt-6 font-mono text-xs" style={{ color: "var(--v2-faint)", letterSpacing: "0.02em" }}>
                Central-bank reserve share, 2025; gold figures as of February 26, 2026, gold at $5,194/oz.
              </p>
            </div>
          </Reveal>
        </Section>

        {/* ════ BEAT 4 · THE VILLAIN — big-number stat band + full-bleed pull-quote ════ */}
        <Section>
          <Reveal as="div"><p className="v2-eyebrow mb-7">The problem</p></Reveal>
          <Statement max="20ch">
            The only way we have ever made new gold is <span className="v2-gold">breaking down.</span>
          </Statement>
          <Lead className="mt-9" max="64ch">
            Not slowly, and not for one reason. Six forces are closing on every new mine at once, each feeding the next: what Fletcher calls the Extraction S.P.I.R.A.L. The rich, easy ore is gone, and everyone has a camera. A drone video of a poisoned river reaches millions before the company has a response. That turns into protest, and protest into politics.
          </Lead>

          <div className="mt-14 grid grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-6">
            <BigStat count={{ start: 0, end: 89, suffix: "%" }} label="Collapse in ore grade: ~12 g of gold per tonne in 1950, barely 1 today." />
            <BigStat value="124t" label="Of rock now moved to recover a single ounce." />
            <BigStat count={{ start: 0, end: 29, suffix: " yrs" }} label="US average from discovery to a producing mine, once a few years." />
          </div>

          <Reveal delay={120}>
            <blockquote className="mt-16 border-l-2 pl-8" style={{ borderColor: "var(--v2-gold)" }}>
              <p className="v2-display" style={{ fontSize: "clamp(1.6rem, 3.4vw, 2.75rem)", maxWidth: "26ch", lineHeight: 1.1 }}>
                In Panama, a ten-billion-dollar copper-gold mine, already built, already producing, was shut down by the public in <span className="v2-gold">thirty-nine days.</span>
              </p>
            </blockquote>
          </Reveal>

          <Lead className="mt-12" max="62ch">
            A record gold price does not loosen this. It tightens it. It just pays miners to chase the worst ore left. The harder extraction gets, the louder one question becomes: does gold even need to be dug up to be worth anything?
          </Lead>
        </Section>

        <Divider />

        {/* ════ BEAT 5 · THE KEY — the centerpiece, stepped proof + lit fact-card ════ */}
        <Section>
          <Reveal as="div"><p className="v2-eyebrow mb-7">The reframe</p></Reveal>
          <Statement max="16ch">
            Gold&rsquo;s value was never in the digging. It is in <span className="v2-gold">the proof.</span>
          </Statement>
          <Lead className="mt-9" max="64ch">
            Copper, lithium, and iron get used up, their value is the using. Gold is different: almost none of the gold ever mined was consumed building anything. Ninety-three percent of it just sits there, held as wealth. Gold is not a commodity. It is money, and money does not have to be consumed to be worth something. It only has to be proven real, stored, and moved.
          </Lead>

          {/* sub-beat 1 — the proof is already bankable, with the Barrick fact as a lit moment */}
          <div className="mt-20 grid grid-cols-1 items-center gap-10 lg:grid-cols-[1fr_0.85fr] lg:gap-16">
            <div>
              <h3 className="v2-display" style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)", maxWidth: "20ch" }}>
                The industry already bets <span className="v2-gold">billions</span> on the proof.
              </h3>
              <Lead className="mt-6" max="58ch">
                Before any company builds a mine, independent geologists drill the ground and verify the gold is there, to a standard so strict the person who signs it is personally liable if they lie. That standard exists because in 1997 a company called Bre-X faked a gold discovery and wiped out billions before anyone checked. The market already pays real money, in the billions, for gold that has only been proven to exist. The value becomes bankable at verification, not at extraction.
              </Lead>
            </div>
            <Reveal delay={100}>
              <figure className="m-0 rounded-[24px] p-8" style={{ border: "1px solid rgba(232,178,58,0.4)", background: "linear-gradient(180deg, rgba(232,178,58,0.08), rgba(232,178,58,0.02))" }}>
                <div className="font-mono v2-gold" style={{ fontSize: "clamp(3rem, 7vw, 4.5rem)", lineHeight: 0.9, fontVariantNumeric: "tabular-nums" }}>$1B</div>
                <div className="mt-2 font-mono" style={{ fontSize: "1.3rem", color: "#F4F4F7" }}>for ~39M oz</div>
                <figcaption className="mt-5 text-sm leading-relaxed" style={{ color: "var(--v2-dim)" }}>
                  In 2025, Barrick paid one billion dollars in cash for half of the Donlin deposit in Alaska, roughly 39 million ounces of verified gold, with not one ounce out of the ground.
                </figcaption>
              </figure>
            </Reveal>
          </div>

          {/* sub-beat 2 — Blockbuster analogy, distinct callout */}
          <Reveal delay={80}>
            <div className="mt-16 rounded-[24px] p-8 md:p-10" style={{ border: "1px solid var(--v2-line)", background: "rgba(255,255,255,0.018)" }}>
              <p className="v2-display" style={{ fontSize: "clamp(1.5rem, 2.6vw, 2.25rem)", maxWidth: "26ch" }}>
                So what is extraction? <span className="v2-gold">The delivery method.</span>
              </p>
              <p className="mt-6 text-lg leading-relaxed" style={{ color: "var(--v2-dim)", maxWidth: "64ch" }}>
                Think of Blockbuster. They thought they were in the business of stores. They were in the business of getting you a movie, and the store was only the delivery method. The gold industry made the same mistake: it confused the mine with the gold. The mine was only ever the delivery method, and it costs about $1,676 an ounce, more than twenty-three years, and a scarred watershed to run.
              </p>
            </div>
          </Reveal>

          {/* sub-beat 3 — the new rails already work on gold */}
          <div className="mt-16 grid grid-cols-1 items-start gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
            <Reveal>
              <div className="v2-display font-mono v2-gold" style={{ fontSize: "clamp(3rem, 8vw, 6rem)", lineHeight: 0.86 }}>~$6B</div>
              <div className="mt-3 text-base" style={{ color: "var(--v2-faint)", maxWidth: "26ch" }}>
                Already trades on-chain through PAX Gold and Tether Gold, proving the market for digital gold is real.
              </div>
            </Reveal>
            <Lead className="lg:pt-3" max="60ch">
              But they only tokenize the bar: gold already mined, refined, and vaulted. Move that same step one stage earlier, to the gold still in the ground at the moment of verification, and verification becomes the moment of monetization. No mine. No permits. No twenty-three years. No cyanide, no tailings, no poisoned river, nothing for anyone to fight over. The damage was never the gold&rsquo;s. It was the extraction&rsquo;s.
            </Lead>
          </div>
        </Section>

        <Divider />

        {/* ════ BEAT 6 · INSTITUTIONAL RAILS — narrative + bold stat bento ════ */}
        <Section>
          <Statement max="22ch">
            The most cautious money in finance is rebuilding the system on <span className="v2-gold">these rails.</span>
          </Statement>
          <Lead className="mt-9" max="66ch">
            In 2017, the head of BlackRock, the largest money manager on earth, said Bitcoin mostly proved how much demand there was for money laundering. In January 2026, the same man stood on the main stage at Davos and said he wants regulators to approve putting stocks and bonds on the blockchain, not a coin, the real things. When the most cautious money goes from &ldquo;this is for criminals&rdquo; to &ldquo;put everything on it&rdquo; in a few years, that is the financial system being rebuilt, and the same rails work for gold that is still in the ground.
          </Lead>
          <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
            {[
              { v: "$1.5T+", l: "Processed by JPMorgan on these rails" },
              { v: "$2.4B", l: "BlackRock's own tokenized fund" },
              { v: "$1B+", l: "HSBC tokenized gold traded" },
              { v: "€300M", l: "Siemens bond, settled in minutes" },
            ].map((s, i) => (
              <Reveal key={s.l} delay={i * 60}>
                <div className="v2-tile h-full p-6 md:p-7">
                  <div className="font-mono v2-gold" style={{ fontSize: "clamp(1.5rem, 2.6vw, 2.1rem)", lineHeight: 1, fontVariantNumeric: "tabular-nums" }}>{s.v}</div>
                  <div className="mt-3 text-sm" style={{ color: "var(--v2-faint)" }}>{s.l}</div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={80}>
            <p className="mt-6 text-sm" style={{ color: "var(--v2-faint)", maxWidth: "62ch" }}>
              These institutions are tokenizing bonds, stocks and property. They do not endorse digital gold mining; the gold step is the author&rsquo;s case, and the rails are the same.
            </p>
          </Reveal>
        </Section>

        {/* ════ BEAT 7 · SCORECARD — bold old-vs-new split + the "none" punch ════ */}
        <Section>
          <Statement max="20ch">
            Put both ways side by side, on the <span className="v2-gold">same deposit.</span>
          </Statement>
          <div className="mt-12 grid grid-cols-1 gap-5 lg:grid-cols-2">
            <Reveal>
              <div className="h-full rounded-[24px] p-8 md:p-10" style={{ border: "1px solid var(--v2-line)", background: "rgba(255,255,255,0.015)" }}>
                <div className="font-mono mb-6 text-sm" style={{ color: "var(--v2-faint)", letterSpacing: "0.1em", textTransform: "uppercase" }}>The old way</div>
                <ul className="space-y-4" style={{ color: "var(--v2-dim)", fontSize: "1.05rem" }}>
                  <li><span className="font-mono" style={{ color: "#F4F4F7" }}>23+ years</span> to permit, build and dig before a single ounce sells</li>
                  <li><span className="font-mono" style={{ color: "#F4F4F7" }}>~$300M</span> spent up front</li>
                  <li><span className="font-mono" style={{ color: "#F4F4F7" }}>40%+</span> of verified deposits never make it through</li>
                  <li><span className="font-mono" style={{ color: "#F4F4F7" }}>124t</span> rock, 21,000 L water, 9 kg cyanide per ounce</li>
                </ul>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <div className="h-full rounded-[24px] p-8 md:p-10" style={{ border: "1px solid rgba(232,178,58,0.45)", background: "linear-gradient(180deg, rgba(232,178,58,0.08), rgba(232,178,58,0.02))" }}>
                <div className="font-mono v2-gold mb-6 text-sm" style={{ letterSpacing: "0.1em", textTransform: "uppercase" }}>The new way</div>
                <ul className="space-y-4" style={{ color: "#E7E7EE", fontSize: "1.05rem" }}>
                  <li><span className="v2-gold">Months</span>, not decades</li>
                  <li>A fraction of the cost</li>
                  <li>Verify the gold is there, and stop</li>
                  <li className="v2-gold" style={{ fontWeight: 500 }}>Waste rock, water and cyanide: none. Not less. None.</li>
                </ul>
              </div>
            </Reveal>
          </div>
          <Lead className="mt-10" max="62ch">
            Across a single deposit, the old way moves waste rock enough to build more than eight Great Pyramids. The new way produces none of it.
          </Lead>
        </Section>

        <Divider />

        {/* ════ BEAT 8 · WHY NOTHING FIGHTS IT — winners bento ════ */}
        <Section>
          <Statement align="center" max="24ch">
            Leave the gold in the ground, and <span className="v2-gold">the fight ends.</span>
          </Statement>
          <Lead className="mx-auto mt-9 text-center" max="64ch">
            Gold mining is one of the most combative industries on earth. Every new mine pits the company against the community, the jobs against the river. Someone always loses, so someone always fights back, and that fight is what kills mines. Leave the gold where it is and the source of the fight is gone.
          </Lead>
          <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { t: "The miner", b: "Monetizes a verified asset without the cost or risk of digging." },
              { t: "The government", b: "Collects a royalty with no ruin to clean up after." },
              { t: "The community", b: "Keeps its water and still earns from the gold beneath it." },
              { t: "The land", b: "Stays whole. No one has to lose for gold to be worth what it is." },
            ].map((c, i) => (
              <Reveal key={c.t} delay={i * 60}>
                <div className="v2-tile h-full p-6 md:p-7">
                  <h3 className="v2-gold" style={{ fontSize: "1.1rem", fontWeight: 500, marginBottom: 10 }}>{c.t}</h3>
                  <p style={{ color: "var(--v2-dim)", fontSize: "0.95rem", lineHeight: 1.6 }}>{c.b}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Section>

        {/* ════ BEATS 9-11 · MOMENTUM — alternating stat + statement rhythm ════ */}
        <Section>
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
            <BigStat value="$1B" label="Flowed into the first gold ETF within three trading days in 2004, demand that was locked behind friction, released. That category holds about $700B today." />
            <div>
              <h3 className="v2-display" style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)", maxWidth: "22ch" }}>
                Remove the friction, and capital that was stuck <span className="v2-gold">moves.</span>
              </h3>
              <Lead className="mt-6" max="58ch">
                Digital gold mining removes the largest remaining piece of friction: the mine itself. And the deposits are real and named. Two of the first, the Cahuilla and Friday gold projects, are documented in the book: real properties with decades of drilling behind them, sitting in the qualification pipeline. None of it is minted; it is in the pipeline, not through it.
              </Lead>
            </div>
          </div>

          <Reveal delay={80}>
            <div className="mt-20 grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
              <div>
                <h3 className="v2-display" style={{ fontSize: "clamp(1.7rem, 3.2vw, 2.6rem)", maxWidth: "20ch" }}>
                  The generation most likely to own gold is the one that <span className="v2-gold">rejects how it is mined.</span>
                </h3>
                <Lead className="mt-6" max="58ch">
                  Among investors, Millennials own gold at three times the rate of boomers, and they are the most environmentally engaged investors ever measured. For years that was a contradiction they carried in silence. Digital gold mining ends it: gold with nothing to apologize for. And the money is moving with them.
                </Lead>
              </div>
              <BigStat value="$124T" label="The largest handover of wealth in history, passing from the boomers to their children and grandchildren over the next two decades, carrying their values in with it." />
            </div>
          </Reveal>

          <Reveal delay={80}>
            <div className="mt-20 rounded-[24px] p-8 md:p-12" style={{ border: "1px solid var(--v2-line)", background: "rgba(255,255,255,0.018)" }}>
              <p className="v2-display" style={{ fontSize: "clamp(1.6rem, 3vw, 2.5rem)", maxWidth: "26ch" }}>
                The name that describes it is the reason people <span className="v2-gold">dismiss it.</span>
              </p>
              <p className="mt-6 text-lg leading-relaxed" style={{ color: "var(--v2-dim)", maxWidth: "64ch" }}>
                Two words: digital gold. They sound like hype, so the brain files the idea with every coin and scam that came before and moves on. Blockbuster laughed Netflix out of the room in 2000 after turning down the chance to buy it for fifty million dollars, and was bankrupt within a decade. Every shift like this has the person who saw it early and the person who spent years afterward explaining why he didn&rsquo;t.
              </p>
            </div>
          </Reveal>
        </Section>

        <Divider />

        {/* ════ BEAT 12 · DEMAND ON THE RECORD (compliance-sensitive) ════ */}
        <Section>
          <Reveal as="div"><p className="v2-eyebrow mb-7">The demand is on the record</p></Reveal>
          <Statement max="22ch">
            Before anyone could buy a single token, 162 countries <span className="v2-gold">reserved their interest.</span>
          </Statement>
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
            <BigStat count={{ start: 0, end: 162 }} label="Countries, about 84% of the nations on earth." />
            <BigStat value="US$469M" label="Of expressed interest, reserved, not a dollar paid." />
            <BigStat count={{ start: 0, end: 17466 }} label="People, on the record, before the doors opened." />
          </div>
          <Reveal delay={80}>
            <p className="mt-8 font-mono text-xs leading-relaxed" style={{ color: "var(--v2-faint)", letterSpacing: "0.02em", maxWidth: "64ch" }}>
              Reserved means registered interest, not a dollar paid, raised, or invested. Reported as a fact the book examines, not an invitation to buy. The book lays out exactly what it does and does not mean.
            </p>
          </Reveal>
        </Section>

        {/* ════ BEAT 13 · CARRYING COST — single number moment ════ */}
        <Section>
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
            <BigStat value={<>&minus;$7,726</>} label="Drained from a $100,000 gold-ETF position over twenty years in fees, money you never see leave." />
            <div>
              <h3 className="v2-display" style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)", maxWidth: "20ch" }}>
                Holding gold the old way quietly <span className="v2-gold">costs you, every year.</span>
              </h3>
              <Lead className="mt-6" max="56ch">
                Holding physical gold or a gold fund is not free. Because digital gold mining leaves the gold in the ground, there is nothing to store, insure, or guard, and that annual carrying cost falls away. The book walks through the full twenty-year comparison.
              </Lead>
            </div>
          </div>
        </Section>

        <Divider />

        {/* ════ BEAT 14 · WHAT THE BOOK IS — product, team, honest risks ════ */}
        <Section>
          <Reveal as="div"><p className="v2-eyebrow mb-7">What is inside</p></Reveal>
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <div className="order-2 flex justify-center lg:order-1"><Book3D /></div>
            <div className="order-1 lg:order-2">
              <Statement max="20ch">
                The complete case, and the honest case against it, in <span className="v2-gold">one place.</span>
              </Statement>
              <Lead className="mt-8" max="60ch">
                Digital Gold Boom is the full map of everything above, and far more: how a verified deposit becomes something you can own without a shovel ever touching it; the team behind it, including a former chief of staff of the U.S. Securities and Exchange Commission and the former chief innovation officer of Barrick; the ten patent-pending applications now under examination at the U.S. patent office; and a full chapter of honest risks, what could go wrong, and the one question the author marks as still open, laid out in plain view.
              </Lead>
              <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Reveal>
                  <div className="v2-tile h-full p-6">
                    <div className="v2-num v2-gold mb-3" style={{ color: "var(--v2-gold)" }}>SECTION 01 · CH 1&ndash;8</div>
                    <h4 style={{ fontSize: "1.1rem", fontWeight: 500, color: "#F4F4F7", marginBottom: 8 }}>The Inevitability of Digital Gold Mining</h4>
                    <p style={{ color: "var(--v2-dim)", fontSize: "0.9rem", lineHeight: 1.6 }}>The case that gold&rsquo;s value no longer needs a mine, built from first principles.</p>
                  </div>
                </Reveal>
                <Reveal delay={60}>
                  <div className="v2-tile h-full p-6">
                    <div className="v2-num v2-gold mb-3" style={{ color: "var(--v2-gold)" }}>SECTION 02 · CH 9&ndash;17</div>
                    <h4 style={{ fontSize: "1.1rem", fontWeight: 500, color: "#F4F4F7", marginBottom: 8 }}>The NatGold Digital Gold Mining Ecosystem</h4>
                    <p style={{ color: "var(--v2-dim)", fontSize: "0.9rem", lineHeight: 1.6 }}>The team, the proof, the method, the approval gate, the partners and the demand, ending on the honest challenges.</p>
                  </div>
                </Reveal>
              </div>
              <Reveal delay={120}>
                <p className="mt-8 rounded-2xl p-6 text-base leading-relaxed" style={{ border: "1px solid var(--v2-line)", color: "#E7E7EE", maxWidth: "62ch" }}>
                  This book is educational, not financial advice. That is exactly why it shows the downside as carefully as the upside.
                </p>
              </Reveal>
            </div>
          </div>
        </Section>

        <Divider />

        {/* ════ BEAT 15 · CLOSE — centered, brightest CTA ════ */}
        <section className="mx-auto w-full max-w-[1100px] px-6 md:px-10 py-28 md:py-40 text-center">
          <Statement align="center" max="14ch">
            Understand it for the price of a <span className="v2-gold">paperback.</span>
          </Statement>
          <Lead className="mx-auto mt-8 text-center" max="54ch">
            Digital Gold Boom is a one-time $37, the early-reader launch price, before it moves to its regular $97. It is the whole map of a six-thousand-year-old asset changing form, written by the person who ran a gold company at the center of it. You get the complete book, delivered digitally the moment you check out.
          </Lead>
          <Reveal as="p" delay={150} className="mx-auto mt-5 text-base leading-relaxed" style={{ color: "var(--v2-faint)", maxWidth: "56ch" }}>
            Take a full year with it. If it does not change the way you see gold and where this is heading, ask any time in the next twelve months and you get every cent back, and keep the book. The risk is entirely ours.
          </Reveal>
          <Reveal delay={180} className="mt-10 flex justify-center">
            <div className="w-full max-w-[420px]">
              <SalesCTA
                event="v3_final_buy"
                align="center"
                regular="97"
                fine="Secure checkout via LemonSqueezy. Educational content, not financial advice."
              />
            </div>
          </Reveal>
        </section>
      </main>
    </div>
  );
}
