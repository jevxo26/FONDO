"use client";

import { ArrowUpRight, ShieldCheck, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface OrderSummaryProps {
  subtotal: number;
  savings: number;
  deliveryCharges: number | "free";
}

export function OrderSummary({ subtotal, savings, deliveryCharges }: OrderSummaryProps) {
  const deliveryCost = deliveryCharges === "free" ? 0 : Number(deliveryCharges);
  const totalAmount = Number(subtotal) - Number(savings) + deliveryCost;

  return (
    <div className="rounded-[32px] border border-border/50 bg-card p-6 shadow-[var(--shadow-card)] flex flex-col gap-6">
      <h3 className="font-sans text-base font-semibold text-secondary-foreground tracking-tight">
        Order Summary
      </h3>

      {/* Row Metrics Stacks */}
      <div className="flex flex-col gap-3.5 border-b border-border/40 pb-5 font-sans text-sm">
        <div className="flex justify-between text-muted-foreground">
          <span>Subtotal</span>
          <span className="font-medium text-secondary-foreground">৳{Number(subtotal)}</span>
        </div>
        <div className="flex justify-between text-muted-foreground">
          <span>Delivery charges</span>
          <span className="font-medium text-success capitalize">
            {deliveryCharges === "free" ? "free" : `৳${Number(deliveryCharges)}`}
          </span>
        </div>
        <div className="flex justify-between text-muted-foreground">
          <span>Savings</span>
          <span className="font-medium text-destructive font-semibold">-৳{Number(savings)}</span>
        </div>
      </div>

{/* Total Aggregate Row */}
      <div className="flex items-center justify-between border-t border-border/40 pt-5">
        <span className="font-sans text-sm font-medium text-secondary-foreground">Total</span>
        <span className="font-sans text-xl font-bold text-secondary-foreground">
          ৳{totalAmount}
        </span>
      </div>

      {/* Primary Conversion Button Action */}
      <Link href="/checkout">
        <Button
          variant="accent"
          size="xl"
          className="w-full justify-between rounded-full pl-6 pr-3.5"
        >
          <span className="font-sans text-sm font-semibold tracking-wide capitalize">checkout</span>
          <div className="flex size-7 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <ArrowUpRight className="size-4 stroke-[2.5]" />
          </div>
        </Button>
      </Link>

      {/* Operational Micro-Badges Trust Signals */}
      <div className="flex items-center justify-center gap-5 text-[11px] font-sans text-muted-foreground/80 pt-1 border-t border-border/30">
        <div className="flex items-center gap-1">
          <ShieldCheck className="size-3.5 text-success" /> Secure
        </div>
        <div className="flex items-center gap-1">
          <Truck className="size-3.5 text-primary" /> Fast Delivery
        </div>
      </div>
    </div>
  );
}
