// Location: src/components/our/our-mission.tsx
"use client";

import React from "react";
import { Compass } from "lucide-react";

export default function OurMission() {
  return (
    <section className="py-[var(--space-section)] bg-foreground text-background border-t border-border/10">
      <div className="wrapper max-w-4xl mx-auto text-center space-y-8 flex flex-col items-center">
        
        {/* Decorative Icon using your global gold primary color */}
        <div className="text-primary bg-primary/10 p-3.5 rounded-full border border-primary/20">
          <Compass className="size-6" />
        </div>

        {/* Section Heading utilizing font-heading */}
        <h2 className="font-heading text-3xl md:text-5xl font-normal tracking-tight text-background">
          Our Mission
        </h2>

        {/* Core Mission Narrative Statement */}
        <p className="font-sans text-sm md:text-base text-background/80 leading-relaxed max-w-2xl mx-auto font-light">
          We exist to honor the labor of the past while serving the pace of the present. Our mission is to democratize high-end heritage dining, ensuring that the legacy of slow-cooked, artisanal Mughal cuisine remains an active art form in the modern world. We commit strictly to plastic-free packaging, ethical farm sourcing, and the absolute preservation of authentic tastes.
        </p>

        {/* Micro Tracking Badge */}
        <div className="pt-4">
          <span className="font-sans text-[10px] font-bold uppercase tracking-[0.3em] text-primary">
            Authenticity • Integrity • Sustainability
          </span>
        </div>

      </div>
    </section>
  );
}