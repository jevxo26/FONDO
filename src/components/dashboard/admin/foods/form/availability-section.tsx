"use client";

import { availabilityDayOptions } from "@/lib/schema/admin-food-schema";
import type { AdminFoodFormValues } from "@/lib/schema/admin-food-schema";
import { FormSection } from "@/components/dashboard/common/form-section";
import { Clock } from "lucide-react";
import {
  Controller,
  type Control,
  type FieldErrors,
  useWatch,
} from "react-hook-form";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

interface AvailabilitySectionProps {
  errors: FieldErrors<AdminFoodFormValues>;
  control: Control<AdminFoodFormValues>;
}

export function AvailabilitySection({ errors: _errors, control }: AvailabilitySectionProps) {
  const isAvailable = useWatch({ control, name: "isAvailable" });
  const days = useWatch({ control, name: "availabilityDays" }) ?? [];

  return (
    <FormSection icon={Clock} title="Availability" description="When customers can order this food.">
      <div className="space-y-5">
        <Controller
          control={control}
          name="isAvailable"
          render={({ field }) => (
            <label className="flex cursor-pointer items-center justify-between rounded-xl border border-border/60 bg-card/60 p-4 transition-colors hover:border-primary/40">
              <div>
                <p className="text-sm font-semibold text-foreground">Available for ordering</p>
                <p className="text-xs text-muted-foreground">
                  Toggle whether customers can order this food.
                </p>
              </div>
              <Switch checked={field.value} onCheckedChange={field.onChange} onBlur={field.onBlur} />
            </label>
          )}
        />

        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Available Days
          </p>
          <div className="flex flex-wrap gap-2">
            {availabilityDayOptions.map((day) => {
              const selected = days.includes(day.value);
              return (
                <Controller
                  key={day.value}
                  control={control}
                  name="availabilityDays"
                  render={({ field }) => (
                    <button
                      type="button"
                      onClick={() => {
                        const next = selected
                          ? field.value.filter((d: string) => d !== day.value)
                          : [...field.value, day.value];
                        field.onChange(next);
                      }}
                      className={cn(
                        "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                        selected
                          ? "border-primary bg-primary text-primary-foreground shadow-[0_2px_8px_rgba(168,90,56,0.25)]"
                          : "border-border bg-muted text-muted-foreground hover:border-primary/40",
                      )}
                    >
                      {day.label}
                    </button>
                  )}
                />
              );
            })}
          </div>
          {!isAvailable && (
            <p className="mt-2 text-xs text-amber-600">Food is currently marked unavailable.</p>
          )}
        </div>
      </div>
    </FormSection>
  );
}
