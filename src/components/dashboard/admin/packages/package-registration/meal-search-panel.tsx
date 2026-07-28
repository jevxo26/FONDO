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
import { Plus, Search } from "lucide-react";

interface MealSearchPanelProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  filteredFoods: any[];
  onSelectFood: (food: any) => void;
  selectedMealType: string;
  onMealTypeChange: (type: string) => void;
}

export function MealSearchPanel({
  searchQuery,
  onSearchChange,
  filteredFoods,
  onSelectFood,
  selectedMealType,
  onMealTypeChange,
}: MealSearchPanelProps) {
  return (
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
              if (value) onMealTypeChange(value);
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

      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search foods by name or category..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-8"
          />
        </div>
        <Button
          type="button"
          onClick={() => {
            if (searchQuery && filteredFoods.length > 0) {
              onSelectFood(filteredFoods[0]);
            }
          }}
          disabled={!searchQuery || filteredFoods.length === 0}
        >
          <Plus className="h-4 w-4 mr-1" />
          Add
        </Button>
      </div>

      {searchQuery && filteredFoods.length > 0 && (
        <div className="border rounded-lg max-h-48 overflow-y-auto">
          {filteredFoods.slice(0, 5).map((food) => (
            <div
              key={food.id}
              className="flex items-center justify-between p-2 hover:bg-muted/50 cursor-pointer border-b last:border-0"
              onClick={() => onSelectFood(food)}
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
    </div>
  );
}
