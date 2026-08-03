"use client";

import type { FoodFormValues } from "@/lib/schema/food-schema";
import { inputStyles } from "@/lib/schema/food-schema";
import { FormSection } from "@/components/dashboard/common/form-section";
import { Clock } from "lucide-react";
import type { Control, FieldErrors, UseFormRegister } from "react-hook-form";
import { Controller, useWatch } from "react-hook-form";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

interface AvailabilitySectionProps {
  register: UseFormRegister<FoodFormValues>;
  errors: FieldErrors<FoodFormValues>;
  control: Control<FoodFormValues>;
}

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const toggles = [
  { name: "available", label: "Available", hint: "Customers can order this food." },
  { name: "visible", label: "Visible on menu", hint: "Show in the customer menu." },
  { name: "featured", label: "Featured", hint: "Highlight on the home page." },
  { name: "popular", label: "Popular", hint: "Mark as a crowd favourite." },
  { name: "recommended", label: "Recommended", hint: "Chef's recommendation." },
] as const;

export function AvailabilitySection({ control, errors }: AvailabilitySectionProps) {
  const availableDays = useWatch({ control, name: "availableDays" }) ?? [];

  return (
    <FormSection icon={Clock} title="Availability" description="When and where this food is shown.">
      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {toggles.map((t) => (
            <Controller
              key={t.name}
              control={control}
              name={t.name}
              render={({ field }) => (
                <label className="flex cursor-pointer items-center justify-between gap-3 rounded-xl border border-border/60 bg-card/60 p-3.5 transition-colors hover:border-primary/40">
                  <div>
                    <p className="text-sm font-semibold text-foreground">{t.label}</p>
                    <p className="text-xs text-muted-foreground">{t.hint}</p>
                  </div>
                  <Switch checked={field.value} onCheckedChange={field.onChange} onBlur={field.onBlur} />
                </label>
              )}
            />
          ))}
        </div>

        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Available Days
          </p>
          <div className="flex flex-wrap gap-2">
            {DAYS.map((day) => {
              const selected = availableDays.includes(day);
              return (
                <Controller
                  key={day}
                  control={control}
                  name="availableDays"
                  render={({ field }) => (
                    <button
                      type="button"
                      onClick={() => {
                        const next = selected
                          ? field.value.filter((d: string) => d !== day)
                          : [...field.value, day];
                        field.onChange(next);
                      }}
                      className={cn(
                        "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                        selected
                          ? "border-primary bg-primary text-primary-foreground shadow-[0_2px_8px_rgba(206,163,89,0.25)]"
                          : "border-border bg-muted text-muted-foreground hover:border-primary/40",
                      )}
                    >
                      {day.slice(0, 3)}
                    </button>
                  )}
                />
              );
            })}
          </div>
          {errors.availableDays && (
            <p className="mt-1 text-sm text-destructive">{errors.availableDays.message}</p>
          )}
        </div>

        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Time Slots
          </p>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Controller
              control={control}
              name="timeSlots.start"
              render={({ field }) => (
                <input type="time" {...field} className={inputStyles} placeholder="Start Time" />
              )}
            />
            <Controller
              control={control}
              name="timeSlots.end"
              render={({ field }) => (
                <input type="time" {...field} className={inputStyles} placeholder="End Time" />
              )}
            />
          </div>
          {errors.timeSlots && (
            <p className="mt-1 text-sm text-destructive">{errors.timeSlots.message}</p>
          )}
        </div>
      </div>
    </FormSection>
  );
}
