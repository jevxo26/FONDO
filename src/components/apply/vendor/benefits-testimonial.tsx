import React from "react";
import { Star } from "lucide-react";
import { TESTIMONIALS, VENDOR_BENEFITS_LIST } from "./hero";

export function BenefitsTestimonialsSection() {
  return (
    <div className="space-y-0">
      {/* Benefits */}
      <section className="py-[var(--space-section)] bg-background border-b border-border">
        <div className="wrapper px-[var(--space-container)] space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-primary">Merchant Suite</span>
            <h2 className="font-heading text-3xl sm:text-5xl tracking-tight text-foreground">Everything You Need to Scale</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VENDOR_BENEFITS_LIST.map((benefit, idx) => (
              <div key={idx} className="bg-card border border-border rounded-3xl p-6 shadow-[var(--shadow-card)] flex items-center gap-3">
                <div className="size-8 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 font-bold text-sm">✓</div>
                <span className="text-xs font-bold text-foreground leading-snug">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-[var(--space-section)] bg-background border-b border-border">
        <div className="wrapper px-[var(--space-container)] space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-primary">Success Stories</span>
            <h2 className="font-heading text-3xl sm:text-5xl tracking-tight text-foreground">Partner Testimonials</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((item, idx) => (
              <div key={idx} className="bg-card border border-border rounded-3xl p-6 shadow-[var(--shadow-card)] flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-primary">
                      {[...Array(5)].map((_, i) => (<Star key={i} className="size-4 fill-primary" />))}
                    </div>
                    <span className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-bold rounded-full uppercase">{item.revenue}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-foreground font-light italic">&quot;{item.review}&quot;</p>
                </div>
                <div className="flex items-center gap-3 border-t border-border pt-4">
                  <img src={item.img} alt={item.name} className="size-11 rounded-full object-cover border border-border" />
                  <div>
                    <h4 className="text-sm font-bold text-foreground">{item.name}</h4>
                    <span className="text-[10px] text-muted-foreground uppercase font-semibold">{item.type}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}