// Location: src/components/our/story-mission-stats.tsx

import React from "react";
import { Utensils } from "lucide-react";

export default function StoryMissionStats() {
  return (
    <section className="py-[var(--space-section)] bg-foreground text-background border-t border-border/10 animate-fadeIn">
      <div className="wrapper max-w-4xl mx-auto text-center space-y-8 flex flex-col items-center">
        
        {/* Centered Decorative Icon using the global gold primary color */}
        <div className="text-primary bg-primary/10 p-3 rounded-full border border-primary/20">
          <Utensils className="size-6" />
        </div>

        {/* Section Heading using font-heading */}
        <h2 className="font-heading text-3xl md:text-5xl font-normal tracking-tight text-background">
          Our Mission
        </h2>

        {/* Core Mission Statement Text */}
        <p className="font-sans text-xs sm:text-sm text-background/80 leading-relaxed max-w-2xl mx-auto font-light">
          We exist to honor the labor of the past while serving the pace of the present. Our mission is to democratize high-end heritage dining, ensuring that the legacy of slow-cooked, artisanal Mughal cuisine remains accessible without compromise. We commit strictly to plastic-free packaging, ethical sourcing, and the absolute preservation of authentic tastes.
        </p>

        {/* Statistics Row Grid with thin subtle border separators */}
        <div className="grid grid-cols-3 w-full max-w-2xl pt-8 border-t border-border/15 mt-4 divide-x divide-border/15">
          
          {/* Stat Item 1 */}
          <div className="px-2 text-center">
            <span className="font-heading text-lg sm:text-xl md:text-2xl font-normal text-primary block">
              100%
            </span>
            <span className="font-sans text-[10px] sm:text-xs text-background/60 uppercase tracking-widest block mt-1">
              Plastic Free
            </span>
          </div>

          {/* Stat Item 2 */}
          <div className="px-2 text-center">
            <span className="font-heading text-lg sm:text-xl md:text-2xl font-normal text-primary block">
              40+
            </span>
            <span className="font-sans text-[10px] sm:text-xs text-background/60 uppercase tracking-widest block mt-1">
              Heritage Spices
            </span>
          </div>

          {/* Stat Item 3 */}
          <div className="px-2 text-center">
            <span className="font-heading text-lg sm:text-xl md:text-2xl font-normal text-primary block">
              12h
            </span>
            <span className="font-sans text-[10px] sm:text-xs text-background/60 uppercase tracking-widest block mt-1">
              Slow Simmer
            </span>
          </div>

        </div>

      </div>
    </section>
  );
}