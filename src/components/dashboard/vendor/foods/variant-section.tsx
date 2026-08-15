"use client";

import { FormField } from "@/components/common/form-field";
import { inputStyles } from "@/lib/schema/food-schema";
import type { FoodFormValues } from "@/lib/schema/food-schema";
import { FormSection } from "@/components/dashboard/common/form-section";
import { ArrowDown, ArrowUp, GripVertical, Plus, Trash2 } from "lucide-react";
import type {
  Control,
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";
import { useFieldArray } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

interface VariantSectionProps {
  control: Control<FoodFormValues>;
  register: UseFormRegister<FoodFormValues>;
  errors: FieldErrors<FoodFormValues>;
  setValue: UseFormSetValue<FoodFormValues>;
  variantsWatched?: {
    variantName: string;
    sku: string;
    servingSize: string;
    price: number;
    discountPrice?: number;
    stock: number;
    isDefault: boolean;
  }[];
}

export function VariantSection({
  control,
  register,
  errors,
  setValue,
  variantsWatched,
}: VariantSectionProps) {
  const { fields, append, remove, move } = useFieldArray({
    control,
    name: "variants",
  });

  return (
    <FormSection
      icon={GripVertical}
      title="Variants"
      description="Sizes or portions with their own price and stock."
      count={fields.length}
      action={
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() =>
            append({
              variantName: "",
              sku: "",
              servingSize: "",
              price: 0,
              discountPrice: 0,
              stock: 0,
              isDefault: fields.length === 0,
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

      <div className="space-y-3">
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="rounded-2xl border border-border/60 bg-card/60 p-4 shadow-[var(--shadow-card)]"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="flex size-7 items-center justify-center rounded-lg bg-primary/10 font-heading text-sm font-bold text-primary">
                  {index + 1}
                </span>
                <span className="text-sm font-semibold text-foreground">
                  Variant {variantsWatched?.[index]?.variantName || `#${index + 1}`}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  onClick={() => index > 0 && move(index, index - 1)}
                  disabled={index === 0}
                  className="text-muted-foreground"
                >
                  <ArrowUp className="size-4" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  onClick={() => index < fields.length - 1 && move(index, index + 1)}
                  disabled={index === fields.length - 1}
                  className="text-muted-foreground"
                >
                  <ArrowDown className="size-4" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  onClick={() => remove(index)}
                  className="text-destructive hover:text-destructive/80"
                >
                  <Trash2 className="size-4" />
                </Button>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-3">
              <FormField label="Variant Name" error={errors.variants?.[index]?.variantName} required>
                <input
                  {...register(`variants.${index}.variantName`)}
                  placeholder="e.g. Large"
                  className={inputStyles}
                />
              </FormField>

              <FormField label="SKU" error={errors.variants?.[index]?.sku} required>
                <input
                  {...register(`variants.${index}.sku`)}
                  placeholder="SKU-001"
                  className={inputStyles}
                />
              </FormField>

              <FormField label="Serving Size" error={errors.variants?.[index]?.servingSize}>
                <input
                  {...register(`variants.${index}.servingSize`)}
                  placeholder="e.g. 200g"
                  className={inputStyles}
                />
              </FormField>

              <FormField label="Price (৳)" error={errors.variants?.[index]?.price} required>
                <input
                  type="number"
                  step="0.01"
                  {...register(`variants.${index}.price`)}
                  placeholder="0.00"
                  className={inputStyles}
                />
              </FormField>

              <FormField label="Discount Price (৳)" error={errors.variants?.[index]?.discountPrice}>
                <input
                  type="number"
                  step="0.01"
                  {...register(`variants.${index}.discountPrice`)}
                  placeholder="0.00"
                  className={inputStyles}
                />
              </FormField>

              <FormField label="Stock" error={errors.variants?.[index]?.stock} required>
                <input
                  type="number"
                  {...register(`variants.${index}.stock`)}
                  placeholder="0"
                  className={inputStyles}
                />
              </FormField>
            </div>

            <div className="mt-4 flex items-center gap-2.5 border-t border-border/60 pt-3">
              <Switch
                checked={variantsWatched?.[index]?.isDefault ?? false}
                onCheckedChange={(checked) => {
                  if (checked) {
                    fields.forEach((_, idx) => {
                      setValue(`variants.${idx}.isDefault`, idx === index);
                    });
                  }
                }}
                id={`isDefault-${index}`}
              />
              <label
                htmlFor={`isDefault-${index}`}
                className="text-xs font-medium text-foreground cursor-pointer select-none"
              >
                Set as Default Variant
              </label>
            </div>
          </div>
        ))}
      </div>

      {errors.variants && <p className="mt-3 text-sm text-destructive">{errors.variants.message}</p>}
    </FormSection>
  );
}
