"use client";

import { FormField } from "@/components/common/form-field";
import { inputStyles } from "@/lib/schema/food-schema";
import { FoodFormValues } from "@/lib/schema/food-schema";
import { DollarSign } from "lucide-react";
import { FieldErrors, UseFormRegister, Control } from "react-hook-form";

interface PricingSectionProps {
  register: UseFormRegister<FoodFormValues>;
  errors: FieldErrors<FoodFormValues>;
  control: Control<FoodFormValues>;
}

export function PricingSection({ register, errors }: PricingSectionProps) {
  return (
    <div className="bg-card p-6 rounded-2xl border border-border shadow-sm space-y-5">
      <div className="border-b border-border pb-3 flex items-center gap-2">
        <DollarSign className="w-5 h-5 text-primary" />
        <h2 className="text-base font-bold text-foreground">Pricing</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField label="Base Price" error={errors.basePrice} required>
          <input
            type="number"
            step="0.01"
            {...register("basePrice")}
            placeholder="0.00"
            className={inputStyles}
          />
        </FormField>

        <FormField label="Discount Price" error={errors.discountPrice}>
          <input
            type="number"
            step="0.01"
            {...register("discountPrice")}
            placeholder="0.00"
            className={inputStyles}
          />
        </FormField>
      </div>
    </div>
  );
}
