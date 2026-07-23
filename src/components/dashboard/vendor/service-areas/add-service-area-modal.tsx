// src/components/dashboard/vendor/service-areas/add-service-area-modal.tsx
"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { divisions, districts } from "@/data/vendor-service-areas";

interface AddServiceAreaModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface FormData {
  division: string;
  district: string;
  upazila: string;
  area: string;
  deliveryCharge: string;
  minimumOrderAmount: string;
  estimatedDeliveryTime: string;
  isActive: boolean;
}

export function AddServiceAreaModal({ open, onOpenChange }: AddServiceAreaModalProps) {
  const [formData, setFormData] = useState<FormData>({
    division: "",
    district: "",
    upazila: "",
    area: "",
    deliveryCharge: "",
    minimumOrderAmount: "",
    estimatedDeliveryTime: "",
    isActive: true,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form data:", formData);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-fraunces text-2xl">Add Service Area</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Division</Label>
              <Select
                value={formData.division}
                onValueChange={(value) => {
                  if (value) {
                    setFormData({ ...formData, division: value });
                  }
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select division" />
                </SelectTrigger>
                <SelectContent>
                  {divisions
                    .filter((d) => d.value !== "ALL")
                    .map((division) => (
                      <SelectItem key={division.value} value={division.value}>
                        {division.label}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>District</Label>
              <Select
                value={formData.district}
                onValueChange={(value) => {
                  if (value) {
                    setFormData({ ...formData, district: value });
                  }
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select district" />
                </SelectTrigger>
                <SelectContent>
                  {districts
                    .filter((d) => d.value !== "ALL")
                    .map((district) => (
                      <SelectItem key={district.value} value={district.value}>
                        {district.label}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Upazila / Thana</Label>
              <Input
                placeholder="e.g., Gulshan"
                value={formData.upazila}
                onChange={(e) => setFormData({ ...formData, upazila: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Area</Label>
              <Input
                placeholder="e.g., Gulshan-1"
                value={formData.area}
                onChange={(e) => setFormData({ ...formData, area: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Delivery Charge (৳)</Label>
              <Input
                type="number"
                placeholder="e.g., 60"
                value={formData.deliveryCharge}
                onChange={(e) => setFormData({ ...formData, deliveryCharge: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Min Order Amount (৳)</Label>
              <Input
                type="number"
                placeholder="e.g., 300"
                value={formData.minimumOrderAmount}
                onChange={(e) => setFormData({ ...formData, minimumOrderAmount: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Est. Delivery (minutes)</Label>
              <Input
                type="number"
                placeholder="e.g., 25"
                value={formData.estimatedDeliveryTime}
                onChange={(e) => setFormData({ ...formData, estimatedDeliveryTime: e.target.value })}
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <Label className="cursor-pointer">Active</Label>
            <Switch
              checked={formData.isActive}
              onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-border/50">
            <Button variant="outline" type="button" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" className="gap-2">
              Add Area
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}