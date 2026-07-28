"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface FoodPricingFieldsProps {
  formData: {
    price: string;
    costPrice: string;
    stock: string;
  };
  onFieldChange: (field: string, val: string | boolean) => void;
}

export function FoodPricingFields({ formData, onFieldChange }: FoodPricingFieldsProps) {
  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="space-y-2">
        <Label>Selling Price (৳)</Label>
        <Input
          type="number"
          placeholder="0"
          value={formData.price}
          onChange={(e) => onFieldChange("price", e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <Label>Cost Price (৳)</Label>
        <Input
          type="number"
          placeholder="0"
          value={formData.costPrice}
          onChange={(e) => onFieldChange("costPrice", e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <Label>Stock Quantity</Label>
        <Input
          type="number"
          placeholder="0"
          value={formData.stock}
          onChange={(e) => onFieldChange("stock", e.target.value)}
        />
      </div>
    </div>
  );
}
