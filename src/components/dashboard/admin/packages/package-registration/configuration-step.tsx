"use client";

import { useState } from "react";
import { vendorFoods } from "@/data/vendor-foods";
import { PackageMetadataFields } from "./package-metadata-fields";
import { MealSearchPanel } from "./meal-search-panel";
import { SelectedMealsList } from "./selected-meals-list";
import { CustomizableToggle } from "./customizable-toggle";

interface ConfigurationStepProps {
  data: any;
  onChange: (field: string, value: any) => void;
}

interface MealItem {
  id: string;
  name: string;
  foodId: string;
  mealType: "BREAKFAST" | "LUNCH" | "DINNER" | "SNACKS";
  quantity: number;
  price: number;
}

export function ConfigurationStep({ data, onChange }: ConfigurationStepProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMealType, setSelectedMealType] = useState<string>("LUNCH");

  const meals = data.meals || [];

  const addMeal = (foodItem: any) => {
    const newMeal: MealItem = {
      id: `meal-${Date.now()}`,
      name: foodItem.name,
      foodId: foodItem.id,
      mealType: selectedMealType as any,
      quantity: 1,
      price: foodItem.price || foodItem.basePrice || 0,
    };
    onChange("meals", [...meals, newMeal]);
    setSearchQuery("");
  };

  const removeMeal = (mealId: string) => {
    onChange("meals", meals.filter((m: MealItem) => m.id !== mealId));
  };

  const updateMealQuantity = (mealId: string, quantity: number) => {
    onChange(
      "meals",
      meals.map((m: MealItem) =>
        m.id === mealId ? { ...m, quantity: Math.max(1, quantity) } : m
      )
    );
  };

  const updateMealType = (mealId: string, mealType: string) => {
    onChange(
      "meals",
      meals.map((m: MealItem) =>
        m.id === mealId ? { ...m, mealType: mealType as any } : m
      )
    );
  };

  const filteredFoods = vendorFoods.filter((food) =>
    food.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    food.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    food.kitchen.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <h3 className="font-fraunces text-lg font-semibold">Configuration</h3>
      <p className="text-sm text-muted-foreground">Configure the package settings</p>

      <PackageMetadataFields
        packageType={data.packageType || ""}
        durationDays={data.durationDays || 0}
        totalMeals={data.totalMeals || 0}
        onFieldChange={onChange}
      />

      <MealSearchPanel
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        filteredFoods={filteredFoods}
        onSelectFood={addMeal}
        selectedMealType={selectedMealType}
        onMealTypeChange={setSelectedMealType}
      />

      <SelectedMealsList
        meals={meals}
        onQuantityChange={updateMealQuantity}
        onMealTypeChange={updateMealType}
        onRemove={removeMeal}
      />

      <CustomizableToggle
        checked={data.isCustomizable || false}
        onChange={(checked) => onChange("isCustomizable", checked)}
      />
    </div>
  );
}
