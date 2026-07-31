"use client";

import { FormField } from "@/components/common/form-field";
import { inputStyles } from "@/lib/schema/food-schema";
import { FoodFormValues } from "@/lib/schema/food-schema";
import { Plus, Trash2 } from "lucide-react";
import { FieldErrors, UseFormRegister, useFieldArray, Control } from "react-hook-form";
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
  ingredientsWatched,
}: IngredientSectionProps) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "ingredients",
  });

  return (
    <div className="bg-card p-6 rounded-2xl border border-border shadow-sm space-y-5">
      <div className="border-b border-border pb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-base font-bold text-foreground">Ingredients</h2>
          <span className="text-xs text-muted-foreground">({fields.length})</span>
        </div>
        <Button type="button" variant="outline" size="sm" onClick={() => append({ name: "" })}>
          <Plus className="w-4 h-4 mr-1" />
          Add Ingredient
        </Button>
      </div>

      <div className="space-y-2">
        {fields.map((field, index) => (
          <div key={field.id} className="flex items-center gap-2">
            <input
              {...register(`ingredients.${index}.name`)}
              placeholder="e.g. Chicken Breast"
              className={inputStyles}
            />
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

      {errors.ingredients && (
        <p className="text-sm text-destructive">{errors.ingredients.message}</p>
      )}
    </div>
  );
}
