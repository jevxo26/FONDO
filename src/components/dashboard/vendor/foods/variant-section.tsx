"use client";

import { FormField } from "@/components/common/form-field";
import { inputStyles } from "@/lib/schema/food-schema";
import { FoodFormValues } from "@/lib/schema/food-schema";
import { GripVertical, Plus, Trash2 } from "lucide-react";
import {
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
  useFieldArray,
  Control,
} from "react-hook-form";
import { Button } from "@/components/ui/button";

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
    <div className="bg-card p-6 rounded-2xl border border-border shadow-sm space-y-5">
      <div className="border-b border-border pb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <GripVertical className="w-5 h-5 text-primary" />
          <h2 className="text-base font-bold text-foreground">Variants</h2>
        </div>
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
          <Plus className="w-4 h-4 mr-1" />
          Add Variant
        </Button>
      </div>

      {fields.map((field, index) => (
        <div key={field.id} className="border border-border rounded-lg p-4 space-y-3 relative">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-foreground">Variant #{index + 1}</span>
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => {
                  if (index > 0) move(index, index - 1);
                }}
                disabled={index === 0}
                className="text-muted-foreground"
              >
                ↑
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => {
                  if (index < fields.length - 1) move(index, index + 1);
                }}
                disabled={index === fields.length - 1}
                className="text-muted-foreground"
              >
                ↓
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => remove(index)}
                className="text-destructive hover:text-destructive/80"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
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

            <FormField label="Price" error={errors.variants?.[index]?.price} required>
              <input
                type="number"
                step="0.01"
                {...register(`variants.${index}.price`)}
                placeholder="0.00"
                className={inputStyles}
              />
            </FormField>

            <FormField label="Discount Price" error={errors.variants?.[index]?.discountPrice}>
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

          <div className="flex items-center gap-2.5 pt-2">
            <input
              type="checkbox"
              id={`isDefault-${index}`}
              {...register(`variants.${index}.isDefault`)}
              className="w-4 h-4 rounded border-input text-primary accent-primary"
              onChange={(e) => {
                if (e.target.checked) {
                  fields.forEach((_, idx) => {
                    if (idx !== index) {
                      setValue(`variants.${idx}.isDefault`, false);
                    }
                  });
                }
              }}
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

      {errors.variants && <p className="text-sm text-destructive">{errors.variants.message}</p>}
    </div>
  );
}
