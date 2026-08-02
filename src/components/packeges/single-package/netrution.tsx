"use client";

import { useMemo } from "react";
import type { PackageDay, PackageMeal, PackageFood } from "@/types/package";

interface Props {
  days: PackageDay[];
}

export default function NutrientDashboard({ days }: Props) {
  const nutrition = useMemo(() => {
    let calories = 0;
    let protein = 0;
    let carbohydrate = 0;
    let fat = 0;
    let fiber = 0;
    let sugar = 0;
    let sodium = 0;
    let cholesterol = 0;

    days?.forEach((day) => {
      day.meals?.forEach((meal: PackageMeal) => {
        meal.foods?.forEach((item: PackageFood) => {
          const food = item.food;

          if (!food) return;

          calories += Number(food.calories ?? 0);
          protein += Number(food.protein ?? 0);
          carbohydrate += Number(food.carbohydrate ?? 0);
          fat += Number(food.fat ?? 0);
          fiber += Number(food.fiber ?? 0);
          sugar += Number(food.sugar ?? 0);
          sodium += Number(food.sodium ?? 0);
          cholesterol += Number(food.cholesterol ?? 0);
        });
      });
    });

    return {
      calories,
      protein,
      carbohydrate,
      fat,
      fiber,
      sugar,
      sodium,
      cholesterol,
    };
  }, [days]);

  const cards = [
    {
      label: "Calories",
      value: nutrition.calories,
      unit: "kcal",
    },
    {
      label: "Protein",
      value: nutrition.protein,
      unit: "g",
    },
    {
      label: "Carbohydrates",
      value: nutrition.carbohydrate,
      unit: "g",
    },
    {
      label: "Fat",
      value: nutrition.fat,
      unit: "g",
    },
    {
      label: "Fiber",
      value: nutrition.fiber,
      unit: "g",
    },
    {
      label: "Sugar",
      value: nutrition.sugar,
      unit: "g",
    },
    {
      label: "Sodium",
      value: nutrition.sodium,
      unit: "mg",
    },
    {
      label: "Cholesterol",
      value: nutrition.cholesterol,
      unit: "mg",
    },
  ];

  return (
    <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {cards.map((card) => (
        <div
          key={card.label}
          className="bg-card border border-border/20 rounded-2xl p-4 text-center shadow-sm"
        >
          <span className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground/70 block mb-1">
            {card.label}
          </span>

          <div className="font-heading text-2xl font-medium text-foreground">
            {card.value}
          </div>

          <span className="text-[10px] text-muted-foreground">
            {card.unit}
          </span>
        </div>
      ))}
    </section>
  );
}