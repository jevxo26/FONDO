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

  try {
    const food = await apiFetch<Food>(`/api/foods/slug/${slug}`);
    const related = await apiFetch<{ items: Food[] }>("/api/foods?page=1&limit=5&sortBy=popularity");

    const relatedFoods = related.items
      .filter((f) => f.slug !== slug)
      .slice(0, 4);

    return (
      <>
        <ProductHero food={food} />
        <ProductTabs food={food} />
        <RelatedFoods foods={relatedFoods} />
      </>
    );
  } catch {
    notFound();
  }
}