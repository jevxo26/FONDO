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
} from '@/components/home';

export default function Home() {
  return (
    <main className="flex flex-col gap-12 lg:gap-[5rem] pb-[3rem] lg:pb-[5rem]">
      <Hero />
      <TrustBar />
      <PopularCategories />
      <BestSellers />
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
