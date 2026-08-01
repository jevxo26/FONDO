"use client";

import { FormField } from "@/components/common/form-field";
import { inputStyles } from "@/lib/schema/food-schema";
import type { AdminFoodFormValues } from "@/lib/schema/admin-food-schema";
import { Apple } from "lucide-react";
import type { Control, FieldErrors, UseFormRegister } from "react-hook-form";

interface NutritionSectionProps {
  register: UseFormRegister<AdminFoodFormValues>;
  errors: FieldErrors<AdminFoodFormValues>;
  control: Control<AdminFoodFormValues>;
}

const macroFields = [
  { name: "calories", label: "Calories" },
  { name: "protein", label: "Protein (g)" },
  { name: "fat", label: "Fat (g)" },
  { name: "carbohydrate", label: "Carbs (g)" },
] as const;

export function NutritionSection({ register, errors, control: _control }: NutritionSectionProps) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
      <div className="flex items-center gap-2 border-b border-border pb-3">
        <Apple className="size-5 text-primary" />
        <h2 className="text-base font-bold text-foreground">Nutrition Facts</h2>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {macroFields.map((field) => (
          <FormField key={field.name} label={field.label} error={errors[field.name]}>
            <input
              type="number"
              step="0.01"
              min="0"
              {...register(field.name)}
              placeholder="0"
              className={inputStyles}
            />
          </FormField>
        ))}
      </div>
    </div>
  );
}
