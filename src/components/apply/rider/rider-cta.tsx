import React from "react";
import { Smartphone, Bike, ArrowUpRight, ArrowRight } from "lucide-react";

export function RiderCtaSection() {
  return (
    <>
      {/* Download Rider App */}
      <section className="py-[var(--space-section)] bg-background border-b border-border">
        <div className="wrapper px-[var(--space-container)]">
          <div className="bg-card border border-border rounded-4xl p-8 sm:p-12 shadow-[var(--shadow-elevated)] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Get the App
              </span>
              <h2 className="font-heading text-3xl sm:text-5xl tracking-tight text-foreground">
                Download Fondo Rider App
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground max-w-lg">
                Track order earnings, view peak zone heatmaps, and request instant payouts straight
                from your phone.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <button className="px-6 py-3.5 bg-foreground text-background rounded-2xl font-bold text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer">
                  <Smartphone className="size-4" /> Google Play
                </button>
                <button className="px-6 py-3.5 bg-foreground text-background rounded-2xl font-bold text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer">
                  <Smartphone className="size-4" /> App Store
                </button>
              </div>
            </div>
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-60 h-80 bg-secondary border-4 border-border rounded-3xl p-4 flex flex-col justify-between shadow-[var(--shadow-card)]">
                <div className="text-[10px] text-muted-foreground font-mono">FONDO DISPATCH</div>
                <div className="space-y-3 my-auto text-center">
                  <Bike className="size-12 text-foreground mx-auto" />
                  <div className="text-sm font-bold text-foreground">Ready to Ride?</div>
                  <div className="text-xs text-muted-foreground">3 Orders waiting in your zone</div>
                </div>
                <div className="text-[10px] text-center text-muted-foreground">
                  GPS Location Active
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-[var(--space-section)] bg-card border-b border-border text-center">
        <div className="wrapper px-[var(--space-container)] space-y-6 max-w-3xl mx-auto">
          <h2 className="font-heading text-3xl sm:text-6xl tracking-tight text-foreground">
            Ready to Start Earning?
          </h2>
          <p className="text-xs sm:text-base text-muted-foreground font-light max-w-xl mx-auto">
            Submit your application now and complete orientation in less than 24 hours.
          </p>
          <div className="pt-2">
            <a
              href="#rider-apply"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-2xl font-bold text-sm uppercase tracking-wider hover:opacity-90 shadow-[var(--shadow-elevated)]"
            >
              Apply as Rider Now <ArrowUpRight className="size-5" />
            </a>
          </div>
        </div>
      </section>

      {/* Mobile Sticky Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 p-3 bg-card/95 backdrop-blur-md border-t border-border lg:hidden shadow-[var(--shadow-elevated)]">
        <a
          href="#rider-apply"
          className="w-full py-3 bg-primary text-primary-foreground rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2"
        >
          Apply as Rider <ArrowRight className="size-4" />
        </a>
      </div>
    </>
  );
}
