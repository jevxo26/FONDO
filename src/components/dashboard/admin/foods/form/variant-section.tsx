"use client";

import { FormField } from "@/components/common/form-field";
import { inputStyles } from "@/lib/schema/food-schema";
import type { AdminFoodFormValues } from "@/lib/schema/admin-food-schema";
import { GripVertical, Plus, Trash2 } from "lucide-react";
import { useFieldArray, type Control, type FieldErrors, type UseFormRegister } from "react-hook-form";
import { Button } from "@/components/ui/button";

interface VariantSectionProps {
  register: UseFormRegister<AdminFoodFormValues>;
  errors: FieldErrors<AdminFoodFormValues>;
  control: Control<AdminFoodFormValues>;
}

export function VariantSection({ register, errors, control }: VariantSectionProps) {
  const { fields, append, remove } = useFieldArray({ control, name: "variants" });

  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
      <div className="flex items-center justify-between border-b border-border pb-3">
        <div className="flex items-center gap-2">
          <GripVertical className="size-5 text-primary" />
          <h2 className="text-base font-bold text-foreground">Variants</h2>
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() =>
            append({
              name: "",
              description: "",
              price: 0,
              discountPrice: null,
              weight: "",
              servingSize: "",
            })
          }
        >
          <Plus className="mr-1 size-4" />
          Add Variant
        </Button>
      </div>

      {fields.length === 0 && (
        <p className="mt-4 text-xs text-muted-foreground">
          No variants yet. Add sizes/portions (e.g. Regular, Large).
        </p>
      )}

      {fields.map((field, index) => (
        <div key={field.id} className="mt-4 space-y-3 rounded-lg border border-border p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-foreground">Variant #{index + 1}</span>
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

          <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
            <FormField label="Name" error={errors.variants?.[index]?.name} required>
              <input
                {...register(`variants.${index}.name`)}
                placeholder="e.g. Regular"
                className={inputStyles}
              />
            </FormField>

            <FormField label="Weight" error={errors.variants?.[index]?.weight}>
              <input
                {...register(`variants.${index}.weight`)}
                placeholder="e.g. 500g"
                className={inputStyles}
              />
            </FormField>

            <FormField label="Serving Size" error={errors.variants?.[index]?.servingSize}>
              <input
                {...register(`variants.${index}.servingSize`)}
                placeholder="e.g. 1 plate"
                className={inputStyles}
              />
            </FormField>

            <FormField label="Price (৳)" error={errors.variants?.[index]?.price} required>
              <input
                type="number"
                step="0.01"
                min="0"
                {...register(`variants.${index}.price`)}
                placeholder="0.00"
                className={inputStyles}
              />
            </FormField>

            <FormField label="Discount Price (৳)" error={errors.variants?.[index]?.discountPrice}>
              <input
                type="number"
                step="0.01"
                min="0"
                {...register(`variants.${index}.discountPrice`)}
                placeholder="0.00"
                className={inputStyles}
              />
            </FormField>

            <FormField label="Description" error={errors.variants?.[index]?.description}>
              <input
                {...register(`variants.${index}.description`)}
                placeholder="Optional"
                className={inputStyles}
              />
            </FormField>
          </div>
        </div>
      ))}
    </div>
  );
}
