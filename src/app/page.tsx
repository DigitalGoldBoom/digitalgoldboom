import GSAPProvider from "@/components/GSAPProvider";
import FallingGold from "@/components/FallingGold";
import ScrollTracker from "@/components/ScrollTracker";
import Hero from "@/components/sections/Hero";
import TokenLaunch from "@/components/sections/TokenLaunch";
import Problem from "@/components/funnel/Problem";
import Insight from "@/components/funnel/Insight";
import Solution from "@/components/funnel/Solution";
import BitcoinParallel from "@/components/funnel/BitcoinParallel";
import People from "@/components/funnel/People";
import Book from "@/components/funnel/Book";
import Stack from "@/components/funnel/Stack";
import FinalCTA from "@/components/funnel/FinalCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <GSAPProvider>
      <FallingGold />
      <ScrollTracker />
      <main>
        <Hero />
        <Problem />
        <Insight />
        <Solution />
        <BitcoinParallel />
        <TokenLaunch />
        <People />
        <Book />
        <Stack />
        <FinalCTA />
      </main>
      <Footer />
    </GSAPProvider>
  );
}
