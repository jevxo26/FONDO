"use client";

import CheckoutForm from "@/components/chekout/form/checkout-form";

export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-[#FDFBF7] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="font-fraunces text-3xl font-bold text-[#16100C] mb-8">Checkout</h1>
        <CheckoutForm />
      </div>
    </div>
  );
}
