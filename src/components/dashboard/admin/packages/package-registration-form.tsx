"use client";

import React, { type ReactNode } from "react";
import { useForm, useFieldArray, type FieldError as FieldErrorType } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Plus, Trash2, Package, Utensils, DollarSign, CheckCircle2, RotateCcw } from "lucide-react";
import { packageSchema } from "@/lib/schema/package-schema";
import { FormField } from "@/components/common/form-field";



// ==========================================
// Initial Form Dummy Data
// ==========================================

const dummyData = {
  name: "7-Day Premium Weight Gain & Muscle Plan",
  code: "PKG-WG-PRO",
  category: "Weight Gain & Muscle Building",
  durationDays: 7,
  totalMeals: 14,
  price: 4200,
  discountedPrice: 3900,
  isCustomizable: true,
  status: "Active",
  meals: [
    {
      day: "Day 1",
      mealType: "Breakfast",
      time: "08:00 AM",
      foodItem: "Rosogolla (2 pcs) & Chicken Biryani",
      calories: 870,
      protein: 32,
      fat: 27,
      carbs: 117,
    },
    {
      day: "Day 1",
      mealType: "Lunch",
      time: "01:30 PM",
      foodItem: "Fish Curry (Rui/Katol)",
      calories: 380,
      protein: 28,
      fat: 18,
      carbs: 12,
    },
  ],
};

// Common Input Tailwind Classes following Global Design System
const inputStyles =
  "w-full px-3.5 py-2 text-sm bg-background border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-foreground placeholder:text-muted-foreground shadow-sm";

