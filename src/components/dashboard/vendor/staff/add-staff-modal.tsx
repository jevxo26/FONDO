"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { StaffBasicFields } from "./staff-basic-fields";
import { StaffRoleFields } from "./staff-role-fields";

interface AddStaffModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface FormData {
  fullName: string;
  phone: string;
  email: string;
  designation: string;
  branch: string;
  shift: string;
  salary: string;
  joiningDate: string;
  status: string;
}

export function AddStaffModal({ open, onOpenChange }: AddStaffModalProps) {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    phone: "",
    email: "",
    designation: "",
    branch: "",
    shift: "",
    salary: "",
    joiningDate: "",
    status: "ACTIVE",
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
          <DialogTitle className="font-heading text-2xl">Add New Staff</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <StaffBasicFields formData={formData} onFieldChange={handleFieldChange} />
          <StaffRoleFields formData={formData} onFieldChange={handleFieldChange} />
          <div className="flex justify-end gap-3 pt-4 border-t border-border/50">
            <Button variant="outline" type="button" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" className="gap-2">
              Add Staff
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
