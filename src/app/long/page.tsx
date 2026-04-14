import { Suspense } from "react";
import GSAPProvider from "@/components/GSAPProvider";
import FallingGold from "@/components/FallingGold";
import ScrollTracker from "@/components/ScrollTracker";
import Navbar from "@/components/Navbar";
import HeroSelector from "@/components/sections/HeroSelector";
import HeroV1 from "@/components/sections/HeroV1";
import PersonalStake from "@/components/funnel/PersonalStake";
import Problem from "@/components/funnel/Problem";
import Insight from "@/components/funnel/Insight";
import Solution from "@/components/funnel/Solution";
import Convergence from "@/components/funnel/long/Convergence";
import BitcoinParallel from "@/components/funnel/BitcoinParallel";
import ProofLine from "@/components/funnel/ProofLine";
import People from "@/components/funnel/People";
import Book from "@/components/funnel/Book";
import Stack from "@/components/funnel/Stack";
import FinalCTA from "@/components/funnel/FinalCTA";
import Footer from "@/components/Footer";

export default function LongForm() {
  return (
    <GSAPProvider>
      <FallingGold />
      <ScrollTracker />
      <Navbar />
      <main>
        <Suspense fallback={<HeroV1 />}>
          <HeroSelector />
        </Suspense>
        <PersonalStake />
        <Problem />
        <Insight />
        <Solution />
        <Convergence />
        <BitcoinParallel />
        <ProofLine />
        <People />
        <Book />
        <Stack />
        <FinalCTA />
      </main>
      <Footer />
    </GSAPProvider>
  );
}
