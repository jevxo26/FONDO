"use client";

import Image from "next/image";

export default function AboutHero() {
  return (
    <section className="bg-background py-16 md:py-24">
      <div className="wrapper max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Text Content */}
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <span className="font-sans text-xs uppercase tracking-widest text-primary font-bold">
                Our Heritage
              </span>
              <h1 className="font-fraunces text-4xl sm:text-5xl md:text-6xl font-normal text-foreground tracking-tight leading-[1.1]">
                Rooted in tradition. Plated for today.
              </h1>
            </div>
            
            <p className="font-sans text-base text-muted-foreground leading-relaxed">
              Food Flow began with a singular mission: to preserve the authentic, 
              slow-cooked magic of true Mughlai cuisine while presenting it in a 
              modern, elevated dining experience. Every recipe we serve has been 
              passed down through generations of master chefs in Old Dhaka.
            </p>
          </div>

          {/* Featured Image */}
          <div className="relative w-full aspect-[4/5] sm:aspect-square lg:aspect-[4/5] rounded-[32px] overflow-hidden shadow-[var(--shadow-card)] border border-border/20">
            <Image
              src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1000&auto=format&fit=crop"
              alt="Restaurant interior ambiance showing heritage architecture"
              fill
              priority
              sizes="(max-w-1024px) 100vw, 50vw"
              className="object-cover transition-transform duration-700 hover:scale-[1.02]"
            />
          </div>
          
        </div>
      </div>
    </section>
  );
}