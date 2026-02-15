import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { generateOrganizationSchema, generateWebsiteSchema } from "@/lib/seo";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Digital Gold Boom | The Future of Gold Is Here",
  description: "Live gold prices, tokenization news, and the definitive guide to digital gold. Track PAXG, XAUT, and discover the $200B revolution in gold tokenization.",
  keywords: ["digital gold", "tokenized gold", "NatGold", "gold tokenization", "PAXG", "XAUT", "gold investment", "crypto gold", "BIV", "gold prices"],
  authors: [{ name: "Digital Gold Boom" }],
  creator: "Digital Gold Boom",
  publisher: "Digital Gold Boom",
  metadataBase: new URL("https://digitalgoldboom.com"),
  alternates: {
    canonical: "https://digitalgoldboom.com",
  },
  openGraph: {
    title: "Digital Gold Boom | The Future of Gold Is Here",
    description: "Live gold prices, tokenization news, and the definitive guide to digital gold.",
    url: "https://digitalgoldboom.com",
    siteName: "Digital Gold Boom",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Digital Gold Boom - The Future of Gold Is Here",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Digital Gold Boom | The Future of Gold Is Here",
    description: "Live gold prices, tokenization news, and the definitive guide to digital gold.",
    images: ["/og-image.jpg"],
    creator: "@digitalgoldboom",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <JsonLd data={generateOrganizationSchema()} />
        <JsonLd data={generateWebsiteSchema()} />
      </head>
      <body className={`${inter.className} antialiased min-h-screen flex flex-col`}>
        <Header />
        <main className="flex-grow" role="main">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
