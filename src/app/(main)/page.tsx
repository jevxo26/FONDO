import HomeBestSeller from "@/components/home/best-sellers/best-seller";
import { Hero } from "@/components/home/hero/hero";
import SignaturePlates from "@/components/home/platter/signatur-plates";
import PopularCategories from "@/components/home/popular-categories";
import StoryChef from "@/components/our/our-chef";
import StoryGallery from "@/components/our/story-gallery";

export default function Home() {
  return(
    <>
      <Hero/>
      <PopularCategories/>
      <HomeBestSeller/>
      <SignaturePlates/>
     <StoryGallery/>
     <StoryChef/>
    </>
  );
}
