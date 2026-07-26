import { SectionHeader } from "@/components/common/section-header";
import { SectionReveal } from "@/components/common/section-reveal";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ComboCard } from "./combo-card";
import { COMBOS } from "@/data/homepage";
import { InfiniteSlider } from "@/components/ui/infinite-slider";

export function Combos() {
  return (
    <section className="py-8 lg:py-12">
      <div className="wrapper">
        <SectionReveal variant="blurReveal" distance={20}>
          <SectionHeader
            title="Plates built for sharing"
            description="Curated by our chef, priced to feed the whole table."
            action={
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
            }
          />

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
