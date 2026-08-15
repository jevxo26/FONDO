"use client";

import React, { useMemo, useState } from "react";
import type { CustomDay, PackageDay, PackageMeal, PackageFood } from "@/types/package";

interface Props {
  days?: PackageDay[];
  customDays?: CustomDay[];
}

export default function WeeklyMenuPreview({ days = [], customDays = [] }: Props) {
  const [activeDay, setActiveDay] = useState<number>(days?.[0]?.dayNumber ?? 1);

  const mergedDays = useMemo(() => {
    if (!days?.length && !customDays?.length) return [];

    // মূল দিনগুলোর তালিকা তৈরি
    const result: PackageDay[] = days.map((day) => ({
      ...day,
      meals:
        day.meals?.map((meal) => ({
          ...meal,
          foods: [...(meal.foods || [])],
        })) || [],
    }));

    // কাস্টম যুক্ত করা দিন এবং খাবারগুলো মার্জ করা
    customDays.forEach((cDay) => {
      let targetDay = result.find((d) => d.dayNumber === cDay.dayNumber);

      if (!targetDay) {
        targetDay = {
          id: `custom-day-${cDay.dayNumber}`,
          dayNumber: cDay.dayNumber,
          title: `Day ${cDay.dayNumber}`,
          description: "Customized Daily Menu Plan",
          meals: [],
        };
        result.push(targetDay);
      }

      const targetMeals = (targetDay.meals = targetDay.meals ?? []);

      cDay.meals?.forEach((cMeal) => {
        let targetMeal = targetMeals.find(
          (m) => m.mealType?.toUpperCase() === cMeal.mealType?.toUpperCase()
        );

        if (!targetMeal) {
          targetMeal = {
            id: `custom-meal-${cMeal.mealType}`,
            mealType: cMeal.mealType,
            mealTime: cMeal.mealTime || "Scheduled Time",
            foods: [],
          };
          targetMeals.push(targetMeal);
        }

        const targetFoods = (targetMeal.foods = targetMeal.foods ?? []);

        cMeal.foods?.forEach((cf) => {
          const existingIndex = targetFoods.findIndex(
            (f) => (f.foodId || f.id) === cf.foodId && f.isExtra
          );

          if (existingIndex > -1) {
            targetFoods[existingIndex].quantity = cf.quantity;
          } else {
            targetFoods.push({
              ...cf,
              isExtra: true,
            });
          }
        });
      });
    });

    return result.sort((a, b) => a.dayNumber - b.dayNumber);
  }, [days, customDays]);

  const selectedDay = useMemo(() => {
    return mergedDays?.find((day) => day.dayNumber === activeDay);
  }, [mergedDays, activeDay]);

  return (
    <section className="bg-card border border-border/20 rounded-3xl p-6 lg:p-8 shadow-sm space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="font-heading text-xl text-foreground">
            Weekly Menu Manifest
          </h2>
          <p className="text-[11px] text-muted-foreground/70">
            Explore your meal schedule day by day, including custom additions.
          </p>
        </div>

        {/* Day Selection Buttons */}
        <div className="flex gap-1 overflow-x-auto pb-1 bg-background border border-border/30 p-1 rounded-xl">
          {mergedDays?.map((day) => (
            <button
              key={day.id || day.dayNumber}
              onClick={() => setActiveDay(day.dayNumber)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                activeDay === day.dayNumber
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Day {day.dayNumber}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-heading text-lg font-medium">
          {selectedDay?.title || `Day ${activeDay}`}
        </h3>
        {selectedDay?.description && (
          <p className="text-xs text-muted-foreground mt-1">
            {selectedDay.description}
          </p>
        )}
      </div>

      {/* Meals Grid (Breakfast, Lunch, Dinner) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {selectedDay?.meals?.length ? (
          selectedDay.meals.map((meal: PackageMeal) => (
            <div
              key={meal.id || meal.mealType}
              className="bg-background border border-border/30 rounded-2xl p-4 flex flex-col justify-between gap-4 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <span className="text-[9px] uppercase tracking-wider font-bold text-primary bg-primary/10 px-2.5 py-1 rounded-md">
                  {meal.mealType}
                </span>
                {meal.mealTime && (
                  <span className="text-[10px] text-muted-foreground font-medium">
                    {meal.mealTime}
                  </span>
                )}
              </div>

              <div className="border-t border-border/30 pt-3 flex-1 flex flex-col">
                <p className="text-[11px] font-semibold text-foreground/80 mb-2 flex items-center justify-between">
                  <span>Foods Allocated</span>
                  <span className="text-muted-foreground text-[10px]">
                    ({meal.foods?.length || 0})
                  </span>
                </p>

                {meal.foods?.length ? (
                  <ul className="space-y-2 my-auto">
                    {meal.foods.map((foodItem: PackageFood, index: number) => {
                      const foodObj = foodItem.food || foodItem;
                      const name = foodObj.name || `Food Item #${index + 1}`;
                      const thumbnail = foodObj.thumbnail || foodItem.thumbnail;
                      const price = foodObj.variants?.[0]?.price || foodItem.price;

                      return (
                        <li
                          key={foodItem.id || `${foodItem.foodId}-${index}`}
                          className="text-xs text-muted-foreground flex items-center justify-between gap-2 p-2 rounded-xl bg-card/60 border border-border/20"
                        >
                          <div className="flex items-center gap-2 overflow-hidden">
                            {thumbnail && (
                              <img
                                src={thumbnail}
                                alt={name}
                                className="size-8 rounded-lg object-cover flex-shrink-0"
                              />
                            )}
                            <div className="truncate">
                              <p className="font-medium text-foreground text-[11px] truncate">
                                {name}
                              </p>
                              {price && (
                                <p className="text-[10px] text-muted-foreground">
                                  ৳{price}
                                </p>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center gap-1.5 flex-shrink-0">
                            {foodItem.isExtra && (
                              <span className="text-[8px] bg-primary/15 text-primary px-1.5 py-0.5 rounded font-bold uppercase">
                                Custom
                              </span>
                            )}
                            <span className="text-xs font-bold text-foreground bg-muted px-1.5 py-0.5 rounded">
                              x{foodItem.quantity || 1}
                            </span>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                ) : (
                  <div className="py-4 text-center">
                    <p className="text-xs text-muted-foreground/60 italic">
                      No foods assigned.
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-8 text-center text-muted-foreground text-xs bg-background rounded-2xl border border-dashed border-border/40">
            No meals scheduled for Day {activeDay}.
          </div>
        )}
      </div>
    </section>
  );
}
