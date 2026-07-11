import { SectionReveal } from "@/components/common/section-reveal";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ComboCard } from "./combo-card";
import { COMBOS } from "@/data/homepage";
import { InfiniteSlider } from "@/components/ui/infinite-slider";

export function Combos() {
  return (
    <section>
      <div className="wrapper">
        <SectionReveal distance={20}>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex flex-col gap-2">
              <span className="text-[11px] font-semibold uppercase tracking-[2.534px] text-foreground/60">
                Combos
              </span>
              <h2 className="font-fraunces text-3xl leading-tight tracking-[-0.96px] text-foreground sm:text-4xl lg:text-[48px]">
                Plates built for sharing
              </h2>
              <p className="text-sm text-foreground/60 sm:text-base">
                Curated by our chef, priced to feed the whole table.
              </p>
            </div>
            <Button
              variant="outline"
              size="lg"
              className="h-auto gap-2 self-start rounded-full px-4 py-3 sm:self-auto"
              nativeButton={false}
              render={<Link href="/foods" />}
            >
              View full menu
              <ArrowRight className="size-4" />
            </Button>
          </div>

          <InfiniteSlider gap={20} speed={60} className="mt-8">
            {COMBOS.map((combo) => (
              <ComboCard key={combo.id} combo={combo} />
            ))}
          </InfiniteSlider>
        </SectionReveal>
      </div>
    </section>
  );
}
