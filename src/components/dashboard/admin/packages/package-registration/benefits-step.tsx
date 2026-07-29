"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Plus, Trash2 } from "lucide-react";
import { mockBenefitIcons } from "@/data/package-registration-data";
import type { PackageFormData, PackageBenefit } from "@/lib/schema/package-schema";

interface BenefitsStepProps {
  data: PackageFormData;
  onChange: (field: string, value: unknown) => void;
}

export function BenefitsStep({ data, onChange }: BenefitsStepProps) {
  const benefits = data.benefits || [];

  const addBenefit = () => {
    onChange("benefits", [
      ...benefits,
      { id: `benefit-${Date.now()}`, title: "", description: "", icon: "" },
    ]);
  };

  const removeBenefit = (index: number) => {
    onChange(
      "benefits",
      benefits.filter((_: unknown, i: number) => i !== index),
    );
  };

  const updateBenefit = (index: number, field: string, value: string) => {
    const updated = [...benefits];
    updated[index] = { ...updated[index], [field]: value };
    onChange("benefits", updated);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-fraunces text-lg font-semibold">Benefits</h3>
          <p className="text-sm text-muted-foreground">Add benefits that customers will get</p>
        </div>
        <Button type="button" variant="outline" onClick={addBenefit} className="gap-2">
          <Plus className="h-4 w-4" />
          Add Benefit
        </Button>
      </div>

      {benefits.map((benefit: PackageBenefit, index: number) => (
        <Card key={benefit.id || index} className="p-4 relative">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => removeBenefit(index)}
            className="absolute top-2 right-2 text-destructive hover:text-destructive"
          >
            <Trash2 className="h-4 w-4" />
          </Button>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Icon</Label>
              <Select
                value={benefit.icon || ""}
                onValueChange={(value: string | null) => {
                  if (value) updateBenefit(index, "icon", value);
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select icon" />
                </SelectTrigger>
                <SelectContent>
                  {mockBenefitIcons.map((icon) => (
                    <SelectItem key={icon.value} value={icon.value}>
                      {icon.value} {icon.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2 col-span-2">
              <Label>Title</Label>
              <Input
                value={benefit.title || ""}
                onChange={(e) => updateBenefit(index, "title", e.target.value)}
                placeholder="e.g., Free Delivery"
              />
            </div>
          </div>

          <div className="space-y-2 mt-4">
            <Label>Description</Label>
            <Textarea
              value={benefit.description || ""}
              onChange={(e) => updateBenefit(index, "description", e.target.value)}
              placeholder="Describe the benefit..."
              rows={2}
            />
          </div>
        </Card>
      ))}

      {benefits.length === 0 && (
        <p className="text-sm text-muted-foreground text-center py-8">
          No benefits added. Click &quot;Add Benefit&quot; to start.
        </p>
      )}
    </div>
  );
}
