"use client";

import CheckoutForm from "@/components/checkout/form/checkout-form";
import { SectionReveal } from "@/components/common/section-reveal";

export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-background py-8 lg:py-12">
      <div className="wrapper">
        <h1 className="font-heading text-3xl font-normal text-foreground mb-8">Checkout</h1>
        <SectionReveal>
          <CheckoutForm />
        </SectionReveal>
      </div>
    </div>
  );
}
