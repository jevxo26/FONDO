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
import { foodCategories } from "@/data/vendor-foods";

interface FoodBasicFieldsProps {
  formData: {
    name: string;
    sku: string;
    category: string;
    subCategory: string;
  };
  onFieldChange: (field: string, val: string | boolean) => void;
}

export function FoodBasicFields({ formData, onFieldChange }: FoodBasicFieldsProps) {
  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Food Name</Label>
          <Input
            placeholder="e.g., Chicken Biryani"
            value={formData.name}
            onChange={(e) => onFieldChange("name", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label>SKU</Label>
          <Input
            placeholder="e.g., CB-001"
            value={formData.sku}
            onChange={(e) => onFieldChange("sku", e.target.value)}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Category</Label>
          <Select
            value={formData.category}
            onValueChange={(value) => {
              if (value) {
                onFieldChange("category", value);
              }
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {foodCategories
                .filter((c) => c.value !== "ALL")
                .map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Sub Category</Label>
          <Input
            placeholder="e.g., Biryani"
            value={formData.subCategory}
            onChange={(e) => onFieldChange("subCategory", e.target.value)}
          />
        </div>
      </div>
    </>
  );
}
