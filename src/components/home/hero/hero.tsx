import { HeroContent } from "./hero-content";
import { HeroImage } from "./hero-image";

export function Hero() {
  return (
    <section className="bg-gradient-to-br from-secondary to-secondary py-6 lg:py-8">
      <div className="wrapper">
        <div className="flex flex-col items-start gap-8 md:flex-row md:justify-between">
          <HeroContent />
          <HeroImage />
        </div>
      </div>
    </section>
  );
}
