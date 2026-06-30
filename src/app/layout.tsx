import type { Metadata } from "next";
import { IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import Navbar from "@/components/Navbar";
import JsonLd from "@/components/JsonLd";
import { generateOrganizationSchema, generateWebsiteSchema } from "@/lib/seo";
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
  metadataBase: new URL("https://digitalgoldboom.com"),
  title: "Digital Gold Boom — Gold Without the Mine",
  description:
    "$22 trillion in verified gold sits underground doing nothing. Digital gold mining turns it into a tradeable asset — without extraction, without destruction, without compromise. Built on the model that drew $469M in reservations from 162 countries.",
  alternates: { canonical: "https://digitalgoldboom.com" },
  openGraph: {
    title: "Digital Gold Boom — Gold Without the Mine",
    description:
      "$22 trillion in verified gold sits underground doing nothing. Digital gold mining turns it into a tradeable asset — without extraction, without destruction, without compromise.",
    type: "website",
    url: "https://digitalgoldboom.com",
    siteName: "Digital Gold Boom",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Digital Gold Boom — gold without the mine" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Digital Gold Boom — Gold Without the Mine",
    description:
      "$22 trillion in verified gold sits underground. Digital gold mining turns it into a tradeable asset — without extraction.",
    images: ["/og-image.jpg"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${plex.variable} ${plexMono.variable}`}>
      <body>
        <JsonLd data={generateOrganizationSchema()} />
        <JsonLd data={generateWebsiteSchema()} />
        <Navbar />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
