// src/components/dashboard/vendor/kitchens/add-kitchen-modal.tsx
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
import { branches, kitchenStatuses } from "@/data/vendor-kitchens";

interface AddKitchenModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface FormData {
  name: string;
  code: string;
  branch: string;
  capacity: string;
  preparationTime: string;
  headChef: string;
  status: string;
  description: string;
}

export function AddKitchenModal({ open, onOpenChange }: AddKitchenModalProps) {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    code: "",
    branch: "",
    capacity: "",
    preparationTime: "",
    headChef: "",
    status: "ACTIVE",
    description: "",
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
          <DialogTitle className="font-fraunces text-2xl">Add New Kitchen</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Kitchen Name</Label>
              <Input
                placeholder="e.g., Main Kitchen"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Kitchen Code</Label>
              <Input
                placeholder="e.g., KIT-001"
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
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
                    setFormData({ ...formData, branch: value });
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
                onChange={(e) => setFormData({ ...formData, headChef: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Capacity</Label>
              <Input
                type="number"
                placeholder="e.g., 50"
                value={formData.capacity}
                onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Preparation Time (minutes)</Label>
              <Input
                type="number"
                placeholder="e.g., 25"
                value={formData.preparationTime}
                onChange={(e) => setFormData({ ...formData, preparationTime: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Status</Label>
            <Select
              value={formData.status}
              onValueChange={(value) => {
                if (value) {
                  setFormData({ ...formData, status: value });
                }
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                {kitchenStatuses
                  .filter((s) => s.value !== "ALL")
                  .map((status) => (
                    <SelectItem key={status.value} value={status.value}>
                      {status.label}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea
              placeholder="Enter kitchen description..."
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
              Add Kitchen
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}