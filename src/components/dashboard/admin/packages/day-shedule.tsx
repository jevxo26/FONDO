import React, { useState } from "react";
import type { FieldErrors } from "react-hook-form";
import { Control, useFieldArray, UseFormRegister } from "react-hook-form";
import { Plus, Trash2, Calendar, ChevronDown, ChevronUp, Utensils } from "lucide-react";
import { inputStyles, PackageFormValues, PRESET_FOODS } from "@/lib/schema/package-schema";
import { FormField } from "@/components/common/form-field";

interface MealFoodsBuilderProps {
  dayIndex: number;
  mealIndex: number;
  control: Control<PackageFormValues>;
  register: UseFormRegister<PackageFormValues>;
  errors: FieldErrors<PackageFormValues>;
}

function MealFoodsBuilder({ dayIndex, mealIndex, control, register, errors }: MealFoodsBuilderProps) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `days.${dayIndex}.meals.${mealIndex}.foods` as const,
  });

  return (
    <div className="space-y-3 pt-2">
      <div className="flex justify-between items-center">
        <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
          Food Items ({fields.length})
        </label>
        <button type="button" onClick={() => append({ name: "", quantity: 1 })} className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline">
          <Plus className="w-3.5 h-3.5" /> Add Food
        </button>
      </div>

      <div className="space-y-2">
        {fields.map((field, foodIndex) => {
          const foodError = errors?.days?.[dayIndex]?.meals?.[mealIndex]?.foods?.[foodIndex];
          return (
            <div key={field.id} className="flex items-start gap-2 bg-background p-2 rounded-lg border border-border">
              <div className="flex-1 space-y-1">
                <input
                  list={`preset-foods-${dayIndex}-${mealIndex}-${foodIndex}`}
                  {...register(`days.${dayIndex}.meals.${mealIndex}.foods.${foodIndex}.name`)}
                  placeholder="Select or type food..."
                  className={inputStyles}
                />
                <datalist id={`preset-foods-${dayIndex}-${mealIndex}-${foodIndex}`}>
                  {PRESET_FOODS.map((food, idx) => <option key={idx} value={food} />)}
                </datalist>
                {foodError?.name && <p className="text-[10px] text-red-500">{foodError.name.message}</p>}
              </div>

              <div className="w-24 space-y-1">
                <input type="number" {...register(`days.${dayIndex}.meals.${mealIndex}.foods.${foodIndex}.quantity`)} placeholder="Qty" className={inputStyles} />
                {foodError?.quantity && <p className="text-[10px] text-red-500">{foodError.quantity.message}</p>}
              </div>

              {fields.length > 1 && (
                <button type="button" onClick={() => remove(foodIndex)} className="p-2 text-muted-foreground hover:text-red-500 transition mt-0.5">
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

interface DayMealsBuilderProps {
  dayIndex: number;
  control: Control<PackageFormValues>;
  register: UseFormRegister<PackageFormValues>;
  errors: FieldErrors<PackageFormValues>;
}

function DayMealsBuilder({ dayIndex, control, register, errors }: DayMealsBuilderProps) {
  const { fields, append, remove } = useFieldArray({ control, name: `days.${dayIndex}.meals` as const });

  return (
    <div className="space-y-4 pt-2">
      <div className="flex justify-between items-center border-b border-border/60 pb-2">
        <span className="text-xs font-bold text-foreground uppercase tracking-wide flex items-center gap-1.5">
          <Utensils className="w-3.5 h-3.5 text-primary" /> Meals for Day #{dayIndex + 1}
        </span>
        <button
          type="button"
          onClick={() => append({ mealType: "BREAKFAST", mealTime: "08:00 AM", foods: [{ name: "", quantity: 1 }] })}
          className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-primary bg-primary/10 rounded-md hover:bg-primary/20 transition"
        >
          <Plus className="w-3.5 h-3.5" /> Add Meal
        </button>
      </div>

      <div className="space-y-3">
        {fields.map((field, mealIndex) => {
          const mealError = errors?.days?.[dayIndex]?.meals?.[mealIndex];
          return (
            <div key={field.id} className="p-4 border border-border/80 rounded-xl bg-muted/20 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-primary">Meal #{mealIndex + 1}</span>
                {fields.length > 1 && (
                  <button type="button" onClick={() => remove(mealIndex)} className="text-muted-foreground hover:text-red-500 transition">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <FormField label="Meal Type" error={mealError?.mealType} required>
                  <select {...register(`days.${dayIndex}.meals.${mealIndex}.mealType`)} className={inputStyles}>
                    <option value="BREAKFAST">BREAKFAST</option>
                    <option value="LUNCH">LUNCH</option>
                    <option value="SNACKS">SNACKS</option>
                    <option value="DINNER">DINNER</option>
                  </select>
                </FormField>

                <FormField label="Meal Time" error={mealError?.mealTime} required>
                  <input {...register(`days.${dayIndex}.meals.${mealIndex}.mealTime`)} placeholder="e.g. 08:00 AM" className={inputStyles} />
                </FormField>
              </div>

              <MealFoodsBuilder dayIndex={dayIndex} mealIndex={mealIndex} control={control} register={register} errors={errors} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function DaysScheduleSection({ control, register, errors, daysWatched }: {
  control: Control<PackageFormValues>;
  register: UseFormRegister<PackageFormValues>;
  errors: FieldErrors<PackageFormValues>;
  daysWatched: NonNullable<PackageFormValues["days"]>;
}) {
  const [expandedDay, setExpandedDay] = useState<number | null>(0);
  const { fields, append, remove } = useFieldArray({ control, name: "days" });

  return (
    <div className="bg-card p-6 rounded-2xl border border-border shadow-sm space-y-5">
      <div className="flex items-center justify-between border-b border-border pb-3">
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-primary" />
          <h2 className="text-base font-bold text-foreground">Days Schedule ({fields.length} Days)</h2>
        </div>
        <button
          type="button"
          onClick={() => {
            const newDayNum = fields.length + 1;
            append({ dayNumber: newDayNum, title: `Day ${newDayNum} Schedule`, meals: [{ mealType: "BREAKFAST", mealTime: "08:00 AM", foods: [{ name: "", quantity: 1 }] }] });
            setExpandedDay(fields.length);
          }}
          className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-primary bg-primary/10 hover:bg-primary/20 rounded-lg transition"
        >
          <Plus className="w-4 h-4" /> Add Day
        </button>
      </div>

      <div className="space-y-4">
        {fields.map((field, dayIndex) => {
          const isOpen = expandedDay === dayIndex;
          return (
            <div key={field.id} className="border border-border rounded-xl bg-card overflow-hidden">
              <div onClick={() => setExpandedDay(isOpen ? null : dayIndex)} className="p-4 bg-muted/40 hover:bg-muted/60 transition cursor-pointer flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold">{dayIndex + 1}</span>
                  <div>
                    <h3 className="text-sm font-bold text-foreground">{daysWatched[dayIndex]?.title || `Day ${dayIndex + 1}`}</h3>
                    <p className="text-[11px] text-muted-foreground">{daysWatched[dayIndex]?.meals?.length || 0} meals configured</p>
                  </div>
                </div>

                <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                  {fields.length > 1 && (
                    <button type="button" onClick={() => remove(dayIndex)} className="text-muted-foreground hover:text-red-500 transition p-1">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                  <button type="button" onClick={() => setExpandedDay(isOpen ? null : dayIndex)} className="p-1 text-muted-foreground">
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {isOpen && (
                <div className="p-4 space-y-4 border-t border-border">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <FormField label="Day Number" error={errors.days?.[dayIndex]?.dayNumber} required>
                      <input type="number" {...register(`days.${dayIndex}.dayNumber`)} className={inputStyles} />
                    </FormField>
                    <FormField label="Schedule Title" error={errors.days?.[dayIndex]?.title} required>
                      <input {...register(`days.${dayIndex}.title`)} placeholder="e.g. Day 1 Schedule" className={inputStyles} />
                    </FormField>
                  </div>

                  <DayMealsBuilder dayIndex={dayIndex} control={control} register={register} errors={errors} />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}