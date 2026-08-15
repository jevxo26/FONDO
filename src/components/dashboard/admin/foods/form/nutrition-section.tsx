"use client";

import { FormField } from "@/components/common/form-field";
import type { AdminFoodFormValues } from "@/lib/schema/admin-food-schema";
import { FormSection } from "@/components/dashboard/common/form-section";
import { Apple } from "lucide-react";
import type { Control, FieldErrors, UseFormRegister } from "react-hook-form";
import { Input } from "@/components/ui/input";

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
  { name: "fiber", label: "Fiber (g)" },
  { name: "sugar", label: "Sugar (g)" },
  { name: "sodium", label: "Sodium (mg)" },
  { name: "cholesterol", label: "Cholesterol (mg)" },
] as const;

export function NutritionSection({ register, errors, control: _control }: NutritionSectionProps) {
  return (
    <FormSection icon={Apple} title="Nutrition Facts" description="Per-serving macro details.">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {macroFields.map((field) => (
          <FormField key={field.name} label={field.label} error={errors[field.name]}>
            <Input type="number" step="0.01" min="0" {...register(field.name)} placeholder="0" />
          </FormField>
        ))}
      </div>
    </FormSection>
  );
}
