// Location: src/components/our/story-philosophy.tsx
"use client";

import React from "react";
import { Flame, Compass, Sprout, Sparkles } from "lucide-react";
import Image from "next/image";

export default function CulinaryPhilosophy() {
  return (
    <section className="py-[var(--space-section)] bg-background text-foreground border-b border-border/10">
      <div className="wrapper space-y-12">
        
        {/* Centered Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-primary font-sans text-xs font-bold uppercase tracking-[0.2em]">
            Our Creed
          </span>
          <h2 className="font-heading text-3xl md:text-5xl font-normal leading-tight">
            The Culinary Philosophy
          </h2>
          <p className="font-sans italic text-sm md:text-base text-muted-foreground leading-relaxed">
            &ldquo;Sovereign taste is not an accident; it is a meticulous pact made with time, flame, and soil.&rdquo;
          </p>
        </div>

        {/* Top Grid: Three Vertical Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: Slow-Cooking (Standard Theme Card) */}
          <div className="bg-card border border-border/60 rounded-2xl p-8 flex flex-col justify-between space-y-6 shadow-[var(--shadow-card)] transition-transform duration-300 hover:-translate-y-1">
            <div className="space-y-4">
              <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                <Flame className="size-6" />
              </div>
              <h3 className="font-heading text-xl font-normal text-foreground">
                Slow-Cooking
              </h3>
              <p className="font-sans text-xs md:text-sm text-muted-foreground leading-relaxed">
                We reject the modern rush. Our hearths simmer slowly for up to twelve hours, allowing raw, wild spices to release their deepest, mature oils naturally.
              </p>
            </div>
            <span className="text-[10px] uppercase font-bold tracking-widest text-primary/80">
              Honoring Time
            </span>
          </div>

          {/* Card 2: Artisanal Precision (Highlighted Primary Card - Saffron/Gold Accent) */}
          <div className="bg-primary text-primary-foreground rounded-2xl p-8 flex flex-col justify-between space-y-6 shadow-[var(--shadow-badge)] transition-transform duration-300 hover:-translate-y-1">
            <div className="space-y-4">
              <div className="size-12 rounded-xl bg-white/15 flex items-center justify-center text-primary-foreground">
                <Compass className="size-6" />
              </div>
              <h3 className="font-heading text-xl font-normal">
                Artisanal Precision
              </h3>
              <p className="font-sans text-xs md:text-sm opacity-90 leading-relaxed">
                Every grain of heritage rice, hand-measured whole cardamom, and gold saffron strand is balanced to the micro-gram according to our ancestral formulas.
              </p>
            </div>
            <span className="text-[10px] uppercase font-bold tracking-widest text-primary-foreground/80">
              Absolute Balance
            </span>
          </div>

          {/* Card 3: Garden Ingredients (Standard Theme Card) */}
          <div className="bg-card border border-border/60 rounded-2xl p-8 flex flex-col justify-between space-y-6 shadow-[var(--shadow-card)] transition-transform duration-300 hover:-translate-y-1">
            <div className="space-y-4">
              <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                <Sprout className="size-6" />
              </div>
              <h3 className="font-heading text-xl font-normal text-foreground">
                Garden Ingredients
              </h3>
              <p className="font-sans text-xs md:text-sm text-muted-foreground leading-relaxed">
                We source exclusively from local, non-hybrid bio-farms that respect crop rotation cycles, ensuring raw herbs arrive packed with unmatched trace nutrients.
              </p>
            </div>
            <span className="text-[10px] uppercase font-bold tracking-widest text-primary/80">
              Pure Provenance
            </span>
          </div>

        </div>

        {/* Bottom Element: Large Horizontal Card */}
        <div className="bg-card border border-border/60 rounded-2xl p-6 md:p-8 shadow-[var(--shadow-card)] transition-all duration-300 hover:border-primary/30">
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
            
            {/* Left: Circular Masked Image (Aligned with circular branding guidelines) */}
            <div className="size-24 md:size-32 rounded-full overflow-hidden border border-border shrink-0 bg-background shadow-sm">
              <Image
              width={500}
              height={500} 
                src="https://images.unsplash.com/photo-1596797038530-2c107229654b?q=80&w=400&auto=format&fit=crop" 
                alt="Garnishing finishing touch" 
                className="w-full h-full object-cover grayscale-[10%] hover:grayscale-0 transition-all duration-500 hover:scale-110"
              />
            </div>

            {/* Right: Detailed Context */}
            <div className="space-y-2 flex-1 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2">
                <Sparkles className="size-4 text-primary" />
                <h4 className="font-sans text-xs font-bold uppercase tracking-widest text-primary">
                  The Final Touch
                </h4>
              </div>
              <h3 className="font-heading text-lg md:text-xl font-normal text-foreground">
                Saffron Infusion Ritual
              </h3>
              <p className="font-sans text-xs md:text-sm text-muted-foreground leading-relaxed max-w-3xl">
                Moments before your clay cells are sealed, our chefs drop a fresh-steeped concentrate of hand-selected Iranian Saffron threads into the center of the dish, locking in aromatic vapor that blooms only upon opening.
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}