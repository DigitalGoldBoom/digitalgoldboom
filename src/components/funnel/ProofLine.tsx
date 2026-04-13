const STATS = [
  { v: "$469M", l: "RESERVED", c: "Pre-market token reservations before a single public listing." },
  { v: "17,466", l: "INVESTORS", c: "Real people who put real capital behind the model." },
  { v: "162", l: "COUNTRIES", c: "Global reach without a single paid advertisement." },
  { v: "10", l: "PATENTS", c: "Patents pending on the origination process itself." },
  { v: "7yr", l: "BUILT", c: "Seven years spent building the system before going public." },
];

export default function ProofLine() {
  return (
    <section className="relative py-14 md:py-[88px]">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-gold mb-5 text-center">PRE-MARKET TOKEN RESERVATIONS &amp; MILESTONES</p>
        <h2 className="text-tp font-extrabold tracking-[-0.025em] leading-[1.15] text-center max-w-[30ch] mx-auto" style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)" }}>
          The numbers behind a category<br />
          that hasn&rsquo;t gone public yet.
        </h2>
        <div className="mt-16 grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-0 md:divide-x divide-border border-t border-b border-border py-10 md:py-12">
          {STATS.map((s) => (
            <div key={s.l} className="flex flex-col justify-between gap-4 px-4 md:px-6">
              <div>
                <div className="font-mono text-gold tabular-nums leading-none whitespace-nowrap" style={{ fontSize: "clamp(1.9rem, 3.8vw, 3.2rem)", fontWeight: 600, letterSpacing: "-0.02em" }}>{s.v}</div>
                <div className="mt-3 text-tt" style={{ fontSize: "10px", letterSpacing: "0.18em", fontWeight: 600 }}>{s.l}</div>
              </div>
              <p className="text-ts leading-[1.55] text-[0.8rem]">{s.c}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
