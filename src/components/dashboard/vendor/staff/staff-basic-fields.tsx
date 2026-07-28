"use client"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

interface StaffBasicFieldsProps {
  formData: {
    fullName: string
    phone: string
    email: string
  }
  onFieldChange: (field: string, val: string | boolean) => void
}

export function StaffBasicFields({ formData, onFieldChange }: StaffBasicFieldsProps) {
  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Full Name</Label>
          <Input
            placeholder="e.g., Ahmed Khan"
            value={formData.fullName}
            onChange={(e) => onFieldChange("fullName", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label>Phone</Label>
          <Input
            placeholder="e.g., +8801712345678"
            value={formData.phone}
            onChange={(e) => onFieldChange("phone", e.target.value)}
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label>Email</Label>
        <Input
          type="email"
          placeholder="e.g., ahmed@fondo.com"
          value={formData.email}
          onChange={(e) => onFieldChange("email", e.target.value)}
        />
      </div>
    </>
  )
}
