"use client";

import MealCard from "./meal-card";
import type { PackageDay, PackageMeal } from "@/types/package";

interface DayCardProps {
  day: PackageDay;
  dayIndex: number;
  onQuantityChange: (
    dayIndex: number,
    mealIndex: number,
    foodIndex: number,
    quantity: number
  ) => void;
}

export default function DayCard({
  day,
  dayIndex,
  onQuantityChange,
}: DayCardProps) {
  const meals = Array.isArray(day?.meals) ? day.meals : [];

  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-heading text-lg">
          Day {day?.dayNumber ?? dayIndex + 1}
        </h3>

        <p className="text-xs text-muted-foreground">
          {day?.title ?? "Meal schedule"}
        </p>
      </div>

      {meals.map((meal: PackageMeal, mealIndex: number) => (
        <MealCard
          key={meal?.id ?? `${dayIndex}-${mealIndex}`}
          meal={meal}
          mealIndex={mealIndex}
          onQuantityChange={(m, f, q) =>
            onQuantityChange(dayIndex, m, f, q)
          }
        />
      ))}
    </div>
  );
}