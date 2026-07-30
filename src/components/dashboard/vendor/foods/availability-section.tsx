"use client";

import { FormField } from "@/components/common/form-field";
import { inputStyles, FoodFormValues } from "@/lib/schema/food-schema";
import { Clock } from "lucide-react";
import { FieldErrors, UseFormRegister, Control } from "react-hook-form";

interface AvailabilitySectionProps {
  register: UseFormRegister<FoodFormValues>;
  errors: FieldErrors<FoodFormValues>;
  control: Control<FoodFormValues>;
}

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export function AvailabilitySection({ register, errors }: AvailabilitySectionProps) {
  return (
    <div className="bg-card p-6 rounded-2xl border border-border shadow-sm space-y-5">
      <div className="border-b border-border pb-3 flex items-center gap-2">
        <Clock className="w-5 h-5 text-primary" />
        <h2 className="text-base font-bold text-foreground">Availability</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-foreground">Status</label>
          <div className="flex flex-wrap gap-4">
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="checkbox"
                {...register("available")}
                className="w-4 h-4 rounded border-input text-primary accent-primary"
              />
              Available
            </label>
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="checkbox"
                {...register("visible")}
                className="w-4 h-4 rounded border-input text-primary accent-primary"
              />
              Visible
            </label>
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="checkbox"
                {...register("featured")}
                className="w-4 h-4 rounded border-input text-primary accent-primary"
              />
              Featured
            </label>
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="checkbox"
                {...register("popular")}
                className="w-4 h-4 rounded border-input text-primary accent-primary"
              />
              Popular
            </label>
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="checkbox"
                {...register("recommended")}
                className="w-4 h-4 rounded border-input text-primary accent-primary"
              />
              Recommended
            </label>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Available Days</label>
          <div className="flex flex-wrap gap-2">
            {DAYS.map((day) => (
              <label key={day} className="flex items-center gap-2 text-sm cursor-pointer">
                <input
                  type="checkbox"
                  {...register("availableDays")}
                  value={day}
                  className="w-4 h-4 rounded border-input text-primary accent-primary"
                />
                {day.slice(0, 3)}
              </label>
            ))}
          </div>
          {errors.availableDays && (
            <p className="text-sm text-destructive mt-1">{errors.availableDays.message}</p>
          )}
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-foreground mb-2">Time Slots</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <input
                {...register("timeSlots.start")}
                type="time"
                className={inputStyles}
                placeholder="Start Time"
              />
            </div>
            <div>
              <input
                {...register("timeSlots.end")}
                type="time"
                className={inputStyles}
                placeholder="End Time"
              />
            </div>
          </div>
          {errors.timeSlots && (
            <p className="text-sm text-destructive mt-1">{errors.timeSlots.message}</p>
          )}
        </div>
      </div>
    </div>
  );
}
