"use client";

import type { AdminFoodFormValues } from "@/lib/schema/admin-food-schema";
import { Apple, Plus, Trash2 } from "lucide-react";
import { useFieldArray, type Control, type FieldErrors, type UseFormRegister } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";


interface DietsSectionProps {
  register: UseFormRegister<AdminFoodFormValues>;
  errors: FieldErrors<AdminFoodFormValues>;
  control: Control<AdminFoodFormValues>;
}

export function DietsSection({ register, errors, control }: DietsSectionProps) {
  const { fields, append, remove } = useFieldArray({ control, name: "diets" });

  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
      <div className="flex items-center justify-between border-b border-border pb-3">
        <div className="flex items-center gap-2">
          <Apple className="size-5 text-primary" />
          <h2 className="text-base font-bold text-foreground">Diets</h2>
        </div>
        <Button type="button" variant="outline" size="sm" onClick={() => append({ dietType: "" })}>
          <Plus className="mr-1 size-4" />
          Add Diet
        </Button>
      </div>

      {fields.length === 0 && (
        <p className="mt-4 text-xs text-muted-foreground">No diets flagged.</p>
      )}

      <div className="mt-4 space-y-2">
        {fields.map((field, index) => (
          <div key={field.id} className="flex items-center gap-2">
            <Input
              {...register(`diets.${index}.dietType`)}
              placeholder="e.g. Keto, Halal, Vegan"
            />
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              className="shrink-0 text-destructive hover:text-destructive/80"
              onClick={() => remove(index)}
            >
              <Trash2 className="size-4" />
            </Button>
          </div>
        ))}
        {errors.diets && <p className="text-xs font-medium text-red-500">{errors.diets.message}</p>}
      </div>
    </div>
  );
}
