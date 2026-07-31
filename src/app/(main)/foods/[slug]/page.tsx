import { ProductHero } from "@/components/foods/single-foods/product-hero";
import { ProductTabs } from "@/components/foods/single-foods/product-tab";
import { RelatedFoods } from "@/components/foods/single-foods/related-foods";
import { apiFetch } from "@/lib/api";
import type { Food } from "@/types/food";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function FoodDetails({ params }: PageProps) {
  const { slug } = await params;

  let food: Food;
  let relatedFoods: Food[];

  try {
    food = await apiFetch<Food>(`/api/foods/slug/${slug}`, { auth: false });
    const related = await apiFetch<{ items: Food[] }>(
      "/api/foods?page=1&limit=5&sortBy=popularity",
      { auth: false },
    );
    relatedFoods = related.items.filter((f) => f.slug !== slug).slice(0, 4);
  } catch {
    notFound();
    return null;
  }

  return (
    <>
      <ProductHero food={food} />
      <ProductTabs food={food} />
      <RelatedFoods foods={relatedFoods} />
    </>
  );
}
