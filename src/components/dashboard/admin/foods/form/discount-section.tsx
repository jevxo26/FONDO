"use client";

import { FormField } from "@/components/common/form-field";
import type { AdminFoodFormValues } from "@/lib/schema/admin-food-schema";
import { FormSection } from "@/components/dashboard/common/form-section";
import { Percent, Plus, Trash2 } from "lucide-react";
import {
  Controller,
  useFieldArray,
  type Control,
  type FieldErrors,
  type UseFormRegister,
} from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DiscountSectionProps {
  register: UseFormRegister<AdminFoodFormValues>;
  errors: FieldErrors<AdminFoodFormValues>;
  control: Control<AdminFoodFormValues>;
}

export function DiscountSection({ register, errors, control }: DiscountSectionProps) {
  const { fields, append, remove } = useFieldArray({ control, name: "discounts" });

  return (
    <FormSection
      icon={Percent}
      title="Discounts"
      description="Percentage or flat discounts."
      count={fields.length}
      action={
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => append({ discountType: "PERCENTAGE", discountValue: 0 })}
        >
          <Plus className="mr-1 size-4" />
          Add Discount
        </Button>
      }
    >
      {fields.length === 0 && (
        <p className="text-xs text-muted-foreground">No discounts applied.</p>
      )}

      {fields.map((field, index) => (
        <div
          key={field.id}
          className="grid grid-cols-1 gap-3 rounded-xl border border-border/60 bg-card/60 p-4 md:grid-cols-2"
        >
          <FormField label="Type" error={errors.discounts?.[index]?.discountType}>
            <Controller
              control={control}
              name={`discounts.${index}.discountType`}
              render={({ field }) => (
                <Select value={field.value ?? ""} onValueChange={field.onChange}>
                  <SelectTrigger className="h-11 w-full">
                    <SelectValue placeholder="Select type..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="PERCENTAGE">Percentage</SelectItem>
                    <SelectItem value="FLAT">Flat (৳)</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </FormField>

          <FormField label="Value" error={errors.discounts?.[index]?.discountValue} required>
            <div className="flex items-center gap-2">
              <Input
                type="number"
                step="0.01"
                min="0"
                {...register(`discounts.${index}.discountValue`)}
                placeholder="0"
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
