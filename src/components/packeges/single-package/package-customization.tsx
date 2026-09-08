"use client";

import React, { useState } from "react";
import Image from "next/image";
import { SlidersHorizontal, ChevronDown, Plus, Minus, Trash2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGetFoods } from "@/store/api/slices/foods-api";
import { useCreateCustomMealRequestMutation } from "@/store/api/slices/packages-api";
import type { CustomDay, CustomMeal, CustomFood, Package } from "@/types/package";
import type { Food } from "@/types/food";
import { handleApiError } from "@/lib/api-error";

type CustomFoodOption = Food & { price?: number | string };

interface PackageCustomizationProps {
  singlePackage: Package;
  customDays: CustomDay[];
  setCustomDays: React.Dispatch<React.SetStateAction<CustomDay[]>>;
  totalPrice: number;
}

const MEAL_TYPES = [
  { label: "Breakfast", value: "BREAKFAST", defaultTime: "08:00 AM" },
  { label: "Lunch", value: "LUNCH", defaultTime: "01:30 PM" },
  { label: "Dinner", value: "DINNER", defaultTime: "08:30 PM" },
];

export default function PackageCustomization({
  singlePackage,
  customDays,
  setCustomDays,
  totalPrice,
}: PackageCustomizationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDay, setActiveDay] = useState<number>(1);
  const [activeMealType, setActiveMealType] = useState<string>("BREAKFAST");

  // RTK Query Mutations & Queries
  const { data: foodsData, isLoading: isFoodsLoading } = useGetFoods({ limit: 50 });
  const [createCustomMealRequest, { isLoading: isSubmitting }] = useCreateCustomMealRequestMutation();
  const availableFoods = foodsData?.items || [];

  const currentDayData = customDays.find((d) => d.dayNumber === activeDay);
  const currentMealData = currentDayData?.meals.find((m) => m.mealType === activeMealType);
  const selectedFoodsForMeal = currentMealData?.foods || [];

  // Add food item
  const handleAddFood = (food: CustomFoodOption) => {
    const defaultVariant = food.variants?.[0];
    const price = defaultVariant ? Number(defaultVariant.price) : Number(food.price || 0);

    setCustomDays((prevDays) => {
      const updatedDays = [...prevDays];
      let dayIndex = updatedDays.findIndex((d) => d.dayNumber === activeDay);

      if (dayIndex === -1) {
        updatedDays.push({ dayNumber: activeDay, meals: [] });
        dayIndex = updatedDays.length - 1;
      }

      const meals = [...updatedDays[dayIndex].meals];
      let mealIndex = meals.findIndex((m) => m.mealType === activeMealType);
      const mealConfig = MEAL_TYPES.find((m) => m.value === activeMealType);

      if (mealIndex === -1) {
        meals.push({
          mealType: activeMealType,
          mealTime: mealConfig?.defaultTime || "12:00 PM",
          foods: [],
        });
        mealIndex = meals.length - 1;
      }

      const foods = [...meals[mealIndex].foods];
      const existingFoodIndex = foods.findIndex((f) => f.foodId === food.id);

      if (existingFoodIndex > -1) {
        foods[existingFoodIndex] = {
          ...foods[existingFoodIndex],
          quantity: foods[existingFoodIndex].quantity + 1,
        };
      } else {
        foods.push({
          foodId: food.id,
          name: food.name,
          thumbnail: food.thumbnail,
          price,
          quantity: 1,
          isExtra: true,
        });
      }

      meals[mealIndex] = { ...meals[mealIndex], foods };
      updatedDays[dayIndex] = { ...updatedDays[dayIndex], meals };
      return updatedDays;
    });
  };

  // Change food quantity
  const handleQuantityChange = (foodId: string, delta: number) => {
    setCustomDays((prevDays) => {
      const updatedDays = [...prevDays];
      const dayIndex = updatedDays.findIndex((d) => d.dayNumber === activeDay);
      if (dayIndex === -1) return prevDays;

      const meals = [...updatedDays[dayIndex].meals];
      const mealIndex = meals.findIndex((m) => m.mealType === activeMealType);
      if (mealIndex === -1) return prevDays;

      let foods = [...meals[mealIndex].foods];
      const foodIndex = foods.findIndex((f) => f.foodId === foodId);
      if (foodIndex === -1) return prevDays;

      const newQty = foods[foodIndex].quantity + delta;

      if (newQty <= 0) {
        foods = foods.filter((f) => f.foodId !== foodId);
      } else {
        foods[foodIndex] = { ...foods[foodIndex], quantity: newQty };
      }

      meals[mealIndex] = { ...meals[mealIndex], foods };
      updatedDays[dayIndex] = { ...updatedDays[dayIndex], meals };
      return updatedDays;
    });
  };

  // Submit custom meal request according to Prisma schema format
  const handleSubmitCustomRequest = async () => {
    // Filter out any empty days/meals without foods
    const validDays = customDays
      .map((day) => ({
        ...day,
        meals: day.meals.filter((m) => m.foods && m.foods.length > 0),
      }))
      .filter((day) => day.meals.length > 0);

    if (validDays.length === 0) {
      alert("Please add at least one food item to your custom plan.");
      return;
    }

    try {
      const payload = {
        packageId: singlePackage.id,
        name: `${singlePackage.name} (Customized)`,
        totalDays: validDays.length,
        totalPrice: totalPrice,
        days: validDays.map((day: CustomDay, dayIdx: number) => ({
          dayNumber: day.dayNumber || dayIdx + 1,
          meals: day.meals.map((meal: CustomMeal) => ({
            mealType: meal.mealType,
            mealTime: meal.mealTime || "08:00 AM",
            foods: meal.foods.map((food: CustomFood) => ({
              foodId: food.foodId,
              quantity: Number(food.quantity || 1),
              isExtra: Boolean(food.isExtra ?? true),
            })),
          })),
        })),
      };

      await createCustomMealRequest(payload).unwrap();
      alert("Your custom meal request has been submitted successfully!");
      setCustomDays([]);
      setIsOpen(false);
    } catch (error) {
      console.error("Submission error:", error);
      alert(handleApiError(error));
    }
  };

  return (
    <section className="bg-muted/60 border border-border/30 rounded-3xl p-1 transition-all">
      <div className="bg-card rounded-3xl p-6 lg:p-8 shadow-sm space-y-6">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          variant="ghost"
          className="w-full flex items-center justify-between group outline-none"
        >
          <div className="flex items-center gap-3">
            <div className="size-8 rounded-xl bg-primary/10 flex items-center justify-center text-foreground">
              <SlidersHorizontal className="size-4" />
            </div>
            <div className="text-left">
              <h3 className="font-heading text-base font-medium">Bespoke Heritage Concierge</h3>
              <p className="text-[11px] text-muted-foreground/70">
                Customise meals for Breakfast, Lunch, and Dinner
              </p>
            </div>
          </div>
          <ChevronDown
            className={`size-5 text-muted-foreground transition-transform duration-300 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </Button>

        {isOpen && (
          <div className="pt-4 border-t border-border/30 space-y-6 animate-in fade-in duration-200">
            {/* Step 1: Select Day */}
            <div>
              <label className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground mb-2 block">
                1. Select Day
              </label>
              <div className="flex gap-2 overflow-x-auto pb-1">
                {Array.from({ length: singlePackage.durationDays || 1 }).map((_, i) => {
                  const dayNum = i + 1;
                  return (
                    <Button
                      key={dayNum}
                      type="button"
                      onClick={() => setActiveDay(dayNum)}
                      variant="ghost"
                      size="sm"
                      className={`px-4 rounded-xl border text-xs font-bold transition-all whitespace-nowrap ${
                        activeDay === dayNum
                          ? "border-primary bg-primary/10 text-primary shadow-sm"
                          : "border-border/40 hover:bg-muted"
                      }`}
                    >
                      Day {dayNum}
                    </Button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Select Meal Slot */}
            <div>
              <label className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground mb-2 block">
                2. Select Meal Slot
              </label>
              <div className="grid grid-cols-3 gap-2">
                {MEAL_TYPES.map((m) => (
                  <Button
                    key={m.value}
                    type="button"
                    onClick={() => setActiveMealType(m.value)}
                    variant={activeMealType === m.value ? "default" : "outline"}
                    size="sm"
                    className={`py-2.5 rounded-xl text-xs font-bold transition-all text-center ${
                      activeMealType === m.value
                        ? "shadow-md"
                        : "bg-background"
                    }`}
                  >
                    {m.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Step 3: Foods added to active meal */}
            {selectedFoodsForMeal.length > 0 && (
              <div className="p-4 rounded-2xl bg-muted/40 border border-border/30 space-y-3">
                <h4 className="text-xs font-bold text-foreground">
                  Added to Day {activeDay} ({activeMealType}):
                </h4>
                <div className="space-y-2">
                  {selectedFoodsForMeal.map((item) => (
                    <div
                      key={item.foodId}
                      className="flex items-center justify-between p-2.5 rounded-xl bg-card border border-border/20 text-xs"
                    >
                      <div className="flex items-center gap-2">
                        {item.thumbnail && (
                          <Image
                            src={item.thumbnail}
                            alt={item.name || "Food item"}
                            width={32}
                            height={32}
                            className="size-8 rounded-md object-cover"
                          />
                        )}
                        <div>
                          <p className="font-semibold">{item.name}</p>
                          <p className="text-[10px] text-muted-foreground">
                            ৳{(item.price || 0) * item.quantity}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Button
                          type="button"
                          onClick={() => handleQuantityChange(item.foodId, -1)}
                          variant="ghost"
                          size="icon-xs"
                          className="rounded-lg hover:bg-destructive/10 hover:text-destructive"
                        >
                          {item.quantity === 1 ? (
                            <Trash2 className="size-3.5" />
                          ) : (
                            <Minus className="size-3.5" />
                          )}
                        </Button>
                        <span className="font-bold text-xs min-w-[16px] text-center">
                          {item.quantity}
                        </span>
                        <Button
                          type="button"
                          onClick={() => handleQuantityChange(item.foodId, 1)}
                          variant="ghost"
                          size="icon-xs"
                          className="rounded-lg hover:bg-primary/10 hover:text-primary"
                        >
                          <Plus className="size-3.5" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step 4: Available Food Menu */}
            <div className="space-y-3">
              <label className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground block">
                3. Add Foods from Menu
              </label>
              {isFoodsLoading ? (
                <p className="text-xs text-muted-foreground">Loading items...</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-64 overflow-y-auto pr-1">
                  {availableFoods.map((food: CustomFoodOption) => {
                    const price = food.variants?.[0]?.price || food.price || 0;
                    return (
                      <div
                        key={food.id}
                        className="flex items-center justify-between p-3 border border-border/40 rounded-xl bg-background hover:border-primary/40 transition-all"
                      >
                        <div className="flex items-center gap-2 overflow-hidden">
                          {food.thumbnail && (
                            <Image
                              src={food.thumbnail}
                              alt={food.name}
                              width={40}
                              height={40}
                              className="size-10 rounded-lg object-cover flex-shrink-0"
                            />
                          )}
                          <div className="truncate">
                            <p className="text-xs font-bold truncate">{food.name}</p>
                            <p className="text-[10px] text-muted-foreground">৳{price}</p>
                          </div>
                        </div>

                        <Button
                          type="button"
                          onClick={() => handleAddFood(food)}
                          variant="ghost"
                          size="icon-sm"
                          className="bg-primary/10 text-primary rounded-lg hover:bg-primary hover:text-white flex-shrink-0"
                        >
                          <Plus className="size-4" />
                        </Button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Step 5: Submit Action */}
            <div className="pt-4 border-t border-border/30">
              <Button
                type="button"
                onClick={handleSubmitCustomRequest}
                disabled={isSubmitting || customDays.length === 0}
                variant="default"
                size="lg"
                className="w-full font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2"
              >
                <Send className="size-4" />
                {isSubmitting ? "Submitting Request..." : "Submit Custom Meal Request"}
              </Button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}