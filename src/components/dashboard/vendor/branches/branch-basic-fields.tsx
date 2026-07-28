"use client"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

interface BranchBasicFieldsProps {
  formData: {
    branchName: string
    branchCode: string
    phone: string
    email: string
  }
  onFieldChange: (field: string, val: string | boolean) => void
}

export function BranchBasicFields({ formData, onFieldChange }: BranchBasicFieldsProps) {
  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Branch Name</Label>
          <Input
            placeholder="e.g., Gulshan Branch"
            value={formData.branchName}
            onChange={(e) => onFieldChange("branchName", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label>Branch Code</Label>
          <Input
            placeholder="e.g., BR-001"
            value={formData.branchCode}
            onChange={(e) => onFieldChange("branchCode", e.target.value)}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Phone</Label>
          <Input
            placeholder="e.g., +8801712345678"
            value={formData.phone}
            onChange={(e) => onFieldChange("phone", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label>Email</Label>
          <Input
            type="email"
            placeholder="e.g., branch@fondo.com"
            value={formData.email}
            onChange={(e) => onFieldChange("email", e.target.value)}
          />
        </div>
      </div>
    </>
  )
}
