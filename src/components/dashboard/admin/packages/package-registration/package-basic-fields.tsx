"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { mockCategories } from "@/data/package-registration-data";

interface PackageBasicFieldsProps {
  name: string;
  slug: string;
  packageCode: string;
  category: string;
  onFieldChange: (field: string, value: any) => void;
}

export function PackageBasicFields({ name, slug, packageCode, category, onFieldChange }: PackageBasicFieldsProps) {
  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>
            Package Name <span className="text-destructive">*</span>
          </Label>
          <Input
            value={name}
            onChange={(e) => onFieldChange("name", e.target.value)}
            placeholder="e.g., Diabetic Care"
          />
        </div>
        <div className="space-y-2">
          <Label>Slug</Label>
          <Input
            value={slug}
            onChange={(e) => onFieldChange("slug", e.target.value)}
            placeholder="auto-generated from name"
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Package Code</Label>
          <Input
            value={packageCode}
            onChange={(e) => onFieldChange("packageCode", e.target.value)}
            placeholder="Auto-generated"
          />
        </div>
        <div className="space-y-2">
          <Label>
            Category <span className="text-destructive">*</span>
          </Label>
          <Select
            value={category}
            onValueChange={(value) => value && onFieldChange("category", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {mockCategories.map((cat) => (
                <SelectItem key={cat.value} value={cat.value}>
                  {cat.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </>
  );
}
