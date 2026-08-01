"use client";

import React, { useState } from "react";
import { SlidersHorizontal, ChevronDown, Plus, Minus, Trash2, Send } from "lucide-react";
import { useGetFoods } from "@/store/api/slices/foods-api";
import { useCreateCustomMealRequestMutation } from "@/store/api/slices/packages-api";
import { useAuth } from "@/hooks/use-auth";
// ১. ইমপোর্টে Mutation যুক্ত করুন
// ২. কম্পোনেন্টের ভেতর:
interface CustomFood {
  foodId: string;
  name: string;
  thumbnail?: string;
  quantity: number;
  price: number;
  isExtra: boolean;
}

interface CustomMeal {
  mealType: string;
  mealTime?: string;
  foods: CustomFood[];
}

interface CustomDay {
  dayNumber: number;
  meals: CustomMeal[];
}

interface PackageCustomizationProps {
  singlePackage: any;
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
  const {user} = useAuth()
  const customerId = user?.id
  console.log(user)
  // RTK Query Mutations & Queries
  const { data: foodsData, isLoading: isFoodsLoading } = useGetFoods({ limit: 50 });
  const [createCustomMealRequest, { isLoading: isSubmitting }] = useCreateCustomMealRequestMutation();
  const availableFoods = foodsData?.items || [];

  const currentDayData = customDays.find((d) => d.dayNumber === activeDay);
  const currentMealData = currentDayData?.meals.find((m) => m.mealType === activeMealType);
  const selectedFoodsForMeal = currentMealData?.foods || [];

