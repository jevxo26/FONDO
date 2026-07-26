import React from "react";
import { DollarSign, Zap, TrendingUp } from "lucide-react";

export function WhyJoinFondo() {
  const cards = [
    { title: "Stable Daily Earnings", desc: "High order density across major urban food hubs ensures continuous delivery requests and steady income.", icon: DollarSign },
    { title: "Fast Payouts Every Friday", desc: "Never wait weeks for your hard-earned money. Earnings deposit automatically into your wallet every Friday.", icon: Zap },
    { title: "Career Growth Pathways", desc: "Top performing riders get fast-tracked into hub management, training roles, and regional fleet leadership.", icon: TrendingUp },
  ];

  return (
    <section className="py-[var(--space-section)] bg-background border-b border-border">
      <div className="wrapper px-[var(--space-container)] space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-label text-primary">Unrivaled Benefits</span>
          <h2 className="font-heading text-3xl sm:text-5xl tracking-heading text-foreground">Why Join Fondo?</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card, index) => (
            <div key={index} className="bg-card border border-border rounded-3xl p-8 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-elevated)] transition-all flex flex-col justify-between">
              <div className="size-14 rounded-2xl bg-secondary text-primary flex items-center justify-center mb-6">
                <card.icon className="size-7" />
              </div>
              <div>
                <h3 className="font-heading text-2xl font-semibold text-foreground mb-3">{card.title}</h3>
                <p className="text-xs sm:text-sm text-muted-foreground font-light leading-relaxed">{card.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}