import Image from "next/image";
import Link from "next/link";
import Book3D from "@/components/Book3D";
import PsWaitlistForm from "./_components/PsWaitlistForm";
import PsRotatingCube from "./_components/PsRotatingCube";

const CDN = "https://framerusercontent.com/images";
const img = (id: string) => `${CDN}/${id}.png`;

const TICKER = [
  "Gold's Digital Evolution",
  "Eco-Friendly Gold Asset Class",
  "Non-Dilutive Investment",
  "Real World Asset (RWA) Tokenization",
  "Geologically Verified Gold Deposits",
  "Modernizing Gold",
  "The Digital Gold Boom",
];

const DGB_SQUARES = [
  "3rHk1mHhqMNgP6lIzqxtMXNIfI",
  "SIO3Vm8Mrg8BGvj66Le8b9dpMhI",
  "eJQMgjmZnbvOG1D9uX8M4E81h2s",
  "ipz8IN97Lh71ZewaRZ5KfjOa9MI",
  "VNFzaWfCZRKGzAAu5LsZJmQ58kc",
];

const PILLARS = [
  {
    n: "01",
    title: "We Educate.",
    body: "Making digital gold mining simple to understand. We help the world see gold's future clearly.",
  },
  {
    n: "02",
    title: "We Influence.",
    body: "Creating media and technology that advance the Digital Gold Boom. Turning ideas into influence and opportunity.",
  },
  {
    n: "03",
    title: "We Invest.",
    body: "Backing projects that power the NatGold ecosystem. Focused on innovation, integrity, and long-term value.",
  },
  {
    n: "04",
    title: "We Connect.",
    body: "Linking investors, partners, and pioneers. Accelerating the movement toward a digital gold economy.",
  },
];

// Demo projects (the Framer template's filler — scaled to 3, swap for real work later).
const PROJECTS = [
  { img: "HONJjNCuNpLmuGeDy0Y6nmLB6Do", slug: "huggl-1-0-website-made-in-framer", title: "Huggl" },
  { img: "D7k8E4WZWYXu0iQi9n5ZXhXgqg", slug: "charmant-website-made-in-framer", title: "Charmant" },
  { img: "yCY5SlXVESWmcgUnZDmmMhybc", slug: "predict-website-made-in-framer", title: "Predict" },
];

