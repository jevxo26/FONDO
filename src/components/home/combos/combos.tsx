import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/common/section-header";
import { ComboCard } from "./combo-card";
import { COMBOS } from "@/data/homepage";

export function Combos() {
  return (
    <section className="py-16">
      <div className="wrapper">
        <SectionHeader
          title="Today's Combos"
          align="center"
          action={
            <Button variant="ghost" size="sm">
              View All
            </Button>
          }
        />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {COMBOS.map((combo) => (
            <ComboCard key={combo.id} combo={combo} />
          ))}
        </div>
      </div>
    </section>
  );
}
