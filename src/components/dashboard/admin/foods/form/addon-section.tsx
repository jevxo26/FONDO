"use client";

import { FormField } from "@/components/common/form-field";
import { inputStyles } from "@/lib/schema/food-schema";
import type { AdminFoodFormValues, AddonForm } from "@/lib/schema/admin-food-schema";
import { ListPlus, Plus, Trash2 } from "lucide-react";
import {
  useFieldArray,
  type Control,
  type FieldErrors,
  type UseFormRegister,
} from "react-hook-form";
import { Button } from "@/components/ui/button";

interface AddonSectionProps {
  register: UseFormRegister<AdminFoodFormValues>;
  errors: FieldErrors<AdminFoodFormValues>;
  control: Control<AdminFoodFormValues>;
}

function AddonCard({
  index,
  control,
  register,
  errors,
  onRemove,
}: {
  index: number;
  control: Control<AdminFoodFormValues>;
  register: UseFormRegister<AdminFoodFormValues>;
  errors: FieldErrors<AdminFoodFormValues>;
  onRemove: () => void;
}) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `addons.${index}.items`,
  });

  return (
    <div className="mt-4 rounded-lg border border-border p-4">
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-foreground">Addon Group #{index + 1}</span>
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          className="text-destructive hover:text-destructive/80"
          onClick={onRemove}
        >
          <Trash2 className="size-4" />
        </Button>
      </div>

      <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-3">
        <FormField label="Group Name" error={errors.addons?.[index]?.name} required>
          <input
            {...register(`addons.${index}.name`)}
            placeholder="e.g. Extra Toppings"
            className={inputStyles}
          />
        </FormField>

        <FormField label="Max Selection" error={errors.addons?.[index]?.maxSelection}>
          <input
            type="number"
            min="0"
            {...register(`addons.${index}.maxSelection`)}
            placeholder="Leave empty for unlimited"
            className={inputStyles}
          />
        </FormField>

        <label className="flex items-end gap-2.5 pb-2.5">
          <input
            type="checkbox"
            {...register(`addons.${index}.isRequired`)}
            className="size-4 rounded border-input text-primary accent-primary"
          />
          <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Required
          </span>
        </label>
      </div>

      <div className="mt-4 border-t border-border pt-3">
        <div className="flex items-center justify-between">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Items
          </p>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => append({ name: "", price: 0, image: "" })}
          >
            <Plus className="mr-1 size-3.5" />
            Add Item
          </Button>
        </div>

        {fields.length === 0 && (
          <p className="mt-2 text-xs text-muted-foreground">No items in this group.</p>
        )}

        <div className="mt-3 space-y-2">
          {fields.map((item, itemIndex) => (
            <div key={item.id} className="grid grid-cols-1 gap-2 rounded-md border border-border/60 p-2 sm:grid-cols-3">
              <input
                {...register(`addons.${index}.items.${itemIndex}.name`)}
                placeholder="Item name"
                className={inputStyles}
              />
              <input
                type="number"
                step="0.01"
                min="0"
                {...register(`addons.${index}.items.${itemIndex}.price`)}
                placeholder="Price"
                className={inputStyles}
              />
              <div className="flex items-center gap-2">
                <input
                  {...register(`addons.${index}.items.${itemIndex}.image`)}
                  placeholder="Image URL (optional)"
                  className={inputStyles}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  className="shrink-0 text-destructive hover:text-destructive/80"
                  onClick={() => remove(itemIndex)}
                >
                  <Trash2 className="size-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function AddonSection({ register, errors, control }: AddonSectionProps) {
  const { fields, append, remove } = useFieldArray<AdminFoodFormValues, "addons">({
    control,
    name: "addons",
  });

  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
      <div className="flex items-center justify-between border-b border-border pb-3">
        <div className="flex items-center gap-2">
          <ListPlus className="size-5 text-primary" />
          <h2 className="text-base font-bold text-foreground">Addons</h2>
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() =>
            append({
              name: "",
              isRequired: false,
              maxSelection: null,
              items: [],
            } as AddonForm)
          }
        >
          <Plus className="mr-1 size-4" />
          Add Addon Group
        </Button>
      </div>

      {fields.length === 0 && (
        <p className="mt-4 text-xs text-muted-foreground">
          No addon groups yet. Add options like sauces, toppings or extra sides.
        </p>
      )}

      {fields.map((field, index) => (
        <AddonCard
          key={field.id}
          index={index}
          control={control}
          register={register}
          errors={errors}
          onRemove={() => remove(index)}
        />
      ))}
    </div>
  );
}
