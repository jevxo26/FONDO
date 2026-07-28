/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface RulesOrderLimitsProps {
  rules: any;
  onUpdate: (field: string, value: any) => void;
}

export function RulesOrderLimits({ rules, onUpdate }: RulesOrderLimitsProps) {
  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Min Order Days</Label>
          <Input
            type="number"
            value={rules.minimumOrderDays || ""}
            onChange={(e) => onUpdate("minimumOrderDays", parseInt(e.target.value) || 0)}
            placeholder="e.g., 5"
          />
        </div>
        <div className="space-y-2">
          <Label>Max Order Days</Label>
          <Input
            type="number"
            value={rules.maximumOrderDays || ""}
            onChange={(e) => onUpdate("maximumOrderDays", parseInt(e.target.value) || 0)}
            placeholder="e.g., 30"
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Min Meals Per Day</Label>
          <Input
            type="number"
            value={rules.minimumMealsPerDay || ""}
            onChange={(e) => onUpdate("minimumMealsPerDay", parseInt(e.target.value) || 0)}
            placeholder="e.g., 2"
          />
        </div>
        <div className="space-y-2">
          <Label>Max Meals Per Day</Label>
          <Input
            type="number"
            value={rules.maximumMealsPerDay || ""}
            onChange={(e) => onUpdate("maximumMealsPerDay", parseInt(e.target.value) || 0)}
            placeholder="e.g., 3"
          />
        </div>
      </div>
    </>
  );
}
