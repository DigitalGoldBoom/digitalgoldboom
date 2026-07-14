import type { Metadata } from "next";
import ScrollTracker from "@/components/ScrollTracker";
import JsonLd from "@/components/JsonLd";
import V2Home from "./v2/page";
import { generateMetadata as genMeta, generateBookSchema } from "@/lib/seo";

export const metadata: Metadata = genMeta({
  title: "Digital Gold Boom — Decoding the Biggest Gold Rush in History",
  description:
    "The plain-English guide to digital gold mining and the tokenization of in-ground verified gold. It's not gold, it's not Bitcoin — the plain-English account of how gold that is verified in the ground gets tokenized, and why that changes everything.",
  path: "",
});

export default function Home() {
  return (
    <>
      <JsonLd data={generateBookSchema()} />
      <ScrollTracker />
      <V2Home />
    </>
  );
}
