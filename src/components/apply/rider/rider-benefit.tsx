import React from "react";
import { Clock, DollarSign, Award, Zap, ShieldCheck, Briefcase, Headphones, TrendingUp } from "lucide-react";

export function BenefitsSection() {
  const benefits = [
    { title: "Flexible Schedule", desc: "Log in whenever you want. You are your own boss.", icon: Clock },
    { title: "Weekly Earnings", desc: "Guaranteed payouts every Friday without delay.", icon: DollarSign },
    { title: "Performance Bonus", desc: "Earn extra incentives during peak hours & rain shifts.", icon: Award },
    { title: "Fuel Allowance", desc: "Monthly fuel subsidies for high-volume motor riders.", icon: Zap },
    { title: "Insurance Support", desc: "Complimentary emergency medical coverage during shifts.", icon: ShieldCheck },
    { title: "Professional Training", desc: "Free road safety training & customer service support.", icon: Briefcase },
    { title: "24/7 Support Team", desc: "Dedicated rider helpline whenever you are on the road.", icon: Headphones },
    { title: "Growth Opportunity", desc: "Promote to hub supervisor or fleet coordinator.", icon: TrendingUp },
  ];

  return (
    <section className="py-[var(--space-section)] bg-background border-b border-border">
      <div className="wrapper px-[var(--space-container)] space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-label text-primary">Rider Perks</span>
          <h2 className="font-heading text-3xl sm:text-5xl tracking-heading text-foreground">Built For Rider Success</h2>
          <p className="text-muted-foreground text-sm font-light">We empower our fleet with top-tier earnings, protection, and support.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((b, idx) => (
            <div key={idx} className="bg-card border border-border rounded-3xl p-6 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-elevated)] hover:-translate-y-1 transition-all duration-300 group">
              <div className="size-12 rounded-2xl bg-secondary text-primary flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <b.icon className="size-6" />
              </div>
              <h3 className="font-heading text-lg font-bold text-foreground mb-2">{b.title}</h3>
              <p className="text-xs text-muted-foreground font-light">{b.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}