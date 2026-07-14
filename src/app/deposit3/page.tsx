import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import DepositHero3 from "./DepositHero3";
import "../deposit/sutera.css";

/**
 * /deposit3 — identical to /deposit2 (the live 3D hero), on a fresh URL so a phone
 * that cached a broken bundle on /deposit2 loads clean. noindex — not for public.
 */

const disp = Space_Grotesk({
  variable: "--font-deposit-disp",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Digital Gold — Gold, Without the Mine (3D · v3)",
  description:
    "Verified, in-ground gold represented digitally — without digging it out. Educational — not financial advice.",
  robots: { index: false, follow: false },
};

export default function Deposit3Page() {
  return (
    <div className={disp.variable}>
      <DepositHero3 />
    </div>
  );
}
