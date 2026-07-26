import React from "react";
import { FileText, ShieldCheck, Headphones, Zap } from "lucide-react";

export function HowItWorksSection() {
  const steps = [
    { step: "Step 1", title: "Submit Application", desc: "Fill out your details & upload identity documents online.", icon: FileText },
    { step: "Step 2", title: "Document Verification", desc: "Our fast-track team verifies your identity in under 24 hrs.", icon: ShieldCheck },
    { step: "Step 3", title: "Attend Orientation", desc: "Complete brief app orientation and collect your Fondo kit.", icon: Headphones },
    { step: "Step 4", title: "Start Delivering", desc: "Go online, accept meal orders, and get paid every Friday.", icon: Zap },
  ];

  return (
    <section id="how-it-works" className="py-[var(--space-section)] bg-background border-b border-border">
      <div className="wrapper px-[var(--space-container)] space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-label text-primary">Simple Onboarding</span>
          <h2 className="font-heading text-3xl sm:text-5xl tracking-heading text-foreground">How To Get Started</h2>
          <p className="text-muted-foreground text-sm font-light">Start delivering and earning in 4 seamless steps.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((st, i) => (
            <div key={i} className="bg-card border border-border rounded-3xl p-6 shadow-[var(--shadow-card)] hover:border-primary transition-colors">
              <div className="flex items-center justify-between mb-6">
                <span className="text-[10px] font-bold uppercase tracking-label px-3 py-1 bg-secondary rounded-full text-primary border border-border">{st.step}</span>
                <div className="size-10 rounded-2xl bg-secondary text-primary flex items-center justify-center"><st.icon className="size-5" /></div>
              </div>
              <h3 className="font-heading text-xl font-semibold text-foreground mb-2">{st.title}</h3>
              <p className="text-xs text-muted-foreground font-light">{st.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}