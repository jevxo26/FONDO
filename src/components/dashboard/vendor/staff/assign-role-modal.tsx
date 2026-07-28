// src/components/dashboard/vendor/staff/assign-role-modal.tsx
"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import type { VendorStaff } from "@/types/vendor";

interface AssignRoleModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  staff: VendorStaff | null;
  onAssign: (staff: VendorStaff, roles: string[]) => void;
}

const AVAILABLE_ROLES = [
  "Kitchen Manager",
  "Head Chef",
  "Senior Chef",
  "Chef",
  "Cook",
  "Packing Staff",
  "Delivery Manager",
  "Branch Manager",
];

export function AssignRoleModal({ open, onOpenChange, staff, onAssign }: AssignRoleModalProps) {
  const [selectedRoles, setSelectedRoles] = useState<string[]>(staff?.roles || []);

  const handleToggleRole = (role: string) => {
    setSelectedRoles((prev) =>
      prev.includes(role) ? prev.filter((r) => r !== role) : [...prev, role]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (staff) {
      onAssign(staff, selectedRoles);
      onOpenChange(false);
    }
  };

  if (!staff) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="font-fraunces text-2xl">Assign Roles</DialogTitle>
          <p className="text-sm text-muted-foreground">
            Assign roles to {staff.fullName}
          </p>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-3">
            <Label>Select Roles</Label>
            <div className="grid grid-cols-2 gap-2">
              {AVAILABLE_ROLES.map((role) => (
                <div key={role} className="flex items-center space-x-2">
                  <Checkbox
                    id={`role-${role}`}
                    checked={selectedRoles.includes(role)}
                    onCheckedChange={() => handleToggleRole(role)}
                  />
                  <Label htmlFor={`role-${role}`} className="text-sm font-normal cursor-pointer">
                    {role}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-border/50">
            <Button variant="outline" type="button" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" className="gap-2">
              Assign Roles
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}