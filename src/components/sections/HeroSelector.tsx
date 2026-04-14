"use client";

import { useSearchParams } from "next/navigation";
import HeroV1 from "@/components/sections/HeroV1";
import HeroV2 from "@/components/sections/HeroV2";
import HeroV3 from "@/components/sections/HeroV3";

export default function HeroSelector() {
  const params = useSearchParams();
  const variant = params?.get("hero")?.toLowerCase();

  if (variant === "v2") return <HeroV2 />;
  if (variant === "v3") return <HeroV3 />;
  return <HeroV1 />;
}
