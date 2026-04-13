export default function Solution() {
  return (
    <section className="relative py-14 md:py-[88px]">
      <div className="max-w-[860px] mx-auto px-6 md:px-12">
        <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-gold mb-6">THE SOLUTION</p>
        <h2 className="text-tp font-extrabold tracking-[-0.035em] leading-[1.3]" style={{ fontSize: "clamp(2rem, 4.4vw, 3.5rem)" }}>
          Blockchain finally matured<br />
          enough to <span className="text-gold">bypass extraction.</span>
        </h2>
        <div className="mt-10 space-y-6 text-ts leading-[1.75] max-w-[62ch]" style={{ fontSize: "clamp(1rem, 1.3vw, 1.125rem)" }}>
          <p>Take the geologically verified in-ground gold. Tokenize it on-chain. You&rsquo;ve eliminated every problem extraction creates — environmental, social, financial — while keeping the part that actually matters: the verified ownership of real gold.</p>
          <p className="text-tp font-semibold pt-4">That&rsquo;s digital gold mining.<br />
            <span className="text-gold">Gold that never needs to leave the ground to be owned — without the environmental and social cost extraction always charged.</span>
          </p>
        </div>
        <div className="mt-12 border border-border rounded-lg p-8 md:p-10 bg-[#0E0E14]">
          <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-gold mb-4">THE OFFICIAL DEFINITION</p>
          <p className="text-tp leading-[1.65]" style={{ fontSize: "clamp(1rem, 1.35vw, 1.15rem)" }}>
            Digital gold mining is a patent-pending process developed by <span className="text-gold font-semibold">NatGold Digital</span> that tokenizes in-ground verified gold deposits into an eco-friendly, gold-backed digital asset for the modern investor — without environmental destruction or social displacement.
          </p>
        </div>
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { n: "01", t: "Verify", b: "Independent geological proof of in-ground gold resources." },
            { n: "02", t: "Tokenize", b: "The verified ownership of gold becomes a digital asset on-chain." },
            { n: "03", t: "Trade", b: "Anyone, anywhere. 24/7. No extraction. No ESG cost." },
          ].map((s) => (
            <div key={s.n} className="border-t border-border pt-6">
              <span className="font-mono text-gold text-xs tracking-[0.1em]">{s.n}</span>
              <h3 className="mt-3 text-tp font-bold text-lg tracking-[-0.015em]">{s.t}</h3>
              <p className="mt-2 text-ts text-[0.9rem] leading-[1.6]">{s.b}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
