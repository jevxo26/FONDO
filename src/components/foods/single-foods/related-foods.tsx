import type { Food } from "@/types/food";
import FoodCard from "@/components/common/cards/food-card/food-card";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

interface RelatedFoodsProps {
  foods: Food[];
}

export function RelatedFoods({ foods }: RelatedFoodsProps) {
  if (foods.length === 0) return null;

  return (
    <section className="py-12 bg-background">
      <div className="wrapper">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-heading text-2xl font-normal tracking-tight text-secondary-foreground sm:text-3xl">
            Related Foods
          </h2>
          <Link
            href="/foods"
            className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-white px-4 py-2 font-sans text-xs font-medium text-foreground transition-all hover:bg-muted dark:bg-card"
          >
            View full menu <ArrowUpRight className="size-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {foods.map((food) => (
            <FoodCard key={food.id} food={food} />
          ))}
        </div>
      </div>
    </section>
  );
}
