// Location: src/components/our/our-heritage.tsx

import React from "react";

export default function OurHeritage() {
  return (
    <section className="py-[var(--space-section)] bg-background text-foreground border-b border-border/10 animate-fadeIn">
      <div className="wrapper grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        {/* Left Column: Story narrative & context (6 of 12 grid columns on desktop) */}
        <div className="lg:col-span-6 space-y-6">
          <div className="space-y-2">
            {/* Tiny uppercase heritage label utilizing global primary saffron/gold color */}
            <span className="text-primary font-sans text-xs font-bold uppercase tracking-[0.2em] block">
              Est. 1924
            </span>
            {/* Primary serif section heading utilizing font-heading */}
            <h2 className="font-heading text-3xl md:text-5xl font-normal leading-tight text-foreground">
              Our Heritage
            </h2>
          </div>
          
          {/* Detailed editorial description utilizing global muted text variable */}
          <div className="space-y-4 text-xs md:text-sm text-muted-foreground font-sans leading-relaxed">
            <p>
              For over a century, our family has guarded the sacred culinary scrolls of legendary royal kitchens. What began as a single slow-fire hearth in 1924 has matured into a timeless sanctuary of gastronomic art, preserving the complex alchemy of fresh-milled spices and traditional techniques.
            </p>
            <p>
              Every dish we assemble is a meticulous translation of living history. We do not rush the fire; our heritage dictates a patient, hours-long simmering process that coaxes the absolute deepest essences from hand-ground cardamom, premium saffron threads, and locally harvested heirloom ingredients.
            </p>
          </div>
        </div>

        {/* Right Column: Visual Layout with 2 staggered, premium image cells (6 of 12 columns on desktop) */}
        <div className="lg:col-span-6 grid grid-cols-2 gap-4 md:gap-6">
          {/* Image Block 1 - Positioned slightly higher */}
          <div className="space-y-4">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-border bg-card shadow-[var(--shadow-card)]">
              <img 
                src="https://images.unsplash.com/photo-1596797038530-2c107229654b?q=80&w=800&auto=format&fit=crop" 
                alt="Traditional heritage spices" 
                className="w-full h-full object-cover grayscale-[15%] hover:grayscale-0 transition-all duration-500 hover:scale-105"
              />
            </div>
          </div>
          
          {/* Image Block 2 - Staggered slightly lower (pt-8) for an elegant editorial design flow */}
          <div className="space-y-4 pt-8">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-border bg-card shadow-[var(--shadow-card)]">
              <img 
                src="https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800&auto=format&fit=crop" 
                alt="Slow cooking over fire" 
                className="w-full h-full object-cover grayscale-[15%] hover:grayscale-0 transition-all duration-500 hover:scale-105"
              />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}