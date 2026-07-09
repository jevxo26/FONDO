"use client";

import { Ticket, ArrowUpRight, ShieldCheck, Truck } from "lucide-react";

interface OrderSummaryProps {
  subtotal: number;
  savings: number;
  deliveryCharges: number | "free";
}

export function OrderSummary({ subtotal, savings, deliveryCharges }: OrderSummaryProps) {
  const deliveryCost = deliveryCharges === "free" ? 0 : deliveryCharges;
  const totalAmount = subtotal - savings + deliveryCost;

  return (
    <div className="rounded-[32px] border border-border/50 bg-white p-6 shadow-[var(--shadow-card)] dark:bg-card flex flex-col gap-6">
      <h3 className="font-sans text-base font-semibold text-secondary-foreground tracking-tight">
        Order Summary
      </h3>

      {/* Row Metrics Stacks */}
      <div className="flex flex-col gap-3.5 border-b border-border/40 pb-5 font-sans text-sm">
        <div className="flex justify-between text-muted-foreground">
          <span>Subtotal</span>
          <span className="font-medium text-secondary-foreground">৳{subtotal}</span>
        </div>
        <div className="flex justify-between text-muted-foreground">
          <span>Delivery charges</span>
          <span className="font-medium text-emerald-600 capitalize">
            {deliveryCharges === "free" ? "free" : `৳${deliveryCharges}`}
          </span>
        </div>
        <div className="flex justify-between text-muted-foreground">
          <span>Savings</span>
          <span className="font-medium text-rose-600 font-semibold">-৳{savings}</span>
        </div>
      </div>

      {/* Integrated Promo Input Bar */}
      <div className="relative w-full">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground flex items-center">
          <Ticket className="size-4 stroke-[1.8]" />
        </div>
        <input
          type="text"
          placeholder="Coupon code"
          className="h-11 w-full rounded-full border border-border bg-muted/20 pl-11 pr-24 font-sans text-xs focus:outline-none focus:ring-1 focus:ring-primary dark:bg-muted/5"
        />
        <button className="absolute right-1 top-1 h-9 rounded-full bg-[#CEA359] px-5 font-sans text-xs font-semibold text-[#1B0E08] hover:bg-[#bfa052] transition-colors">
          Apply
        </button>
      </div>

      {/* Total Aggregate Row */}
      <div className="flex items-center justify-between border-t border-border/40 pt-5">
        <span className="font-sans text-sm font-medium text-secondary-foreground">Total</span>
        <span className="font-sans text-xl font-bold text-secondary-foreground">৳{totalAmount}</span>
      </div>

      {/* Primary Conversion Button Action */}
      <button className="flex w-full items-center justify-between rounded-full bg-[#16100C] py-3.5 pl-6 pr-3.5 text-white transition-colors hover:bg-[#2C241E] dark:bg-foreground dark:text-background">
        <span className="font-sans text-sm font-semibold tracking-wide capitalize">checkout</span>
        <div className="flex size-7 items-center justify-center rounded-full bg-primary text-[#1B0E08]">
          <ArrowUpRight className="size-4 stroke-[2.5]" />
        </div>
      </button>

      {/* Operational Micro-Badges Trust Signals */}
      <div className="flex items-center justify-center gap-5 text-[11px] font-sans text-muted-foreground/80 pt-1 border-t border-border/30">
        <div className="flex items-center gap-1">
          <ShieldCheck className="size-3.5 text-emerald-600" /> Secure
        </div>
        <div className="flex items-center gap-1">
          <Truck className="size-3.5 text-primary" /> Fast Delivery
        </div>
      </div>
    </div>
  );
}