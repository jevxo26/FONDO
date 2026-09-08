"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";

export function DashboardPreviewSection() {
  const [activeTab, setActiveTab] = useState<"orders" | "analytics">("orders");

  return (
    <section className="py-[var(--space-section)] bg-background border-b border-border">
      <div className="wrapper px-[var(--space-container)] space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Merchant Portal
          </span>
          <h2 className="font-heading text-3xl sm:text-5xl tracking-tight text-foreground">
            Powerful Merchant Dashboard
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Real-time control over orders, performance, inventory, and financials.
          </p>
        </div>

        <div className="bg-card border border-border rounded-3xl overflow-hidden shadow-[var(--shadow-elevated)] max-w-5xl mx-auto">
          <div className="bg-secondary/60 border-b border-border px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="size-3 rounded-full bg-red-500/80" />
              <span className="size-3 rounded-full bg-yellow-500/80" />
              <span className="size-3 rounded-full bg-green-500/80" />
              <span className="text-xs text-muted-foreground font-mono ml-2">
                merchant.fondo.com/dashboard
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="xs"
                onClick={() => setActiveTab("orders")}
                className={activeTab === "orders" ? "bg-primary text-primary-foreground" : ""}
              >
                Live Orders
              </Button>
              <Button
                variant="ghost"
                size="xs"
                onClick={() => setActiveTab("analytics")}
                className={activeTab === "analytics" ? "bg-primary text-primary-foreground" : ""}
              >
                Analytics
              </Button>
            </div>
          </div>

          <div className="p-6 space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 bg-background border border-border rounded-2xl">
                <div className="text-[10px] text-muted-foreground uppercase font-bold">
                  Today&apos;s Revenue
                </div>
                <div className="text-2xl font-bold text-foreground">৳14,250</div>
                <span className="text-[10px] text-green-500 font-bold">+18% from yesterday</span>
              </div>
              <div className="p-4 bg-background border border-border rounded-2xl">
                <div className="text-[10px] text-muted-foreground uppercase font-bold">
                  Active Orders
                </div>
                <div className="text-2xl font-bold text-foreground">24 Prep</div>
                <span className="text-[10px] text-primary font-bold">8 Ready for Pickup</span>
              </div>
              <div className="p-4 bg-background border border-border rounded-2xl">
                <div className="text-[10px] text-muted-foreground uppercase font-bold">
                  Weekly Payout
                </div>
                <div className="text-2xl font-bold text-foreground">৳98,400</div>
                <span className="text-[10px] text-muted-foreground">Settles Friday</span>
              </div>
              <div className="p-4 bg-background border border-border rounded-2xl">
                <div className="text-[10px] text-muted-foreground uppercase font-bold">
                  Rating Score
                </div>
                <div className="text-2xl font-bold text-foreground">4.92★</div>
                <span className="text-[10px] text-muted-foreground">340 Reviews</span>
              </div>
            </div>

            <div className="bg-background border border-border rounded-2xl overflow-hidden">
              <div className="px-4 py-3 border-b border-border flex justify-between items-center text-xs font-bold">
                <span>Recent Live Orders</span>
                <span className="text-primary cursor-pointer">View All →</span>
              </div>
              <div className="divide-y divide-border text-xs">
                <div className="p-3 flex justify-between items-center">
                  <div>
                    <span className="font-bold text-foreground">#ORD-9021</span> - High Protein Bowl
                  </div>
                  <span className="px-2.5 py-1 bg-yellow-500/10 text-yellow-600 font-bold rounded-full text-[10px]">
                    In Kitchen
                  </span>
                </div>
                <div className="p-3 flex justify-between items-center">
                  <div>
                    <span className="font-bold text-foreground">#ORD-9020</span> - Keto Salad Box
                  </div>
                  <span className="px-2.5 py-1 bg-green-500/10 text-green-600 font-bold rounded-full text-[10px]">
                    Rider Picked Up
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
