"use client";

import { inputStyles } from "@/lib/schema/food-schema";
import type { FoodFormValues } from "@/lib/schema/food-schema";
import { FormSection } from "@/components/dashboard/common/form-section";
import { AlertTriangle, Plus, Trash2 } from "lucide-react";
import type { Control, FieldErrors, UseFormRegister } from "react-hook-form";
import { useFieldArray } from "react-hook-form";
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
}: AllergenSectionProps) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "allergens",
  });

  return (
    <FormSection
      icon={AlertTriangle}
      title="Allergens"
      description="Flag any known allergens for customer safety."
      count={fields.length}
      action={
        <Button type="button" variant="outline" size="sm" onClick={() => append({ name: "" })}>
          <Plus className="mr-1 size-4" />
          Add Allergen
        </Button>
      }
    >
      {fields.length === 0 && (
        <p className="text-xs text-muted-foreground">No allergens flagged.</p>
      )}

      <div className="space-y-2">
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="flex items-center gap-2 rounded-xl border border-border/60 bg-card/60 p-2"
          >
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
              size="icon-sm"
              onClick={() => remove(index)}
              className="shrink-0 text-destructive hover:text-destructive/80"
            >
              <Trash2 className="size-4" />
            </Button>
          </div>
        ))}
      </div>

      {errors.allergens && (
        <p className="mt-3 text-sm text-destructive">{errors.allergens.message}</p>
      )}
    </FormSection>
  );
}
