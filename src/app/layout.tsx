import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
    <html
      lang="en"
      className={`${jakarta.variable} ${geistMono.variable} dark`}
    >
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
