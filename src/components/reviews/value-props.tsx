import React from "react";
import { Sparkles, ShieldCheck, Heart, Leaf, HelpCircle, Flame, Clock, Award } from "lucide-react";

export default function ValuePropsGrid() {
  const points = [
    { title: "Fresh Heritage Meals", icon: <Flame /> },
    { title: "Flexible Plans", icon: <Clock /> },
    { title: "Truly Affordable", icon: <Award /> },
    { title: "Healthy Choices", icon: <Heart /> },
    { title: "Reliable Eco-Delivery", icon: <Leaf /> },
    { title: "Zero Taste Compromise", icon: <Sparkles /> },
    { title: "Ease of Customization", icon: <ShieldCheck /> },
    { title: "Transparent Audit", icon: <HelpCircle /> },
  ];

  return (
    <section className="py-[var(--space-section)] bg-background">
      <div className="wrapper space-y-8">
        <div className="text-center">
          <h2 className="font-heading text-xl md:text-3xl font-normal text-foreground">Why We&apos;re Rated 4.9/5</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {points.map((pt, idx) => (
            <div key={idx} className="bg-card border border-border/60 rounded-2xl p-5 flex flex-col items-center text-center space-y-3 shadow-[var(--shadow-card)]">
              <div className="text-primary size-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                {React.cloneElement(pt.icon, { className: "size-5" })}
              </div>
              <div>
                <h4 className="font-sans text-xs font-bold text-foreground tracking-tight">{pt.title}</h4>
                <p className="text-[10px] text-muted-foreground font-sans mt-1 leading-snug">Continuous metric validation across thousands of drops.</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}