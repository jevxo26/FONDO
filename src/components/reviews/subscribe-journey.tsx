import React from "react";

export default function SubscriberJourney() {
  const steps = [
    { num: "1", title: "Discovery", desc: "Select and authenticate your target heritage dietary layout." },
    { num: "2", title: "Menu Tailoring", desc: "Isolate micro-exclusions and macro weights inside the console." },
    { num: "3", title: "Daily Production", desc: "Artisans slow-simmer your allocated dishes across 12 hours." },
    { num: "4", title: "Pleasure", desc: "Receive automated sterile cell drops fresh at your doorstep." },
  ];

  return (
    <section className="py-[var(--space-section)] bg-muted/20 border-t border-b border-border/20 animate-fadeIn">
      <div className="wrapper space-y-10">
        <div className="text-center">
          <h2 className="font-heading text-xl md:text-3xl font-normal text-foreground">The Typical Subscriber Journey</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, idx) => (
            <div key={idx} className="text-center space-y-3 relative">
              <div className="size-10 bg-foreground text-background font-heading text-sm flex items-center justify-center rounded-full mx-auto shadow-md">
                {step.num}
              </div>
              <h4 className="font-heading text-sm font-medium text-foreground">{step.title}</h4>
              <p className="font-sans text-xs text-muted-foreground max-w-xs mx-auto leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}