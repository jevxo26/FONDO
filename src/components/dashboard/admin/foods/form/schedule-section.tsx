"use client";

import { FormField } from "@/components/common/form-field";
import { inputStyles } from "@/lib/schema/food-schema";
import type { AdminFoodFormValues } from "@/lib/schema/admin-food-schema";
import { CalendarClock, Plus, Trash2 } from "lucide-react";
import { useFieldArray, type Control, type FieldErrors, type UseFormRegister } from "react-hook-form";
import { Button } from "@/components/ui/button";

interface ScheduleSectionProps {
  register: UseFormRegister<AdminFoodFormValues>;
  errors: FieldErrors<AdminFoodFormValues>;
  control: Control<AdminFoodFormValues>;
}

const mealTypes = ["BREAKFAST", "LUNCH", "DINNER", "SNACKS"] as const;

export function ScheduleSection({ register, errors, control }: ScheduleSectionProps) {
  const { fields, append, remove } = useFieldArray({ control, name: "schedules" });

  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
      <div className="flex items-center justify-between border-b border-border pb-3">
        <div className="flex items-center gap-2">
          <CalendarClock className="size-5 text-primary" />
          <h2 className="text-base font-bold text-foreground">Schedules</h2>
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() =>
            append({ mealType: "LUNCH", startTime: "12:00", endTime: "15:00" })
          }
        >
          <Plus className="mr-1 size-4" />
          Add Schedule
        </Button>
      </div>

      {fields.length === 0 && (
        <p className="mt-4 text-xs text-muted-foreground">
          No schedules yet. Set when this food is available (e.g. Lunch 12:00–15:00).
        </p>
      )}

      {fields.map((field, index) => (
        <div key={field.id} className="mt-4 grid grid-cols-1 gap-3 rounded-lg border border-border p-4 md:grid-cols-3">
          <FormField label="Meal Type" error={errors.schedules?.[index]?.mealType}>
            <select {...register(`schedules.${index}.mealType`)} className={inputStyles}>
              {mealTypes.map((mt) => (
                <option key={mt} value={mt}>
                  {mt.charAt(0) + mt.slice(1).toLowerCase()}
                </option>
              ))}
            </select>
          </FormField>

          <FormField label="Start Time" error={errors.schedules?.[index]?.startTime}>
            <input type="time" {...register(`schedules.${index}.startTime`)} className={inputStyles} />
          </FormField>

          <FormField label="End Time" error={errors.schedules?.[index]?.endTime}>
            <div className="flex items-center gap-2">
              <input type="time" {...register(`schedules.${index}.endTime`)} className={inputStyles} />
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
