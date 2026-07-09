import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ComboCard } from "./combo-card";
import { COMBOS } from "@/data/homepage";

export function Combos() {
  return (
    <section className="py-16">
      <div className="wrapper">
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
            className="gap-2 self-start rounded-full px-4 py-3 h-auto sm:self-auto"
            nativeButton={false}
            render={<Link href="/foods" />}
          >
            View full menu
            <ArrowRight className="size-4" />
          </Button>
        </div>

        <div className="mt-8 flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory">
          {COMBOS.map((combo) => (
            <ComboCard key={combo.id} combo={combo} />
          ))}
        </div>
      </div>
    </section>
  );
}
