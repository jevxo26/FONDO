"use client";

import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface CustomizableToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export function CustomizableToggle({ checked, onChange }: CustomizableToggleProps) {
  return (
    <div className="flex items-center justify-between p-4 border rounded-lg">
      <div className="space-y-0.5">
        <Label className="text-base">Customizable</Label>
        <p className="text-sm text-muted-foreground">Allow customers to customize meals</p>
      </div>
      <Switch checked={checked} onCheckedChange={onChange} />
    </div>
  );
}
