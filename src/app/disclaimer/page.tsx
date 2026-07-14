import type { Metadata } from "next";
import LegalPage, { type LegalBlock } from "@/components/legal/LegalPage";
import { generateMetadata as genMeta } from "@/lib/seo";
import { LEGAL } from "@/lib/legal";

export const metadata: Metadata = genMeta({
  title: "Disclaimer — Digital Gold Boom",
  description:
    "Important disclaimers for Digital Gold Boom: educational purpose, no financial advice, cryptocurrency and token risk, forward-looking statements, and affiliate disclosure.",
  path: "/disclaimer",
});

const blocks: LegalBlock[] = [
  {
    h: "Educational purpose only",
    p: [
      `${LEGAL.siteName} is an educational book and website. It explains and analyses a new asset class — the tokenization of in-ground, independently-verified gold. It is provided for general information only.`,
    ],
  },
  {
    h: "Not financial advice",
    p: [
      "Nothing on this site or in the book is financial, investment, legal, accounting, or tax advice, and nothing is a recommendation to buy, sell, or hold any asset, token, or security. We are not a financial adviser or broker. Before making any financial decision, do your own research and speak to a licensed professional who knows your situation.",
    ],
  },
  {
    h: "No offer of securities or investment",
    p: [
      "This site does not offer, solicit, or sell any security, token, or investment, and is not an invitation to invest. The book discusses how tokenization works as a subject of analysis — it does not sell tokens or digital assets.",
    ],
  },
  {
    h: "Cryptocurrency and token risk",
    p: [
      "Digital assets and tokens — including any reference to NATG — are highly speculative and carry real risk. Their value can be extremely volatile and you could lose some or all of any money involved.",
      "Regulators, including the U.S. SEC, have warned that some tokens may be unregistered securities, and the regulatory treatment of digital assets is uncertain and changing. Rules differ by country, and it is your responsibility to understand the rules where you live. Markets for these assets may be unregulated, illiquid, or opaque.",
    ],
  },
  {
    h: "Forward-looking statements",
    p: [
      "Some content refers to future plans, dates, or events — such as a token launch timeline. These are targets and expectations, not promises. They can change, be delayed, or not happen at all, and you should not rely on them.",
    ],
  },
  {
    h: "“Reserved,” not “raised”",
    p: [
      "Where the book or site references pre-market figures (for example, reservation totals), those are reservations of interest made before any market existed — they are described as “reserved,” and are not funds “raised” or “paid.” Please read them in that exact sense.",
    ],
  },
  {
    h: "Affiliate disclosure",
    p: [
      // Cash only. See the note in terms/page.tsx: the token-reward clause was a mistake and the
      // pages contradicted each other.
      "We run an affiliate program. That means people who promote the book may earn a cash commission when their link leads to a sale of the book. There are no token rewards. This is a material connection under U.S. FTC guidelines.",
      "If you arrived here through someone’s affiliate link or post, that person may be compensated. It costs you nothing extra, and it does not change the price you pay. Anyone promoting the book should clearly disclose that they may earn from it.",
    ],
  },
  {
    h: "Accuracy and external links",
    p: [
      "We work hard to be accurate and to source our figures, but we make no warranty that everything is complete, current, or error-free. The site may link to third-party sites we don’t control and aren’t responsible for.",
    ],
  },
  {
    h: "Questions",
    p: [`If anything here is unclear, contact us at ${LEGAL.contactEmail}.`],
  },
];

export default function DisclaimerPage() {
  return (
    <LegalPage
      title="Disclaimer"
      intro="The honest fine print. We’d rather over-explain the risks than have you misunderstand them."
      blocks={blocks}
      note="This is general information, not legal or financial advice. Because this page touches securities, crypto, and an affiliate program, it should be reviewed by a securities-aware lawyer before you rely on it."
    />
  );
}
