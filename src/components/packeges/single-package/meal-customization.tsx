"use client";

import React, { useState } from "react";
import { SlidersHorizontal, ChevronDown, Check } from "lucide-react";

export default function CustomizationEngine() {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <section className="bg-muted/60 border border-border/30 rounded-3xl p-1 transition-all">
      <div className="bg-card rounded-3xl p-6 lg:p-8 shadow-sm space-y-6">
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between group outline-none"
        >
          <div className="flex items-center gap-3">
            <div className="size-8 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
              <SlidersHorizontal className="size-4" />
            </div>
            <div className="text-left">
              <h3 className="font-heading text-base font-medium">Bespoke Heritage Concierge</h3>
              <p className="text-[11px] text-muted-foreground/70">Tailor duration frameworks, allocations, and premium add-ons</p>
            </div>
          </div>
          <ChevronDown className={`size-5 text-muted-foreground transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
        </button>

        {isOpen && (
          <div className="pt-4 border-t border-border/30 grid grid-cols-1 gap-6 animate-in fade-in duration-200">
            {/* Days Selection Matrix */}
            <div className="space-y-2">
              <label className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">Select Framework Duration</label>
              <div className="grid grid-cols-3 gap-3">
                {[7, 15, 30].map((d) => (
                  <button key={d} type="button" className={`py-3 rounded-xl border text-xs font-bold transition-all ${d === 30 ? "border-primary bg-primary/5 text-primary" : "border-border/40 bg-transparent"}`}>
                    {d} Day Ritual
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Culinary Instructions Textarea */}
            <div className="space-y-2">
              <label className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">Special Culinary Instructions</label>
              <textarea 
                className="w-full h-24 bg-background border border-border/40 rounded-xl p-3 placeholder:text-muted-foreground/40 text-xs focus:outline-none focus:ring-1 focus:ring-primary" 
                placeholder="Allergies, micro exclusions, spice variations, or specific delivery window notes..."
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}