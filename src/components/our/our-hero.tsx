"use client";

import Image from "next/image";

export default function StoryHero() {
  return (
    <section className="bg-background pt-12 pb-16">
      <div className="wrapper">
        
        {/* TYPOGRAPHY HEADER CONTAINER */}
        <div className="flex flex-col gap-2 max-w-2xl mb-10">
          {/* Location & Est. Eyebrow */}
          <span className="font-sans text-xs uppercase tracking-wider text-muted-foreground font-medium">
            Est. 2024 · Banani, Dhaka
          </span>
          
          {/* Main Statement Heading */}
          <h1 className="font-fraunces text-4xl sm:text-5xl md:text-6xl font-normal text-foreground tracking-tight leading-[1.08]">
            A Decade of slow fire.
          </h1>
        </div>

        {/* FULL-WIDTH BANNER IMAGE CONTAINER */}
        <div className="relative w-full aspect-[21/9] rounded-[32px] overflow-hidden shadow-[var(--shadow-card)] border border-border/20 bg-muted">
          <Image
            src="https://sumesshmenonassociates.com/wp-content/uploads/2020/10/aubergin-breach-candy-banner-desk-1536x768.jpg" // Swap with your actual static asset route path
            alt="Food Flow luxury ambient dining room interior layout"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center transition-transform duration-700 hover:scale-[1.02]"
          />
          
          {/* Subtle Ambient Vignette Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent pointer-events-none" />
        </div>

      </div>
    </section>
  );
}