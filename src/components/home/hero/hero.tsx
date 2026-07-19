import type { Food } from "@/types/food";
import { HeroContent } from "./hero-content";
import { HeroImage } from "./hero-image";

interface HeroProps {
  foods: Food[];
}

export function Hero({ foods }: HeroProps) {
  return (
    <section className="py-6 lg:py-8">
      <div className="wrapper">
        <div className="flex flex-col items-start gap-8 md:flex-row md:justify-between">
          <HeroContent />
          <HeroImage foods={foods} />
        </div>
      </div>
    </section>
  );
}
