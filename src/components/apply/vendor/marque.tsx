import React from "react";
import { Utensils } from "lucide-react";
import { MARQUEE_LOGOS } from "./hero";

export function VendorMarqueeSection() {
  return (
    <div className="border-b border-border py-8 bg-card/40 overflow-hidden">
      <div className="wrapper px-[var(--space-container)] text-center mb-4">
        <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
          Trusted by Top Food Brands, Cloud Kitchens & Artisanal Chefs
        </span>
      </div>
      <div className="flex overflow-hidden space-x-12 select-none py-2">
        <div className="flex space-x-12 animate-marquee shrink-0 items-center">
          {MARQUEE_LOGOS.concat(MARQUEE_LOGOS).map((logo, index) => (
            <div
              key={index}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-background border border-border text-xs font-bold text-foreground opacity-80 hover:opacity-100 transition-opacity whitespace-nowrap shadow-[var(--shadow-card)]"
            >
              <Utensils className="size-3.5 text-primary" />
              {logo}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
