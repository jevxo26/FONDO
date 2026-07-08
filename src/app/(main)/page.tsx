import {
  Hero,
  TrustBar,
  PopularCategories,
  BestSellers,
  SignatureDish,
  Combos,
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
      <ChefStory />
      <Testimonials />
      <CTABanner />
    </>
  );
}
