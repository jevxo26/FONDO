import Image from "next/image";
import React from "react";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <section className="relative min-h-[85vh] flex items-center bg-background">
      <div className="w-full max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center py-12">
        {/* Left text column */}
        <div className="lg:col-span-6 space-y-6">
          <h1 className="font-heading text-4xl md:text-6xl font-normal leading-tight text-foreground">
            Healthy Meals Delivered Every Day.
          </h1>
          <p className="font-sans text-sm md:text-base text-foreground/70 max-w-lg leading-relaxed">
            Beautiful recipes you enjoy. Fresh, organic ingredients prepared by culinary specialists
            and delivered fresh to your doorstep within a dedicated daily window.
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <Button variant="default" size="lg" className="uppercase tracking-widest">
              Explore Meal Plans
            </Button>
            <Button variant="outline" size="lg" className="uppercase tracking-widest text-foreground border-foreground/20 hover:bg-foreground/5">
              Customize Your Plan
            </Button>
          </div>
        </div>
        {/* Right image column */}
        <div className="lg:col-span-6 h-[50vh] lg:h-[70vh] rounded-3xl overflow-hidden relative shadow-lg">
          <Image
            width={600}
            height={400}
            src="https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800"
            alt="Food Flow organic ingredients box"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