export default function AddPackageForm() {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(packageSchema),
    defaultValues: dummyData,
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "meals",
  });

  const onSubmit = (data: any) => {
    console.log("Submitted Package Data:", data);
    alert("Package saved successfully!");
  };

  return (
    <section className="py-6 lg:py-8">
      <div className="wrapper max-w-5xl mx-auto space-y-8">
        {/* Header Action Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-card p-6 rounded-2xl border border-border shadow-sm">
          <div>
            <h1 className="text-2xl font-bold text-foreground flex items-center gap-2.5">
              <Package className="w-6 h-6 text-primary" />
              Create New Diet Package
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Configure package pricing, rules, and daily nutritional schedules.
            </p>
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => reset(dummyData)}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold text-muted-foreground bg-muted hover:bg-muted/80 rounded-lg transition"
            >
              <RotateCcw className="w-4 h-4" />
              Reset
            </button>
            <button
              type="submit"
              form="package-form"
              disabled={isSubmitting}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2 text-sm font-semibold text-primary-foreground bg-primary hover:bg-primary/90 rounded-lg transition shadow-sm disabled:opacity-50"
            >
              <CheckCircle2 className="w-4 h-4" />
              {isSubmitting ? "Saving..." : "Save Package"}
            </button>
          </div>
        </div>

        {/* Main Form */}
        <form id="package-form" onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Section 1: Basic Information */}
          <div className="bg-card p-6 rounded-2xl border border-border shadow-sm space-y-6">
            <div className="border-b border-border pb-3">
              <h2 className="text-base font-bold text-foreground">Basic Information</h2>
              <p className="text-xs text-muted-foreground">General details and accessibility settings.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <FormField label="Package Name" htmlFor="name" error={errors.name} required className="md:col-span-2">
                <input id="name" {...register("name")} placeholder="e.g. 7-Day Muscle Building Plan" className={inputStyles} />
              </FormField>

              <FormField label="Package Code" htmlFor="code" error={errors.code} required>
                <input id="code" {...register("code")} placeholder="PKG-WG-PRO" className={inputStyles} />
              </FormField>

              <FormField label="Category" htmlFor="category" error={errors.category} required>
                <input id="category" {...register("category")} placeholder="Weight Gain" className={inputStyles} />
              </FormField>

              <FormField label="Status" htmlFor="status" error={errors.status} required>
                <select id="status" {...register("status")} className={inputStyles}>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </FormField>

              <div className="flex items-center gap-3 pt-6">
                <input
                  type="checkbox"
                  id="isCustomizable"
                  {...register("isCustomizable")}
                  className="w-4 h-4 rounded border-input text-primary focus:ring-primary/20 accent-primary"
                />
                <label htmlFor="isCustomizable" className="text-sm font-medium text-foreground cursor-pointer select-none">
                  Allow User Customization
                </label>
              </div>
            </div>
          </div>

          {/* Section 2: Pricing & Duration */}
          <div className="bg-card p-6 rounded-2xl border border-border shadow-sm space-y-6">
            <div className="border-b border-border pb-3 flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-primary" />
              <div>
                <h2 className="text-base font-bold text-foreground">Pricing & Duration</h2>
                <p className="text-xs text-muted-foreground">Set subscription duration and standard pricing details.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
              <FormField label="Duration (Days)" htmlFor="durationDays" error={errors.durationDays} required>
                <input id="durationDays" type="number" {...register("durationDays")} className={inputStyles} />
              </FormField>

              <FormField label="Total Meals" htmlFor="totalMeals" error={errors.totalMeals} required>
                <input id="totalMeals" type="number" {...register("totalMeals")} className={inputStyles} />
              </FormField>

              <FormField label="Standard Price (BDT)" htmlFor="price" error={errors.price} required>
                <input id="price" type="number" {...register("price")} className={inputStyles} />
              </FormField>

              <FormField label="Discounted Price (BDT)" htmlFor="discountedPrice" error={errors.discountedPrice} required>
                <input id="discountedPrice" type="number" {...register("discountedPrice")} className={inputStyles} />
              </FormField>
            </div>
          </div>

          {/* Section 3: Dynamic Meal Items */}
          <div className="bg-card p-6 rounded-2xl border border-border shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <div className="flex items-center gap-2">
                <Utensils className="w-5 h-5 text-primary" />
                <div>
                  <h2 className="text-base font-bold text-foreground">Meal Schedule ({fields.length})</h2>
                  <p className="text-xs text-muted-foreground">Define daily nutritional meals included in this plan.</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() =>
                  append({
                    day: "Day 1",
                    mealType: "Lunch",
                    time: "01:00 PM",
                    foodItem: "",
                    calories: 0,
                    protein: 0,
                    fat: 0,
                    carbs: 0,
                  })
                }
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-primary bg-primary/10 hover:bg-primary/20 rounded-lg transition"
              >
                <Plus className="w-4 h-4" /> Add Meal Item
              </button>
            </div>

            {errors.meals && typeof errors.meals.message === "string" && (
              <p className="text-xs font-medium text-red-500">{errors.meals.message}</p>
            )}

            <div className="space-y-4">
              {fields.map((field, index) => (
                <div
                  key={field.id}
                  className="p-5 border border-border rounded-xl bg-muted/30 space-y-4 relative group"
                >
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-primary uppercase tracking-wider">
                      Meal #{index + 1}
                    </span>
                    {fields.length > 1 && (
                      <button
                        type="button"
                        onClick={() => remove(index)}
                        className="text-muted-foreground hover:text-red-500 transition p-1"
                        title="Remove Meal"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  {/* Meal Header Fields */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    <FormField label="Day" error={errors.meals?.[index]?.day} required>
                      <input {...register(`meals.${index}.day` as const)} placeholder="Day 1" className={inputStyles} />
                    </FormField>

                    <FormField label="Type" error={errors.meals?.[index]?.mealType} required>
                      <input {...register(`meals.${index}.mealType` as const)} placeholder="Breakfast" className={inputStyles} />
                    </FormField>

                    <FormField label="Time" error={errors.meals?.[index]?.time} required>
                      <input {...register(`meals.${index}.time` as const)} placeholder="08:00 AM" className={inputStyles} />
                    </FormField>

                    <FormField label="Food Description" error={errors.meals?.[index]?.foodItem} required>
                      <input {...register(`meals.${index}.foodItem` as const)} placeholder="Rice & Chicken" className={inputStyles} />
                    </FormField>
                  </div>

                  {/* Meal Macros Row */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2 border-t border-border/50">
                    <FormField label="Calories (kcal)" error={errors.meals?.[index]?.calories} required>
                      <input type="number" {...register(`meals.${index}.calories` as const)} className={inputStyles} />
                    </FormField>

                    <FormField label="Protein (g)" error={errors.meals?.[index]?.protein} required>
                      <input type="number" {...register(`meals.${index}.protein` as const)} className={inputStyles} />
                    </FormField>

                    <FormField label="Fat (g)" error={errors.meals?.[index]?.fat} required>
                      <input type="number" {...register(`meals.${index}.fat` as const)} className={inputStyles} />
                    </FormField>

                    <FormField label="Carbs (g)" error={errors.meals?.[index]?.carbs} required>
                      <input type="number" {...register(`meals.${index}.carbs` as const)} className={inputStyles} />
                    </FormField>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}