export default function PixelShovelHome() {
  return (
    <>
      {/* ——— Top ticker (feature phrases · green ✚ separators) ——— */}
      <div className="overflow-hidden pt-28">
        <div className="ps-marquee">
          {[...TICKER, ...TICKER].map((t, i) => (
            <span key={i} className="flex items-center">
              <span className="px-7 text-sm font-medium text-[var(--ps-text-2)]">{t}</span>
              <span className="text-[var(--ps-accent)]">✚</span>
            </span>
          ))}
        </div>
      </div>

      {/* ——— Hero — centred wordmark, sub-row, rotating green-bordered cube ——— */}
      <section
        className="relative flex min-h-[88vh] flex-col items-center justify-center overflow-hidden px-5"
        style={{ background: "var(--ps-bg)" }}
      >
        <div className="ps-wrap flex w-full flex-col items-center gap-8 py-10">
          {/* Wordmark */}
          <Image
            src={img("nzBDrjjIcc9jVr8kaHG51L3wTGc")}
            alt="PixelShovel"
            width={900}
            height={150}
            priority
            className="ps-reveal h-auto w-full max-w-[1100px]"
          />

          {/* Sub-row: left tagline · right kicker */}
          <div className="flex w-full max-w-[1160px] flex-col items-start justify-between gap-4 sm:flex-row">
            <p className="max-w-[28ch] text-[18px] leading-[1.4] text-white">
              <span className="font-semibold">Pixel</span>
              <span className="font-extralight">
                Shovel educates, invests and connects in the future of digital gold mining.
              </span>
            </p>
            <h3 className="max-w-[18ch] text-[clamp(1.1rem,1.4vw,1.25rem)] font-extralight leading-[1.2] tracking-[-0.02em] text-[var(--ps-text-3)] sm:text-right">
              GOLD&rsquo;S NEXT CHAPTER HAS BEGUN.
            </h3>
          </div>

          {/* Rotating cube */}
          <div className="mt-6 flex justify-center">
            <PsRotatingCube />
          </div>
        </div>
      </section>

      {/* ——— Everything you know is wrong + the book + waitlist ——— */}
      <section id="dgb" className="ps-section" style={{ background: "var(--ps-bg-soft)" }}>
        <div className="ps-wrap grid grid-cols-1 items-center gap-14 lg:grid-cols-2">
          <div className="flex flex-col items-start gap-6">
            <p className="ps-eyebrow">Digital Gold Boom</p>
            <h2 className="text-[clamp(2rem,4.5vw,3.6rem)]">
              Everything You Think You Know About Gold is Wrong
            </h2>
            <p className="max-w-[48ch] text-lg text-[var(--ps-text-2)]">
              Tokenization just started the biggest gold rush in history.
            </p>
            {/* Join the Waitlist (node-exact: green dot · Inter Display 34px · grey-blue) */}
            <div className="flex items-center gap-2 pt-2">
              <span
                className="inline-block h-[18px] w-[18px] rounded-full"
                style={{ background: "rgb(13,222,51)" }}
                aria-hidden
              />
              <span
                className="text-[clamp(1.4rem,2.4vw,2.125rem)] font-medium leading-[1.2]"
                style={{
                  color: "rgb(167,173,190)",
                  fontFamily: "var(--font-ps-inter), sans-serif",
                }}
              >
                Join the Waitlist and Get it FREE
              </span>
            </div>
            <PsWaitlistForm source="ps-home-dgb" />
          </div>

          <div className="flex justify-center">
            <Book3D />
          </div>
        </div>
      </section>

      {/* ——— Four pillars ——— */}
      <section id="about" className="ps-section">
        <div className="ps-wrap">
          <div className="mb-12 flex items-end justify-between gap-6">
            <h2 className="text-[clamp(1.8rem,4vw,3.2rem)]">Digital Gold Mining</h2>
            <p className="hidden max-w-[34ch] text-[var(--ps-text-2)] md:block">
              Four ways PixelShovel moves the digital gold economy forward.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-px overflow-hidden rounded-[var(--ps-r-card)] border sm:grid-cols-2"
            style={{ borderColor: "var(--ps-line)", background: "var(--ps-line)" }}
          >
            {PILLARS.map((p) => (
              <div
                key={p.n}
                className="flex flex-col gap-4 p-8 md:p-10"
                style={{ background: "var(--ps-bg)" }}
              >
                <span className="font-[var(--font-ps-manrope)] text-sm text-[var(--ps-accent-2)]">
                  {p.n}
                </span>
                <h3 className="text-2xl md:text-3xl">{p.title}</h3>
                <p className="max-w-[42ch] text-[var(--ps-text-2)]">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ——— DGB image marquee ——— */}
      <section className="overflow-hidden py-6" style={{ background: "var(--ps-bg-soft)" }}>
        <div className="ps-marquee ps-marquee--slow gap-5">
          {[...DGB_SQUARES, ...DGB_SQUARES].map((id, i) => (
            <div
              key={i}
              className="relative aspect-square w-[clamp(180px,22vw,300px)] shrink-0 overflow-hidden rounded-[var(--ps-r-card)] border"
              style={{ borderColor: "var(--ps-line)" }}
            >
              <Image src={img(id)} alt="" fill sizes="300px" className="object-cover" />
            </div>
          ))}
        </div>
      </section>

      {/* ——— Projects (3) ——— */}
      <section className="ps-section">
        <div className="ps-wrap">
          <div className="mb-12 flex items-end justify-between gap-6">
            <h2 className="text-[clamp(1.8rem,4vw,3.2rem)]">Recent Work</h2>
            <Link href="/ps/projects" className="ps-ghost">
              View all
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {PROJECTS.map((p) => (
              <Link
                key={p.slug}
                href={`/ps/projects/${p.slug}`}
                className="group flex flex-col gap-4"
              >
                <div
                  className="relative aspect-[4/5] overflow-hidden rounded-[var(--ps-r-card)] border"
                  style={{ borderColor: "var(--ps-line)" }}
                >
                  <Image
                    src={img(p.img)}
                    alt={p.title}
                    fill
                    sizes="(max-width:768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <span className="text-lg font-medium">{p.title}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
