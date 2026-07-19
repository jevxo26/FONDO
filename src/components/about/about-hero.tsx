import Image from "next/image";
import React from "react";

export default function HeroSection() {
  return (
    <section className="relative min-h-[85vh] flex items-center bg-[#FAF5EB]">
      <div className="w-full max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center py-12">
        {/* Left text column */}
        <div className="lg:col-span-6 space-y-6">
          <h1 className="font-heading text-4xl md:text-6xl font-normal leading-tight text-[#16100C]">
            Healthy Meals Delivered Every Day.
          </h1>
          <p className="font-sans text-sm md:text-base text-[#16100C]/70 max-w-lg leading-relaxed">
            Beautiful recipes you enjoy. Fresh, organic ingredients prepared by culinary specialists and delivered fresh to your doorstep within a dedicated daily window.
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <button className="px-6 py-3 bg-[#CEA359] text-[#FAF5EB] font-sans font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-[#b08443] transition-colors">
              Explore Meal Plans
            </button>
            <button className="px-6 py-3 border border-[#16100C]/20 text-[#16100C] font-sans font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-[#16100C]/5 transition-colors">
              Customize Your Plan
            </button>
          </div>
        </div>
        {/* Right image column */}
        <div className="lg:col-span-6 h-[50vh] lg:h-[70vh] rounded-3xl overflow-hidden relative shadow-lg">
          <Image width={600} height={400}
            src="https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800" 
            alt="Food Flow organic ingredients box" 
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}