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
    <>
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
    </>
  );
}
