import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Rethink_Sans, Inter, Manrope } from "next/font/google";
import PsNav from "./_components/PsNav";
import PsFooter from "./_components/PsFooter";
import PsRevealInit from "./_components/PsRevealInit";
import "./ps.css";

// PixelShovel brand fonts — Rethink Sans (headings), Inter (body), Manrope (accents).
const rethink = Rethink_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-ps-rethink",
  display: "swap",
});
const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-ps-inter",
  display: "swap",
});
const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-ps-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  title: "PixelShovel — Digital Gold's Next Chapter Has Begun",
  description:
    "PixelShovel educates, invests and connects in the future of digital gold mining. An AI-first launch house turning attention into monetized projects.",
  openGraph: {
    title: "PixelShovel — Digital Gold's Next Chapter Has Begun",
    description:
      "PixelShovel educates, invests and connects in the future of digital gold mining.",
    type: "website",
    url: "https://pixelshovel.com",
  },
};

export default function PixelShovelLayout({ children }: { children: ReactNode }) {
  return (
    <div className={`ps ${rethink.variable} ${inter.variable} ${manrope.variable}`}>
      <PsRevealInit />
      <PsNav />
      <main>{children}</main>
      <PsFooter />
    </div>
  );
}
