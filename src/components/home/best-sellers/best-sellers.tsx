import FoodCard from "@/components/common/cards/food-card/food-card";
import { SectionHeader } from "@/components/common/section-header";
import { SectionReveal, SectionRevealItem } from "@/components/common/section-reveal";
import { Button } from "@/components/ui/button";
import { BEST_SELLERS } from "@/data/homepage";
import type { Food } from "@/types/food";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

function toFood(item: (typeof BEST_SELLERS)[number]): Food {
  return {
    id: String(item.id),
    name: item.title,
    slug: item.title.toLowerCase().replace(/\s+/g, "-"),
    shortDescription: item.description,
    thumbnail: item.thumbnail,
    coverImage: item.thumbnail,
    preparationTime: parseInt(item.time) || 30,
    calories: 0,
    protein: 0,
    fat: 0,
    carbohydrate: 0,
    servingSize: "",
    foodType: "NON_VEG",
    spiceLevel: "MEDIUM",
    isFeatured: false,
    isPopular: true,
    isRecommended: false,
    rating: { averageRating: item.rating, totalReview: 0 },
    category: { id: "", name: "", slug: "" },
    variants: [
      {
        id: "1",
        name: "Regular",
        price: String(item.price),
        discountPrice: null,
        servingSize: "",
      },
    ],
    addons: [],
    labels: [],
    tags: [],
    diets: [],
    discount: null,
  };
}

export function BestSellers() {
  return (
    <section>
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
          stagger
          staggerDelay={0.08}
          className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {BEST_SELLERS.map((food) => (
            <SectionRevealItem key={food.id}>
              <FoodCard food={toFood(food)} />
            </SectionRevealItem>
          ))}
        </SectionReveal>
      </div>
    </section>
  );
}
