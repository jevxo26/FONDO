"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

interface ServiceAreaDeliveryFieldsProps {
  formData: {
    deliveryCharge: string;
    minimumOrderAmount: string;
    estimatedDeliveryTime: string;
    isActive: boolean;
  };
  onFieldChange: (field: string, val: string | boolean) => void;
}

export function ServiceAreaDeliveryFields({
  formData,
  onFieldChange,
}: ServiceAreaDeliveryFieldsProps) {
  return (
    <>
      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label>Delivery Charge (৳)</Label>
          <Input
            type="number"
            placeholder="e.g., 60"
            value={formData.deliveryCharge}
            onChange={(e) => onFieldChange("deliveryCharge", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label>Min Order Amount (৳)</Label>
          <Input
            type="number"
            placeholder="e.g., 300"
            value={formData.minimumOrderAmount}
            onChange={(e) => onFieldChange("minimumOrderAmount", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label>Est.. Delivery (minutes)</Label>
          <Input
            type="number"
            placeholder="e.g., 25"
            value={formData.estimatedDeliveryTime}
            onChange={(e) => onFieldChange("estimatedDeliveryTime", e.target.value)}
          />
        </div>
      </div>
      <div className="flex items-center justify-between pt-2">
        <Label className="cursor-pointer">Active</Label>
        <Switch
          checked={formData.isActive}
          onCheckedChange={(checked) => onFieldChange("isActive", checked)}
        />
      </div>
    </>
  );
}
