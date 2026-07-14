import React from "react";
import { Star } from "lucide-react";
import Image from "next/image";

export default function ReviewsHero() {
  const summaryStats = [
    { label: "Overall Score", value: "4.9" },
    { label: "Happy Consumers", value: "10k+" },
    { label: "Meals Delivered", value: "250k+" },
    { label: "Satisfaction Rate", value: "95%" },
  ];

  return (
    <section className="py-[var(--space-section)] bg-background">
      <div className="wrapper grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Column Text Panel */}
        <div className="lg:col-span-6 space-y-6">
          <h1 className="font-fraunces text-4xl md:text-6xl font-normal leading-tight">
            Customer Reviews
          </h1>
          <p className="font-sans text-sm md:text-base text-muted-foreground leading-relaxed max-w-xl">
            See what thousands of active sub-continent food enthusiasts say about our high-protein, heritage-inspired nutritional plan boxes delivered fresh daily.
          </p>
          
          {/* Quick Metrics Metrics Layout Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-border/60">
            {summaryStats.map((stat, idx) => (
              <div key={idx} className="space-y-1">
                <div className="font-fraunces text-xl md:text-2xl font-normal text-foreground">{stat.value}</div>
                <div className="font-sans text-[10px] uppercase tracking-wider text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column Layout Media Panel */}
        <div className="lg:col-span-6 flex flex-col items-center lg:items-end">
          <div className="relative w-full max-w-lg aspect-[4/3] rounded-2xl overflow-hidden border border-border shadow-[var(--shadow-card)]">
            <Image
            width={800}
            height={600} 
              src="https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800&auto=format&fit=crop" 
              alt="Food Flow fresh ingredients box delivery unpackaging" 
              className="w-full h-full object-cover"
            />
            {/* Floating Trust Verification Badge */}
            <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm border border-border px-3 py-2 rounded-xl flex items-center gap-3 shadow-md">
              <div className="flex gap-1">
                <span className="size-2.5 rounded-full bg-[#CEA359]" />
                <span className="size-2.5 rounded-full bg-[#10B981]" />
                <span className="size-2.5 rounded-full bg-[#16100C]" />
              </div>
              <span className="font-sans text-[10px] font-bold tracking-tight text-foreground/80">
                Rated 4.9/5 stars on Trust
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}