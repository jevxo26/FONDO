import React from "react";
import { Utensils, Zap } from "lucide-react";

export default function PhilosophySection() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center bg-white border border-[#d7c3b2]/20 rounded-[2rem] p-6 lg:p-8 shadow-sm">
      <div className="md:col-span-2 space-y-3">
        <h2 className="font-serif text-xl text-[#1e1b17]">The Slow-Fire Kitchen Philosophy</h2>
        <p className="text-xs text-[#524437] leading-relaxed">
          Our methodology honors time-tested, slow-fire culinary traditions while respecting modern dietary profiles. 
          By combining ancestral cooking vessels with exact macronutrient allocation, we preserve flavor depth and trace minerals without adding excess fats.
        </p>
        <blockquote className="border-l-2 border-[#885200] pl-3 text-xs italic text-[#885200]/80 font-serif">
          &quot;Food is an heirloom transmission of vitality, curated across generations.&quot;
        </blockquote>
      </div>
      <div className="flex flex-col gap-3">
        <div className="bg-[#fff8f3] border border-[#d7c3b2]/30 p-3 rounded-xl flex items-center gap-3">
          <div className="p-2 bg-[#885200]/10 rounded-lg text-[#885200]"><Utensils className="size-4" /></div>
          <div>
            <h4 className="text-xs font-bold text-[#1e1b17]">3 Meals Daily</h4>
            <p className="text-[10px] text-[#524437]/70">Breakfast, lunch, & dinner</p>
          </div>
        </div>
        <div className="bg-[#fff8f3] border border-[#d7c3b2]/30 p-3 rounded-xl flex items-center gap-3">
          <div className="p-2 bg-[#885200]/10 rounded-lg text-[#885200]"><Zap className="size-4" /></div>
          <div>
            <h4 className="text-xs font-bold text-[#1e1b17]">Fresh Delivery</h4>
            <p className="text-[10px] text-[#524437]/70">Shipped every morning</p>
          </div>
        </div>
      </div>
    </section>
  );
}