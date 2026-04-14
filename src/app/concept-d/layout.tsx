import type { ReactNode } from "react";
import { IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";

const plex = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-plex",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const metadata = {
  title: "Digital Gold Boom — Decoding the next gold rush",
  description:
    "Tokenization just triggered the biggest gold rush in history. This time it's digital, eco-friendly, and global.",
};

export default function ConceptDLayout({ children }: { children: ReactNode }) {
  return (
    <div className={`${plex.variable} ${plexMono.variable}`}>{children}</div>
  );
}
