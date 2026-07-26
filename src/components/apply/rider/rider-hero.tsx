import React from "react";
import { Sparkles, ArrowRight, Check, DollarSign } from "lucide-react";

export function HeroSection() {
  const benefits = ["Weekly Payments", "Flexible Hours", "Performance Bonus", "Insurance Support"];
  
  return (
    <section className="relative overflow-hidden bg-background py-[var(--space-section)] border-b border-border">
      <div className="wrapper px-[var(--space-container)] relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary text-primary border border-border text-xs font-bold uppercase tracking-label">
              <Sparkles className="size-3.5" /> Join Fondo Fleet
            </div>
            <h1 className="font-heading text-5xl lg:text-7xl tracking-heading text-foreground leading-[1.08]">
              Become a <span className="text-primary italic">Fondo</span> Delivery Partner
            </h1>
            <p className="text-muted-foreground text-lg sm:text-xl font-light max-w-2xl">
              Earn flexible daily income delivering fresh, healthy meals with complete schedule freedom.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              {benefits.map((chip, idx) => (
                <div key={idx} className="flex items-center gap-2 px-3 py-2 bg-card border border-border rounded-xl text-xs font-semibold text-foreground shadow-[var(--shadow-card)]">
                  <Check className="size-4 text-success shrink-0" />
                  <span>{chip}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <a href="#apply-form" className="px-8 py-4 bg-primary text-primary-foreground rounded-2xl font-semibold text-sm uppercase tracking-label hover:opacity-90 transition-all shadow-[var(--shadow-badge)] flex items-center gap-2">
                Apply Now <ArrowRight className="size-4" />
              </a>
              <a href="#how-it-works" className="px-8 py-4 bg-secondary text-foreground border border-border rounded-2xl font-semibold text-sm hover:bg-muted">
                Learn More
              </a>
            </div>
          </div>
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-md aspect-4/5 rounded-3xl bg-secondary border border-border overflow-hidden shadow-[var(--shadow-elevated)] p-6">
              <img src="https://images.unsplash.com/photo-1617347454431-f49d7ff5c3b1?auto=format&fit=crop&q=80&w=800" alt="Rider" className="w-full h-full object-cover rounded-2xl" />
              <div className="absolute bottom-6 left-6 right-6 bg-card/95 backdrop-blur-md border border-border rounded-3xl p-4 shadow-[var(--shadow-card)] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="size-12 rounded-2xl bg-success/10 text-success flex items-center justify-center font-bold">
                    <DollarSign className="size-6" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Avg. Weekly Earnings</div>
                    <div className="text-lg font-bold text-foreground">৳12,500+ / wk</div>
                  </div>
                </div>
                <span className="px-2.5 py-1 bg-success/10 text-success text-[10px] font-bold rounded-full uppercase">High Demand</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}