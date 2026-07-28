"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { BranchBasicFields } from "./branch-basic-fields"
import { BranchAddressFields } from "./branch-address-fields"
import { BranchSettingsFields } from "./branch-settings-fields"

interface AddBranchModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

interface FormData {
  branchName: string
  branchCode: string
  phone: string
  email: string
  country: string
  division: string
  district: string
  upazila: string
  area: string
  road: string
  house: string
  postalCode: string
  latitude: string
  longitude: string
  isMainBranch: boolean
  status: string
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
  })

  const handleFieldChange = (field: string, val: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: val }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form data:", formData)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-fraunces text-2xl">Add New Branch</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <BranchBasicFields formData={formData} onFieldChange={handleFieldChange} />
          <BranchAddressFields formData={formData} onFieldChange={handleFieldChange} />
          <BranchSettingsFields formData={formData} onFieldChange={handleFieldChange} />
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
  )
}
