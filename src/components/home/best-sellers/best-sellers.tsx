import FoodCard from "@/components/common/food-card/food-card";
import { SectionHeader } from "@/components/common/section-header";
import { SectionReveal, SectionRevealItem } from "@/components/common/section-reveal";
import { Button } from "@/components/ui/button";
import type { Food } from "@/types/food";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

interface BestSellersProps {
  foods: Food[];
}

export function BestSellers({ foods }: BestSellersProps) {
  return (
    <section className="relative py-8 lg:py-12">
      <div className="wrapper">
        <SectionReveal distance={20}>
          <SectionHeader
            title="Best Sellers"
            description="Near Dhanmondi, Dhaka"
            action={
              <Button
                variant="outline"
                size="lg"
                className="group hidden gap-2 rounded-full h-auto py-3 px-4 sm:inline-flex"
                nativeButton={false}
                render={<Link href="/foods" />}
              >
                <Sparkles className="size-3.5 text-muted-foreground" />
                View Full Menu
                <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
              </Button>
            }
          />
        </SectionReveal>
        <SectionReveal
          variant="perspectiveReveal"
          stagger
          staggerDelay={0.08}
          className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {foods.map((food) => (
            <SectionRevealItem key={food.id}>
              <FoodCard food={food} />
            </SectionRevealItem>
          ))}
        </SectionReveal>

        <div className="mt-8 flex justify-center sm:hidden">
          <Button
            variant="outline"
            size="lg"
            className="group gap-2 rounded-full h-auto px-5 py-3"
            nativeButton={false}
            render={<Link href="/foods" />}
          >
            <Sparkles className="size-3.5 text-muted-foreground" />
            View Full Menu
            <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
          </Button>
        </div>
      </div>
    </section>
  );
}
