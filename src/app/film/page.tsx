import type { Metadata } from "next";
import { Rethink_Sans, Inter } from "next/font/google";
import CineFilm from "./_cine/CineFilm";
import "./cine.css";

/**
 * /film — the cinematic 3D-scroll page: six Seedance clips scrubbed as canvas
 * frame sequences, nine beats, one product — the book at $37 via LemonSqueezy.
 * The hero of the story is THE NEW INDUSTRY; the NatGold Token ("NATG") is
 * named, never sold. No nav, no footer, no external link — the only way out
 * is the buy button.
 *
 * noindex until the author clears it for launch (same rule as /s).
 */

const rethink = Rethink_Sans({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Digital Gold Boom — the film",
  description:
    "Every asset is going digital. Gold is being changed at its root. Scroll the story of the new industry — then read the whole case in the book. Educational — not financial advice.",
  robots: { index: false, follow: false },
};

export default function FilmPage() {
  return (
    <div className={`${rethink.variable} ${inter.variable} cine-root`}>
      <CineFilm />
    </div>
  );
}
