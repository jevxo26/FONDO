"use client";

import Image from "next/image";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Food } from "@/types/food";

interface Props {
  foods: Food[];
  onAddFood: (food: Food) => void;
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
              <Image
                src={food.thumbnail || "/placeholder-food.jpg"}
                alt={food.name}
                width={48}
                height={48}
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

            <Button
              onClick={() => onAddFood(food)}
              variant="outline"
              size="icon-sm"
              className="rounded-lg"
            >
              <Plus size={16} />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}