"use client";

import { Flame, Leaf, UtensilsCrossed } from "lucide-react";

export default function AboutValues() {
  const values = [
    {
      icon: Flame,
      title: "Slow Fire Cooking",
      description: "We never rush perfection. Our signature kacchi is sealed in copper pots and cooked over a slow fire to ensure maximum flavor infusion."
    },
    {
      icon: Leaf,
      title: "Locally Sourced",
      description: "From garden-pulled saffron to hand-selected spices from the morning markets of Dhaka, our ingredients dictate our daily menu."
    },
    {
      icon: UtensilsCrossed,
      title: "Master Craftsmanship",
      description: "Our kitchen is run by artisans who have dedicated decades to mastering the delicate balance of Mughlai spices and textures."
    }
  ];

  return (
    <section className="bg-secondary py-20 border-y border-border/40">
      <div className="wrapper max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-fraunces text-3xl sm:text-4xl font-normal text-foreground tracking-tight">
            The pillars of our kitchen
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <div 
              key={index}
              className="bg-card rounded-[32px] p-8 border border-border/40 shadow-sm flex flex-col items-center text-center transition-transform hover:-translate-y-1 duration-300"
            >
              <div className="size-14 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                <value.icon className="size-6 text-primary" />
              </div>
              <h3 className="font-sans text-lg font-bold text-foreground mb-3">
                {value.title}
              </h3>
              <p className="font-sans text-sm text-muted-foreground leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}