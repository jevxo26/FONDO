// src/components/dashboard/admin/packages/package-registration/media-step.tsx
"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";

interface MediaStepProps {
  data: any;
  onChange: (field: string, value: any) => void;
}

export function MediaStep({ data, onChange }: MediaStepProps) {
  const gallery = data.gallery || [];

  const addGalleryImage = () => {
    onChange("gallery", [...gallery, ""]);
  };

  const removeGalleryImage = (index: number) => {
    onChange("gallery", gallery.filter((_: any, i: number) => i !== index));
  };

  const updateGalleryImage = (index: number, value: string) => {
    const updated = [...gallery];
    updated[index] = value;
    onChange("gallery", updated);
  };

  return (
    <div className="space-y-6">
      <h3 className="font-fraunces text-lg font-semibold">Media</h3>
      <p className="text-sm text-muted-foreground">Upload images for your package</p>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Thumbnail URL</Label>
          <Input
            value={data.thumbnail || ""}
            onChange={(e) => onChange("thumbnail", e.target.value)}
            placeholder="https://example.com/thumb.jpg"
          />
          {data.thumbnail && (
            <div className="mt-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={data.thumbnail}
                alt="Thumbnail"
                className="h-24 w-24 rounded-lg object-cover border"
              />
            </div>
          )}
        </div>
        <div className="space-y-2">
          <Label>Cover Image URL</Label>
          <Input
            value={data.coverImage || ""}
            onChange={(e) => onChange("coverImage", e.target.value)}
            placeholder="https://example.com/cover.jpg"
          />
          {data.coverImage && (
            <div className="mt-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={data.coverImage}
                alt="Cover"
                className="h-24 w-40 rounded-lg object-cover border"
              />
            </div>
          )}
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label>Gallery Images</Label>
          <Button type="button" variant="outline" onClick={addGalleryImage} className="gap-2">
            <Plus className="h-4 w-4" />
            Add Image
          </Button>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {gallery.map((url: string, index: number) => (
            <Card key={index} className="p-3 relative">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => removeGalleryImage(index)}
                className="absolute top-1 right-1 text-destructive hover:text-destructive h-6 w-6 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
              <Input
                value={url}
                onChange={(e) => updateGalleryImage(index, e.target.value)}
                placeholder="Image URL"
                className="text-xs"
              />
              {url && (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={url}
                  alt={`Gallery ${index + 1}`}
                  className="mt-2 h-20 w-full rounded object-cover border"
                />
              )}
            </Card>
          ))}
        </div>

        {gallery.length === 0 && (
          <p className="text-sm text-muted-foreground text-center py-4">
            No gallery images added.
          </p>
        )}
      </div>
    </div>
  );
}