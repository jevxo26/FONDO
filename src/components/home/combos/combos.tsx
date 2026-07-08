import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ComboCard } from "./combo-card";
import { COMBOS } from "@/data/homepage";

export function Combos() {
  return (
    <section className="py-16">
      <div className="wrapper">
        <div className="flex items-end justify-between">
          <div className="flex flex-col gap-2">
            <span className="text-[11px] font-semibold uppercase tracking-[2.534px] text-foreground/60">
              Combos
            </span>
            <h2 className="font-fraunces text-[48px] leading-[60px] tracking-[-0.96px] text-foreground">
              Plates built for sharing
            </h2>
            <p className="text-base text-foreground/60">
              Curated by our chef, priced to feed the whole table.
            </p>
          </div>
          <Button
            variant="outline"
            size="lg"
            className="gap-2 h-auto py-3 px-4 rounded-full"
            nativeButton={false}
            render={<Link href="/foods" />}
          >
            View full menu
            <ArrowRight className="size-4" />
          </Button>
        </div>

        <div className="mt-8 flex gap-5 overflow-x-auto pb-4">
          {COMBOS.map((combo) => (
            <ComboCard key={combo.id} combo={combo} />
          ))}
        </div>
      </div>
    </section>
  );
}
