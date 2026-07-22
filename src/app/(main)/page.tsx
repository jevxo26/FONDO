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
import type { Food } from "@/types/food";

interface CategoryItem {
  id: string;
  name: string;
  image: string | null;
}

interface FoodsResponse {
  items: Food[];
}

export default async function Home() {
  const [foodsData, catData] = await Promise.all([
    apiFetch<FoodsResponse>("/api/foods?page=1&limit=6&sortBy=popularity", {
      revalidate: 300,
      tags: ["foods"],
    }),
    apiFetch<{ items: CategoryItem[] }>("/api/foods/categories/list", {
      revalidate: 300,
      tags: ["categories"],
    }),
  ]);

  const categories = catData.items.map((c) => ({
    id: c.id,
    label: c.name,
    image: c.image ?? "/images/home/card_1.png",
  }));

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
