import React from "react";
import { Utensils, Zap } from "lucide-react";

export default function PhilosophySection() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center bg-card border border-border/20 rounded-3xl p-6 lg:p-8 shadow-sm">
      <div className="md:col-span-2 space-y-3">
        <h2 className="font-heading text-xl text-foreground">The Slow-Fire Kitchen Philosophy</h2>
        <p className="text-xs text-muted-foreground leading-relaxed">
          Our methodology honors time-tested, slow-fire culinary traditions while respecting modern dietary profiles. 
          By combining ancestral cooking vessels with exact macronutrient allocation, we preserve flavor depth and trace minerals without adding excess fats.
        </p>
        <blockquote className="border-l-2 border-primary pl-3 text-xs italic text-primary/80 font-heading">
          &quot;Food is an heirloom transmission of vitality, curated across generations.&quot;
        </blockquote>
      </div>
      <div className="flex flex-col gap-3">
        <div className="bg-background border border-border/30 p-3 rounded-xl flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg text-primary"><Utensils className="size-4" /></div>
          <div>
            <h4 className="text-xs font-bold text-foreground">3 Meals Daily</h4>
            <p className="text-[10px] text-muted-foreground/70">Breakfast, lunch, & dinner</p>
          </div>
        </div>
        <div className="bg-background border border-border/30 p-3 rounded-xl flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg text-primary"><Zap className="size-4" /></div>
          <div>
            <h4 className="text-xs font-bold text-foreground">Fresh Delivery</h4>
            <p className="text-[10px] text-muted-foreground/70">Shipped every morning</p>
          </div>
        </div>
      </div>
    </section>
  );
}