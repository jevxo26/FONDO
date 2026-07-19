"use client";

import React from "react";
import { Star, ChevronLeft, ChevronRight, Play } from "lucide-react";

export default function FeaturedStories() {
  return (
    <section className="py-[var(--space-section)] bg-muted/30 border-t border-b border-border/40">
      <div className="wrapper space-y-8">
        
        {/* Header Row with Navigation Controls */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-primary font-sans text-xs font-bold uppercase tracking-widest block">Subscribers</span>
            <h2 className="font-heading text-2xl md:text-4xl font-normal text-foreground">Featured Stories</h2>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-full border border-border bg-background hover:bg-muted text-foreground transition-all">
              <ChevronLeft className="size-4" />
            </button>
            <button className="p-2 rounded-full border border-border bg-background hover:bg-muted text-foreground transition-all">
              <ChevronRight className="size-4" />
            </button>
          </div>
        </div>

        {/* 2-Column Editorial Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Block: Text Quote Box */}
          <div className="lg:col-span-6 bg-card border border-border/60 rounded-2xl p-8 flex flex-col justify-between shadow-[var(--shadow-card)]">
            <div className="space-y-6">
              <div className="flex text-primary">
                {[...Array(5)].map((_, i) => <Star key={i} className="size-4 fill-current" />)}
              </div>
              <blockquote className="font-heading text-lg md:text-xl text-foreground leading-relaxed font-light italic">
                &ldquo;As a Weight Loss Subscriber, I&apos;ve tried many services, but Food Flow is the first that actually feels like a restaurant experience at home. The meals are incredibly fresh, and the on-time delivery means I never miss a scheduled breakfast or dinner framework.&rdquo;
              </blockquote>
            </div>
            <div className="flex items-center gap-3 pt-6 border-t border-border/40 mt-6">
              <div className="size-10 rounded-full bg-primary/20 overflow-hidden shrink-0">
                <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop" alt="Ahmad Farooq" className="w-full h-full object-cover" />
              </div>
              <div>
                <h4 className="font-sans text-xs font-bold text-foreground">Ahmad Farooq</h4>
                <p className="font-sans text-[10px] text-muted-foreground uppercase tracking-wider">30-Day Lean Nutrition Framework</p>
              </div>
            </div>
          </div>

          {/* Right Block: Stacked Video Testimonials */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { img: "https://images.unsplash.com/photo-1543353071-10c8ba85a904?q=80&w=500", label: "Traditional Dinner Unboxing" },
              { img: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?q=80&w=500", label: "Mughal Macro Customization" }
            ].map((video, idx) => (
              <div key={idx} className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-border group shadow-[var(--shadow-card)] bg-card">
                <img src={video.img} alt={video.label} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-[#16100C]/40 flex items-center justify-center">
                  <button className="size-12 rounded-full bg-background/90 text-foreground flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-all pl-0.5">
                    <Play className="size-5 fill-current text-foreground" />
                  </button>
                </div>
                <div className="absolute bottom-3 left-3 right-3 bg-background/80 backdrop-blur-sm px-3 py-1.5 rounded-xl border border-border text-[10px] font-bold text-foreground tracking-wide truncate">
                  {video.label}
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}