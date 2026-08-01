"use client";

import React, { useState } from "react";
import { SlidersHorizontal, ChevronDown, Plus, Trash2 } from "lucide-react";
import { useGetFoods } from "@/store/api/slices/foods-api";

interface PackageCustomizationProps {
  singlePackage: any;
  customDays: any[];
  setCustomDays: React.Dispatch<React.SetStateAction<any[]>>;
  onPriceChange: (extraPrice: number) => void;
}

export default function PackageCustomization({
  singlePackage,
  customDays,
  setCustomDays,
  onPriceChange,
}: PackageCustomizationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDay, setActiveDay] = useState(1);
  
  // ব্যাকএন্ড থেকে ফুড ফেচ করা
  const { data: foodsData, isLoading: isFoodsLoading } = useGetFoods({ limit: 50 });
  const availableFoods = foodsData?.items || [];

  const handleAddFoodToMeal = (mealType: string, food: any) => {
    setCustomDays((prevDays) => {
      const dayIndex = prevDays.findIndex((d) => d.dayNumber === activeDay);
      const defaultVariant = food.variants?.[0];
      const foodPrice = defaultVariant ? Number(defaultVariant.price) : Number(food.price || 0);

      if (dayIndex > -1) {
        const updatedDays = [...prevDays];
        const meals = [...updatedDays[dayIndex].meals];
        const mealIndex = meals.findIndex((m) => m.mealType === mealType);

        if (mealIndex > -1) {
          const mealFoods = [...meals[mealIndex].foods];
          mealFoods.push({
            foodId: food.id,
            name: food.name,
            quantity: 1,
            price: foodPrice,
            isExtra: true,
          });
          meals[mealIndex] = { ...meals[mealIndex], foods: mealFoods };
        } else {
          meals.push({
            mealType,
            mealTime: "12:00 PM",
            foods: [{ foodId: food.id, name: food.name, quantity: 1, price: foodPrice, isExtra: true }],
          });
        }
        updatedDays[dayIndex] = { ...updatedDays[dayIndex], meals };
        return updatedDays;
      } else {
        return [
          ...prevDays,
          {
            dayNumber: activeDay,
            meals: [
              {
                mealType,
                mealTime: "12:00 PM",
                foods: [{ foodId: food.id, name: food.name, quantity: 1, price: foodPrice, isExtra: true }],
              },
            ],
          },
        ];
      }
    });
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
                Tailor daily meal allocations and add custom heritage items
              </p>
            </div>
          </div>
          <ChevronDown
            className={`size-5 text-muted-foreground transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
          />
        </button>

        {isOpen && (
          <div className="pt-4 border-t border-border/30 space-y-6 animate-in fade-in duration-200">
            {/* Day Selector Tabs */}
            <div className="flex gap-2 overflow-x-auto pb-2">
              {Array.from({ length: singlePackage.durationDays || 1 }).map((_, i) => {
                const dayNum = i + 1;
                return (
                  <button
                    key={dayNum}
                    type="button"
                    onClick={() => setActiveDay(dayNum)}
                    className={`px-4 py-2 rounded-xl border text-xs font-bold transition-all whitespace-nowrap ${
                      activeDay === dayNum ? "border-primary bg-primary/5 text-primary" : "border-border/40"
                    }`}
                  >
                    Day {dayNum}
                  </button>
                );
              })}
            </div>

            {/* Food Selection Area for Active Day */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Select Foods for Day {activeDay}
              </h4>
              {isFoodsLoading ? (
                <p className="text-xs text-muted-foreground">Loading menu options...</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-60 overflow-y-auto pr-1">
                  {availableFoods.map((food: any) => (
                    <div key={food.id} className="flex items-center justify-between p-3 border border-border/40 rounded-xl bg-background">
                      <div className="flex items-center gap-2">
                        <img src={food.thumbnail} alt={food.name} className="size-10 rounded-lg object-cover" />
                        <div>
                          <p className="text-xs font-bold">{food.name}</p>
                          <p className="text-[10px] text-muted-foreground">৳{food.variants?.[0]?.price || 0}</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleAddFoodToMeal("LUNCH", food)}
                        className="p-2 bg-primary/10 text-primary rounded-lg hover:bg-primary hover:text-white transition-all"
                      >
                        <Plus className="size-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}