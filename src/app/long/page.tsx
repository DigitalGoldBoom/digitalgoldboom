import GSAPProvider from "@/components/GSAPProvider";
import ScrollTracker from "@/components/ScrollTracker";
import Navbar from "@/components/Navbar";
import HeroBoardD from "@/components/sections/HeroBoardD";
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
      <ScrollTracker />
      <Navbar />
      <main>
        <HeroBoardD />
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
