"use client";

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
import { mockTags } from "@/data/package-registration-data";

interface PackageDescriptionTagsProps {
  description: string;
  tags: string[];
  selectedTag: string;
  onFieldChange: (field: string, value: any) => void;
  onSelectedTagChange: (value: string) => void;
  onAddTag: (value: string | null) => void;
  onRemoveTag: (tag: string) => void;
}

export function PackageDescriptionTags({
  description,
  tags,
  selectedTag,
  onFieldChange,
  onSelectedTagChange,
  onAddTag,
  onRemoveTag,
}: PackageDescriptionTagsProps) {
  return (
    <>
      <div className="space-y-2">
        <Label>Description</Label>
        <Textarea
          value={description}
          onChange={(e) => onFieldChange("description", e.target.value)}
          placeholder="Describe the package..."
          rows={3}
        />
      </div>
      <div className="space-y-2">
        <Label>Tags</Label>
        <Select value={selectedTag} onValueChange={onAddTag}>
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
          {tags.map((tag: string) => (
            <Badge key={tag} variant="outline" className="gap-1">
              {mockTags.find((t) => t.value === tag)?.label || tag}
              <button
                type="button"
                onClick={() => onRemoveTag(tag)}
                className="hover:text-destructive"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
      </div>
    </>
  );
}
