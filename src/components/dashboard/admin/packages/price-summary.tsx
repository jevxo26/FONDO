import React from "react";
import { DollarSign } from "lucide-react";
import type { FieldErrors } from "react-hook-form";
import { UseFormRegister } from "react-hook-form";
import { inputStyles, PackageFormValues } from "@/lib/schema/package-schema";
import { FormField } from "@/components/common/form-field";

export function PriceSummarySidebar({
  register,
  errors,
  packageTypeWatched,
  price,
  discountPrice,
  discountPercent,
  customTypeNameWatched,
  durationWatched,
  totalMealsCount,
  totalFoodsCount,
}: {
  register: UseFormRegister<PackageFormValues>;
  errors: FieldErrors<PackageFormValues>;
  packageTypeWatched: string;
  price: number;
  discountPrice: number;
  discountPercent: number;
  customTypeNameWatched?: string;
  durationWatched?: number;
  totalMealsCount: number;
  totalFoodsCount: number;
}) {
  const savings = Math.max(0, Number(price) - Number(discountPrice));

  return (
    <div className="sticky top-6 bg-card p-6 rounded-2xl border border-border shadow-sm space-y-6">
      <div className="border-b border-border pb-3 flex items-center gap-2">
        <DollarSign className="w-5 h-5 text-primary" />
        <h2 className="text-base font-bold text-foreground">Price & Summary</h2>
      </div>

      <div className="space-y-4">
        <FormField
          label={packageTypeWatched === "CUSTOM" ? "Custom Duration (Days)" : "Duration (Days)"}
          error={errors.durationDays}
          required
        >
          <input
            type="number"
            {...register("durationDays")}
            form="package-form"
            disabled={packageTypeWatched !== "CUSTOM"}
            className={`${inputStyles} ${packageTypeWatched !== "CUSTOM" ? "bg-muted/50 cursor-not-allowed" : ""}`}
          />
        </FormField>

        <FormField label="Standard Price (BDT)" error={errors.price} required>
          <input type="number" {...register("price")} form="package-form" className={`${inputStyles} bg-muted/50`} readOnly />
        </FormField>

        <FormField label="Discount (%)" error={errors.discountPercent} required>
          <input type="number" {...register("discountPercent")} form="package-form" className={inputStyles} min={0} max={100} />
        </FormField>

        <FormField label="Discounted Price (BDT)" error={errors.discountPrice} required>
          <input type="number" {...register("discountPrice")} form="package-form" className={`${inputStyles} bg-muted/50`} readOnly />
        </FormField>
      </div>

      <div className="bg-muted/40 p-4 rounded-xl border border-border space-y-3">
        <div className="flex justify-between items-center text-xs text-muted-foreground">
          <span>Standard Price:</span>
          <span className="line-through">{price} BDT</span>
        </div>
        <div className="flex justify-between items-center text-xs text-muted-foreground">
          <span>Savings:</span>
          <span className="text-emerald-600 font-bold">-{savings} BDT</span>
        </div>
        <div className="flex justify-between items-center text-sm font-bold text-foreground pt-2 border-t border-border">
          <span>Final Price:</span>
          <span className="text-primary text-base">{discountPrice} BDT</span>
        </div>
      </div>

      <div className="space-y-2 text-xs text-muted-foreground">
        <div className="flex justify-between">
          <span>Package Type:</span>
          <span className="font-semibold text-foreground">
            {packageTypeWatched === "CUSTOM" ? customTypeNameWatched || "Custom Plan" : packageTypeWatched}
          </span>
        </div>
        <div className="flex justify-between">
          <span>Discount:</span>
          <span className="font-semibold text-foreground">{discountPercent}%</span>
        </div>
        <div className="flex justify-between">
          <span>Total Duration:</span>
          <span className="font-semibold text-foreground">{durationWatched || 0} Days</span>
        </div>
        <div className="flex justify-between">
          <span>Total Meals:</span>
          <span className="font-semibold text-foreground">{totalMealsCount} Meals</span>
        </div>
        <div className="flex justify-between">
          <span>Total Food Items:</span>
          <span className="font-semibold text-foreground">{totalFoodsCount} Items</span>
        </div>
      </div>
    </div>
  );
}