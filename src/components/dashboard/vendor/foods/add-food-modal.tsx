"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { FoodBasicFields } from "./food-basic-fields"
import { FoodPricingFields } from "./food-pricing-fields"
import { FoodMetaFields } from "./food-meta-fields"

interface AddFoodModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

interface FormData {
  name: string
  category: string
  subCategory: string
  price: string
  costPrice: string
  stock: string
  kitchen: string
  branch: string
  sku: string
  description: string
}

export function AddFoodModal({ open, onOpenChange }: AddFoodModalProps) {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    category: "",
    subCategory: "",
    price: "",
    costPrice: "",
    stock: "",
    kitchen: "",
    branch: "",
    sku: "",
    description: "",
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
          <DialogTitle className="font-fraunces text-2xl">Add New Food</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <FoodBasicFields formData={formData} onFieldChange={handleFieldChange} />
          <FoodPricingFields formData={formData} onFieldChange={handleFieldChange} />
          <FoodMetaFields formData={formData} onFieldChange={handleFieldChange} />
          <div className="flex justify-end gap-3 pt-4 border-t border-border/50">
            <Button variant="outline" type="button" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" className="gap-2">
              Add Food
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
