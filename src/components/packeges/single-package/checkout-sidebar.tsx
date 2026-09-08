"use client";

import React from "react";
import { ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCreateCustomMealRequestMutation } from "@/store/api/slices/packages-api";
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
  const originalPrice = Number(pkg?.price || 0);
  const discountPrice = pkg?.discountPrice ? Number(pkg.discountPrice) : null;
  const basePrice = discountPrice ?? originalPrice;
  const totalPrice = basePrice + extraPrice;

  const [createCustomMealRequest, { isLoading: isPending }] =
    useCreateCustomMealRequestMutation();

  const handleSubscribe = async () => {
    try {
      const payload = {
        packageId: pkg.id,
        name: `${pkg.name} (Customized)`,
        totalDays: pkg.durationDays,
        totalPrice: totalPrice,
        days: customDays,
      };

      const res = await createCustomMealRequest(payload).unwrap();
      alert("Custom meal request submitted successfully!");
      console.log(res);
    } catch (err) {
      console.error("Failed to submit custom meal request:", err);
      alert("Something went wrong while submitting your custom request.");
    }
  };

  return (
    <div className="w-full space-y-4">
      <div className="bg-card border border-border/40 rounded-3xl p-6 shadow-sm space-y-6">
        <h3 className="font-heading text-lg font-medium border-b border-border/20 pb-3">
          Subscription Summary
        </h3>

        <div className="space-y-3 font-sans text-xs">
          <div className="flex justify-between items-center text-muted-foreground">
            <span>{pkg.name} Base</span>
            <div className="flex items-center gap-1.5">
              {discountPrice && discountPrice < originalPrice && (
                <span className="line-through text-[11px] text-muted-foreground/60">
                  ৳{originalPrice.toLocaleString()}
                </span>
              )}
              <span className="font-medium text-foreground">
                ৳{basePrice.toLocaleString()}
              </span>
            </div>
          </div>

          <div className="flex justify-between text-muted-foreground">
            <span>Custom Food Additions</span>
            <span className="font-medium text-foreground">
              ৳{extraPrice.toLocaleString()}
            </span>
          </div>

          <div className="border-t border-border/20 pt-4 mt-2 flex justify-between items-end">
            <div className="flex flex-col">
              <span className="text-[10px] uppercase font-bold text-muted-foreground/75">
                Total Allocation
              </span>
              <span className="text-[10px] text-muted-foreground">
                {pkg.durationDays} {pkg.durationDays === 1 ? "Day" : "Days"} •{" "}
                {pkg.totalMeals} Meals
              </span>
            </div>

            <span className="text-xl font-bold text-primary">
              ৳{totalPrice.toLocaleString()}
            </span>
          </div>
        </div>

        <Button
          type="button"
          onClick={handleSubscribe}
          disabled={isPending}
          variant="default"
          size="lg"
          className="w-full font-sans font-bold uppercase tracking-widest"
        >
          {isPending ? "Processing..." : "Subscribe / Request Custom Plan"}
        </Button>

        <div className="flex items-center gap-2 text-[10px] text-muted-foreground/70 justify-center">
          <ShieldCheck className="size-3.5 text-emerald-500" />
          Secure encrypted gateway authentication
        </div>
      </div>
    </div>
  );
}