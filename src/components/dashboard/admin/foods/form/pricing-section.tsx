"use client";

import { FormField } from "@/components/common/form-field";
import type { AdminFoodFormValues } from "@/lib/schema/admin-food-schema";
import { FormSection } from "@/components/dashboard/common/form-section";
import { BadgeDollarSign, Plus, Trash2 } from "lucide-react";
import { useFieldArray, type Control, type FieldErrors, type UseFormRegister } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";


interface PricingSectionProps {
  register: UseFormRegister<AdminFoodFormValues>;
  errors: FieldErrors<AdminFoodFormValues>;
  control: Control<AdminFoodFormValues>;
}

export function PricingSection({ register, errors, control }: PricingSectionProps) {
  const { fields, append, remove } = useFieldArray({ control, name: "prices" });

  return (
    <FormSection
      icon={BadgeDollarSign}
      title="Pricing"
      description="Base and sale price entries."
      count={fields.length}
      action={
        <Button type="button" variant="outline" size="sm" onClick={() => append({ basePrice: 0, salePrice: null })}>
          <Plus className="mr-1 size-4" />
          Add Price
        </Button>
      }
    >
      {fields.length === 0 && (
        <p className="text-xs text-muted-foreground">No price set yet. Add a base price for this food.</p>
      )}

      {fields.map((field, index) => (
        <div key={field.id} className="grid grid-cols-1 gap-3 rounded-xl border border-border/60 bg-card/60 p-4 md:grid-cols-2">
          <FormField label="Base Price (৳)" error={errors.prices?.[index]?.basePrice} required>
            <Input
              type="number"
              step="0.01"
              min="0"
              {...register(`prices.${index}.basePrice`)}
              placeholder="0.00"
            />
          </FormField>

          <FormField label="Sale Price (৳)" error={errors.prices?.[index]?.salePrice}>
            <div className="flex items-center gap-2">
              <Input
                type="number"
                step="0.01"
                min="0"
                {...register(`prices.${index}.salePrice`)}
                placeholder="0.00"
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
    </FormSection>
  );
}
