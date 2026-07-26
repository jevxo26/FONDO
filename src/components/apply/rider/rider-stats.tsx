import React from "react";
import { Bike, User, Star, Clock } from "lucide-react";

export function StatsSection() {
  const stats = [
    { stat: "10,000+", label: "Meals Delivered", sub: "Across major zones", icon: Bike },
    { stat: "500+", label: "Active Riders", sub: "Earning every day", icon: User },
    { stat: "4.9★", label: "Rider Rating", sub: "Top satisfaction", icon: Star },
    { stat: "Every Friday", label: "Weekly Payment", sub: "Direct to bank / mobile", icon: Clock },
  ];

  return (
    <section className="py-[var(--space-section)] bg-background border-b border-border">
      <div className="wrapper px-[var(--space-container)]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((item, index) => (
            <div key={index} className="bg-card border border-border rounded-3xl p-6 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-elevated)] hover:-translate-y-1 transition-all duration-300">
              <div className="size-12 rounded-2xl bg-secondary text-primary flex items-center justify-center mb-4">
                <item.icon className="size-6" />
              </div>
              <h3 className="font-heading text-3xl sm:text-4xl font-normal text-foreground mb-1">{item.stat}</h3>
              <p className="font-semibold text-sm text-foreground">{item.label}</p>
              <p className="text-xs text-muted-foreground font-light">{item.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}