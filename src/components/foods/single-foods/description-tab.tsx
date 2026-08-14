import { Food } from "@/types/food";
import React from "react";
interface DescriptionTabProps {
  food: Food;
}

const DescriptionTab = ({ food }: DescriptionTabProps) => {
  const description = food.description ?? food.shortDescription ?? "";

  return (
    <div>
      <div className="flex flex-col gap-4">
        <h3 className="font-sans text-base font-semibold text-secondary-foreground">{food.name}</h3>

        <p className="font-sans text-sm leading-relaxed text-muted-foreground">{description}</p>

        {food.tags.length > 0 && (
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-sans text-xs font-medium text-muted-foreground">Tags:</span>
            {food.tags.map((tag) => (
              <span
                key={tag.id ?? tag.name}
                className="rounded-full border border-border/60 bg-muted/40 px-2.5 py-1 text-[11px] font-medium text-foreground/80"
              >
                {tag.name}
              </span>
            ))}
          </div>
        )}

        <h4 className="font-sans text-sm font-semibold text-secondary-foreground mt-2">
          Food Information
        </h4>

        <ul className="list-inside space-y-1.5 font-sans text-sm text-muted-foreground">
          <li>&middot; Category: {food.category.name}</li>
          <li>&middot; Preparation Time: {food.preparationTime ?? 0} minutes</li>
          <li>&middot; Serving Size: {food.servingSize ?? ""}</li>
          <li>&middot; Calories: {food.calories ?? 0} kcal</li>
          <li>&middot; Protein: {food.protein ?? 0}g</li>
          <li>&middot; Fat: {food.fat ?? 0}g</li>
          <li>&middot; Carbohydrate: {food.carbohydrate ?? 0}g</li>
          <li>&middot; Food Type: {food.foodType}</li>
          <li>&middot; Spice Level: {food.spiceLevel}</li>
        </ul>
      </div>
    </div>
  );
};

export default DescriptionTab;
