import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import DepositHero2 from "./DepositHero2";
import "../deposit/sutera.css";

/**
 * /deposit2 — same Sutéra-style hero as /deposit, but the centrepiece is the LIVE
 * 3D model (real geometry, reconstructed from the approved turntable, cleaned up
 * in-scene: AO + studio IBL + film tone-map, no emissive glow, reversed spin).
 * Comparison route against /deposit (which keeps the pre-rendered turntable video).
 * noindex — not for public.
 */

const disp = Space_Grotesk({
  variable: "--font-deposit-disp",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Digital Gold — Gold, Without the Mine (3D)",
  description:
    "Verified, in-ground gold represented digitally — without digging it out. Educational — not financial advice.",
  robots: { index: false, follow: false },
};

export default function Deposit2Page() {
  return (
    <div className={disp.variable}>
      <DepositHero2 />
    </div>
  );
}
