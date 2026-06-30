import type { Metadata } from "next";
import LegalPage, { type LegalBlock } from "@/components/legal/LegalPage";
import { generateMetadata as genMeta } from "@/lib/seo";
import { LEGAL } from "@/lib/legal";

export const metadata: Metadata = genMeta({
  title: "Terms of Service — Digital Gold Boom",
  description:
    "The terms for using the Digital Gold Boom website, buying the book, and taking part in the affiliate program — including the refund policy.",
  path: "/terms",
});

const blocks: LegalBlock[] = [
  {
    h: "Agreement to these terms",
    p: [
      `These Terms of Service govern your use of ${LEGAL.siteUrl} and anything you buy or sign up for here, operated by ${LEGAL.operator} (“we”, “us”). By using the site you agree to these terms. If you don’t agree, please don’t use the site.`,
    ],
  },
  {
    h: "What we provide",
    p: [
      "Digital Gold Boom is an educational ebook and related content — information and analysis about the tokenization of in-ground verified gold (“digital gold mining”). It is not the sale of a token or any digital asset, and nothing here is an offer to buy or sell a security or investment.",
    ],
  },
  {
    h: "Purchases and payment",
    p: [
      "The book is a digital product sold and delivered through our payment provider, LemonSqueezy, who acts as the merchant of record. Prices are shown at checkout. After payment you receive a download link and receipt by email, usually within a few minutes. Because it is a digital product, you get instant access.",
    ],
  },
  {
    h: "Refund policy",
    p: [
      `We offer a 12-month money-back guarantee on the book. If it isn’t for you, email ${LEGAL.contactEmail} within 12 months of purchase and we’ll refund you in full — no complicated hoops. Refunds are issued to your original payment method via LemonSqueezy.`,
    ],
  },
  {
    h: "Affiliate and share-to-earn program",
    p: [
      "If you take part in our affiliate or share-to-earn program, separate program rules apply in addition to these terms. Key points: the program opens at launch; rewards are paid only on genuine, verified results (a completed referred sale, or a share that meets the stated, verified view thresholds); token-based rewards depend on the NATG token being live and may change; and we may decline or reverse rewards tied to fake, bot, misleading, or policy-breaking activity. Full program rules are provided to participants before the program opens.",
    ],
  },
  {
    h: "Acceptable use",
    p: ["When using the site, you agree not to:"],
    ul: [
      "Break the law, or use the site to harm, defraud, or mislead anyone.",
      "Copy, resell, or redistribute the book or site content without permission.",
      "Attempt to disrupt, overload, hack, or probe the site or its systems.",
      "Submit false information, spam our forms, or abuse the affiliate program.",
    ],
  },
  {
    h: "Intellectual property",
    p: [
      "The book, the site, and their content (text, design, logos, and media) are owned by us or our licensors and protected by law. Buying the book gives you a personal, non-transferable license to read it — not the right to copy, share, or resell it.",
    ],
  },
  {
    h: "No financial advice",
    p: [
      "The site and book are educational. Nothing here is financial, investment, legal, or tax advice, and nothing is a recommendation to buy or sell anything. See our Disclaimer for the full risk statement. You are responsible for your own decisions.",
    ],
  },
  {
    h: "Disclaimers and limitation of liability",
    p: [
      "The site and content are provided “as is,” without warranties of any kind. To the fullest extent allowed by law, we are not liable for any indirect, incidental, or consequential losses, and our total liability for any claim is limited to the amount you paid us (if any) in the 12 months before the claim. Some jurisdictions don’t allow certain limitations, so some of these may not apply to you.",
    ],
  },
  {
    h: "Indemnity",
    p: [
      "You agree to cover us for reasonable claims and costs arising from your misuse of the site or breach of these terms.",
    ],
  },
  {
    h: "Governing law",
    p: [
      `These terms are governed by the laws of ${LEGAL.jurisdiction}, and any disputes will be handled by the courts located there, unless your local consumer law gives you other rights.`,
    ],
  },
  {
    h: "Changes",
    p: [
      "We may update these terms as the site grows. We’ll change the “last updated” date above, and continued use of the site means you accept the updated terms.",
    ],
  },
];

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Service"
      intro="The plain rules for using this site, buying the book, and joining the affiliate program."
      blocks={blocks}
      note="This is general information, not legal advice. These terms should be reviewed by a qualified professional — especially the sections touching the token, the affiliate program, and the governing-law jurisdiction — before you rely on them."
    />
  );
}
