"use client";

import CheckoutForm from "@/components/checkout/form/checkout-form";

export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="font-heading text-3xl font-normal text-foreground mb-8">Checkout</h1>
        <CheckoutForm />
      </div>
    </div>
  );
}
