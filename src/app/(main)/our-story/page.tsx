import StoryHero from "@/components/our/our-hero";
import OurHeritage from "@/components/our/our-heritage";
import CulinaryPhilosophy from "@/components/our/culinary-philosophy";
import StoryMissionStats from "@/components/our/mission-statistics";
import OurMission from "@/components/our/our-mission";

export default function OurPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
   
      <StoryHero />
      <OurHeritage/>
      <StoryMissionStats />
      <CulinaryPhilosophy/>
    </main>
  );
}