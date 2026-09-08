"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { KitchenBasicFields } from "./kitchen-basic-fields";
import { KitchenConfigFields } from "./kitchen-config-fields";

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

  const handleFieldChange = (field: string, val: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: val }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form data:", formData);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-heading text-2xl">Add New Kitchen</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <KitchenBasicFields formData={formData} onFieldChange={handleFieldChange} />
          <KitchenConfigFields formData={formData} onFieldChange={handleFieldChange} />
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