  // ১. ফুড এড করা
  const handleAddFood = (food: any) => {
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

  // ২. কোয়ান্টিটি কমানো/বাড়ানো
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

  // ৩. ব্যাকএন্ডে কাস্টম রিকোয়েস্ট সাবমিট করার ফাংশন
const handleSubmitCustomRequest = async () => {
  if (!customDays || customDays.length === 0) {
    alert("Please add at least one day and meal.");
    return;
  }

  try {
    // 🔑 ব্যাকএন্ড Prisma Schema যেভাবে চায় ঠিক সেভাবে ডাটা Formatter:
    const payload = {
      packageId: singlePackage?.id,
      name: singlePackage?.name || "Custom Meal Plan",
      totalDays: customDays.length,
      totalPrice: totalPrice,
      days: customDays.map((day: any, dayIdx: number) => ({
        dayNumber: day.dayNumber || dayIdx + 1,
        meals: day.meals.map((meal: any) => ({
          mealType: meal.mealType, // e.g., "BREAKFAST", "LUNCH", "DINNER"
          mealTime: meal.mealTime || "08:00 AM",
          foods: meal.foods.map((food: any) => ({
            foodId: food.foodId || food.id, // 👈 নিশ্চিত করুন মূল ফুডের Database ID যাচ্ছে
            quantity: Number(food.quantity || 1),
            isExtra: Boolean(food.isExtra),
          })),
        })),
      })),
    };

    console.log("Sending Payload:", payload);

    // Redux Toolkit Request / Axios Request
    await createCustomMealRequest(payload).unwrap();
    alert("Your custom meal request submitted successfully!");

  } catch (error: any) {
    console.error("Submission error:", error);
    alert(error?.data?.message || "Failed to submit custom meal request.");
  }
};

  return (
    <section className="bg-muted/60 border border-border/30 rounded-3xl p-1 transition-all">
      <div className="bg-card rounded-3xl p-6 lg:p-8 shadow-sm space-y-6">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between group outline-none"
        >
          <div className="flex items-center gap-3">
            <div className="size-8 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
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
            className={`size-5 text-muted-foreground transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
          />
        </button>

        {isOpen && (
          <div className="pt-4 border-t border-border/30 space-y-6 animate-in fade-in duration-200">
            {/* Step 1: Days */}
            <div>
              <label className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground mb-2 block">
                1. Select Day
              </label>
              <div className="flex gap-2 overflow-x-auto pb-1">
                {Array.from({ length: singlePackage.durationDays || 1 }).map((_, i) => {
                  const dayNum = i + 1;
                  return (
                    <button
                      key={dayNum}
                      type="button"
                      onClick={() => setActiveDay(dayNum)}
                      className={`px-4 py-2 rounded-xl border text-xs font-bold transition-all whitespace-nowrap ${
                        activeDay === dayNum
                          ? "border-primary bg-primary/10 text-primary shadow-sm"
                          : "border-border/40 hover:bg-muted"
                      }`}
                    >
                      Day {dayNum}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Meal Types */}
            <div>
              <label className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground mb-2 block">
                2. Select Meal Slot
              </label>
              <div className="grid grid-cols-3 gap-2">
                {MEAL_TYPES.map((m) => (
                  <button
                    key={m.value}
                    type="button"
                    onClick={() => setActiveMealType(m.value)}
                    className={`py-2.5 rounded-xl border text-xs font-bold transition-all text-center ${
                      activeMealType === m.value
                        ? "border-primary bg-primary text-primary-foreground shadow-md"
                        : "border-border/40 bg-background hover:bg-muted"
                    }`}
                  >
                    {m.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Selected Foods in Active Meal Slot */}
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
                          <img src={item.thumbnail} alt={item.name} className="size-8 rounded-md object-cover" />
                        )}
                        <div>
                          <p className="font-semibold">{item.name}</p>
                          <p className="text-[10px] text-muted-foreground">৳{item.price * item.quantity}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleQuantityChange(item.foodId, -1)}
                          className="p-1 rounded-lg bg-muted hover:bg-destructive/10 hover:text-destructive transition-all"
                        >
                          {item.quantity === 1 ? <Trash2 className="size-3.5" /> : <Minus className="size-3.5" />}
                        </button>
                        <span className="font-bold text-xs min-w-[16px] text-center">{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() => handleQuantityChange(item.foodId, 1)}
                          className="p-1 rounded-lg bg-muted hover:bg-primary/10 hover:text-primary transition-all"
                        >
                          <Plus className="size-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step 4: Available Foods Grid */}
            <div className="space-y-3">
              <label className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground block">
                3. Add Foods from Menu
              </label>
              {isFoodsLoading ? (
                <p className="text-xs text-muted-foreground">Loading items...</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-64 overflow-y-auto pr-1">
                  {availableFoods.map((food: any) => {
                    const price = food.variants?.[0]?.price || food.price || 0;
                    return (
                      <div
                        key={food.id}
                        className="flex items-center justify-between p-3 border border-border/40 rounded-xl bg-background hover:border-primary/40 transition-all"
                      >
                        <div className="flex items-center gap-2 overflow-hidden">
                          {food.thumbnail && (
                            <img src={food.thumbnail} alt={food.name} className="size-10 rounded-lg object-cover flex-shrink-0" />
                          )}
                          <div className="truncate">
                            <p className="text-xs font-bold truncate">{food.name}</p>
                            <p className="text-[10px] text-muted-foreground">৳{price}</p>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleAddFood(food)}
                          className="p-2 bg-primary/10 text-primary rounded-lg hover:bg-primary hover:text-white transition-all flex-shrink-0"
                        >
                          <Plus className="size-4" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* 🔥 ৪. সাবমিট বাটন ( Create Custom Meal Request ) */}
            <div className="pt-4 border-t border-border/30">
              <button
                type="button"
                onClick={handleSubmitCustomRequest}
                disabled={isSubmitting || customDays.length === 0}
                className="w-full py-3 bg-primary text-primary-foreground font-bold text-xs rounded-xl shadow-md hover:bg-primary/90 transition-all flex items-center justify-center gap-2 uppercase tracking-wider disabled:opacity-50"
              >
                <Send className="size-4" />
                {isSubmitting ? "Submitting Request..." : "Submit Custom Meal Request"}
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}