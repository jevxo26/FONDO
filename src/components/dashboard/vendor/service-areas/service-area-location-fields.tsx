"use client"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { divisions, districts } from "@/data/vendor-service-areas"

interface ServiceAreaLocationFieldsProps {
  formData: {
    division: string
    district: string
    upazila: string
    area: string
  }
  onFieldChange: (field: string, val: string | boolean) => void
}

export function ServiceAreaLocationFields({ formData, onFieldChange }: ServiceAreaLocationFieldsProps) {
  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Division</Label>
          <Select
            value={formData.division}
            onValueChange={(value) => {
              if (value) {
                onFieldChange("division", value)
              }
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select division" />
            </SelectTrigger>
            <SelectContent>
              {divisions
                .filter((d) => d.value !== "ALL")
                .map((division) => (
                  <SelectItem key={division.value} value={division.value}>
                    {division.label}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>District</Label>
          <Select
            value={formData.district}
            onValueChange={(value) => {
              if (value) {
                onFieldChange("district", value)
              }
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select district" />
            </SelectTrigger>
            <SelectContent>
              {districts
                .filter((d) => d.value !== "ALL")
                .map((district) => (
                  <SelectItem key={district.value} value={district.value}>
                    {district.label}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Upazila/Thana</Label>
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
    </>
  )
}
