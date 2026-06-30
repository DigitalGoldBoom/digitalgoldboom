import type { Metadata } from "next";
import ScrollTracker from "@/components/ScrollTracker";
import V2Home from "./v2/page";
import { generateMetadata as genMeta } from "@/lib/seo";

export const metadata: Metadata = genMeta({
  title: "Digital Gold Boom — Decoding the Biggest Gold Rush in History",
  description:
    "The plain-English guide to digital gold mining and the tokenization of in-ground verified gold. It's not gold, it's not Bitcoin — understand it before the token launches.",
  path: "",
});

export default function Home() {
  return (
    <>
      <ScrollTracker />
      <V2Home />
    </>
  );
}
