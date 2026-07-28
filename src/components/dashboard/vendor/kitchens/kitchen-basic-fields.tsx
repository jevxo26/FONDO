"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { branches } from "@/data/vendor-kitchens";

interface KitchenBasicFieldsProps {
  formData: {
    name: string;
    code: string;
    branch: string;
    headChef: string;
  };
  onFieldChange: (field: string, val: string | boolean) => void;
}

export function KitchenBasicFields({ formData, onFieldChange }: KitchenBasicFieldsProps) {
  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Kitchen Name</Label>
          <Input
            placeholder="e.g., Main Kitchen"
            value={formData.name}
            onChange={(e) => onFieldChange("name", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label>Kitchen Code</Label>
          <Input
            placeholder="e.g., KIT-001"
            value={formData.code}
            onChange={(e) => onFieldChange("code", e.target.value)}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Branch</Label>
          <Select
            value={formData.branch}
            onValueChange={(value) => {
              if (value) {
                onFieldChange("branch", value);
              }
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select branch" />
            </SelectTrigger>
            <SelectContent>
              {branches
                .filter((b) => b.value !== "ALL")
                .map((branch) => (
                  <SelectItem key={branch.value} value={branch.value}>
                    {branch.label}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Head Chef</Label>
          <Input
            placeholder="e.g., Ahmed Khan"
            value={formData.headChef}
            onChange={(e) => onFieldChange("headChef", e.target.value)}
          />
        </div>
      </div>
    </>
  );
}
