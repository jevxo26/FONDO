"use client";

import React from "react";
import { Navigation, Wallet, ShieldCheck, Flame } from "lucide-react";

export function RiderAppPreviewSection() {
  return (
    <section className="py-[var(--space-section)] bg-background border-b border-border">
      <div className="wrapper px-[var(--space-container)] space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-primary">Smart Rider App</span>
          <h2 className="font-heading text-3xl sm:text-5xl tracking-tight text-foreground">Designed for On-Road Speed</h2>
          <p className="text-xs sm:text-sm text-muted-foreground">Real-time GPS routing, instant earnings view, order stack alerts, and safety emergency trigger.</p>
        </div>

        <div className="bg-card border border-border rounded-3xl p-6 sm:p-10 shadow-[var(--shadow-elevated)] max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          <div className="space-y-6">
            <div className="p-4 rounded-2xl bg-background border border-border space-y-1">
              <div className="flex items-center gap-2 text-primary text-xs font-bold"><Navigation className="size-4" /> Live Heatmaps</div>
              <p className="text-xs text-muted-foreground">Navigate directly to high-demand kitchen clusters in Gulshan & Banani.</p>
            </div>
            <div className="p-4 rounded-2xl bg-background border border-border space-y-1">
              <div className="flex items-center gap-2 text-primary text-xs font-bold"><Flame className="size-4" /> Surge Bonuses</div>
              <p className="text-xs text-muted-foreground">Earn +৳40 extra per order during lunch rushes and heavy rain.</p>
            </div>
          </div>

          <div className="flex justify-center">
            <div className="w-64 h-[420px] bg-secondary border-4 border-border rounded-3xl p-4 flex flex-col justify-between shadow-[var(--shadow-card)]">
              <div className="flex justify-between items-center text-[10px] text-muted-foreground font-mono"><span>FONDO RIDER</span><span>ONLINE</span></div>
              <div className="my-auto space-y-4 text-center">
                <div className="size-14 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto font-bold text-xl">৳</div>
                <div>
                  <div className="text-xs text-muted-foreground uppercase font-bold">Today&apos;s Earnings</div>
                  <div className="text-3xl font-bold text-foreground">৳2,150</div>
                  <div className="text-[10px] text-green-500 font-bold">14 Orders Completed</div>
                </div>
                <button className="w-full py-3 bg-primary text-primary-foreground font-bold text-xs rounded-xl shadow-md">Accept Next Order (1.2 km)</button>
              </div>
              <div className="text-[10px] text-center text-muted-foreground flex items-center justify-center gap-1"><ShieldCheck className="size-3 text-primary" /> Insurance Active</div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="p-4 rounded-2xl bg-background border border-border space-y-1">
              <div className="flex items-center gap-2 text-primary text-xs font-bold"><Wallet className="size-4" /> Daily Payouts</div>
              <p className="text-xs text-muted-foreground">Withdraw your completed trip balance instantly to bKash anytime.</p>
            </div>
            <div className="p-4 rounded-2xl bg-background border border-border space-y-1">
              <div className="flex items-center gap-2 text-primary text-xs font-bold"><ShieldCheck className="size-4" /> SOS Support</div>
              <p className="text-xs text-muted-foreground">One-tap 24/7 accident emergency response and dispatch help.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}