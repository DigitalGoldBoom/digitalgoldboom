import type { Metadata } from "next";
import Script from "next/script";
import { IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
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
    "Twenty-two trillion dollars of gold has already been found, verified and sitting in the ground. For six thousand years there was one way to reach it — dig it up. Digital Gold Boom is the plain-English account of the other way, by Andrew Fletcher, who ran a gold company inside the shift. Educational — not financial advice.",
  alternates: { canonical: "https://digitalgoldboom.com" },
  openGraph: {
    title: "Digital Gold Boom — Gold Without the Mine",
    description:
      "Twenty-two trillion dollars of verified gold sits in the ground. For six thousand years there was one way to reach it — dig it up. This book is the plain-English account of the other way.",
    type: "website",
    url: "https://digitalgoldboom.com",
    siteName: "Digital Gold Boom",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Digital Gold Boom — gold without the mine" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Digital Gold Boom — Gold Without the Mine",
    description:
      "Twenty-two trillion dollars of verified gold sits in the ground. For six thousand years there was one way to reach it. This book is about the other way.",
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
        <Footer />
        <Analytics />
        {/* LemonSqueezy affiliate tracking — site-wide so a referral is credited no matter
            which page the visitor lands on or converts from. */}
        <Script id="ls-affiliate-config" strategy="beforeInteractive">
          {`window.lemonSqueezyAffiliateConfig = { store: "digitalgoldboom" };`}
        </Script>
        <Script src="https://lmsqueezy.com/affiliate.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
