import { SectionReveal } from "@/components/common/section-reveal";
import Image from "next/image";

export function KitchenDining() {
  return (
    <section className="py-10 lg:py-16">
      <div className="wrapper">
        <SectionReveal variant="fadeScale" distance={20}>
          <div className="mx-auto flex max-w-2xl flex-col items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-label text-foreground/60">
              Behind the pass
            </span>
            <h2 className="text-center font-heading text-3xl leading-tight tracking-heading text-foreground sm:text-4xl lg:text-[48px]">
              Kitchen &amp; dining experience
            </h2>
            <p className="text-center text-sm text-muted-foreground sm:text-base">
              A look at the people, copper pots and quiet rooms behind every plate.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
            {/* Left: Kitchen brigade (tall) */}
            <div className="group relative aspect-[4/6] overflow-hidden rounded-3xl md:row-span-2 md:h-[456px] md:aspect-auto">
              <Image
                src="/images/home/kitchen_brigade.png"
                alt="Kitchen brigade"
                fill
                sizes="(max-width: 768px) 100vw, 292px"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute bottom-3 left-3 rounded-lg bg-background/80 px-3 py-1.5 backdrop-blur-sm">
                <span className="text-xs font-medium text-foreground">Kitchen brigade</span>
              </div>
            </div>

            {/* Center: Cooking + Dining table (stacked) */}
            <div className="flex flex-col gap-4">
              <div className="group relative aspect-[327/220] overflow-hidden rounded-3xl md:h-[220px] md:aspect-auto">
                <Image
                  src="/images/home/cooking.png"
                  alt="Cooking"
                  fill
                  sizes="(max-width: 768px) 100vw, 327px"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute bottom-3 left-3 rounded-lg bg-background/80 px-3 py-1.5 backdrop-blur-sm">
                  <span className="text-xs font-medium text-foreground">Cooking</span>
                </div>
              </div>
              <div className="group relative aspect-[327/220] overflow-hidden rounded-3xl md:h-[220px] md:aspect-auto">
                <Image
                  src="/images/home/dining_table.png"
                  alt="Dining table"
                  fill
                  sizes="(max-width: 768px) 100vw, 327px"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute bottom-3 left-3 rounded-lg bg-background/80 px-3 py-1.5 backdrop-blur-sm">
                  <span className="text-xs font-medium text-foreground">Dining table</span>
                </div>
              </div>
            </div>

            {/* Right: Restaurant interior (tall) */}
            <div className="group relative aspect-[4/6] overflow-hidden rounded-3xl md:row-span-2 md:h-[456px] md:aspect-auto">
              <Image
                src="/images/home/restaurant_interior.png"
                alt="Restaurant interior"
                fill
                sizes="(max-width: 768px) 100vw, 327px"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute bottom-3 left-3 rounded-lg bg-background/80 px-3 py-1.5 backdrop-blur-sm">
                <span className="text-xs font-medium text-foreground">Restaurant interior</span>
              </div>
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
