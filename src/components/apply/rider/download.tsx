import React from "react";
import { Smartphone } from "lucide-react";

export function DownloadAppBanner() {
  return (
    <section className="py-[var(--space-section)] bg-background border-b border-border">
      <div className="wrapper px-[var(--space-container)]">
        <div className="bg-primary text-primary-foreground rounded-4xl p-8 sm:p-12 shadow-[var(--shadow-elevated)] relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-8 space-y-4">
              <span className="px-3 py-1 bg-primary-foreground/10 text-primary-foreground text-xs font-bold uppercase tracking-label rounded-full border border-primary-foreground/20">Mobile App</span>
              <h2 className="font-heading text-3xl sm:text-5xl tracking-heading leading-tight">Download the Fondo Delivery App</h2>
              <p className="text-xs sm:text-sm font-light opacity-90 max-w-xl leading-relaxed">Accept delivery requests, track daily earnings in real time, and navigate delivery routes smoothly with our intuitive partner app.</p>
              <div className="flex flex-wrap gap-4 pt-4">
                <button type="button" className="px-6 py-3.5 bg-primary-foreground text-primary font-bold text-xs uppercase tracking-label rounded-2xl flex items-center gap-2 hover:opacity-90 transition-opacity">
                  <Smartphone className="size-4" /> Google Play
                </button>
                <button type="button" className="px-6 py-3.5 bg-primary-foreground/20 text-primary-foreground font-bold text-xs uppercase tracking-label rounded-2xl flex items-center gap-2 hover:bg-primary-foreground/30 transition-colors border border-primary-foreground/30">
                  <Smartphone className="size-4" /> App Store
                </button>
              </div>
            </div>
            <div className="lg:col-span-4 flex justify-center">
              <div className="w-48 aspect-1/2 bg-primary-foreground/10 rounded-3xl border-4 border-primary-foreground/20 flex flex-col items-center justify-center text-center p-4 relative shadow-2xl">
                <Smartphone className="size-16 text-primary-foreground/80 mb-2" />
                <span className="text-xs font-bold">Fondo Rider App</span>
                <span className="text-[10px] opacity-70">v4.2 Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}