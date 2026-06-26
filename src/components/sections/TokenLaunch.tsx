import Image from "next/image";
import ShimmerDots from "@/components/ShimmerDots";
import NumberCounter from "@/components/NumberCounter";

/**
 * TokenLaunch — replica of the Framer "Result & Analytics" section (node HXHMrvwJK):
 * "You're Early!" token-launch info on the left, a 2×2 grid of animated stat cards
 * on the right, all on the gold Shimmer-Dot background. Figures are the canonical
 * pre-market reservation numbers (reserved, not raised).
 */

const GOLD = "rgb(255,187,0)";
const NUM = "#E5EBFF";
const LABEL = "rgb(167,173,190)";

function StatCard({
  children,
  label,
}: {
  children: React.ReactNode;
  label: string;
}) {
  return (
    <div
      className="flex flex-col justify-end rounded-2xl p-5 sm:p-6"
      style={{
        background: "rgba(0,3,25,0.5)",
        border: "1px solid rgba(255,255,255,0.06)",
        minHeight: 150,
      }}
    >
      <div style={{ width: 34, height: 2, background: GOLD, marginBottom: 16 }} />
      <div
        className="font-bold leading-none"
        style={{ color: NUM, fontSize: "clamp(2rem, 3vw, 2.8rem)" }}
      >
        {children}
      </div>
      <div className="mt-2 text-sm" style={{ color: LABEL }}>
        {label}
      </div>
    </div>
  );
}

export default function TokenLaunch() {
  return (
    <section className="relative overflow-hidden" style={{ background: "#00020F" }}>
      {/* Gold shimmer background */}
      <ShimmerDots opacity={0.8} />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 0%, rgba(255,179,0,0.10) 0%, transparent 60%)",
        }}
      />

      <div className="relative z-10 mx-auto grid w-[92%] max-w-[1320px] grid-cols-1 items-center gap-12 py-20 md:py-28 lg:grid-cols-[46%_1fr] lg:gap-16">
        {/* Left — copy */}
        <div>
          <div
            className="mb-5 inline-flex items-center gap-2 rounded-full px-3 py-2"
            style={{ background: "rgb(0,5,41)" }}
          >
            <Image
              src="/nav-framer/token-launch-mark.png"
              alt=""
              width={109}
              height={25}
              className="h-[18px] w-auto"
            />
            <span className="text-xs font-medium" style={{ color: "rgb(204,215,255)" }}>
              Token Launch
            </span>
          </div>

          <h2
            className="font-bold leading-[1.15]"
            style={{ fontSize: "clamp(1.9rem, 3.4vw, 2.6rem)", color: "#fff" }}
          >
            <span style={{ color: GOLD }}>You&rsquo;re Early!</span> The Official Digital Gold
            Mining Token launches July 8, 2026 on Kraken.
          </h2>

          <div
            className="mt-6 space-y-4 leading-relaxed"
            style={{ color: "rgb(196,200,212)", fontSize: "clamp(1rem, 1.2vw, 1.125rem)" }}
          >
            <p>
              The Pre-Market reservation program ran from early 2025 through February 2026,
              drawing over US$469M in token reservations from 17,466 investors across 162
              countries.
            </p>
            <p>
              Reservations closed 5.3&times; oversubscribed. The NatGold Token launches July 8,
              2026 on Kraken.
            </p>
          </div>
        </div>

        {/* Right — stat cards */}
        <div className="grid grid-cols-2 gap-4 sm:gap-5">
          <StatCard label="Pre-Token Reservations">
            <NumberCounter start={400} end={469} prefix="US$" suffix="M+" />
          </StatCard>
          <StatCard label="Global Investors">
            <NumberCounter start={16000} end={17466} suffix="+" />
          </StatCard>
          <StatCard label="Countries">
            <NumberCounter start={150} end={162} />
          </StatCard>
          <StatCard label="Launch Date">Jul 8, 2026</StatCard>
        </div>
      </div>
    </section>
  );
}
