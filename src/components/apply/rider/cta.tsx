import React from "react";
import { ArrowRight } from "lucide-react";

export function FooterCtaAndMobileNav() {
  return (
    <>
      <section className="py-[var(--space-section)] bg-foreground text-background">
        <div className="wrapper px-[var(--space-container)] text-center space-y-6 max-w-3xl">
          <span className="text-xs font-bold uppercase tracking-label text-primary">Start Earning Today</span>
          <h2 className="font-heading text-4xl sm:text-6xl tracking-heading leading-tight">Ready To Become A Fondo Delivery Partner?</h2>
          <p className="text-xs sm:text-base font-light opacity-80 leading-relaxed">Take control of your schedule, earn competitive weekly payouts, and enjoy rider insurance coverage.</p>
          <div className="pt-4">
            <a href="#apply-form" className="inline-flex items-center gap-2 px-10 py-5 bg-primary text-primary-foreground rounded-2xl font-bold text-sm uppercase tracking-label hover:opacity-90 transition-all shadow-[var(--shadow-badge)]">
              Apply Now <ArrowRight className="size-5" />
            </a>
          </div>
        </div>
      </section>

      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-card/90 backdrop-blur-md border-t border-border p-3 shadow-2xl flex items-center justify-between gap-4">
        <div>
          <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-label">Fondo Delivery</div>
          <div className="text-xs font-bold text-foreground">Earn up to ৳12,500/wk</div>
        </div>
        <a href="#apply-form" className="px-6 py-3 bg-primary text-primary-foreground rounded-xl font-bold text-xs uppercase tracking-label hover:opacity-90">
          Apply Now
        </a>
      </div>
    </>
  );
}