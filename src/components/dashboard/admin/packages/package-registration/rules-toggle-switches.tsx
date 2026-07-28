"use client";

import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface RulesToggleSwitchesProps {
  rules: any;
  onUpdate: (field: string, value: any) => void;
}

export function RulesToggleSwitches({ rules, onUpdate }: RulesToggleSwitchesProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="flex items-center justify-between p-3 border rounded-lg">
        <Label className="cursor-pointer">Advance Payment Required</Label>
        <Switch
          checked={rules.advancePaymentRequired || false}
          onCheckedChange={(checked) => onUpdate("advancePaymentRequired", checked)}
        />
      </div>
      <div className="flex items-center justify-between p-3 border rounded-lg">
        <Label className="cursor-pointer">Allow Pause</Label>
        <Switch
          checked={rules.allowPause || false}
          onCheckedChange={(checked) => onUpdate("allowPause", checked)}
        />
      </div>
      <div className="flex items-center justify-between p-3 border rounded-lg">
        <Label className="cursor-pointer">Allow Skip Meal</Label>
        <Switch
          checked={rules.allowSkipMeal || false}
          onCheckedChange={(checked) => onUpdate("allowSkipMeal", checked)}
        />
      </div>
      <div className="flex items-center justify-between p-3 border rounded-lg">
        <Label className="cursor-pointer">Allow Cancellation</Label>
        <Switch
          checked={rules.allowCancellation || false}
          onCheckedChange={(checked) => onUpdate("allowCancellation", checked)}
        />
      </div>
    </div>
  );
}
