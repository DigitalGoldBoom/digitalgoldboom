import type { Metadata } from "next";
import LegalPage, { type LegalBlock } from "@/components/legal/LegalPage";
import { generateMetadata as genMeta } from "@/lib/seo";
import { LEGAL } from "@/lib/legal";

export const metadata: Metadata = genMeta({
  title: "Privacy Policy — Digital Gold Boom",
  description:
    "How Digital Gold Boom collects, uses, and protects your personal information, and the rights you have under GDPR and CCPA.",
  path: "/privacy",
});

const blocks: LegalBlock[] = [
  {
    h: "Who we are",
    p: [
      `${LEGAL.siteName} (“we”, “us”, “our”) operates the website at ${LEGAL.siteUrl}, run by ${LEGAL.operator}. This policy explains what personal information we collect, why, how we use it, and the choices and rights you have. Contact us any time at ${LEGAL.contactEmail}.`,
    ],
  },
  {
    h: "Information we collect",
    p: ["We only collect what we need to run the site, the newsletter, the book sale, and the affiliate program:"],
    ul: [
      "Email address — when you join the newsletter, the launch waitlist, or the affiliate early-interest list.",
      "Optional details you choose to give — your name, social handle, or wallet address (for future token rewards). These are optional.",
      "Purchase information — when you buy the book, our payment provider (LemonSqueezy) processes your payment and shares limited order details (such as your email and order status) with us. We never see or store your full card details.",
      "Usage data — privacy-friendly, aggregate analytics about how pages are used (via Vercel Analytics), and standard server logs (such as IP address) used for security and to prevent abuse.",
    ],
  },
  {
    h: "How we use your information",
    ul: [
      "To send you the emails you signed up for and the launch updates you asked for.",
      "To deliver the book and your receipt after a purchase.",
      "To run the affiliate / share-to-earn program and, in future, to pay rewards.",
      "To keep the site secure, prevent spam and abuse, and fix problems.",
      "To understand, in aggregate, what content helps people — never to profile you individually.",
    ],
  },
  {
    h: "Legal bases (GDPR)",
    p: [
      "If you are in the EU/UK, we rely on: your consent (for marketing emails — which you can withdraw at any time); performance of a contract (to deliver a book you bought); and our legitimate interests (to keep the site secure and improve it), balanced against your rights.",
    ],
  },
  {
    h: "Cookies and analytics",
    p: [
      "We use Vercel Analytics, which is designed to be privacy-friendly and does not use tracking cookies to follow you across sites. If we ever add cookies that aren’t strictly necessary, we will ask for your consent first where the law requires it.",
    ],
  },
  {
    h: "Who we share it with",
    p: ["We do not sell your personal information. We share it only with the service providers that help us run the site, and only as needed:"],
    ul: [
      "LemonSqueezy — payment processing and order/receipt delivery.",
      "Kit (formerly ConvertKit) — our email/newsletter platform.",
      "Vercel — website hosting and privacy-friendly analytics.",
      "Authorities — only if required by law.",
    ],
  },
  {
    h: "How long we keep it",
    p: [
      "We keep your information for as long as you are subscribed or have an active relationship with us, and as long as needed for legal, accounting, or security reasons. You can ask us to delete your data at any time (see your rights below).",
    ],
  },
  {
    h: "Your rights",
    p: [
      "Depending on where you live, you may have the right to access, correct, delete, or receive a copy of your data, to object to or restrict certain uses, and to withdraw consent. Under California’s CCPA/CPRA you can request to know, delete, or correct your information, and opt out of any “sale” or “sharing” — we do not sell or share your personal information for cross-context behavioral advertising.",
      `To exercise any right, email ${LEGAL.contactEmail}. Every marketing email also has a one-click unsubscribe link.`,
    ],
  },
  {
    h: "International transfers",
    p: [
      "Our providers may process data in countries other than yours, including the United States. Where required, we rely on appropriate safeguards (such as Standard Contractual Clauses) for those transfers.",
    ],
  },
  {
    h: "Children",
    p: [
      "This site and the book are intended for adults. We do not knowingly collect personal information from anyone under 16. If you believe a child has given us information, contact us and we will delete it.",
    ],
  },
  {
    h: "Security",
    p: [
      "We protect the site with HTTPS, server-side input validation, signed payment webhooks, and security headers. No method of transmission is perfectly secure, but we take reasonable steps to protect your information.",
    ],
  },
  {
    h: "Changes to this policy",
    p: [
      "We may update this policy as the site grows. We’ll change the “last updated” date above and, for material changes, let subscribers know.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      intro="Your trust matters. This is the plain-English version of what we collect and what you can do about it."
      blocks={blocks}
      note="This policy is provided in good faith and written to be clear and honest. It is general information, not legal advice — it should be reviewed by a qualified professional before you rely on it."
    />
  );
}
