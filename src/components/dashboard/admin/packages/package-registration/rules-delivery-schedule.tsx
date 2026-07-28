"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { mockDaysOfWeek } from "@/data/package-registration-data";

interface RulesDeliveryScheduleProps {
  rules: any;
  onUpdate: (field: string, value: any) => void;
}

export function RulesDeliverySchedule({ rules, onUpdate }: RulesDeliveryScheduleProps) {
  const toggleDay = (day: string) => {
    const currentDays = rules.deliveryDays || [];
    const newDays = currentDays.includes(day)
      ? currentDays.filter((d: string) => d !== day)
      : [...currentDays, day];
    onUpdate("deliveryDays", newDays);
  };

  return (
    <>
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
            onChange={(e) => onUpdate("deliveryTimeStart", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label>Delivery Time End</Label>
          <Input
            type="time"
            value={rules.deliveryTimeEnd || ""}
            onChange={(e) => onUpdate("deliveryTimeEnd", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label>Meal Cutoff Time</Label>
          <Input
            type="time"
            value={rules.mealCutoffTime || ""}
            onChange={(e) => onUpdate("mealCutoffTime", e.target.value)}
          />
        </div>
      </div>
    </>
  );
}
