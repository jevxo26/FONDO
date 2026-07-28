"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { ServiceAreaLocationFields } from "./service-area-location-fields"
import { ServiceAreaDeliveryFields } from "./service-area-delivery-fields"

interface AddServiceAreaModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

interface FormData {
  division: string
  district: string
  upazila: string
  area: string
  deliveryCharge: string
  minimumOrderAmount: string
  estimatedDeliveryTime: string
  isActive: boolean
}

export function AddServiceAreaModal({ open, onOpenChange }: AddServiceAreaModalProps) {
  const [formData, setFormData] = useState<FormData>({
    division: "",
    district: "",
    upazila: "",
    area: "",
    deliveryCharge: "",
    minimumOrderAmount: "",
    estimatedDeliveryTime: "",
    isActive: true,
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
          <DialogTitle className="font-fraunces text-2xl">Add Service Area</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <ServiceAreaLocationFields formData={formData} onFieldChange={handleFieldChange} />
          <ServiceAreaDeliveryFields formData={formData} onFieldChange={handleFieldChange} />
          <div className="flex justify-end gap-3 pt-4 border-t border-border/50">
            <Button variant="outline" type="button" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" className="gap-2">
              Add Area
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
