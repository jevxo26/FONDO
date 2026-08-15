"use client";

import { FormField } from "@/components/common/form-field";
import type { AdminFoodFormValues } from "@/lib/schema/admin-food-schema";
import { FormSection } from "@/components/dashboard/common/form-section";
import { GripVertical, Plus, Trash2 } from "lucide-react";
import { useFieldArray, type Control, type FieldErrors, type UseFormRegister } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";


interface VariantSectionProps {
  register: UseFormRegister<AdminFoodFormValues>;
  errors: FieldErrors<AdminFoodFormValues>;
  control: Control<AdminFoodFormValues>;
}

export function VariantSection({ register, errors, control }: VariantSectionProps) {
  const { fields, append, remove } = useFieldArray({ control, name: "variants" });

  return (
    <FormSection
      icon={GripVertical}
      title="Variants"
      description="Sizes or portions with their own price."
      count={fields.length}
      action={
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
      }
    >
      {fields.length === 0 && (
        <p className="text-xs text-muted-foreground">
          No variants yet. Add sizes/portions (e.g. Regular, Large).
        </p>
      )}

      {fields.map((field, index) => (
        <div key={field.id} className="space-y-3 rounded-xl border border-border/60 bg-card/60 p-4">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <span className="flex size-6 items-center justify-center rounded-md bg-primary/10 font-heading text-xs font-bold text-primary">
                {index + 1}
              </span>
              Variant {field.name ? `“${field.name}”` : `#${index + 1}`}
            </span>
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
              <Input
                {...register(`variants.${index}.name`)}
                placeholder="e.g. Regular"
              />
            </FormField>

            <FormField label="Weight" error={errors.variants?.[index]?.weight}>
              <Input
                {...register(`variants.${index}.weight`)}
                placeholder="e.g. 500g"
              />
            </FormField>

            <FormField label="Serving Size" error={errors.variants?.[index]?.servingSize}>
              <Input
                {...register(`variants.${index}.servingSize`)}
                placeholder="e.g. 1 plate"
              />
            </FormField>

            <FormField label="Price (৳)" error={errors.variants?.[index]?.price} required>
              <Input
                type="number"
                step="0.01"
                min="0"
                {...register(`variants.${index}.price`)}
                placeholder="0.00"
              />
            </FormField>

            <FormField label="Discount Price (৳)" error={errors.variants?.[index]?.discountPrice}>
              <Input
                type="number"
                step="0.01"
                min="0"
                {...register(`variants.${index}.discountPrice`)}
                placeholder="0.00"
              />
            </FormField>

            <FormField label="Description" error={errors.variants?.[index]?.description}>
              <Input
                {...register(`variants.${index}.description`)}
                placeholder="Optional"
              />
            </FormField>
          </div>
        </div>
      ))}
    </FormSection>
  );
}
