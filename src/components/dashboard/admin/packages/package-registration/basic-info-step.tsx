"use client";

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
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { mockCategories, mockTags } from "@/data/package-registration-data";
import { useState } from "react";

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

  const generateCode = () => {
    const prefix = "PKG";
    const timestamp = Date.now().toString().slice(-6);
    return `${prefix}-${timestamp}`;
  };

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

  return (
    <div className="space-y-6">
      <h3 className="font-fraunces text-lg font-semibold">Basic Information</h3>
      <p className="text-sm text-muted-foreground">Enter the basic details of your package</p>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>
            Package Name <span className="text-destructive">*</span>
          </Label>
          <Input
            value={data.name || ""}
            onChange={(e) => {
              const name = e.target.value;
              onChange("name", name);
              if (!data.slug || data.slug === generateSlug(data.name || "")) {
                onChange("slug", generateSlug(name));
              }
            }}
            placeholder="e.g., Diabetic Care"
          />
        </div>
        <div className="space-y-2">
          <Label>Slug</Label>
          <Input
            value={data.slug || ""}
            onChange={(e) => onChange("slug", e.target.value)}
            placeholder="auto-generated from name"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Package Code</Label>
          <Input
            value={data.packageCode || generateCode()}
            onChange={(e) => onChange("packageCode", e.target.value)}
            placeholder="Auto-generated"
          />
        </div>
        <div className="space-y-2">
          <Label>
            Category <span className="text-destructive">*</span>
          </Label>
          <Select
            value={data.category || ""}
            onValueChange={(value: string | null) => {
              if (value) onChange("category", value);
            }}
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

      <div className="space-y-2">
        <Label>Description</Label>
        <Textarea
          value={data.description || ""}
          onChange={(e) => onChange("description", e.target.value)}
          placeholder="Describe the package..."
          rows={3}
        />
      </div>

      <div className="space-y-2">
        <Label>Tags</Label>
        <Select
          value={selectedTag}
          onValueChange={handleAddTag}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select tags" />
          </SelectTrigger>
          <SelectContent>
            {mockTags.map((tag) => (
              <SelectItem key={tag.value} value={tag.value}>
                {tag.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="flex flex-wrap gap-2 mt-2">
          {(data.tags || []).map((tag: string) => (
            <Badge key={tag} variant="outline" className="gap-1">
              {mockTags.find((t) => t.value === tag)?.label || tag}
              <button
                type="button"
                onClick={() => handleRemoveTag(tag)}
                className="hover:text-destructive"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
      </div>

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