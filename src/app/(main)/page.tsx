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
import { CATEGORY_CARDS } from "@/data/homepage";
import type { Food } from "@/types/food";
import { CouponSection } from "@/components/home/coupons/coupon-section";

interface CategoryItem {
  id: string;
  name: string;
  image: string | null;
}

interface FoodsResponse {
  items: Food[];
}

export default async function Home() {
  let foods: Food[] = [];
  let categories: Array<{ id: string; label: string; image: string }> = CATEGORY_CARDS;

  try {
    const [foodsData, catData] = await Promise.all([
      apiFetch<FoodsResponse>("/api/foods?page=1&limit=6&sortBy=popularity", {
        revalidate: 300,
        tags: ["foods"],
        auth: false,
      }),
      apiFetch<CategoryItem[]>("/api/foods/categories/list?popular=true&limit=6", {
        revalidate: 300,
        tags: ["categories"],
        auth: false,
      }),
    ]);

    if (foodsData?.items?.length) {
      foods = foodsData.items;
    }
    if (catData?.length) {
      categories = catData.map((c) => ({
        id: c.id,
        label: c.name,
        image: c.image ?? "/images/home/card_1.png",
      }));
    }
  } catch (error) {
    console.error("Failed to fetch home page dynamic data, falling back to static:", error);
  }

  return (
    <main className="flex flex-col pb-[3rem] lg:pb-[5rem]">
      <Hero foods={foods} />
      <TrustBar />
      <PopularCategories categories={categories} />
      <BestSellers foods={foods} />
      <SignatureDish />
      <Combos />
      <BlogReviews />
      <CouponSection/>
      <Testimonials />
      <KitchenDining />
      <ChefStory />
      <ServiceBanner />
    </main>
  );
}

