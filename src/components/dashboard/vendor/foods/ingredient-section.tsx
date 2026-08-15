"use client";

import { inputStyles } from "@/lib/schema/food-schema";
import type { FoodFormValues } from "@/lib/schema/food-schema";
import { FormSection } from "@/components/dashboard/common/form-section";
import { Plus, Salad, Trash2 } from "lucide-react";
import type { Control, FieldErrors, UseFormRegister } from "react-hook-form";
import { useFieldArray } from "react-hook-form";
import { Button } from "@/components/ui/button";

interface IngredientSectionProps {
  control: Control<FoodFormValues>;
  register: UseFormRegister<FoodFormValues>;
  errors: FieldErrors<FoodFormValues>;
  ingredientsWatched?: { name: string }[];
}

export function IngredientSection({
  control,
  register,
  errors,
}: IngredientSectionProps) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "ingredients",
  });

  return (
    <FormSection
      icon={Salad}
      title="Ingredients"
      description="List what goes into this dish."
      count={fields.length}
      action={
        <Button type="button" variant="outline" size="sm" onClick={() => append({ name: "" })}>
          <Plus className="mr-1 size-4" />
          Add Ingredient
        </Button>
      }
    >
      {fields.length === 0 && (
        <p className="text-xs text-muted-foreground">No ingredients listed yet.</p>
      )}

      <div className="space-y-2">
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="flex items-center gap-2 rounded-xl border border-border/60 bg-card/60 p-2"
          >
            <input
              {...register(`ingredients.${index}.name`)}
              placeholder="e.g. Chicken Breast"
              className={inputStyles}
            />
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

      {errors.ingredients && (
        <p className="mt-3 text-sm text-destructive">{errors.ingredients.message}</p>
      )}
    </FormSection>
  );
}
