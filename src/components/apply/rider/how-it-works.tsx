import React from "react";
import { RIDER_STEPS } from "./riderdata";

export function RiderHowItWorksSection() {
  return (
    <section className="py-[var(--space-section)] bg-background border-b border-border">
      <div className="wrapper px-[var(--space-container)] space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Easy Onboarding
          </span>
          <h2 className="font-heading text-3xl sm:text-5xl tracking-tight text-foreground">
            How to Join the Fleet
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {RIDER_STEPS.map((st, i) => (
            <div
              key={i}
              className="bg-card border border-border rounded-3xl p-6 shadow-[var(--shadow-card)] flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="size-10 rounded-2xl bg-primary text-primary-foreground font-heading font-bold flex items-center justify-center text-base">
                    {st.step}
                  </span>
                  <st.icon className="size-6 text-muted-foreground" />
                </div>
                <h3 className="font-heading text-lg font-bold text-foreground mb-2">{st.title}</h3>
                <p className="text-xs text-muted-foreground font-light leading-relaxed">
                  {st.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
