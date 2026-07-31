"use client";

import { FormField } from "@/components/common/form-field";
import { inputStyles } from "@/lib/schema/food-schema";
import { FoodFormValues } from "@/lib/schema/food-schema";
import { Apple } from "lucide-react";
import { FieldErrors, UseFormRegister, Control } from "react-hook-form";

interface NutritionSectionProps {
  register: UseFormRegister<FoodFormValues>;
  errors: FieldErrors<FoodFormValues>;
  control: Control<FoodFormValues>;
}

export function NutritionSectionFood({ register, errors }: NutritionSectionProps) {
  return (
    <div className="bg-card p-6 rounded-2xl border border-border shadow-sm space-y-5">
      <div className="border-b border-border pb-3 flex items-center gap-2">
        <Apple className="w-5 h-5 text-primary" />
        <h2 className="text-base font-bold text-foreground">Nutrition</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <FormField label="Calories" error={errors.nutrition?.calories} required>
          <input
            type="number"
            {...register("nutrition.calories")}
            placeholder="0"
            className={inputStyles}
          />
        </FormField>

        <FormField label="Protein (g)" error={errors.nutrition?.protein}>
          <input
            type="number"
            step="0.1"
            {...register("nutrition.protein")}
            placeholder="0.0"
            className={inputStyles}
          />
        </FormField>

        <FormField label="Fat (g)" error={errors.nutrition?.fat}>
          <input
            type="number"
            step="0.1"
            {...register("nutrition.fat")}
            placeholder="0.0"
            className={inputStyles}
          />
        </FormField>

        <FormField label="Carbohydrate (g)" error={errors.nutrition?.carbohydrate}>
          <input
            type="number"
            step="0.1"
            {...register("nutrition.carbohydrate")}
            placeholder="0.0"
            className={inputStyles}
          />
        </FormField>

        <FormField label="Fiber (g)" error={errors.nutrition?.fiber}>
          <input
            type="number"
            step="0.1"
            {...register("nutrition.fiber")}
            placeholder="0.0"
            className={inputStyles}
          />
        </FormField>

        <FormField label="Sugar (g)" error={errors.nutrition?.sugar}>
          <input
            type="number"
            step="0.1"
            {...register("nutrition.sugar")}
            placeholder="0.0"
            className={inputStyles}
          />
        </FormField>

        <FormField label="Sodium (mg)" error={errors.nutrition?.sodium}>
          <input
            type="number"
            {...register("nutrition.sodium")}
            placeholder="0"
            className={inputStyles}
          />
        </FormField>

        <FormField label="Serving Size" error={errors.nutrition?.servingSize}>
          <input
            {...register("nutrition.servingSize")}
            placeholder="e.g. 100g"
            className={inputStyles}
          />
        </FormField>
      </div>
    </div>
  );
}
