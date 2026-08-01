"use client";

import { Plus } from "lucide-react";

interface Props {
  foods: any[];
  onAddFood: (food: any) => void;
}

export default function FoodSelector({
  foods,
  onAddFood,
}: Props) {
  return (
    <div className="border rounded-xl p-4 bg-card space-y-3">
      <h4 className="text-sm font-semibold">
        Add Extra Food
      </h4>

      <div className="space-y-2 max-h-60 overflow-y-auto">
        {foods.map((food) => (
          <div
            key={food.id}
            className="flex items-center justify-between border rounded-lg p-2"
          >
            <div className="flex gap-3 items-center">
              <img
                src={food.thumbnail}
                alt={food.name}
                className="w-12 h-12 rounded object-cover"
              />

              <div>
                <p className="text-sm font-medium">
                  {food.name}
                </p>

                <p className="text-xs text-muted-foreground">
                  {food.calories} kcal
                </p>

                <p className="text-xs font-semibold text-primary">
                  ৳{food.variants?.[0]?.price ?? 0}
                </p>
              </div>
            </div>

            <button
              onClick={() => onAddFood(food)}
              className="p-2 rounded-lg border hover:bg-primary hover:text-white"
            >
              <Plus size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}