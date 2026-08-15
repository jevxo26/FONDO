"use client";

import { FormField } from "@/components/common/form-field";
import { inputStyles } from "@/lib/schema/food-schema";
import type { FoodFormValues } from "@/lib/schema/food-schema";
import { FormSection } from "@/components/dashboard/common/form-section";
import { DollarSign } from "lucide-react";
import type { Control, FieldErrors, UseFormRegister } from "react-hook-form";

interface PricingSectionProps {
  register: UseFormRegister<FoodFormValues>;
  errors: FieldErrors<FoodFormValues>;
  control: Control<FoodFormValues>;
}

export function PricingSection({ register, errors }: PricingSectionProps) {
  return (
    <FormSection icon={DollarSign} title="Pricing" description="Base and discount price.">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <FormField label="Base Price (৳)" error={errors.basePrice} required>
          <input
            type="number"
            step="0.01"
            {...register("basePrice")}
            placeholder="0.00"
            className={inputStyles}
          />
        </FormField>

        <FormField label="Discount Price (৳)" error={errors.discountPrice}>
          <input
            type="number"
            step="0.01"
            {...register("discountPrice")}
            placeholder="0.00"
            className={inputStyles}
          />
        </FormField>
      </div>
    </FormSection>
  );
}
