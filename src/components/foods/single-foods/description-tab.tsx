import { Food } from "@/types/food";
import React from "react";
interface DescriptionTabProps {
  food: Food;
}

const DescriptionTab = ({ food }: DescriptionTabProps) => {
  return (
    <div>
      <div className="flex flex-col gap-4">
        <h3 className="font-sans text-base font-semibold text-secondary-foreground">{food.name}</h3>

        <p className="font-sans text-sm leading-relaxed text-muted-foreground">
          {food.description}
        </p>

        <h4 className="font-sans text-sm font-semibold text-secondary-foreground mt-2">
          Food Information
        </h4>

        <ul className="list-inside space-y-1.5 font-sans text-sm text-muted-foreground">
          <li>&middot; Food Code: {food.foodCode}</li>
          <li>&middot; Category: {food.categoryId}</li>
          <li>&middot; Preparation Time: {food.preparationTime} minutes</li>
          <li>&middot; Serving Size: {food.servingSize}</li>
          <li>&middot; Calories: {food.calories} kcal</li>
          <li>&middot; Protein: {food.protein}g</li>
          <li>&middot; Fat: {food.fat}g</li>
          <li>&middot; Carbohydrate: {food.carbohydrate}g</li>
          <li>&middot; Food Type: {food.foodType}</li>
          <li>&middot; Spice Level: {food.spiceLevel}</li>
          <li>&middot; Status: {food.status}</li>
        </ul>
      </div>
    </div>
  );
};

export default DescriptionTab;
