// src/components/dashboard/vendor/foods/add-food-modal.tsx
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
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { foodCategories, kitchens } from "@/data/vendor-foods";

interface AddFoodModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface FormData {
  name: string;
  category: string;
  subCategory: string;
  price: string;
  costPrice: string;
  stock: string;
  kitchen: string;
  branch: string;
  sku: string;
  description: string;
}

export function AddFoodModal({ open, onOpenChange }: AddFoodModalProps) {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    category: "",
    subCategory: "",
    price: "",
    costPrice: "",
    stock: "",
    kitchen: "",
    branch: "",
    sku: "",
    description: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form data:", formData);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-fraunces text-2xl">Add New Food</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Food Name</Label>
              <Input
                placeholder="e.g., Chicken Biryani"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>SKU</Label>
              <Input
                placeholder="e.g., CB-001"
                value={formData.sku}
                onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
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
                    setFormData({ ...formData, category: value });
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
                onChange={(e) => setFormData({ ...formData, subCategory: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Selling Price (৳)</Label>
              <Input
                type="number"
                placeholder="0"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Cost Price (৳)</Label>
              <Input
                type="number"
                placeholder="0"
                value={formData.costPrice}
                onChange={(e) => setFormData({ ...formData, costPrice: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Stock Quantity</Label>
              <Input
                type="number"
                placeholder="0"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Kitchen</Label>
              <Select
                value={formData.kitchen}
                onValueChange={(value) => {
                  if (value) {
                    setFormData({ ...formData, kitchen: value });
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
                onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea
              placeholder="Enter food description..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-border/50">
            <Button variant="outline" type="button" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" className="gap-2">
              Add Food
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}