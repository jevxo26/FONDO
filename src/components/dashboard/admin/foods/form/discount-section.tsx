"use client";

import { FormField } from "@/components/common/form-field";
import { inputStyles } from "@/lib/schema/food-schema";
import type { AdminFoodFormValues } from "@/lib/schema/admin-food-schema";
import { Percent, Plus, Trash2 } from "lucide-react";
import { useFieldArray, type Control, type FieldErrors, type UseFormRegister } from "react-hook-form";
import { Button } from "@/components/ui/button";

interface DiscountSectionProps {
  register: UseFormRegister<AdminFoodFormValues>;
  errors: FieldErrors<AdminFoodFormValues>;
  control: Control<AdminFoodFormValues>;
}

export function DiscountSection({ register, errors, control }: DiscountSectionProps) {
  const { fields, append, remove } = useFieldArray({ control, name: "discounts" });

  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
      <div className="flex items-center justify-between border-b border-border pb-3">
        <div className="flex items-center gap-2">
          <Percent className="size-5 text-primary" />
          <h2 className="text-base font-bold text-foreground">Discounts</h2>
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => append({ discountType: "PERCENTAGE", discountValue: 0 })}
        >
          <Plus className="mr-1 size-4" />
          Add Discount
        </Button>
      </div>

      {fields.length === 0 && (
        <p className="mt-4 text-xs text-muted-foreground">No discounts applied.</p>
      )}

      {fields.map((field, index) => (
        <div
          key={field.id}
          className="mt-4 grid grid-cols-1 gap-3 rounded-lg border border-border p-4 md:grid-cols-2"
        >
          <FormField label="Type" error={errors.discounts?.[index]?.discountType}>
            <select {...register(`discounts.${index}.discountType`)} className={inputStyles}>
              <option value="PERCENTAGE">Percentage</option>
              <option value="FLAT">Flat (৳)</option>
            </select>
          </FormField>

          <FormField
            label="Value"
            error={errors.discounts?.[index]?.discountValue}
            required
          >
            <div className="flex items-center gap-2">
              <input
                type="number"
                step="0.01"
                min="0"
                {...register(`discounts.${index}.discountValue`)}
                placeholder="0"
                className={inputStyles}
              />
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
          </FormField>
        </div>
      ))}
    </div>
  );
}
