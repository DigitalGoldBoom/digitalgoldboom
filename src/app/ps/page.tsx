import Image from "next/image";
import Link from "next/link";
import Book3D from "@/components/Book3D";
import PsWaitlistForm from "./_components/PsWaitlistForm";
import PsRotatingCube from "./_components/PsRotatingCube";
import PsAboutScroll from "./_components/PsAboutScroll";
import { PS_WORDMARK } from "./_components/psAssets";

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
        className="relative z-10 flex min-h-[88vh] flex-col items-center justify-center px-5"
        style={{ background: "var(--ps-bg)" }}
      >
        <div className="ps-wrap flex w-full flex-col items-center gap-8 py-10">
          {/* Wordmark */}
          <Image
            src={PS_WORDMARK}
            alt="PixelShovel"
            width={1200}
            height={200}
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

      {/* ——— About: pinned 3D scroll card sequence (DIGITAL GOLD MINING) ——— */}
      <PsAboutScroll />

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

    </>
  );
}
