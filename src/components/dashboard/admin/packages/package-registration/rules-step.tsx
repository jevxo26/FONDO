// src/components/dashboard/admin/packages/package-registration/rules-step.tsx
"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { mockDaysOfWeek } from "@/data/package-registration-data";

interface RulesStepProps {
  data: any;
  onChange: (field: string, value: any) => void;
}

export function RulesStep({ data, onChange }: RulesStepProps) {
  const rules = data.rules || {};

  const updateRules = (field: string, value: any) => {
    onChange("rules", { ...rules, [field]: value });
  };

  const toggleDay = (day: string) => {
    const currentDays = rules.deliveryDays || [];
    const newDays = currentDays.includes(day)
      ? currentDays.filter((d: string) => d !== day)
      : [...currentDays, day];
    updateRules("deliveryDays", newDays);
  };

  return (
    <div className="space-y-6">
      <h3 className="font-fraunces text-lg font-semibold">Rules & Schedule</h3>
      <p className="text-sm text-muted-foreground">Set the rules and schedule for your package</p>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Min Order Days</Label>
          <Input
            type="number"
            value={rules.minimumOrderDays || ""}
            onChange={(e) => updateRules("minimumOrderDays", parseInt(e.target.value) || 0)}
            placeholder="e.g., 5"
          />
        </div>
        <div className="space-y-2">
          <Label>Max Order Days</Label>
          <Input
            type="number"
            value={rules.maximumOrderDays || ""}
            onChange={(e) => updateRules("maximumOrderDays", parseInt(e.target.value) || 0)}
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
            onChange={(e) => updateRules("minimumMealsPerDay", parseInt(e.target.value) || 0)}
            placeholder="e.g., 2"
          />
        </div>
        <div className="space-y-2">
          <Label>Max Meals Per Day</Label>
          <Input
            type="number"
            value={rules.maximumMealsPerDay || ""}
            onChange={(e) => updateRules("maximumMealsPerDay", parseInt(e.target.value) || 0)}
            placeholder="e.g., 3"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center justify-between p-3 border rounded-lg">
          <Label className="cursor-pointer">Advance Payment Required</Label>
          <Switch
            checked={rules.advancePaymentRequired || false}
            onCheckedChange={(checked) => updateRules("advancePaymentRequired", checked)}
          />
        </div>
        <div className="flex items-center justify-between p-3 border rounded-lg">
          <Label className="cursor-pointer">Allow Pause</Label>
          <Switch
            checked={rules.allowPause || false}
            onCheckedChange={(checked) => updateRules("allowPause", checked)}
          />
        </div>
        <div className="flex items-center justify-between p-3 border rounded-lg">
          <Label className="cursor-pointer">Allow Skip Meal</Label>
          <Switch
            checked={rules.allowSkipMeal || false}
            onCheckedChange={(checked) => updateRules("allowSkipMeal", checked)}
          />
        </div>
        <div className="flex items-center justify-between p-3 border rounded-lg">
          <Label className="cursor-pointer">Allow Cancellation</Label>
          <Switch
            checked={rules.allowCancellation || false}
            onCheckedChange={(checked) => updateRules("allowCancellation", checked)}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Delivery Days</Label>
        <div className="flex flex-wrap gap-3">
          {mockDaysOfWeek.map((day) => (
            <div key={day.value} className="flex items-center space-x-2">
              <Checkbox
                id={`day-${day.value}`}
                checked={(rules.deliveryDays || []).includes(day.value)}
                onCheckedChange={() => toggleDay(day.value)}
              />
              <Label htmlFor={`day-${day.value}`} className="text-sm font-normal cursor-pointer">
                {day.label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label>Delivery Time Start</Label>
          <Input
            type="time"
            value={rules.deliveryTimeStart || ""}
            onChange={(e) => updateRules("deliveryTimeStart", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label>Delivery Time End</Label>
          <Input
            type="time"
            value={rules.deliveryTimeEnd || ""}
            onChange={(e) => updateRules("deliveryTimeEnd", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label>Meal Cutoff Time</Label>
          <Input
            type="time"
            value={rules.mealCutoffTime || ""}
            onChange={(e) => updateRules("mealCutoffTime", e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}