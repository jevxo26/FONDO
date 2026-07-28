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
import { Textarea } from "@/components/ui/textarea";
import { kitchens } from "@/data/vendor-foods";

interface FoodMetaFieldsProps {
  formData: {
    kitchen: string;
    branch: string;
    description: string;
  };
  onFieldChange: (field: string, val: string | boolean) => void;
}

export function FoodMetaFields({ formData, onFieldChange }: FoodMetaFieldsProps) {
  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Kitchen</Label>
          <Select
            value={formData.kitchen}
            onValueChange={(value) => {
              if (value) {
                onFieldChange("kitchen", value);
              }
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select kitchen" />
            </SelectTrigger>
            <SelectContent>
              {kitchens
                .filter((k) => k.value !== "ALL")
                .map((kitchen) => (
                  <SelectItem key={kitchen.value} value={kitchen.value}>
                    {kitchen.label}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Branch</Label>
          <Input
            placeholder="e.g., Gulshan Branch"
            value={formData.branch}
            onChange={(e) => onFieldChange("branch", e.target.value)}
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label>Description</Label>
        <Textarea
          placeholder="Enter food description..."
          value={formData.description}
          onChange={(e) => onFieldChange("description", e.target.value)}
          rows={3}
        />
      </div>
    </>
  );
}
