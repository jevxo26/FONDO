"use client";

import { useState } from "react";

const CATEGORIES = ["All", "Kacchi", "Tehari", "Roast", "Kebab", "Borhani", "Dessert", "Drinks"];

export default function Categories() {
  const [active, setActive] = useState("All");

  return (
    <section className="border-y border-border/60 bg-secondary/30 py-5">
      <div className="wrapper overflow-x-auto flex items-center gap-3 no-scrollbar">
        {CATEGORIES.map((item) => {
          const isActive = active === item;
          return (
            <button
              key={item}
              onClick={() => setActive(item)}
              className={`inline-flex h-10 items-center justify-center rounded-full px-6 font-sans text-sm font-medium transition-colors border select-none whitespace-nowrap
                ${isActive 
                  ? "bg-[#16100C] border-[#16100C] text-white dark:bg-foreground dark:text-background" 
                  : "bg-white border-border text-foreground hover:bg-muted"
                }`}
            >
              {item}
            </button>
          );
        })}
      </div>
    </section>
  );
}