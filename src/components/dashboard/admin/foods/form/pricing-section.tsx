"use client";

import { FormField } from "@/components/common/form-field";
import { inputStyles } from "@/lib/schema/food-schema";
import type { AdminFoodFormValues } from "@/lib/schema/admin-food-schema";
import { BadgeDollarSign, Plus, Trash2 } from "lucide-react";
import { useFieldArray, type Control, type FieldErrors, type UseFormRegister } from "react-hook-form";
import { Button } from "@/components/ui/button";

interface PricingSectionProps {
  register: UseFormRegister<AdminFoodFormValues>;
  errors: FieldErrors<AdminFoodFormValues>;
  control: Control<AdminFoodFormValues>;
}

export function PricingSection({ register, errors, control }: PricingSectionProps) {
  const { fields, append, remove } = useFieldArray({ control, name: "prices" });

  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
      <div className="flex items-center justify-between border-b border-border pb-3">
        <div className="flex items-center gap-2">
          <BadgeDollarSign className="size-5 text-primary" />
          <h2 className="text-base font-bold text-foreground">Pricing</h2>
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => append({ basePrice: 0, salePrice: null })}
        >
          <Plus className="mr-1 size-4" />
          Add Price
        </Button>
      </div>

      {fields.length === 0 && (
        <p className="mt-4 text-xs text-muted-foreground">
          No price set yet. Add a base price for this food.
        </p>
      )}

      {fields.map((field, index) => (
        <div key={field.id} className="mt-4 grid grid-cols-1 gap-3 rounded-lg border border-border p-4 md:grid-cols-2">
          <FormField label="Base Price (৳)" error={errors.prices?.[index]?.basePrice} required>
            <input
              type="number"
              step="0.01"
              min="0"
              {...register(`prices.${index}.basePrice`)}
              placeholder="0.00"
              className={inputStyles}
            />
          </FormField>

          <FormField label="Sale Price (৳)" error={errors.prices?.[index]?.salePrice}>
            <div className="flex items-center gap-2">
              <input
                type="number"
                step="0.01"
                min="0"
                {...register(`prices.${index}.salePrice`)}
                placeholder="0.00"
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
