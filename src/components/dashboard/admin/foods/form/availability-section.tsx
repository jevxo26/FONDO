"use client";

import { availabilityDayOptions } from "@/lib/schema/admin-food-schema";
import type { AdminFoodFormValues } from "@/lib/schema/admin-food-schema";
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
    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
      <div className="flex items-center gap-2 border-b border-border pb-3">
        <Clock className="size-5 text-primary" />
        <h2 className="text-base font-bold text-foreground">Availability</h2>
      </div>

      <div className="mt-5 space-y-5">
        <Controller
          control={control}
          name="isAvailable"
          render={({ field }) => (
            <label className="flex cursor-pointer items-center justify-between rounded-lg border border-border p-4">
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
                          ? "border-primary bg-primary text-primary-foreground"
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
            <p className="mt-2 text-xs text-amber-600">
              Food is currently marked unavailable.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
