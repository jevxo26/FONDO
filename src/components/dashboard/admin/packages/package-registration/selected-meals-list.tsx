"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { X } from "lucide-react";

interface MealItem {
  id: string;
  name: string;
  foodId: string;
  mealType: "BREAKFAST" | "LUNCH" | "DINNER" | "SNACKS";
  quantity: number;
  price: number;
}

interface SelectedMealsListProps {
  meals: MealItem[];
  onQuantityChange: (id: string, qty: number) => void;
  onMealTypeChange: (id: string, type: string) => void;
  onRemove: (id: string) => void;
}

export function SelectedMealsList({
  meals,
  onQuantityChange,
  onMealTypeChange,
  onRemove,
}: SelectedMealsListProps) {
  if (meals.length === 0) return null;

  return (
    <div className="space-y-2 mt-4">
      <p className="text-xs text-muted-foreground">Selected Meals ({meals.length})</p>
      {meals.map((meal: MealItem) => (
        <Card key={meal.id} className="p-3 flex items-center gap-3">
          <Badge className="w-24 justify-center">{meal.mealType}</Badge>
          <div className="flex-1">
            <p className="text-sm font-medium">{meal.name}</p>
          </div>
          <div className="flex items-center gap-2">
            <Label className="text-xs">Qty:</Label>
            <Input
              type="number"
              min={1}
              value={meal.quantity}
              onChange={(e) => onQuantityChange(meal.id, parseInt(e.target.value) || 1)}
              className="w-14 h-8 text-center"
            />
          </div>
          <div className="flex items-center gap-2">
            <Select
              value={meal.mealType}
              onValueChange={(value: string | null) => {
                if (value) onMealTypeChange(meal.id, value);
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
            onClick={() => onRemove(meal.id)}
            className="text-destructive hover:text-destructive"
          >
            <X className="h-4 w-4" />
          </Button>
        </Card>
      ))}
    </div>
  );
}
