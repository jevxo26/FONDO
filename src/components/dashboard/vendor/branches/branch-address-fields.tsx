"use client"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

interface BranchAddressFieldsProps {
  formData: {
    division: string
    district: string
    upazila: string
    area: string
    road: string
    house: string
    postalCode: string
    country: string
    latitude: string
    longitude: string
  }
  onFieldChange: (field: string, val: string | boolean) => void
}

export function BranchAddressFields({ formData, onFieldChange }: BranchAddressFieldsProps) {
  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Division</Label>
          <Input
            placeholder="e.g., Dhaka"
            value={formData.division}
            onChange={(e) => onFieldChange("division", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label>District</Label>
          <Input
            placeholder="e.g., Dhaka"
            value={formData.district}
            onChange={(e) => onFieldChange("district", e.target.value)}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Upazila / Thana</Label>
          <Input
            placeholder="e.g., Gulshan"
            value={formData.upazila}
            onChange={(e) => onFieldChange("upazila", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label>Area</Label>
          <Input
            placeholder="e.g., Gulshan-1"
            value={formData.area}
            onChange={(e) => onFieldChange("area", e.target.value)}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Road</Label>
          <Input
            placeholder="e.g., Road #5"
            value={formData.road}
            onChange={(e) => onFieldChange("road", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label>House</Label>
          <Input
            placeholder="e.g., House #12"
            value={formData.house}
            onChange={(e) => onFieldChange("house", e.target.value)}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Postal Code</Label>
          <Input
            placeholder="e.g., 1212"
            value={formData.postalCode}
            onChange={(e) => onFieldChange("postalCode", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label>Country</Label>
          <Input
            placeholder="e.g., Bangladesh"
            value={formData.country}
            onChange={(e) => onFieldChange("country", e.target.value)}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Latitude</Label>
          <Input
            placeholder="e.g., 23.7925"
            value={formData.latitude}
            onChange={(e) => onFieldChange("latitude", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label>Longitude</Label>
          <Input
            placeholder="e.g., 90.4078"
            value={formData.longitude}
            onChange={(e) => onFieldChange("longitude", e.target.value)}
          />
        </div>
      </div>
    </>
  )
}
