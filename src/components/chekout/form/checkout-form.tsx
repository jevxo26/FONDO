"use client"
import { useState } from 'react';
import { useForm } from "react-hook-form";
import { CheckoutFormData, PaymentMethodType } from "@/types/chekout-type";
import { CheckoutSummary } from '../checkout-summary-right';
import { Check, CreditCard, ShoppingBag, Truck } from 'lucide-react';
const CheckoutForm = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);

     // Initialize React Hook Form
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    reset
  } = useForm<CheckoutFormData>({
    defaultValues: {
      fulfillment: "delivery",
      paymentMethod: "online",
      streetAddress: "",
      city: "",
      zipCode: "",
      recipientName: "",
      phoneNumber: "",
      orderNotes: "",
    }
  });

  // Watch streams to monitor toggle state variants live
  const currentFulfillment = watch("fulfillment");
  const currentPaymentMethod = watch("paymentMethod");

  // Handler for form execution blocks
  const onSubmitForm = async (data: CheckoutFormData) => {
    setIsSubmitting(true);

    try {
      // Simulate API network latency delay
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // Data prints cleanly to the console for debugging
      console.log("=== CHECKOUT DEBUG SUBMISSION ===", data);
            reset(); // Clear input rows safely
    } catch (error) {
      console.error("Submission failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

    return (
        <>
        <form onSubmit={handleSubmit(onSubmitForm)} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: Main Order Form (65% width) */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            {/* 1. FULFILLMENT METHOD SECTION */}
            <div className="bg-white rounded-[24px] border border-border/40 p-6 shadow-sm">
              <h2 className="font-sans text-base font-semibold text-[#16100C] mb-4">
                How would you like your order?
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Delivery Selector */}
                <button
                  type="button"
                  onClick={() => setValue("fulfillment", "delivery")}
                  className={`flex items-center gap-4 p-5 rounded-2xl transition-all border text-left ${
                    currentFulfillment === "delivery"
                      ? "bg-[#16100C] border-[#16100C] text-white"
                      : "bg-[#FDFBF7] border-border text-[#16100C]"
                  }`}
                >
                  <div className={`p-2.5 rounded-xl ${currentFulfillment === "delivery" ? "bg-[#CEA359]/20" : "bg-white border"}`}>
                    <Truck className={`size-5 ${currentFulfillment === "delivery" ? "text-[#CEA359]" : "text-muted-foreground"}`} />
                  </div>
                  <div>
                    <p className="font-sans text-sm font-semibold">Delivery</p>
                    <p className={`font-sans text-xs ${currentFulfillment === "delivery" ? "text-neutral-300" : "text-muted-foreground"}`}>Get it delivered to your door</p>
                  </div>
                </button>

                {/* Pickup Selector */}
                <button
                  type="button"
                  onClick={() => setValue("fulfillment", "pickup")}
                  className={`flex items-center gap-4 p-5 rounded-2xl transition-all border text-left ${
                    currentFulfillment === "pickup"
                      ? "bg-[#16100C] border-[#16100C] text-white"
                      : "bg-[#FDFBF7] border-border text-[#16100C]"
                  }`}
                >
                  <div className={`p-2.5 rounded-xl ${currentFulfillment === "pickup" ? "bg-[#CEA359]/20" : "bg-white border"}`}>
                    <ShoppingBag className={`size-5 ${currentFulfillment === "pickup" ? "text-[#CEA359]" : "text-muted-foreground"}`} />
                  </div>
                  <div>
                    <p className="font-sans text-sm font-semibold">Pick up</p>
                    <p className={`font-sans text-xs ${currentFulfillment === "pickup" ? "text-neutral-300" : "text-muted-foreground"}`}>Collect directly from kitchen</p>
                  </div>
                </button>
              </div>
            </div>

            {/* 2. DELIVERY ADDRESS SECTION */}
            {currentFulfillment === "delivery" && (
              <div className="bg-white rounded-[24px] border border-border/40 p-6 shadow-sm flex flex-col gap-4">
                <h2 className="font-sans text-base font-semibold text-[#16100C]">Delivery Address</h2>
                
                <div className="flex flex-col gap-1">
                  <label className="font-sans text-xs font-medium text-muted-foreground pl-1">Street Address</label>
                  <input
                    type="text"
                    placeholder="House number, road number, area line..."
                    {...register("streetAddress", { required: currentFulfillment === "delivery" })}
                    className={`h-11 rounded-xl border bg-[#FDFBF7]/60 px-4 font-sans text-sm focus:outline-none focus:ring-1 focus:ring-[#CEA359] ${
                      errors.streetAddress ? "border-rose-400 focus:ring-rose-400" : "border-border"
                    }`}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="font-sans text-xs font-medium text-muted-foreground pl-1">City</label>
                    <input
                      type="text"
                      placeholder="e.g. Dhaka"
                      {...register("city", { required: currentFulfillment === "delivery" })}
                      className={`h-11 rounded-xl border bg-[#FDFBF7]/60 px-4 font-sans text-sm focus:outline-none focus:ring-1 focus:ring-[#CEA359] ${
                        errors.city ? "border-rose-400 focus:ring-rose-400" : "border-border"
                      }`}
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="font-sans text-xs font-medium text-muted-foreground pl-1">ZIP / Postal Code</label>
                    <input
                      type="text"
                      placeholder="1213"
                      {...register("zipCode", { required: currentFulfillment === "delivery" })}
                      className={`h-11 rounded-xl border bg-[#FDFBF7]/60 px-4 font-sans text-sm focus:outline-none focus:ring-1 focus:ring-[#CEA359] ${
                        errors.zipCode ? "border-rose-400 focus:ring-rose-400" : "border-border"
                      }`}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* 3. CONTACT DETAILS SECTION */}
            <div className="bg-white rounded-[24px] border border-border/40 p-6 shadow-sm flex flex-col gap-4">
              <h2 className="font-sans text-base font-semibold text-[#16100C]">Contact Information</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="font-sans text-xs font-medium text-muted-foreground pl-1">Recipient Name</label>
                  <input
                    type="text"
                    placeholder="Full name"
                    {...register("recipientName", { required: true })}
                    className={`h-11 rounded-xl border bg-[#FDFBF7]/60 px-4 font-sans text-sm focus:outline-none focus:ring-1 focus:ring-[#CEA359] ${
                      errors.recipientName ? "border-rose-400 focus:ring-rose-400" : "border-border"
                    }`}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="font-sans text-xs font-medium text-muted-foreground pl-1">Phone Number</label>
                  <input
                    type="tel"
                    placeholder="+880 1XXX XXXXXX"
                    {...register("phoneNumber", { required: true })}
                    className={`h-11 rounded-xl border bg-[#FDFBF7]/60 px-4 font-sans text-sm focus:outline-none focus:ring-1 focus:ring-[#CEA359] ${
                      errors.phoneNumber ? "border-rose-400 focus:ring-rose-400" : "border-border"
                    }`}
                  />
                </div>
              </div>
            </div>

            {/* 4. PAYMENT METHOD SECTION */}
            <div className="bg-white rounded-[24px] border border-border/40 p-6 shadow-sm">
              <h2 className="font-sans text-base font-semibold text-[#16100C] mb-4">Payment Method</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { id: "online", label: "Online Card" },
                  { id: "bkash", label: "bKash" },
                  { id: "nagad", label: "Nagad" },
                  { id: "cod", label: "Cash on Delivery" },
                ].map((method) => {
                  const isSelected = currentPaymentMethod === method.id;
                  return (
                    <button
                      key={method.id}
                      type="button"
                      onClick={() => setValue("paymentMethod", method.id as PaymentMethodType)}
                      className={`relative flex flex-col items-center justify-center p-4 rounded-xl border transition-all text-center min-h-[84px] ${
                        isSelected
                          ? "bg-[#16100C] border-[#16100C] text-white"
                          : "bg-[#FDFBF7] border-border text-muted-foreground hover:border-neutral-400"
                      }`}
                    >
                      {isSelected && (
                        <div className="absolute top-1.5 right-1.5 size-4 bg-[#CEA359] rounded-full flex items-center justify-center">
                          <Check className="size-2.5 text-[#1B0E08] stroke-[3]" />
                        </div>
                      )}
                      <CreditCard className={`size-4 mb-1.5 ${isSelected ? "text-[#CEA359]" : "text-muted-foreground/80"}`} />
                      <span className="font-sans text-xs font-semibold leading-tight">{method.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 5. ORDER NOTES SECTION */}
            <div className="bg-white rounded-[24px] border border-border/40 p-6 shadow-sm flex flex-col gap-2">
              <h2 className="font-sans text-base font-semibold text-[#16100C]">Order Notes</h2>
              <textarea
                rows={4}
                placeholder="Add special instructions for cooking preferences, allergies, or drop-off guidelines..."
                {...register("orderNotes")}
                className="w-full p-4 rounded-xl border border-border bg-[#FDFBF7]/60 font-sans text-sm focus:outline-none focus:ring-1 focus:ring-[#CEA359] resize-none"
              />
            </div>

          </div>

          {/* RIGHT COLUMN: Sticky Order Summary Panel (35% width) */}
          <div className="lg:col-span-4 lg:sticky lg:top-24">
            <CheckoutSummary
              subtotal={570}
              deliveryFee={currentFulfillment === "delivery" ? 60 : 0}
              savings={80}
              isSubmitting={isSubmitting}
            />
          </div>

        </form>
        </>
         
    );
};

export default CheckoutForm;