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
import { getFoods } from "@/services/food.service";

export default async function Home() {
  const data = await getFoods(1, 6, "popularity");

  return (
    <main className="flex flex-col gap-12 lg:gap-[5rem] pb-[3rem] lg:pb-[5rem]">
      <Hero />
      <TrustBar />
      <PopularCategories />
      <BestSellers foods={data.items} />
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
