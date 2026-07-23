import React from "react";
import { Truck, Sparkles } from "lucide-react";

export default function DeliveryRituals() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="bg-card border border-border/20 rounded-2xl p-5 flex items-start gap-4 shadow-sm">
        <div className="p-2.5 bg-primary/5 rounded-xl text-primary shrink-0"><Truck className="size-5" /></div>
        <div className="space-y-1">
          <h4 className="text-xs font-bold text-foreground uppercase tracking-wider">Logistics Cut-offs</h4>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Meals are delivered daily between 6:00 AM and 8:30 AM. Address modifications or suspension rituals must be committed 24 hours prior via the portal interface.
          </p>
        </div>
      </div>
      <div className="bg-card border border-border/20 rounded-2xl p-5 flex items-start gap-4 shadow-sm">
        <div className="p-2.5 bg-primary/5 rounded-xl text-primary shrink-0"><Sparkles className="size-5" /></div>
        <div className="space-y-1">
          <h4 className="text-xs font-bold text-foreground uppercase tracking-wider">Eco-Cell Packaging</h4>
          <p className="text-xs text-muted-foreground leading-relaxed">
            All culinary formulas arrive packed inside zero-plastic, temperature-controlled biological cells. We collect previous cell units during the next morning drop-off cycle.
          </p>
        </div>
      </div>
    </section>
  );
}