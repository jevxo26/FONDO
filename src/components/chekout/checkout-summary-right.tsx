"use client";

import { ArrowUpRight, ShieldCheck, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CheckoutSummaryProps {
  subtotal: number;
  deliveryFee: number;
  savings: number;
  isSubmitting: boolean;
}

export function CheckoutSummary({
  subtotal,
  deliveryFee,
  savings,
  isSubmitting,
}: CheckoutSummaryProps) {
  const total = subtotal + deliveryFee - savings;

  return (
    <div className="rounded-[32px] border border-border/50 bg-white p-6 shadow-[var(--shadow-card)] dark:bg-card flex flex-col gap-6">
      <h3 className="font-sans text-base font-semibold text-secondary-foreground tracking-tight">
        Order Summary
      </h3>

      {/* Pricing Rows */}
      <div className="flex flex-col gap-3.5 border-b border-border/40 pb-5 font-sans text-sm">
        <div className="flex justify-between text-muted-foreground">
          <span>Subtotal</span>
          <span className="font-medium text-secondary-foreground">৳{subtotal}</span>
        </div>
        <div className="flex justify-between text-muted-foreground">
          <span>Delivery fee</span>
          <span className="font-medium text-secondary-foreground">
            {deliveryFee === 0 ? "Free" : `৳${deliveryFee}`}
          </span>
        </div>
        <div className="flex justify-between text-muted-foreground">
          <span>Savings</span>
          <span className="font-medium text-rose-600 font-semibold">-৳{savings}</span>
        </div>
      </div>

      {/* Final Total */}
      <div className="flex items-center justify-between">
        <span className="font-sans text-sm font-medium text-secondary-foreground">Total</span>
        <span className="font-sans text-xl font-bold text-secondary-foreground">৳{total}</span>
      </div>

      {/* Place Order CTA Button */}
      <Button
        type="submit"
        disabled={isSubmitting}
        variant="accent"
        size="xl"
        className="w-full justify-between rounded-full pl-6 pr-3.5"
      >
        <span className="font-sans text-sm font-semibold tracking-wide capitalize">
          {isSubmitting ? "Processing..." : "Place Order"}
        </span>
        <div className="flex size-7 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <ArrowUpRight className="size-4 stroke-[2.5]" />
        </div>
      </Button>

      {/* Security Micro-Badges */}
      <div className="flex items-center justify-center gap-5 text-[11px] font-sans text-muted-foreground/80 pt-1 border-t border-border/30">
        <div className="flex items-center gap-1">
          <ShieldCheck className="size-3.5 text-emerald-600" /> 100% Secure
        </div>
        <div className="flex items-center gap-1">
          <Truck className="size-3.5 text-primary" /> Safe Delivery
        </div>
      </div>
    </div>
  );
}
