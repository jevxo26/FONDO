"use client";

import { FormField } from "@/components/common/form-field";
import { inputStyles } from "@/lib/schema/food-schema";
import { FoodFormValues } from "@/lib/schema/food-schema";
import { AlertCircle, Plus, Trash2 } from "lucide-react";
import { FieldErrors, UseFormRegister, useFieldArray, Control } from "react-hook-form";
import { Button } from "@/components/ui/button";

interface AllergenSectionProps {
  control: Control<FoodFormValues>;
  register: UseFormRegister<FoodFormValues>;
  errors: FieldErrors<FoodFormValues>;
  allergensWatched?: { name: string }[];
}

const ALLERGEN_OPTIONS = [
  "Milk",
  "Egg",
  "Peanut",
  "Soy",
  "Gluten",
  "Fish",
  "Shellfish",
  "Tree Nuts",
  "Sesame",
  "Mustard",
];

export function AllergenSection({
  control,
  register,
  errors,
  allergensWatched,
}: AllergenSectionProps) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "allergens",
  });

  return (
    <div className="bg-card p-6 rounded-2xl border border-border shadow-sm space-y-5">
      <div className="border-b border-border pb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-primary" />
          <h2 className="text-base font-bold text-foreground">Allergens</h2>
          <span className="text-xs text-muted-foreground">({fields.length})</span>
        </div>
        <Button type="button" variant="outline" size="sm" onClick={() => append({ name: "" })}>
          <Plus className="w-4 h-4 mr-1" />
          Add Allergen
        </Button>
      </div>

      <div className="space-y-2">
        {fields.map((field, index) => (
          <div key={field.id} className="flex items-center gap-2">
            <select {...register(`allergens.${index}.name`)} className={inputStyles}>
              <option value="">Select Allergen...</option>
              {ALLERGEN_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => remove(index)}
              className="text-destructive hover:text-destructive/80 flex-shrink-0"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        ))}
      </div>

      {errors.allergens && <p className="text-sm text-destructive">{errors.allergens.message}</p>}
    </div>
  );
}
