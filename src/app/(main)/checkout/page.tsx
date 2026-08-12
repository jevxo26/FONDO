"use client";

import { ShoppingCart } from "lucide-react";
import CheckoutForm from "@/components/checkout/form/checkout-form";
import { SectionReveal } from "@/components/common/section-reveal";

export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/[0.01] via-background to-primary/[0.01] py-8 lg:py-12 relative">
      <div className="pointer-events-none absolute -top-40 -right-40 z-0 size-80 rounded-full bg-primary/5 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -left-40 z-0 size-80 rounded-full bg-primary/5 blur-3xl" />
      <div className="wrapper relative z-10">
        <div className="flex items-center gap-3 mb-8">
          <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 ring-1 ring-primary/15">
            <ShoppingCart className="size-5 text-foreground" />
          </div>
          <div>
            <h1 className="font-heading text-3xl font-normal text-foreground">Checkout</h1>
            <p className="text-[11px] text-muted-foreground">Complete your order</p>
          </div>
        </div>
        <SectionReveal>
          <CheckoutForm />
        </SectionReveal>
      </div>
    </div>
  );
}
