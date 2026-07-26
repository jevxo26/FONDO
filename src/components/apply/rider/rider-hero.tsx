import React from "react";
import { Sparkles, Check, ArrowRight, ShieldCheck, Bike } from "lucide-react";
import { RIDER_HIGHLIGHTS } from "./riderdata";

export function RiderHeroSection() {
  return (
    <section className="relative overflow-hidden bg-background py-[var(--space-section)] border-b border-border">
      <div className="wrapper px-[var(--space-container)] relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary text-primary border border-border text-xs font-bold uppercase tracking-wider">
              <Sparkles className="size-3.5" /> Fondo Delivery Partner Fleet
            </div>
            <h1 className="font-heading text-4xl sm:text-6xl lg:text-7xl tracking-tight text-foreground leading-[1.08]">
              Drive Your Income with <span className="text-primary italic">Fondo</span>
            </h1>
            <p className="text-muted-foreground text-lg sm:text-xl font-light max-w-2xl">
              Earn on your own terms. Deliver healthy meals across your city with flexible shifts, instant boosts, and weekly payouts.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              {RIDER_HIGHLIGHTS.map((chip, idx) => (
                <div key={idx} className="flex items-center gap-2 px-3.5 py-2.5 bg-card border border-border rounded-xl text-xs font-semibold text-foreground shadow-[var(--shadow-card)]">
                  <Check className="size-4 text-primary shrink-0" />
                  <span>{chip}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <a href="#rider-apply" className="px-8 py-4 bg-primary text-primary-foreground rounded-2xl font-bold text-sm uppercase tracking-wider hover:opacity-90 transition-all shadow-[var(--shadow-elevated)] flex items-center gap-2">
                Apply as Rider <ArrowRight className="size-4" />
              </a>
              <a href="#why-ride" className="px-8 py-4 bg-secondary text-foreground border border-border rounded-2xl font-bold text-sm hover:bg-muted transition-colors">
                Why Deliver with Us
              </a>
            </div>
          </div>
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-md aspect-4/5 rounded-3xl bg-secondary border border-border overflow-hidden shadow-[var(--shadow-elevated)] p-6 flex flex-col justify-between">
              <img src="https://images.unsplash.com/photo-1526367790999-0150786686a2?auto=format&fit=crop&q=80&w=800" alt="Delivery Rider" className="absolute inset-0 w-full h-full object-cover rounded-3xl opacity-85" />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
              <div className="relative z-10 bg-card/95 backdrop-blur-md border border-border rounded-2xl p-4 shadow-[var(--shadow-card)] flex items-center gap-3 w-max">
                <div className="size-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center font-bold">
                  <Bike className="size-5" />
                </div>
                <div>
                  <div className="text-[10px] uppercase font-bold text-muted-foreground">Active Fleet</div>
                  <div className="text-base font-bold text-foreground">3,500+ Active Riders</div>
                </div>
              </div>
              <div className="relative z-10 bg-card/95 backdrop-blur-md border border-border rounded-2xl p-4 shadow-[var(--shadow-card)] flex items-center justify-between self-end w-full max-w-xs">
                <div>
                  <div className="text-[10px] uppercase font-bold text-muted-foreground">Average Monthly</div>
                  <div className="text-xl font-bold text-foreground">৳35,000 - ৳55,000</div>
                </div>
                <div className="flex items-center gap-1 text-primary font-bold text-xs bg-primary/10 px-2.5 py-1 rounded-full">
                  <ShieldCheck className="size-3.5" /> Insured
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}