import FoodCard from "@/components/common/cards/food-card/food-card";
import { SectionHeader } from "@/components/common/section-header";
import { SectionReveal, SectionRevealItem } from "@/components/common/section-reveal";
import { Button } from "@/components/ui/button";
import type { Food } from "@/types/food";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

interface BestSellersProps {
  foods: Food[];
}

export function BestSellers({ foods }: BestSellersProps) {
  return (
    <section className="py-8 lg:py-12">
      <div className="wrapper">
        <SectionHeader
          title="Best Sellers"
          description="Near Dhanmondi, Dhaka"
          action={
            <Button
              variant="outline"
              size="lg"
              className="gap-2 h-auto py-3 px-4 rounded-full"
              nativeButton={false}
              render={<Link href="/foods" />}
            >
              View Full Menu
              <ArrowRight className="size-4" />
            </Button>
          }
        />
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
      </div>
    </section>
  );
}
