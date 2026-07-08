import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/common/section-header";
import FoodCard from "@/components/shared/FoodCard";
import { BEST_SELLERS } from "@/data/homepage";

export function BestSellers() {
  return (
    <section className="py-16">
      <div className="wrapper">
        <SectionHeader
          title="Best Sellers"
          action={
            <Button
              variant="ghost"
              size="sm"
              className="gap-1"
              render={<Link href="/foods" />}
            >
              See All
              <ArrowRight className="size-4" />
            </Button>
          }
        />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {BEST_SELLERS.map((food) => (
            <FoodCard key={food.id} food={food} />
          ))}
        </div>
      </div>
    </section>
  );
}
