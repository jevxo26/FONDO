"use client"

import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { branchStatuses } from "@/data/vendor-branches"

interface BranchSettingsFieldsProps {
  formData: {
    status: string
    isMainBranch: boolean
  }
  onFieldChange: (field: string, val: string | boolean) => void
}

export function BranchSettingsFields({ formData, onFieldChange }: BranchSettingsFieldsProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
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
          onCheckedChange={(checked) => onFieldChange("isMainBranch", checked)}
        />
      </div>
    </div>
  )
}
