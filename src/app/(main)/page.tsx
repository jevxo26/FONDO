import {
  BestSellers,
  BlogReviews,
  ChefStory,
  Combos,
  Hero,
  KitchenDining,
  PopularCategories,
  ServiceBanner,
  SignatureDish,
  Testimonials,
  TrustBar,
} from "@/components/home";
import { apiFetch } from "@/lib/api";
import { getFoods } from "@/services/food.service";

interface CategoryItem {
  id: string;
  name: string;
  image: string | null;
}

export default async function Home() {
  const [foodsData, catData] = await Promise.all([
    getFoods(1, 6, "popularity"),
    apiFetch<{ items: CategoryItem[] }>("/api/foods/categories/list"),
  ]);

  const categories = catData.items
    .filter((c) => c.image)
    .map((c) => ({ id: c.id, label: c.name, image: c.image! }));

  return (
    <main className="flex flex-col gap-12 lg:gap-[5rem] pb-[3rem] lg:pb-[5rem]">
      <Hero foods={foodsData.items} />
      <TrustBar />
      <PopularCategories categories={categories} />
      <BestSellers foods={foodsData.items} />
      <SignatureDish />
      <Combos />
      <BlogReviews />
      <Testimonials />
      <KitchenDining />
      <ChefStory />
      <ServiceBanner />
    </main>
  );
}
