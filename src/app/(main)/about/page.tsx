"use client";

import HowItWorks from "@/components/about/abou-work";
import FoodoAdvantage from "@/components/about/about-advantage";
import CateredNeeds from "@/components/about/about-created-need";
import HeroSection from "@/components/about/about-hero";
import OurStory from "@/components/about/about-story";
import MissionVision from "@/components/about/about-vison";
import DrivenByValues from "@/components/about/driven-value";
import KitchenPartners from "@/components/about/kitchen-partner";
import FoodoPromise from "@/components/about/promise";
import StatsBanner from "@/components/about/stats-banner";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#FAF5EB] text-[#16100C] selection:bg-[#CEA359]/20 overflow-x-hidden">
      {/* 1. Hero Section */}
      <HeroSection/>

      {/* 2. Our Story (The Story Behind Food Flow) */}
      <OurStory />

      {/* 3. Mission & Vision Cards */}
      <MissionVision />

      {/* 4. The Foodo Advantage Grid */}
      <FoodoAdvantage />

      {/* 5. How It Works (Timeline) */}
      <HowItWorks />

      {/* 6. Catered To Your Needs (Image Grid) */}
      <CateredNeeds />

      {/* 7. The Foodo Promise */}
      <FoodoPromise />

      {/* 8. Stats Banner (Full Width Gold Strip) */}
      <StatsBanner />

      {/* 9. Certified Kitchen Partners & Growing Presence */}
      <KitchenPartners />

      {/* 10. Driven By Values */}
      <DrivenByValues />
    </main>
  );
}