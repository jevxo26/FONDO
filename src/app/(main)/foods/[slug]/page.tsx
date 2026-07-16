import { ProductHero } from "@/components/foods/single-foods/product-hero";
import { ProductTabs } from "@/components/foods/single-foods/product-tab";
import { RelatedFoods } from "@/components/foods/single-foods/related-foods";
import { getFoodBySlug } from "@/services/food.service";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function FoodDetails({ params }: PageProps) {
  const { slug } = await params;

  try {
    const food = await getFoodBySlug(slug);

    return (
      <>
        <ProductHero food={food} />
        <ProductTabs food={food} />
        <RelatedFoods />
      </>
    );
  } catch {
    notFound();
  }
}
