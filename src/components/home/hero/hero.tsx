"use client";

import type { Food } from "@/types/food";
import { HeroContent } from "./hero-content";
import { HeroImage } from "./hero-image";

export function Hero({ foods }: { foods: Food[] }) {
  return (
    <section className="relative overflow-hidden py-6 lg:py-10">
      <div className="wrapper">
        <div className="flex flex-col items-start gap-8 md:flex-row md:justify-between">
          <div className="w-full lg:max-w-[608px]">
            <HeroContent />
          </div>
          <div className="w-full lg:max-w-[500px] xl:max-w-[681px]">
            <HeroImage foods={foods} />
          </div>
        </div>
      </div>
    </section>
  );
}
