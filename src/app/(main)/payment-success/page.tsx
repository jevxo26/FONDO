"use client";

import { useSearchParams } from "next/navigation";
import { useOrder } from "@/hooks/use-orders";
import Link from "next/link";
import { Check, Package, Home, Clock, CreditCard } from "lucide-react";
import { Suspense } from "react";

function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId") ?? "";
  const txId = searchParams.get("txId") ?? "";
  const { data: order, isLoading } = useOrder(orderId);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background py-12 flex items-center justify-center">
        <div className="size-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
      <div className="w-full max-w-[540px] flex flex-col gap-6">
        <div className="bg-card rounded-3xl border border-border/40 p-8 text-center shadow-[var(--shadow-card)]">
          <div className="mx-auto size-16 bg-primary/10 rounded-full flex items-center justify-center mb-5">
            <Check className="size-8 text-primary stroke-[2.5]" />
          </div>

          <h1 className="font-heading text-3xl text-primary font-normal tracking-tight mb-3">
            Payment Successful!
          </h1>
          <p className="font-sans text-sm text-muted-foreground max-w-sm mx-auto leading-relaxed mb-6">
            Your payment has been processed successfully. We&apos;ll start preparing your order
            right away.
          </p>

          <div className="bg-muted rounded-2xl p-4 flex flex-col gap-3.5 text-left mb-6 border border-border/20">
            <div className="flex justify-between items-center font-sans text-sm">
              <span className="text-muted-foreground">Order Number:</span>
              <span className="font-bold text-foreground tracking-wide">
                {order?.orderNumber ?? "---"}
              </span>
            </div>
            <div className="flex justify-between items-center font-sans text-sm">
              <span className="text-muted-foreground">Transaction ID:</span>
              <span className="font-bold text-foreground text-xs">{txId || "---"}</span>
            </div>
            <div className="flex justify-between items-center font-sans text-sm">
              <span className="text-muted-foreground">Total Paid:</span>
              <span className="font-bold text-foreground">
                ৳{order?.totalAmount?.toFixed(2) ?? "---"}
              </span>
            </div>
            <div className="flex justify-between items-center font-sans text-sm">
              <span className="text-muted-foreground">Payment Method:</span>
              <span className="font-bold text-foreground">Online Payment</span>
            </div>
          </div>

          <div className="flex flex-col gap-3 mb-6">
            <Link
              href="/track-order"
              className="flex items-center justify-center gap-2 w-full h-12 rounded-full bg-foreground text-background font-sans text-sm font-semibold transition-colors hover:bg-foreground/90"
            >
              <Package className="size-4 stroke-[2]" />
              Track Your Order
            </Link>
            <Link
              href="/foods"
              className="flex items-center justify-center gap-2 w-full h-12 rounded-full bg-background border border-border text-foreground font-sans text-sm font-semibold transition-colors hover:bg-muted"
            >
              <Home className="size-4 stroke-[2]" />
              Continue Shopping
            </Link>
          </div>

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

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-card border border-border/40 rounded-2xl p-4 text-center shadow-[var(--shadow-card)]">
            <div className="size-8 mx-auto flex items-center justify-center bg-primary/10 rounded-lg mb-1.5">
              <Check className="size-5 text-primary stroke-[2]" />
            </div>
            <h4 className="font-sans text-sm font-bold text-foreground mb-0.5">Paid</h4>
            <p className="font-sans text-[11px] text-muted-foreground">Payment confirmed</p>
          </div>
          <div className="bg-card border border-border/40 rounded-2xl p-4 text-center shadow-[var(--shadow-card)]">
            <div className="size-8 mx-auto flex items-center justify-center bg-warning/10 rounded-lg mb-1.5">
              <Clock className="size-5 text-warning stroke-[2]" />
            </div>
            <h4 className="font-sans text-sm font-bold text-foreground mb-0.5">Processing</h4>
            <p className="font-sans text-[11px] text-muted-foreground">Preparing your order</p>
          </div>
          <div className="bg-card border border-border/40 rounded-2xl p-4 text-center shadow-[var(--shadow-card)]">
            <div className="size-8 mx-auto flex items-center justify-center bg-success/10 rounded-lg mb-1.5">
              <Package className="size-5 text-success stroke-[2]" />
            </div>
            <h4 className="font-sans text-sm font-bold text-foreground mb-0.5">Delivered</h4>
            <p className="font-sans text-[11px] text-muted-foreground">Enjoy your food!</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-background py-12 flex items-center justify-center">
          <div className="size-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <PaymentSuccessContent />
    </Suspense>
  );
}
