import type { Metadata } from "next";
import ScrollTracker from "@/components/ScrollTracker";
import JsonLd from "@/components/JsonLd";
import V2Home from "./v2/page";
import { generateMetadata as genMeta, generateBookSchema } from "@/lib/seo";

export const metadata: Metadata = genMeta({
  title: "Digital Gold Boom — Decoding the Biggest Gold Rush in History",
  description:
    "The plain-English guide to digital gold mining and the tokenization of in-ground verified gold. It's not gold, it's not Bitcoin — understand it before the token launches.",
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
