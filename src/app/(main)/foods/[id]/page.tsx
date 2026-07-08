import { ProductHero } from "@/components/foods/single-foods/product-hero";
import { ProductTabs } from "@/components/foods/single-foods/product-tab";
import { RelatedFoods } from "@/components/foods/single-foods/related-foods";
import { Navbar } from "@/components/layout/navbar/navbar";

export default function ProductDetailPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background antialiased">
      <Navbar />
      <main className="flex-1">
        <ProductHero />
        <ProductTabs />
        <RelatedFoods />
      </main>
    </div>
  );
}