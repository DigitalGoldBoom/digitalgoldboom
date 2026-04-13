export default function Insight() {
  return (
    <section className="relative py-14 md:py-[88px]">
      <div className="max-w-[860px] mx-auto px-6 md:px-12">
        <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-gold mb-6">THE REFRAME</p>
        <h2 className="text-tp font-extrabold tracking-[-0.03em] leading-[1.3]" style={{ fontSize: "clamp(2rem, 4.2vw, 3.25rem)" }}>
          Gold mining <span className="italic font-extrabold">already</span> runs on<br />
          <span className="text-gold">verification, not extraction.</span>
        </h2>
        <div className="mt-10 space-y-6 text-ts leading-[1.75] max-w-[62ch]" style={{ fontSize: "clamp(1rem, 1.3vw, 1.125rem)" }}>
          <p><span className="text-tp font-semibold">No billion-dollar gold investment happens without geological verification first.</span> Every major mine, every institutional portfolio, every deposit that ever made it into the system started with a geologist proving the gold exists.</p>
          <p>Verification is the backbone. Extraction is the part everyone <em className="text-tp not-italic font-semibold">assumed</em> was non-negotiable.</p>
          <p className="text-tp font-semibold border-l-2 border-gold pl-6">It isn&rsquo;t. Not anymore.</p>
        </div>
      </div>
    </section>
  );
}
