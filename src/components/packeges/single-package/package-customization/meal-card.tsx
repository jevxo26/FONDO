"use client";

import { Minus, Plus } from "lucide-react";

interface MealCardProps {
  meal: any;
  onQuantityChange: (
    mealIndex: number,
    foodIndex: number,
    quantity: number
  ) => void;
  mealIndex: number;
}

export default function MealCard({
  meal,
  mealIndex,
  onQuantityChange,
}: MealCardProps) {
  const foods = Array.isArray(meal?.foods) ? meal.foods : [];

  return (
    <div className="border rounded-xl p-4 bg-background space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h4 className="font-semibold">{meal?.mealType ?? "Meal"}</h4>
          <p className="text-xs text-muted-foreground">
            {meal?.mealTime ?? "No time set"}
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {foods.map((food: any, foodIndex: number) => {
          const foodName = food?.food?.name ?? food?.name ?? "Food item";
          const calories = food?.food?.calories ?? food?.calories ?? 0;
          const quantity = Number(food?.quantity ?? 1);

          return (
            <div
              key={food?.id ?? `${mealIndex}-${foodIndex}`}
              className="flex justify-between items-center border rounded-lg p-3"
            >
              <div>
                <h5 className="text-sm font-medium">{foodName}</h5>

                <p className="text-xs text-muted-foreground">
                  {calories} kcal
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    onQuantityChange(
                      mealIndex,
                      foodIndex,
                      Math.max(1, quantity - 1)
                    )
                  }
                  className="border rounded p-1"
                >
                  <Minus size={14} />
                </button>

                <span>{quantity}</span>

                <button
                  onClick={() =>
                    onQuantityChange(mealIndex, foodIndex, quantity + 1)
                  }
                  className="border rounded p-1"
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}