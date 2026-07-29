"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { PackageFormData } from "@/lib/schema/package-schema";

interface NutritionStepProps {
  data: PackageFormData;
  onChange: (field: string, value: unknown) => void;
}

export function NutritionStep({ data, onChange }: NutritionStepProps) {
  const nutrition = data.nutrition || {};

  const updateNutrition = (field: string, value: unknown) => {
    onChange("nutrition", { ...nutrition, [field]: value });
  };

  const nutritionFields = [
    { key: "dailyCalories", label: "Calories", placeholder: "e.g., 2000" },
    { key: "dailyProtein", label: "Protein (g)", placeholder: "e.g., 50" },
    { key: "dailyCarbohydrate", label: "Carbs (g)", placeholder: "e.g., 200" },
    { key: "dailyFat", label: "Fat (g)", placeholder: "e.g., 70" },
    { key: "dailyFiber", label: "Fiber (g)", placeholder: "e.g., 25" },
    { key: "dailySugar", label: "Sugar (g)", placeholder: "e.g., 50" },
    { key: "dailySodium", label: "Sodium (mg)", placeholder: "e.g., 2000" },
  ];

  return (
    <div className="space-y-6">
      <h3 className="font-fraunces text-lg font-semibold">Daily Nutrition</h3>
      <p className="text-sm text-muted-foreground">
        Set the daily nutritional values for your package
      </p>

      <div className="grid grid-cols-2 gap-4">
        {nutritionFields.map((field) => (
          <div key={field.key} className="space-y-2">
            <Label>{field.label}</Label>
            <Input
              type="number"
              value={String((nutrition as unknown as Record<string, unknown>)[field.key] ?? "")}
              onChange={(e) => updateNutrition(field.key, parseFloat(e.target.value))}
              placeholder={field.placeholder}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
