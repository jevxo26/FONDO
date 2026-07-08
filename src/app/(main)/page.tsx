import {
  Hero,
  TrustBar,
  PopularCategories,
  BestSellers,
  SignatureDish,
  Combos,
  BlogReviews,
  ChefStory,
  Testimonials,
  CTABanner,
} from "@/components/home";

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
      <ChefStory />
      <Testimonials />
      <CTABanner />
    </>
  );
}
