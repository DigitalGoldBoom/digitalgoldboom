import type { ReactNode } from "react";
import { Playfair_Display, Inter } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata = {
  title: "Digital Gold Boom — Decoding the next gold rush",
  description:
    "Tokenization just triggered the biggest gold rush in history. This time it's digital, eco-friendly, and global.",
};

export default function ConceptPsLayout({ children }: { children: ReactNode }) {
  return (
    <div className={`${playfair.variable} ${inter.variable}`}>
      {children}
    </div>
  );
}
