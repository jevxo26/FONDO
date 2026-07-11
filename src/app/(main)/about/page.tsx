"use client";

import AboutHero from "@/components/about/about-hero";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import AboutValues from "@/components/about/about-values";
import AboutMissionVision from "@/components/about/about-vison";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      
      {/* 1. Hero Section */}
      <AboutHero />

      {/* 2. Values Section */}
      <AboutValues />
{/* 3. Mission & Vision Section (Dark Accent) */}
      <AboutMissionVision/>
      {/* 4. Bottom CTA Section */}
      <section className="py-24 text-center">
        <div className="wrapper max-w-3xl mx-auto px-4 flex flex-col items-center gap-6">
          <h2 className="font-fraunces text-3xl md:text-4xl font-normal text-foreground tracking-tight">
            Ready to experience the heritage?
          </h2>
          <p className="font-sans text-base text-muted-foreground mb-4">
            Join us at our Banani location for an unforgettable dining experience, or order directly to your door.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex h-12 items-center justify-center rounded-xl bg-[#16100C] px-8 font-sans text-sm font-bold text-white transition-colors hover:bg-[#2C241E] shadow-md"
            >
              Book a Table
            </Link>
            <Link
              href="/menu"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border-2 border-[#16100C] bg-transparent px-8 font-sans text-sm font-bold text-[#16100C] transition-colors hover:bg-black/5"
            >
              View Menu
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}