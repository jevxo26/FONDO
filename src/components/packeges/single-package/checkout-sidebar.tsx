"use client";

import React from "react";
import { ShieldCheck, PhoneCall } from "lucide-react";
import { useCreateCustomMealRequest } from "@/store/api/slices/packages-api";
import type { CustomDay, Package } from "@/types/package";

interface CheckoutSidebarProps {
  package: Package;
  customDays: CustomDay[];
  extraPrice: number;
}

export default function CheckoutSidebar({
  package: pkg,
  customDays,
  extraPrice,
}: CheckoutSidebarProps) {
  const basePrice = Number(pkg.discountPrice ?? pkg.price);
  const totalPrice = basePrice + extraPrice;

  const { createCustomMealRequest, isPending } = useCreateCustomMealRequest();

  const handleSubscribe = async () => {
    try {
      const payload = {
        packageId: pkg.id,
        name: `${pkg.name} (Customized)`,
        totalDays: pkg.durationDays,
        totalPrice: totalPrice,
        days: customDays,
      };

      // const res = await createCustomMealRequest(payload).unwrap();
      // alert("Custom meal request submitted successfully!");
      // console.log(res);
    } catch (err) {
      console.error("Failed to submit custom meal request:", err);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="w-full space-y-4">
      <div className="bg-card border border-border/40 rounded-3xl p-6 shadow-sm space-y-6">
        <h3 className="font-heading text-lg font-medium border-b border-border/20 pb-3">
          Subscription Architecture
        </h3>

        <div className="space-y-3 font-sans text-xs">
          <div className="flex justify-between text-muted-foreground">
            <span>{pkg.name} Base</span>
            <span className="font-medium text-foreground">৳{basePrice}</span>
          </div>

          <div className="flex justify-between text-muted-foreground">
            <span>Custom Food Additions</span>
            <span className="font-medium text-foreground">৳{extraPrice}</span>
          </div>

          <div className="border-t border-border/20 pt-4 mt-2 flex justify-between items-end">
            <div className="flex flex-col">
              <span className="text-[10px] uppercase font-bold text-muted-foreground/75">
                Total Allocation
              </span>
              <span className="text-[10px] text-muted-foreground">
                {pkg.durationDays} Day • {pkg.totalMeals} Meals
              </span>
            </div>

            <span className="text-xl font-bold text-primary">৳{totalPrice}</span>
          </div>
        </div>

        <button
          onClick={handleSubscribe}
          disabled={isPending}
          className="w-full py-3.5 bg-primary text-primary-foreground font-sans font-bold text-xs rounded-xl shadow-md hover:opacity-95 transition-all uppercase tracking-widest disabled:opacity-50"
        >
          {isPending ? "Processing..." : "Subscribe / Request Custom Plan"}
        </button>

        <div className="flex items-center gap-2 text-[10px] text-muted-foreground/70 justify-center">
          <ShieldCheck className="size-3.5 text-success" />
          Secure encrypted gateway authentication
        </div>
      </div>
    </div>
  );
}