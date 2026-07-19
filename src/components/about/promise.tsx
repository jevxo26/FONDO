import React from "react";
import { Leaf, Clock, Sparkles, Scale, Box, CheckCircle } from "lucide-react";

export default function FoodoPromise() {
  const promises = [
    { title: "Fresh Ingredients", desc: "No frozen meats or chemical preservatives used.", icon: <Leaf /> },
    { title: "Daily Preparation", desc: "Our kitchens run 24/7 to secure fresh meals daily.", icon: <Clock /> },
    { title: "Hygienic Kitchen", desc: "Strictly sanitized environments conforming to safety standards.", icon: <Sparkles /> },
    { title: "Balanced Nutrition", desc: "Scientific macros formulated by certified nutritionists.", icon: <Scale /> },
    { title: "Smart Packaging", desc: "Biodegradable, microwave-safe eco box design layouts.", icon: <Box /> },
    { title: "Quality Checked", desc: "Pre-dispatch inspections for taste and safety parameters.", icon: <CheckCircle /> },
  ];

  return (
    <section className="py-16 bg-[#EBE5DA] text-[#16100C]">
      <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-10">
        <h2 className="font-heading text-2xl md:text-3xl font-normal text-center">The Foodo Promise</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {promises.map((prom, idx) => (
            <div key={idx} className="flex gap-4 items-start">
              <div className="text-[#CEA359] bg-[#FAF5EB] p-2.5 rounded-xl border border-[#16100C]/5 shrink-0">
                {React.cloneElement(prom.icon, { className: "size-5" })}
              </div>
              <div className="space-y-1">
                <h4 className="font-sans text-xs font-bold text-[#16100C]">{prom.title}</h4>
                <p className="font-sans text-[11px] text-[#16100C]/70 leading-relaxed font-light">{prom.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}