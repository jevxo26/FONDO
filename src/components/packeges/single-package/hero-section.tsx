import React from "react";
import { Star } from "lucide-react";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-card border border-border/40 group shadow-sm">
      <div className="relative h-[400px] lg:h-[480px] overflow-hidden">
        <Image width={500} height={500} 
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
          alt="Signature Slim-Down Kit" 
          src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=1200&auto=format&fit=crop&q=80"
        />
        {/* Visual Warm Contrast Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/40 to-transparent" />
        
        <div className="absolute bottom-0 left-0 p-6 lg:p-10 w-full space-y-3 text-white">
          <div className="flex items-center gap-2">
            <span className="bg-primary text-primary-foreground px-3.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-[0.15em]">Premium Choice</span>
            <span className="bg-white/10 backdrop-blur px-3 py-1 rounded-full text-[9px] font-bold text-white uppercase tracking-[0.15em]">High Protein</span>
          </div>
          <h1 className="font-heading text-3xl lg:text-5xl font-normal leading-tight">Signature Slim-Down</h1>
          <p className="text-background/80 font-sans text-xs sm:text-sm max-w-2xl leading-relaxed">
            Precision-balanced culinary heritage designed for sustainable weight management. Every meal is a symphony of local ingredients and nutritional science.
          </p>
          <div className="flex items-center gap-6 pt-2">
            <div className="flex items-center gap-1.5 text-xs">
              <div className="flex text-primary"><Star className="size-3.5 fill-current" /></div>
              <span className="font-semibold">4.9 <span className="text-white/60 font-normal">(120+ reviews)</span></span>
            </div>
            <div className="h-3 w-px bg-white/30" />
            <div className="text-xs">
              <span className="text-white/60">Starts from </span>
              <span className="text-base font-bold ml-0.5">৳380<span className="text-[10px] font-normal text-white/60">/meal</span></span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}