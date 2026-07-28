"use client"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { kitchenStatuses } from "@/data/vendor-kitchens"

interface KitchenConfigFieldsProps {
  formData: {
    capacity: string
    preparationTime: string
    status: string
    description: string
  }
  onFieldChange: (field: string, val: string | boolean) => void
}

export function KitchenConfigFields({ formData, onFieldChange }: KitchenConfigFieldsProps) {
  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Capacity</Label>
          <Input
            type="number"
            placeholder="e.g., 50"
            value={formData.capacity}
            onChange={(e) => onFieldChange("capacity", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label>Preparation Time (minutes)</Label>
          <Input
            type="number"
            placeholder="e.g., 25"
            value={formData.preparationTime}
            onChange={(e) => onFieldChange("preparationTime", e.target.value)}
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label>Status</Label>
        <Select
          value={formData.status}
          onValueChange={(value) => {
            if (value) {
              onFieldChange("status", value)
            }
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            {kitchenStatuses
              .filter((s) => s.value !== "ALL")
              .map((status) => (
                <SelectItem key={status.value} value={status.value}>
                  {status.label}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label>Description</Label>
        <Textarea
          placeholder="Enter kitchen description..."
          value={formData.description}
          onChange={(e) => onFieldChange("description", e.target.value)}
          rows={3}
        />
      </div>
    </>
  )
}
