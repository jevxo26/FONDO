import Image from "next/image";
import React from "react";

export default function CateredNeeds() {
  const needs = [
    { name: "Simple Lean", img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=400" },
    { name: "Muscle Gain", img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=400" },
    { name: "Keto", img: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=400" },
    { name: "Weight Balance", img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=400" },
    { name: "Diabetic-Friendly", img: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?q=80&w=400" },
    { name: "Office Meal", img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=400" },
    { name: "Vegetarian", img: "https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=400" },
    { name: "Vegan", img: "https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?q=80&w=400" },
  ];

  return (
    <section className="py-20 bg-[#FAF5EB]">
      <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-12">
        <h2 className="font-heading text-2xl md:text-4xl text-center font-normal text-[#16100C]">Catered To Your Needs</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {needs.map((item, idx) => (
            <div key={idx} className="relative aspect-[4/3] rounded-2xl overflow-hidden group shadow-sm border border-[#16100C]/10">
              <Image width={500} height={500} 
                src={item.img} 
                alt={item.name} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                <span className="font-sans text-xs font-bold text-white uppercase tracking-wider">{item.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}