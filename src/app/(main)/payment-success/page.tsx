"use client";

import Link from "next/link";
import { Check, Package, Home, CheckCircle2 } from "lucide-react";

export default function PaymentSuccessPage() {
  // Mock data matching the design spec
  const orderDetails = {
    orderNumber: "BD861964385",
    estimatedDelivery: "20/05/2026",
    paymentMethod: "Cash on Delivery",
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
      <div className="w-full max-w-[540px] flex flex-col gap-6">
        {/* MAIN SUCCESS CARD CONTAINER */}
        <div className="bg-card rounded-[32px] border border-border/40 p-8 text-center shadow-[var(--shadow-card)]">
          {/* Status Badge/Icon */}
          <div className="mx-auto size-16 bg-primary/10 rounded-full flex items-center justify-center mb-5">
            <Check className="size-8 text-primary stroke-[2.5]" />
          </div>

          {/* Celebration Headings */}
          <h1 className="font-fraunces text-3xl text-primary font-normal tracking-tight mb-3">
            Order Placed Successfully!
          </h1>
          <p className="font-sans text-sm text-muted-foreground max-w-sm mx-auto leading-relaxed mb-6">
            Thank you for your order. We&apos;ve received your order and will start processing it
            soon.
          </p>

          {/* Order Data Meta-Block (Receipt Box) */}
          <div className="bg-muted rounded-2xl p-4 flex flex-col gap-3.5 text-left mb-6 border border-border/20">
            <div className="flex justify-between items-center font-sans text-sm">
              <span className="text-muted-foreground">Order Number:</span>
              <span className="font-bold text-foreground tracking-wide">
                {orderDetails.orderNumber}
              </span>
            </div>
            <div className="flex justify-between items-center font-sans text-sm">
              <span className="text-muted-foreground">Estimated Delivery:</span>
              <span className="font-bold text-foreground">{orderDetails.estimatedDelivery}</span>
            </div>
            <div className="flex justify-between items-center font-sans text-sm">
              <span className="text-muted-foreground">Payment Method:</span>
              <span className="font-bold text-foreground">{orderDetails.paymentMethod}</span>
            </div>
          </div>

          {/* Navigation Action Buttons Stack */}
          <div className="flex flex-col gap-3 mb-6">
            <Link
              href="/track-order"
              className="flex items-center justify-center gap-2 w-full h-12 rounded-full bg-[#16100C] text-white font-sans text-sm font-semibold transition-colors hover:bg-[#2C241E]"
            >
              <Package className="size-4 stroke-[2]" />
              Track Your Order
            </Link>

            <Link
              href="/menu"
              className="flex items-center justify-center gap-2 w-full h-12 rounded-full bg-white border border-border text-foreground font-sans text-sm font-semibold transition-colors hover:bg-muted"
            >
              <Home className="size-4 stroke-[2]" />
              Continue Shopping
            </Link>
          </div>

          {/* Micro Support Copy */}
          <div className="font-sans text-xs text-muted-foreground/90 space-y-1">
            <p>A confirmation SMS has been sent to your phone number.</p>
            <p>
              Need help? Contact us at{" "}
              <a href="tel:+8801234567890" className="text-primary font-semibold hover:underline">
                +880 1234-567890
              </a>
            </p>
          </div>
        </div>

        {/* MULTI-CARD PROGRESS MILESTONE TRACKERS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Card 1: Confirmed */}
          <div className="bg-card border border-border/40 rounded-2xl p-4 text-center shadow-[var(--shadow-card)]">
            <span className="text-2xl block mb-2" role="img" aria-label="Box">
              📦
            </span>
            <h4 className="font-sans text-sm font-bold text-foreground mb-0.5">Order Confirmed</h4>
            <p className="font-sans text-[11px] text-muted-foreground">We received your order</p>
          </div>

          {/* Card 2: Processing */}
          <div className="bg-card border border-border/40 rounded-2xl p-4 text-center shadow-[var(--shadow-card)]">
            <span className="text-2xl block mb-2" role="img" aria-label="Truck">
              🚚
            </span>
            <h4 className="font-sans text-sm font-bold text-foreground mb-0.5">Processing</h4>
            <p className="font-sans text-[11px] text-muted-foreground">Preparing for delivery</p>
          </div>

          {/* Card 3: Delivered */}
          <div className="bg-card border border-border/40 rounded-2xl p-4 text-center shadow-[var(--shadow-card)]">
            <div className="size-8 mx-auto flex items-center justify-center bg-emerald-50 text-[#10B981] rounded-lg mb-1.5">
              <CheckCircle2 className="size-6 stroke-[2]" />
            </div>
            <h4 className="font-sans text-sm font-bold text-foreground mb-0.5">Delivered</h4>
            <p className="font-sans text-[11px] text-muted-foreground">Enjoy your purchase!</p>
          </div>
        </div>
      </div>
    </div>
  );
}
