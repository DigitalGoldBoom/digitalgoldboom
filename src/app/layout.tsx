import type { Metadata } from "next";
import { IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import Header from "@/components/Header";
import "./globals.css";

const plex = IBM_Plex_Sans({
  variable: "--font-plex",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Digital Gold Boom — Gold Without the Mine",
  description:
    "$22 trillion in verified gold sits underground doing nothing. Digital gold mining turns it into a tradeable asset — without extraction, without destruction, without compromise. Discover the model that attracted $469M from 162 countries.",
  openGraph: {
    title: "Digital Gold Boom — Gold Without the Mine",
    description:
      "$22 trillion in verified gold sits underground doing nothing. Digital gold mining turns it into a tradeable asset — without extraction, without destruction, without compromise.",
    type: "website",
    url: "https://digitalgoldboom.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${plex.variable} ${plexMono.variable}`}>
      <body>
        <Header />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
