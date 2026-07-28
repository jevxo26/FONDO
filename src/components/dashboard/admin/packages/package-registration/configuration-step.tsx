// src/components/dashboard/admin/packages/package-registration/configuration-step.tsx
"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { mockPackageTypes } from "@/data/package-registration-data";
import { X, Plus, Search } from "lucide-react";

// Food data from your existing food file
import { vendorFoods } from "@/data/vendor-foods";

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

      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label>
            Package Type <span className="text-destructive">*</span>
          </Label>
          <Select
            value={data.packageType || ""}
            onValueChange={(value: string | null) => {
              if (value) onChange("packageType", value);
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              {mockPackageTypes.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>
            Duration (days) <span className="text-destructive">*</span>
          </Label>
          <Input
            type="number"
            value={data.durationDays || ""}
            onChange={(e) => onChange("durationDays", parseInt(e.target.value))}
            placeholder="e.g., 30"
          />
        </div>
        <div className="space-y-2">
          <Label>
            Total Meals <span className="text-destructive">*</span>
          </Label>
          <Input
            type="number"
            value={data.totalMeals || ""}
            onChange={(e) => onChange("totalMeals", parseInt(e.target.value))}
            placeholder="e.g., 90"
          />
        </div>
      </div>

      {/* Add Meals Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <Label>Package Meals</Label>
            <p className="text-xs text-muted-foreground">Add meals that will be included in this package</p>
          </div>
          <div className="flex items-center gap-2">
            <Select
              value={selectedMealType}
              onValueChange={(value: string | null) => {
                if (value) setSelectedMealType(value);
              }}
            >
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Meal Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="BREAKFAST">Breakfast</SelectItem>
                <SelectItem value="LUNCH">Lunch</SelectItem>
                <SelectItem value="DINNER">Dinner</SelectItem>
                <SelectItem value="SNACKS">Snacks</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Search & Add */}
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search foods by name or category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8"
            />
          </div>
          <Button 
            type="button" 
            onClick={() => {
              if (searchQuery && filteredFoods.length > 0) {
                addMeal(filteredFoods[0]);
              }
            }}
            disabled={!searchQuery || filteredFoods.length === 0}
          >
            <Plus className="h-4 w-4 mr-1" />
            Add
          </Button>
        </div>

        {/* Search Results */}
        {searchQuery && filteredFoods.length > 0 && (
          <div className="border rounded-lg max-h-48 overflow-y-auto">
            {filteredFoods.slice(0, 5).map((food) => (
              <div
                key={food.id}
                className="flex items-center justify-between p-2 hover:bg-muted/50 cursor-pointer border-b last:border-0"
                onClick={() => addMeal(food)}
              >
                <div>
                  <p className="text-sm font-medium">{food.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {food.category} • {food.kitchen} • ৳{food.price}
                  </p>
                </div>
                <Badge variant="outline" className="text-[10px]">
                  {food.stockStatus}
                </Badge>
              </div>
            ))}
          </div>
        )}

        {searchQuery && filteredFoods.length === 0 && (
          <p className="text-sm text-muted-foreground text-center py-2">No foods found</p>
        )}

        {/* Selected Meals List */}
        {meals.length > 0 && (
          <div className="space-y-2 mt-4">
            <p className="text-xs text-muted-foreground">Selected Meals ({meals.length})</p>
            {meals.map((meal: MealItem) => (
              <Card key={meal.id} className="p-3 flex items-center gap-3">
                <Badge className="w-24 justify-center">
                  {meal.mealType}
                </Badge>
                <div className="flex-1">
                  <p className="text-sm font-medium">{meal.name}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Label className="text-xs">Qty:</Label>
                  <Input
                    type="number"
                    min={1}
                    value={meal.quantity}
                    onChange={(e) => updateMealQuantity(meal.id, parseInt(e.target.value) || 1)}
                    className="w-14 h-8 text-center"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Select
                    value={meal.mealType}
                    onValueChange={(value: string | null) => {
                      if (value) updateMealType(meal.id, value);
                    }}
                  >
                    <SelectTrigger className="w-28 h-8">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="BREAKFAST">Breakfast</SelectItem>
                      <SelectItem value="LUNCH">Lunch</SelectItem>
                      <SelectItem value="DINNER">Dinner</SelectItem>
                      <SelectItem value="SNACKS">Snacks</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeMeal(meal.id)}
                  className="text-destructive hover:text-destructive"
                >
                  <X className="h-4 w-4" />
                </Button>
              </Card>
            ))}
          </div>
        )}
      </div>

      <div className="flex items-center justify-between p-4 border rounded-lg">
        <div className="space-y-0.5">
          <Label className="text-base">Customizable</Label>
          <p className="text-sm text-muted-foreground">Allow customers to customize meals</p>
        </div>
        <Switch
          checked={data.isCustomizable || false}
          onCheckedChange={(checked) => onChange("isCustomizable", checked)}
        />
      </div>
    </div>
  );
}