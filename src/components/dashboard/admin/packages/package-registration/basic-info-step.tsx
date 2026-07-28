"use client";

import { useState, useMemo } from "react";
import { PackageBasicFields } from "./package-basic-fields";
import { PackageDescriptionTags } from "./package-description-tags";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface BasicInfoStepProps {
  data: any;
  onChange: (field: string, value: any) => void;
}

export function BasicInfoStep({ data, onChange }: BasicInfoStepProps) {
  const [selectedTag, setSelectedTag] = useState<string>("");

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  };

  const defaultCode = useMemo(() => {
    const prefix = "PKG";
    const timestamp = Date.now().toString().slice(-6);
    return `${prefix}-${timestamp}`;
  }, []);

  const handleAddTag = (value: string | null) => {
    if (value) {
      const currentTags = data.tags || [];
      if (!currentTags.includes(value)) {
        onChange("tags", [...currentTags, value]);
      }
      setSelectedTag("");
    }
  };

  const handleRemoveTag = (tag: string) => {
    onChange("tags", (data.tags || []).filter((t: string) => t !== tag));
  };

  const handleNameChange = (value: string) => {
    onChange("name", value);
    if (!data.slug || data.slug === generateSlug(data.name || "")) {
      onChange("slug", generateSlug(value));
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="font-fraunces text-lg font-semibold">Basic Information</h3>
      <p className="text-sm text-muted-foreground">Enter the basic details of your package</p>

      <PackageBasicFields
        name={data.name || ""}
        slug={data.slug || ""}
        packageCode={data.packageCode || defaultCode}
        category={data.category || ""}
        onFieldChange={(field, value) => {
          if (field === "name") handleNameChange(value);
          else onChange(field, value);
        }}
      />

      <PackageDescriptionTags
        description={data.description || ""}
        tags={data.tags || []}
        selectedTag={selectedTag}
        onFieldChange={onChange}
        onSelectedTagChange={setSelectedTag}
        onAddTag={handleAddTag}
        onRemoveTag={handleRemoveTag}
      />

      <div className="space-y-2">
        <Label>Status</Label>
        <Select
          value={data.status || "DRAFT"}
          onValueChange={(value: string | null) => {
            if (value) onChange("status", value);
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ACTIVE">Active</SelectItem>
            <SelectItem value="DRAFT">Draft</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
