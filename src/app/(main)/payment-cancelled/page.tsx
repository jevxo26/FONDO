"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Ban, ShoppingBag, Home } from "lucide-react";
import { Suspense } from "react";

function PaymentCancelledContent() {
  const searchParams = useSearchParams();
  const txId = searchParams.get("txId") ?? "";

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
      <div className="w-full max-w-[540px] flex flex-col gap-6">
        <div className="bg-card rounded-[32px] border border-border/40 p-8 text-center shadow-[var(--shadow-card)]">
          <div className="mx-auto size-16 bg-amber-50 rounded-full flex items-center justify-center mb-5">
            <Ban className="size-8 text-amber-500 stroke-[2]" />
          </div>

          <h1 className="font-heading text-3xl text-foreground font-normal tracking-tight mb-3">
            Payment Cancelled
          </h1>
          <p className="font-sans text-sm text-muted-foreground max-w-sm mx-auto leading-relaxed mb-6">
            You cancelled the payment. Your order is saved and you can complete the payment later
            from your orders page.
          </p>

          {txId && (
            <div className="bg-muted rounded-2xl p-4 flex flex-col gap-3.5 text-left mb-6 border border-border/20">
              <div className="flex justify-between items-center font-sans text-sm">
                <span className="text-muted-foreground">Transaction ID:</span>
                <span className="font-bold text-foreground text-xs">{txId}</span>
              </div>
            </div>
          )}

          <div className="flex flex-col gap-3 mb-6">
            <Link
              href="/orders"
              className="flex items-center justify-center gap-2 w-full h-12 rounded-full bg-[#16100C] text-white font-sans text-sm font-semibold transition-colors hover:bg-[#2C241E]"
            >
              <ShoppingBag className="size-4 stroke-[2]" />
              View My Orders
            </Link>
            <Link
              href="/foods"
              className="flex items-center justify-center gap-2 w-full h-12 rounded-full bg-white border border-border text-foreground font-sans text-sm font-semibold transition-colors hover:bg-muted"
            >
              <Home className="size-4 stroke-[2]" />
              Continue Shopping
            </Link>
          </div>

          <div className="font-sans text-xs text-muted-foreground/90 space-y-1">
            <p>
              Need help? Contact us at{" "}
              <a href="tel:+8801234567890" className="text-primary font-semibold hover:underline">
                +880 1234-567890
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PaymentCancelledPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-background py-12 flex items-center justify-center">
          <div className="size-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <PaymentCancelledContent />
    </Suspense>
  );
}
