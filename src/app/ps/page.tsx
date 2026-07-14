import Image from "next/image";
import Link from "next/link";
import Book3D from "@/components/Book3D";
import PsWaitlistForm from "./_components/PsWaitlistForm";
import PsRotatingCube from "./_components/PsRotatingCube";
import PsAboutScroll from "./_components/PsAboutScroll";
import { PS_WORDMARK } from "./_components/psAssets";

const TICKER = [
  "Gold's Digital Evolution",
  "Eco-Friendly Gold Asset Class",
  "Non-Dilutive Investment",
  "Real World Asset (RWA) Tokenization",
  "Geologically Verified Gold Deposits",
  "Modernizing Gold",
  "The Digital Gold Boom",
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
        className="relative z-10 flex min-h-[88svh] flex-col items-center justify-center px-5"
        style={{ background: "var(--ps-bg)" }}
      >
        <div className="ps-wrap flex w-full flex-col items-center gap-8 py-10">
          {/* Wordmark. NOT .ps-reveal: that class paints an element at opacity 0 and waits for JS
              to observe it into view. On the page's own LARGEST IMAGE that means the brand is
              invisible until hydration lands, and invisible for good if the observer misses it —
              which is the "logo disappeared until I refreshed" bug. Above the fold, nothing may
              depend on JavaScript to be seen. */}
          <Image
            src={PS_WORDMARK}
            alt="PixelShovel"
            width={1200}
            height={200}
            priority
            className="h-auto w-full max-w-[1100px]"
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

      {/* ——— Everything you know just changed + the book + free chapters ——— */}
      {/* scroll-mt: the nav is FIXED, so a hash jump lands the section's top edge underneath it.
          Without this the button "worked" and still looked broken — you arrived with the headline
          hidden behind the bar. */}
      <section
        id="dgb"
        className="ps-section scroll-mt-24"
        style={{ background: "var(--ps-bg-soft)" }}
      >
        {/* On a PHONE this reads: headline → the book → the offer → the form. The book lands the
            moment the claim is made, while the reader is still holding it, and the ask comes after
            they have seen the thing being offered. (It used to sit under the submit button: the
            product arriving after the price.) On DESKTOP nothing moves — the book holds the right
            column across both text rows, placed explicitly rather than by source order, which is
            why the phone can reorder freely without touching the desktop layout. */}
        <div className="ps-wrap flex flex-col gap-8 lg:grid lg:grid-cols-2 lg:items-center lg:gap-14">
          <div className="flex flex-col items-start gap-6 lg:col-start-1 lg:row-start-1">
            {/* The book's own title gold — the cover sets the title in a pale-to-amber gradient,
                so the eyebrow carries the same one rather than a flat swatch of it. */}
            <p
              className="ps-eyebrow"
              style={{
                background: "linear-gradient(180deg, #FBE08A 0%, #E9A23C 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
                width: "fit-content",
              }}
            >
              Digital Gold Boom
            </p>
            <h2 className="text-[clamp(2rem,4.5vw,3.6rem)]">
              Everything You Think You Know About Gold Just Changed Forever
            </h2>
          </div>

          <div className="flex justify-center lg:col-start-2 lg:row-start-1 lg:row-span-2">
            <Book3D />
          </div>

          <div className="flex flex-col items-start gap-6 lg:col-start-1 lg:row-start-2">
            <p className="max-w-[48ch] text-lg text-[var(--ps-text-2)]">
              Tokenization just started the biggest gold rush in history.
            </p>
            {/* Offer line (node-exact: green dot · Inter Display 34px · grey-blue) */}
            <div className="flex items-center gap-2">
              <span
                className="inline-block h-[11px] w-[11px] rounded-full"
                style={{ background: "rgb(13,222,51)" }}
                aria-hidden
              />
              <span
                className="text-[clamp(1.05rem,1.5vw,1.35rem)] font-medium leading-[1.2]"
                style={{
                  color: "rgb(167,173,190)",
                  fontFamily: "var(--font-ps-inter), sans-serif",
                }}
              >
                Read the First 5 Chapters FREE
              </span>
            </div>
            <PsWaitlistForm source="ps-home-dgb" />
          </div>
        </div>
      </section>

      {/* ——— About: pinned 3D scroll card sequence (DIGITAL GOLD MINING) ——— */}
      <PsAboutScroll />

    </>
  );
}
