// src/components/dashboard/vendor/branches/add-branch-modal.tsx
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
import { branchStatuses } from "@/data/vendor-branches";

interface AddBranchModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface FormData {
  branchName: string;
  branchCode: string;
  phone: string;
  email: string;
  country: string;
  division: string;
  district: string;
  upazila: string;
  area: string;
  road: string;
  house: string;
  postalCode: string;
  latitude: string;
  longitude: string;
  isMainBranch: boolean;
  status: string;
}

export function AddBranchModal({ open, onOpenChange }: AddBranchModalProps) {
  const [formData, setFormData] = useState<FormData>({
    branchName: "",
    branchCode: "",
    phone: "",
    email: "",
    country: "Bangladesh",
    division: "",
    district: "",
    upazila: "",
    area: "",
    road: "",
    house: "",
    postalCode: "",
    latitude: "",
    longitude: "",
    isMainBranch: false,
    status: "ACTIVE",
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
          <DialogTitle className="font-fraunces text-2xl">Add New Branch</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Branch Name</Label>
              <Input
                placeholder="e.g., Gulshan Branch"
                value={formData.branchName}
                onChange={(e) => setFormData({ ...formData, branchName: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Branch Code</Label>
              <Input
                placeholder="e.g., BR-001"
                value={formData.branchCode}
                onChange={(e) => setFormData({ ...formData, branchCode: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Phone</Label>
              <Input
                placeholder="e.g., +8801712345678"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input
                type="email"
                placeholder="e.g., branch@fondo.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Division</Label>
              <Input
                placeholder="e.g., Dhaka"
                value={formData.division}
                onChange={(e) => setFormData({ ...formData, division: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>District</Label>
              <Input
                placeholder="e.g., Dhaka"
                value={formData.district}
                onChange={(e) => setFormData({ ...formData, district: e.target.value })}
              />
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

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Road</Label>
              <Input
                placeholder="e.g., Road #5"
                value={formData.road}
                onChange={(e) => setFormData({ ...formData, road: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>House</Label>
              <Input
                placeholder="e.g., House #12"
                value={formData.house}
                onChange={(e) => setFormData({ ...formData, house: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Postal Code</Label>
              <Input
                placeholder="e.g., 1212"
                value={formData.postalCode}
                onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Country</Label>
              <Input
                placeholder="e.g., Bangladesh"
                value={formData.country}
                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Latitude</Label>
              <Input
                placeholder="e.g., 23.7925"
                value={formData.latitude}
                onChange={(e) => setFormData({ ...formData, latitude: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Longitude</Label>
              <Input
                placeholder="e.g., 90.4078"
                value={formData.longitude}
                onChange={(e) => setFormData({ ...formData, longitude: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
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
                  {branchStatuses
                    .filter((s) => s.value !== "ALL")
                    .map((status) => (
                      <SelectItem key={status.value} value={status.value}>
                        {status.label}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2 flex items-center justify-between pt-6">
              <Label className="cursor-pointer">Set as Main Branch</Label>
              <Switch
                checked={formData.isMainBranch}
                onCheckedChange={(checked) => setFormData({ ...formData, isMainBranch: checked })}
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-border/50">
            <Button variant="outline" type="button" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" className="gap-2">
              Add Branch
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}