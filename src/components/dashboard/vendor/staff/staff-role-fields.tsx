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
import { staffDesignations, staffShifts, staffBranches, staffStatuses } from "@/data/vendor-staff";

interface StaffRoleFieldsProps {
  formData: {
    designation: string;
    branch: string;
    shift: string;
    salary: string;
    joiningDate: string;
    status: string;
  };
  onFieldChange: (field: string, val: string | boolean) => void;
}

export function StaffRoleFields({ formData, onFieldChange }: StaffRoleFieldsProps) {
  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Designation</Label>
          <Select
            value={formData.designation}
            onValueChange={(value) => {
              if (value) {
                onFieldChange("designation", value);
              }
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select designation" />
            </SelectTrigger>
            <SelectContent>
              {staffDesignations
                .filter((d) => d.value !== "ALL")
                .map((designation) => (
                  <SelectItem key={designation.value} value={designation.value}>
                    {designation.label}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Branch</Label>
          <Select
            value={formData.branch}
            onValueChange={(value) => {
              if (value) {
                onFieldChange("branch", value);
              }
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select branch" />
            </SelectTrigger>
            <SelectContent>
              {staffBranches
                .filter((b) => b.value !== "ALL")
                .map((branch) => (
                  <SelectItem key={branch.value} value={branch.value}>
                    {branch.label}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label>Shift</Label>
          <Select
            value={formData.shift}
            onValueChange={(value) => {
              if (value) {
                onFieldChange("shift", value);
              }
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select shift" />
            </SelectTrigger>
            <SelectContent>
              {staffShifts
                .filter((s) => s.value !== "ALL")
                .map((shift) => (
                  <SelectItem key={shift.value} value={shift.value}>
                    {shift.label}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Salary (৳)</Label>
          <Input
            type="number"
            placeholder="e.g., 25000"
            value={formData.salary}
            onChange={(e) => onFieldChange("salary", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label>Joining Date</Label>
          <Input
            type="date"
            value={formData.joiningDate}
            onChange={(e) => onFieldChange("joiningDate", e.target.value)}
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label>Status</Label>
        <Select
          value={formData.status}
          onValueChange={(value) => {
            if (value) {
              onFieldChange("status", value);
            }
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            {staffStatuses
              .filter((s) => s.value !== "ALL")
              .map((status) => (
                <SelectItem key={status.value} value={status.value}>
                  {status.label}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
      </div>
    </>
  );
}
