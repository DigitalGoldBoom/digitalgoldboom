import type { ReactNode } from "react";
import { Orbitron, Exo_2 } from "next/font/google";

const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-orbitron",
  display: "swap",
});

const exo2 = Exo_2({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-exo2",
  display: "swap",
});

export const metadata = {
  title: "Digital Gold Boom — Decoding the next gold rush",
  description:
    "Tokenization just triggered the biggest gold rush in history. Join the waitlist for Digital Gold Boom by Andrew Fletcher.",
};

export default function ConceptOldLayout({ children }: { children: ReactNode }) {
  return (
    <div
      className={`${orbitron.variable} ${exo2.variable}`}
      style={{
        fontFamily: "var(--font-exo2), system-ui, sans-serif",
        background: "#0A0A0F",
        color: "#F5F5F7",
        minHeight: "100vh",
      }}
    >
      {children}
    </div>
  );
}
