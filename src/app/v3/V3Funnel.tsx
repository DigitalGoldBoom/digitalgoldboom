"use client";

import Book3D from "@/components/Book3D";
import SalesField from "@/components/funnel/sales/SalesField";
import SalesCTA from "@/components/funnel/sales/SalesCTA";
import Reveal from "@/components/funnel/sales/Reveal";

/* /v3 — the LONG-FORM, VSL-derived sales page (15 beats). Copy from SALES-COPY-v3.md.
   STATUS: copy is DRAFT (not yet graded by dgb-copy-chief / fact-verified) — 7 open [VERIFY]
   flags + the Beat 12 reserved-demand block is compliance-sensitive. Page is noindex.
   Built on the v2 design system, elevated; reuses the /v1 funnel blocks. Pricing matched to
   the rest of the site: $37 early-reader, regular $97. */

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="v2-eyebrow mb-7">{children}</p>;
}
function Divider() {
  return (
    <div className="mx-auto max-w-[1320px] px-6 md:px-10">
      <div className="v2-divider" />
    </div>
  );
}
function H2({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <Reveal as="h2" className="v2-display" style={{ fontSize: "clamp(1.9rem, 4vw, 3.4rem)", maxWidth: "20ch", ...style }}>
      {children}
    </Reveal>
  );
}
function Body({ children }: { children: React.ReactNode }) {
  return (
    <Reveal as="p" delay={80} className="mt-7 text-lg leading-relaxed" style={{ color: "var(--v2-dim)", maxWidth: "60ch" }}>
      {children}
    </Reveal>
  );
}
function SubHead({ children }: { children: React.ReactNode }) {
  return (
    <Reveal as="h3" className="mt-12" style={{ fontSize: "clamp(1.3rem, 2.2vw, 1.75rem)", fontWeight: 400, color: "#F4F4F7", letterSpacing: "-0.01em" }}>
      {children}
    </Reveal>
  );
}
function Section({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <section className={`mx-auto w-full max-w-[1320px] px-6 md:px-10 py-24 md:py-32 ${className}`}>{children}</section>;
}

export default function V3Funnel() {
  return (
    <div className="v2 relative overflow-clip">
      <SalesField />

      <main className="relative z-10">
        {/* ── BEAT 1 · HOOK ───────────────────────────────────────── */}
        <section className="relative flex min-h-[100svh] items-center">
          <div className="mx-auto w-full max-w-[1320px] px-6 md:px-10 pt-32 pb-20 lg:pt-28">
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8">
              <div>
                <Reveal as="div"><Eyebrow>A shift in the gold industry</Eyebrow></Reveal>
                <Reveal as="h1" delay={60} className="v2-display" style={{ fontSize: "clamp(2.8rem, 7vw, 6rem)" }}>
                  It&rsquo;s not gold.
                  <br />
                  It&rsquo;s not <span className="v2-gold">bitcoin.</span>
                </Reveal>
                <Reveal as="p" delay={120} className="mt-8 max-w-[50ch] text-lg leading-relaxed" style={{ color: "var(--v2-dim)" }}>
                  Twenty-two trillion dollars of gold has already been found — drilled, mapped, signed off by independent experts, sitting in the ground right now. For six thousand years there was one way to reach it: dig it up. This book is about <span style={{ color: "#F4F4F7" }}>the other way.</span>
                </Reveal>
                <Reveal delay={180} className="mt-10">
                  <SalesCTA event="v3_hero_buy" regular="97" />
                </Reveal>
              </div>
              <div className="flex justify-center lg:justify-end">
                <Book3D />
              </div>
            </div>
          </div>
        </section>

        {/* ── BEAT 2 · AUTHORITY ──────────────────────────────────── */}
        <Section>
          <Eyebrow>Who is telling you this</Eyebrow>
          <H2 style={{ maxWidth: "22ch" }}>I walked away from a gold deal at a mercury pit. Then I went looking for a better way.</H2>
          <Body>
            In 2020, in the Chocó region of Colombia, Andrew Fletcher stood at the edge of a mining pit where workers — some of them teenagers — handled mercury with their bare hands, and walked away from the deal. He had spent his career finding gold: President of Great Eagle Gold, now NatBridge Resources, and the assessor of more than two hundred gold projects across multiple continents. The kind of mine that deal would have built is the kind being shut down by protests around the world. This book is written from inside that industry, by someone who watched the old way of producing gold start to break.
          </Body>
        </Section>

        <Divider />

        {/* ── BEAT 3 · THE BIND ───────────────────────────────────── */}
        <Section>
          <Eyebrow>Why gold, and why now</Eyebrow>
          <H2 style={{ maxWidth: "18ch" }}>Gold is the one money that is no one&rsquo;s promise to break.</H2>
          <Body>
            The dollar in your account is a promise from a government. A bond is a promise from a state. The cash in a bank is a promise from the bank. Gold is the one thing in that pile that is a promise from no one — it isn&rsquo;t at the edge of the financial system, it is the floor under it. In 2025, the world&rsquo;s central banks held more of their reserves in gold than in U.S. government debt, for the first time since 1996. The most cautious money on earth is moving back toward gold.
          </Body>
          <SubHead>Here is the bind the whole book breaks open.</SubHead>
          <Body>
            The capital that wants gold most — the trillions that now screen every asset for the damage it does — cannot hold it. New gold means a new mine: forest cleared, rock blasted, a river downstream paying the price. The asset that capital wants is shut out by the one thing standing between them: how it is produced.
          </Body>
          <Reveal delay={120}>
            <p className="mt-8 font-mono text-xs" style={{ color: "var(--v2-faint)", letterSpacing: "0.02em" }}>
              Central-bank reserve share, 2025; gold figures as of February 26, 2026, gold at $5,194/oz.
            </p>
          </Reveal>
        </Section>

        {/* ── BEAT 4 · THE VILLAIN ────────────────────────────────── */}
        <Section>
          <Eyebrow>The problem</Eyebrow>
          <H2 style={{ maxWidth: "20ch" }}>The only way we have ever made new gold is breaking down.</H2>
          <Body>
            Not slowly, and not for one reason. Six forces are closing on every new mine at once, each feeding the next — what Fletcher calls the Extraction S.P.I.R.A.L. The rich, easy ore is gone: in 1950 a tonne of rock held about twelve grams of gold; today it holds barely more than one, an eighty-nine percent collapse. Recovering a single ounce now moves roughly one hundred and twenty-four tonnes of rock. More rock means more damage — and everyone has a camera. A drone video of a poisoned river reaches millions before the company has a response. That turns into protest, and protest into politics: the path from a discovery to a producing mine, once a few years, now averages twenty-nine years in the United States.
          </Body>
          <Reveal delay={120}>
            <blockquote
              className="mt-10 rounded-[22px] p-7 md:p-8"
              style={{ border: "1px solid var(--v2-line)", borderLeft: "2px solid var(--v2-gold)", color: "#F4F4F7", maxWidth: "60ch" }}
            >
              <p style={{ fontSize: "clamp(1.15rem, 2vw, 1.5rem)", fontWeight: 300, lineHeight: 1.4 }}>
                In Panama, a ten-billion-dollar copper-gold mine — already built, already producing — was shut down by the public in <span className="v2-gold">thirty-nine days.</span>
              </p>
            </blockquote>
          </Reveal>
          <Body>
            A record gold price does not loosen this. It tightens it — it just pays miners to chase the worst ore left. The harder extraction gets, the louder one question becomes: does gold even need to be dug up to be worth anything?
          </Body>
        </Section>

        <Divider />

        {/* ── BEAT 5 · THE KEY (centerpiece) ──────────────────────── */}
        <Section>
          <Eyebrow>The reframe</Eyebrow>
          <H2 style={{ fontSize: "clamp(2.1rem, 4.5vw, 3.75rem)", maxWidth: "18ch" }}>
            Gold&rsquo;s value was never in the digging. It is in <span className="v2-gold">the proof.</span>
          </H2>
          <Body>
            Copper, lithium, and iron get used up — their value is the using. Gold is different: almost none of the gold ever mined was consumed building anything. Ninety-three percent of it just sits there, held as wealth. Gold is not a commodity. It is money — and money does not have to be consumed to be worth something. It only has to be proven real, stored, and moved.
          </Body>

          <SubHead>The industry already bets billions on the proof.</SubHead>
          <Body>
            Before any company builds a mine, independent geologists drill the ground and verify the gold is there, to a standard so strict the person who signs it is personally liable if they lie. That standard exists because in 1997 a company called Bre-X faked a gold discovery and wiped out billions before anyone checked; the industry rebuilt itself around verification so it could not happen again. And here is what verification unlocks: in 2025, Barrick — one of the largest miners on earth — paid one billion dollars in cash for half of a single deposit in Alaska, roughly thirty-nine million ounces, with not one ounce out of the ground. The market already pays real money, in the billions, for gold that has only been proven to exist. The value becomes bankable at verification — not at extraction.
          </Body>
          <Reveal delay={120}>
            <figure className="v2-tile mt-8 m-0 p-7" style={{ borderTop: "1px solid var(--v2-gold)", maxWidth: "60ch" }}>
              <div className="flex flex-wrap items-baseline gap-x-5 gap-y-1">
                <span className="font-mono v2-gold" style={{ fontSize: "2.2rem", lineHeight: 1, fontVariantNumeric: "tabular-nums" }}>$1B</span>
                <span className="font-mono" style={{ fontSize: "1.4rem", color: "#F4F4F7" }}>~39M oz</span>
              </div>
              <figcaption className="mt-3" style={{ color: "var(--v2-dim)", fontSize: "0.95rem", lineHeight: 1.6 }}>
                Barrick paid $1 billion in cash for half of the Donlin deposit in Alaska — roughly 39 million ounces of verified gold — with nothing out of the ground (2025). Value becomes bankable at verification, not extraction.
              </figcaption>
            </figure>
          </Reveal>

          <SubHead>So what is extraction? The delivery method.</SubHead>
          <Body>
            Think of Blockbuster. They thought they were in the business of stores. They were in the business of getting you a movie — the store was only the delivery method, and when a better one arrived the stores were worthless. The gold industry made the same mistake: it confused the mine with the gold. The mine was only ever the delivery method — and it costs about $1,676 an ounce, more than twenty-three years, and a scarred watershed to run.
          </Body>

          <SubHead>The new delivery system already works on gold.</SubHead>
          <Body>
            Two products, PAX Gold and Tether Gold, already put gold on the blockchain and let anyone hold and move it in seconds — about six billion dollars trades that way today. That proves the market for digital gold is real. But they only tokenize the bar: gold already mined, refined, and vaulted. Move that same step one stage earlier — to the gold still in the ground, at the moment of verification — and verification becomes the moment of monetization. No mine. No permits. No twenty-three years. No cyanide, no tailings, no poisoned river, nothing for anyone to fight over. The damage was never the gold&rsquo;s. It was the extraction&rsquo;s.
          </Body>
        </Section>

        <Divider />

        {/* ── BEAT 6 · INSTITUTIONAL RAILS ────────────────────────── */}
        <Section>
          <Eyebrow>This is not science fiction</Eyebrow>
          <H2 style={{ maxWidth: "22ch" }}>The most cautious money in finance is rebuilding the system on these rails.</H2>
          <Body>
            In 2017, the head of BlackRock — the largest money manager on earth, around fourteen trillion dollars — said Bitcoin mostly proved how much demand there was for money laundering. He was the establishment&rsquo;s loudest skeptic. In January 2026, the same man stood on the main stage at Davos and said he wants regulators to approve putting stocks and bonds on the blockchain — not a coin, the real things. His own firm already runs a fund doing it, holding nearly two and a half billion dollars. JPMorgan has processed more than a trillion and a half dollars across these rails. HSBC&rsquo;s tokenized gold has traded over a billion. Siemens issued a three-hundred-million-dollar bond that settled in minutes instead of days. When the most cautious money goes from &ldquo;this is for criminals&rdquo; to &ldquo;put everything on it&rdquo; in a few years, that is the financial system being rebuilt — and the same rails work for gold that is still in the ground.
          </Body>
          <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
            {[
              { v: "$1.5T+", l: "Processed by JPMorgan on these rails" },
              { v: "$2.4B", l: "BlackRock's own tokenized fund" },
              { v: "$1B+", l: "HSBC tokenized gold traded" },
              { v: "€300M", l: "Siemens bond, settled in minutes" },
            ].map((s, i) => (
              <Reveal key={s.l} delay={i * 60}>
                <div className="v2-tile h-full p-6">
                  <div className="font-mono v2-gold" style={{ fontSize: "1.6rem", lineHeight: 1, fontVariantNumeric: "tabular-nums" }}>{s.v}</div>
                  <div className="mt-2 text-sm" style={{ color: "var(--v2-faint)" }}>{s.l}</div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={80}>
            <p className="mt-6 text-sm" style={{ color: "var(--v2-faint)", maxWidth: "60ch" }}>
              These institutions are tokenizing bonds, stocks and property — they do not endorse digital gold mining. The gold step is the author&rsquo;s case; the rails are the same.
            </p>
          </Reveal>
        </Section>

        {/* ── BEAT 7 · SCORECARD ──────────────────────────────────── */}
        <Section>
          <Eyebrow>Better, not just different</Eyebrow>
          <H2 style={{ maxWidth: "18ch" }}>Put both ways side by side, on the same deposit.</H2>
          <Body>
            Same gold, same price, and measure. The old way: more than twenty-three years and roughly three hundred million dollars to permit, build, and dig before a single ounce sells — and more than forty percent of verified deposits never make it through at all. The new way: verify the gold is there, and stop — months instead of decades, for a fraction of the cost.
          </Body>
          <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2">
            <Reveal>
              <div className="v2-tile h-full p-8">
                <div className="v2-num mb-5">THE OLD WAY · EXTRACTION</div>
                <ul className="space-y-3" style={{ color: "var(--v2-dim)" }}>
                  <li>23+ years to permit, build and dig</li>
                  <li>~$300M before a single ounce sells</li>
                  <li>40%+ of verified deposits never make it through</li>
                  <li>124 tonnes of rock moved per ounce</li>
                  <li>21,000 litres of water · 9 kg of cyanide per ounce</li>
                </ul>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <div className="rounded-[22px] h-full p-8" style={{ border: "1px solid rgba(232,178,58,0.45)", background: "rgba(232,178,58,0.05)" }}>
                <div className="v2-num v2-gold mb-5" style={{ color: "var(--v2-gold)" }}>THE NEW WAY · VERIFICATION</div>
                <ul className="space-y-3" style={{ color: "#E7E7EE" }}>
                  <li>Months instead of decades</li>
                  <li>A fraction of the cost</li>
                  <li>Verify the gold is there, and stop</li>
                  <li>No mine, no permits, no extraction</li>
                  <li className="v2-gold">Waste rock, water and cyanide: none. Not less — none.</li>
                </ul>
              </div>
            </Reveal>
          </div>
          <Reveal delay={120}>
            <p className="mt-8 text-base leading-relaxed" style={{ color: "var(--v2-dim)", maxWidth: "60ch" }}>
              To pull one ounce out of the ground, the old way moves about one hundred and twenty-four tonnes of rock and consumes twenty-one thousand litres of water and nine kilograms of cyanide. Across a single deposit, that is waste rock enough to build more than eight Great Pyramids. The new way produces none of it. Not less. None.
            </p>
          </Reveal>
        </Section>

        <Divider />

        {/* ── BEAT 8 · WHY NOTHING FIGHTS IT ──────────────────────── */}
        <Section>
          <Eyebrow>Why this is different</Eyebrow>
          <H2 style={{ maxWidth: "18ch" }}>Leave the gold in the ground, and the fight ends.</H2>
          <Body>
            Gold mining is one of the most combative industries on earth — every new mine pits the company against the community, the jobs against the river. Someone always loses, so someone always fights back, and that fight is what kills mines: it shut down a ten-billion-dollar mine in thirty-nine days. Leave the gold where it is and the source of the fight is gone.
          </Body>
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { t: "The miner", b: "Monetizes a verified asset without the cost or risk of digging." },
              { t: "The government", b: "Collects a royalty with no ruin to clean up after." },
              { t: "The community", b: "Keeps its water and still earns from the gold beneath it." },
              { t: "The land", b: "Stays whole. No one has to lose for gold to be worth what it is." },
            ].map((c, i) => (
              <Reveal key={c.t} delay={i * 60}>
                <div className="v2-tile h-full p-6">
                  <h3 className="v2-gold" style={{ fontSize: "1.05rem", fontWeight: 500, marginBottom: 8 }}>{c.t}</h3>
                  <p style={{ color: "var(--v2-dim)", fontSize: "0.9rem", lineHeight: 1.6 }}>{c.b}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Section>

        {/* ── BEAT 9 · ALREADY HAPPENING ──────────────────────────── */}
        <Section>
          <Eyebrow>Not a someday idea</Eyebrow>
          <H2 style={{ maxWidth: "20ch" }}>Remove the friction, and capital that was stuck moves.</H2>
          <Body>
            When investors could finally buy gold like a stock, through an ETF in 2004, a billion dollars flowed in within three trading days — not because demand was created, but because demand locked behind friction was released. That category holds about seven hundred billion dollars today. Digital gold mining removes the largest remaining piece of friction: the mine itself. And the deposits are real and named. Two of the first — the Cahuilla and Friday gold projects — are documented in the book: real properties with decades of drilling behind them, sitting in the qualification pipeline. None of it is minted; it is in the pipeline, not through it.
          </Body>
        </Section>

        {/* ── BEAT 10 · THE GENERATION ────────────────────────────── */}
        <Section>
          <Eyebrow>Who carries it</Eyebrow>
          <H2 style={{ maxWidth: "22ch" }}>The generation most likely to own gold is the one that rejects how it is mined.</H2>
          <Body>
            The generation most likely to own gold today is not the boomers who built the gold market — it is their grandchildren. Among investors, Millennials own gold at three times the rate of boomers, and they are the most environmentally engaged investors ever measured. For years that was a contradiction they carried in silence: they needed what gold does, but they could not defend how it is made, so they held it quietly. Digital gold mining ends that contradiction — gold with nothing to apologize for. And the money is moving with them: a hundred and twenty-four trillion dollars, the largest handover of wealth in history, passes from the boomers to their children and grandchildren over the next two decades, carrying their values in with it.
          </Body>
        </Section>

        <Divider />

        {/* ── BEAT 11 · NORMALCY BIAS ─────────────────────────────── */}
        <Section>
          <Eyebrow>Why almost no one is talking about it</Eyebrow>
          <H2 style={{ maxWidth: "22ch" }}>The name that describes it is the reason people dismiss it.</H2>
          <Body>
            If this is real, why isn&rsquo;t everyone already on to it? Two words: digital gold. They sound like hype — like the last thing somebody tried to sell you — so the brain files the idea with every coin and scam that came before and moves on. And for six thousand years, getting gold meant digging it up; that is so old it feels like a law of nature rather than a habit that can change. Blockbuster laughed Netflix out of the room in 2000 after turning down the chance to buy it for fifty million dollars, and was bankrupt within a decade. Every shift like this has the person who saw it early and the person who spent years afterward explaining why he didn&rsquo;t.
          </Body>
        </Section>

        {/* ── BEAT 12 · DEMAND ON THE RECORD (compliance-sensitive) ── */}
        <Section>
          <Eyebrow>The demand is on the record</Eyebrow>
          <H2 style={{ maxWidth: "22ch" }}>Before anyone could buy a single token, 162 countries reserved their interest.</H2>
          <Body>
            Before the product was public, people in one hundred and sixty-two countries — about eighty-four percent of the nations on earth — reserved four hundred and sixty-nine million dollars of expressed interest. Be precise about that word: not a dollar of it was paid. It was reserved — registered, on the record — by more than seventeen thousand people, seventeen thousand four hundred and sixty-six of them, before the doors opened. It is one of the clearest demand signals the book documents, and the book lays out exactly what it does and does not mean.
          </Body>
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {[
              { v: "162", l: "Countries — about 84% of nations on earth" },
              { v: "US$469M", l: "Of expressed interest, reserved" },
              { v: "17,466", l: "People, on the record, before the doors opened" },
            ].map((s, i) => (
              <Reveal key={s.l} delay={i * 60}>
                <div className="v2-tile h-full p-6">
                  <div className="font-mono v2-gold" style={{ fontSize: "1.9rem", lineHeight: 1, fontVariantNumeric: "tabular-nums" }}>{s.v}</div>
                  <div className="mt-2 text-sm" style={{ color: "var(--v2-faint)" }}>{s.l}</div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={80}>
            <p className="mt-6 font-mono text-xs" style={{ color: "var(--v2-faint)", letterSpacing: "0.02em", maxWidth: "60ch" }}>
              Reserved means registered interest — not a dollar paid, raised, or invested. Reported as a fact the book examines, not an invitation to buy.
            </p>
          </Reveal>
        </Section>

        {/* ── BEAT 13 · CARRYING COST ─────────────────────────────── */}
        <Section>
          <Eyebrow>What even gold owners miss</Eyebrow>
          <H2 style={{ maxWidth: "20ch" }}>Holding gold the old way quietly costs you, every year.</H2>
          <Body>
            Holding physical gold or a gold fund is not free. Put a hundred thousand dollars into a typical gold ETF and the annual fees drain roughly seven and a half thousand dollars of it over twenty years — money you never see leave, paid just to hold the metal in a vault. Because digital gold mining leaves the gold in the ground, there is nothing to store, insure, or guard — and that annual carrying cost falls away. The book walks through the full twenty-year comparison.
          </Body>
        </Section>

        <Divider />

        {/* ── BEAT 14 · WHAT THE BOOK IS ──────────────────────────── */}
        <Section>
          <Eyebrow>What is inside</Eyebrow>
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <div className="order-2 flex justify-center lg:order-1"><Book3D /></div>
            <div className="order-1 lg:order-2">
              <H2 style={{ maxWidth: "20ch" }}>The complete case — and the honest case against it — in one place.</H2>
              <Body>
                Digital Gold Boom is the full map of everything above, and far more: how a verified deposit becomes something you can own without a shovel ever touching it; the team behind it, including a former chief of staff of the U.S. Securities and Exchange Commission and the former chief innovation officer of Barrick; the ten patent-pending applications now under examination at the U.S. patent office; and a full chapter of honest risks — what could go wrong, and the one question the author marks as still open — laid out in plain view, because a case you can trust is one that shows you its own weak points.
              </Body>
              <Reveal delay={120}>
                <p className="mt-7 text-base leading-relaxed" style={{ color: "var(--v2-dim)", maxWidth: "58ch" }}>
                  <span style={{ color: "#F4F4F7" }}>Two sections, seventeen chapters.</span> Section 1 builds the case that gold&rsquo;s value no longer needs a mine. Section 2 opens the machine that does it — the team, the verification, the gate, the pricing, the partners, the demand — and ends on the honest challenges.
                </p>
              </Reveal>
              <Reveal delay={160}>
                <p className="mt-7 rounded-2xl p-6 text-base leading-relaxed" style={{ border: "1px solid var(--v2-line)", color: "#E7E7EE", maxWidth: "60ch" }}>
                  Andrew Fletcher holds a stake in the model he describes, and says so plainly throughout. This book is educational — not financial advice. That is exactly why it shows the downside as carefully as the upside.
                </p>
              </Reveal>
            </div>
          </div>
        </Section>

        <Divider />

        {/* ── BEAT 15 · CLOSE ─────────────────────────────────────── */}
        <section className="mx-auto w-full max-w-[1100px] px-6 md:px-10 py-28 md:py-36 text-center">
          <Reveal><Eyebrow>Read it for yourself</Eyebrow></Reveal>
          <Reveal as="h2" delay={60} className="v2-display mx-auto" style={{ fontSize: "clamp(2.4rem, 6vw, 5rem)", maxWidth: "16ch" }}>
            Understand it for the price of a <span className="v2-gold">paperback.</span>
          </Reveal>
          <Reveal as="p" delay={120} className="mx-auto mt-7 text-lg leading-relaxed" style={{ color: "var(--v2-dim)", maxWidth: "54ch" }}>
            Digital Gold Boom is a one-time $37 — the early-reader launch price, before it moves to its regular $97 — the whole map of a six-thousand-year-old asset changing form, written by the person who ran a gold company at the center of it. You get the complete book, delivered digitally the moment you check out.
          </Reveal>
          <Reveal as="p" delay={150} className="mx-auto mt-5 text-base leading-relaxed" style={{ color: "var(--v2-faint)", maxWidth: "56ch" }}>
            Take a full year with it. Read every page, twice if you like. If it does not change the way you see gold and where this is heading, ask any time in the next twelve months and you get every cent back — and keep the book. The risk is entirely ours.
          </Reveal>
          <Reveal delay={180} className="mt-10 flex justify-center">
            <div className="w-full max-w-[420px]">
              <SalesCTA
                event="v3_final_buy"
                align="center"
                regular="97"
                fine="Secure checkout via LemonSqueezy. Educational content — not financial advice. The author holds a stake in the model described."
              />
            </div>
          </Reveal>
        </section>
      </main>
    </div>
  );
}
