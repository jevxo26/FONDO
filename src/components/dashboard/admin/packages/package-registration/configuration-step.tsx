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
import { Switch } from "@/components/ui/switch";
import { mockPackageTypes } from "@/data/package-registration-data";

interface ConfigurationStepProps {
  data: any;
  onChange: (field: string, value: any) => void;
}

export function ConfigurationStep({ data, onChange }: ConfigurationStepProps) {
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