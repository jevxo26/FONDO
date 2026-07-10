import { ProductHero } from "@/components/foods/single-foods/product-hero";
import { ProductTabs } from "@/components/foods/single-foods/product-tab";
import { RelatedFoods } from "@/components/foods/single-foods/related-foods";
import { Navbar } from "@/components/layout/navbar/navbar";
import { FOOD_ITEMS } from "@/data/foodsdata";
interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}


export default async function FoodDetails({ params }: PageProps) {
 const { slug } = await params;
  const food = FOOD_ITEMS.find((item) => item.slug === slug);

  if (!food) {
    return <p>Foods Not Found</p>
  }

  return (
    <>
        <ProductHero food={food}/>
        <ProductTabs food={food} />
        <RelatedFoods />
      </>
   
  );
}