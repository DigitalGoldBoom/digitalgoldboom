import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import DepositHero from "./DepositHero";
import "./sutera.css";

/**
 * /deposit — the Sutéra-style technical hero for digital gold mining.
 * Rotating 3D deposit centrepiece + instrument overlay. No nav/footer/external
 * link (chrome is suppressed in the layout). noindex until copy is verified.
 */

const disp = Space_Grotesk({
  variable: "--font-deposit-disp",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Digital Gold — Gold, Without the Mine",
  description:
    "Verified, in-ground gold represented digitally — without digging it out. Educational — not financial advice.",
  robots: { index: false, follow: false },
};

export default function DepositPage() {
  return (
    <div className={disp.variable}>
      <DepositHero />
    </div>
  );
}
