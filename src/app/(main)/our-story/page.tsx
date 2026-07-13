import StoryChef from "@/components/our/our-chef";
import StoryHero from "@/components/our/our-hero";
import StoryGallery from "@/components/our/story-gallery";

export default function OurPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <StoryHero />
      <StoryGallery />
      <StoryChef />
    </main>
  );
}
