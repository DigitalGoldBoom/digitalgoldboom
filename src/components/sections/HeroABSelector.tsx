"use client";

import { useSearchParams } from "next/navigation";
import HeroBoardD from "@/components/sections/HeroBoardD";
import HeroG from "@/components/sections/HeroG";
import HeroH from "@/components/sections/HeroH";

export default function HeroABSelector() {
  const params = useSearchParams();
  const variant = params?.get("hero")?.toLowerCase();

  if (variant === "g") return <HeroG />;
  if (variant === "h") return <HeroH />;
  return <HeroBoardD />;
}
