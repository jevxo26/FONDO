"use client";

import { FormField } from "@/components/common/form-field";
import { inputStyles } from "@/lib/schema/food-schema";
import type { AdminFoodFormValues } from "@/lib/schema/admin-food-schema";
import { Salad, Plus, Trash2 } from "lucide-react";
import { useFieldArray, type Control, type FieldErrors, type UseFormRegister } from "react-hook-form";
import { Button } from "@/components/ui/button";

interface IngredientSectionProps {
  register: UseFormRegister<AdminFoodFormValues>;
  errors: FieldErrors<AdminFoodFormValues>;
  control: Control<AdminFoodFormValues>;
}

export function IngredientSection({ register, errors, control }: IngredientSectionProps) {
  const { fields, append, remove } = useFieldArray({ control, name: "ingredients" });

  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
      <div className="flex items-center justify-between border-b border-border pb-3">
        <div className="flex items-center gap-2">
          <Salad className="size-5 text-primary" />
          <h2 className="text-base font-bold text-foreground">Ingredients</h2>
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() =>
            append({ ingredientName: "", quantity: "", unit: "", isOptional: false })
          }
        >
          <Plus className="mr-1 size-4" />
          Add Ingredient
        </Button>
      </div>

      {fields.length === 0 && (
        <p className="mt-4 text-xs text-muted-foreground">No ingredients listed.</p>
      )}

      <div className="mt-4 space-y-2">
        {fields.map((field, index) => (
          <div key={field.id} className="grid grid-cols-2 items-center gap-2 rounded-md border border-border/60 p-2 sm:grid-cols-5">
            <input
              {...register(`ingredients.${index}.ingredientName`)}
              placeholder="Ingredient name"
              className={`${inputStyles} col-span-2 sm:col-span-2`}
            />
            <input
              {...register(`ingredients.${index}.quantity`)}
              placeholder="Qty"
              className={inputStyles}
            />
            <input
              {...register(`ingredients.${index}.unit`)}
              placeholder="Unit"
              className={inputStyles}
            />
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                {...register(`ingredients.${index}.isOptional`)}
                className="size-4 rounded border-input text-primary accent-primary"
              />
              <span className="text-xs text-muted-foreground">Optional</span>
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                className="ml-auto text-destructive hover:text-destructive/80"
                onClick={() => remove(index)}
              >
                <Trash2 className="size-4" />
              </Button>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}
