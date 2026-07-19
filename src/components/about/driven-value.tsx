import React from "react";
import { Sparkles, ShieldCheck, Heart, ThumbsUp, Users, Smile } from "lucide-react";

export default function DrivenByValues() {
  const values = [
    { name: "Freshness", icon: <Sparkles /> },
    { name: "Quality", icon: <ShieldCheck /> },
    { name: "Taste", icon: <Heart /> },
    { name: "Nutrition", icon: <ThumbsUp /> },
    { name: "Customer First", icon: <Users /> },
    { name: "Innovation", icon: <Smile /> },
  ];

  return (
    <section className="py-16 bg-[#FAF5EB]">
      <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-10">
        <h2 className="font-heading text-2xl text-center font-normal text-[#16100C]">Driven By Values</h2>
        <div className="flex flex-wrap justify-center gap-8 md:gap-12">
          {values.map((val, idx) => (
            <div key={idx} className="flex flex-col items-center space-y-3">
              <div className="size-12 rounded-full border border-[#16100C]/15 flex items-center justify-center text-[#CEA359] bg-white shadow-sm hover:scale-105 transition-transform">
                {React.cloneElement(val.icon, { className: "size-5" })}
              </div>
              <span className="font-sans text-[10px] font-bold uppercase tracking-wider text-[#16100C]/70">
                {val.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}