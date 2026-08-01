"use client";

import { FormField } from "@/components/common/form-field";
import { inputStyles } from "@/lib/schema/food-schema";
import type { AdminFoodFormValues } from "@/lib/schema/admin-food-schema";
import { AlertTriangle, Plus, Trash2 } from "lucide-react";
import { useFieldArray, type Control, type FieldErrors, type UseFormRegister } from "react-hook-form";
import { Button } from "@/components/ui/button";

interface AllergenSectionProps {
  register: UseFormRegister<AdminFoodFormValues>;
  errors: FieldErrors<AdminFoodFormValues>;
  control: Control<AdminFoodFormValues>;
}

export function AllergenSection({ register, errors, control }: AllergenSectionProps) {
  const { fields, append, remove } = useFieldArray({ control, name: "allergens" });

  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
      <div className="flex items-center justify-between border-b border-border pb-3">
        <div className="flex items-center gap-2">
          <AlertTriangle className="size-5 text-primary" />
          <h2 className="text-base font-bold text-foreground">Allergens</h2>
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => append({ allergen: "", description: "" })}
        >
          <Plus className="mr-1 size-4" />
          Add Allergen
        </Button>
      </div>

      {fields.length === 0 && (
        <p className="mt-4 text-xs text-muted-foreground">
          No allergens flagged. Add any known allergens (e.g. nuts, gluten, dairy).
        </p>
      )}

      <div className="mt-4 space-y-2">
        {fields.map((field, index) => (
          <div key={field.id} className="flex items-start gap-2 rounded-md border border-border/60 p-2">
            <div className="grid min-w-0 flex-1 grid-cols-1 gap-2 sm:grid-cols-2">
              <input
                {...register(`allergens.${index}.allergen`)}
                placeholder="e.g. Gluten"
                className={inputStyles}
              />
              <input
                {...register(`allergens.${index}.description`)}
                placeholder="Note (optional)"
                className={inputStyles}
              />
            </div>
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              className="text-destructive hover:text-destructive/80"
              onClick={() => remove(index)}
            >
              <Trash2 className="size-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
