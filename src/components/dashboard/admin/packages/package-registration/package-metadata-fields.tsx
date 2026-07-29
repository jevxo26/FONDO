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
import { mockPackageTypes } from "@/data/package-registration-data";

interface PackageMetadataFieldsProps {
  packageType: string;
  durationDays: number;
  totalMeals: number;
  onFieldChange: (field: string, value: unknown) => void;
}

export function PackageMetadataFields({
  packageType,
  durationDays,
  totalMeals,
  onFieldChange,
}: PackageMetadataFieldsProps) {
  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="space-y-2">
        <Label>
          Package Type <span className="text-destructive">*</span>
        </Label>
        <Select
          value={packageType || ""}
          onValueChange={(value: string | null) => {
            if (value) onFieldChange("packageType", value);
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
          value={durationDays || ""}
          onChange={(e) => onFieldChange("durationDays", parseInt(e.target.value))}
          placeholder="e.g., 30"
        />
      </div>
      <div className="space-y-2">
        <Label>
          Total Meals <span className="text-destructive">*</span>
        </Label>
        <Input
          type="number"
          value={totalMeals || ""}
          onChange={(e) => onFieldChange("totalMeals", parseInt(e.target.value))}
          placeholder="e.g., 90"
        />
      </div>
    </div>
  );
}
