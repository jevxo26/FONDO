"use client";

import { FormField } from "@/components/common/form-field";
import { inputStyles } from "@/lib/schema/food-schema";
import type { AdminFoodFormValues } from "@/lib/schema/admin-food-schema";
import { FormSection } from "@/components/dashboard/common/form-section";
import { ImageIcon, Plus, Trash2 } from "lucide-react";
import type {
  Control,
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";
import { Button } from "@/components/ui/button";

interface ImageSectionProps {
  register: UseFormRegister<AdminFoodFormValues>;
  errors: FieldErrors<AdminFoodFormValues>;
  control: Control<AdminFoodFormValues>;
  setValue: UseFormSetValue<AdminFoodFormValues>;
  thumbnail?: string;
  coverImage?: string;
  galleryImages?: string[];
}

export function ImageSection({
  register,
  errors,
  control: _control,
  setValue,
  thumbnail,
  coverImage,
  galleryImages = [],
}: ImageSectionProps) {
  const appendImage = () => setValue("galleryImages", [...galleryImages, ""]);
  const removeImage = (index: number) =>
    setValue(
      "galleryImages",
      galleryImages.filter((_, i) => i !== index),
    );

  return (
    <FormSection
      icon={ImageIcon}
      title="Images"
      description="Thumbnail, cover and gallery photos."
      count={galleryImages.length}
      action={
        <Button type="button" variant="outline" size="sm" onClick={appendImage}>
          <Plus className="mr-1 size-4" />
          Add Image
        </Button>
      }
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <FormField label="Thumbnail URL" error={errors.thumbnail}>
          <input {...register("thumbnail")} placeholder="https://..." className={inputStyles} />
        </FormField>

        <FormField label="Cover Image URL" error={errors.coverImage}>
          <input {...register("coverImage")} placeholder="https://..." className={inputStyles} />
        </FormField>
      </div>

      {(thumbnail || coverImage) && (
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {thumbnail && (
            <div className="relative aspect-square overflow-hidden rounded-xl border border-border/60">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={thumbnail} alt="thumbnail" className="size-full object-cover" />
            </div>
          )}
          {coverImage && (
            <div className="relative aspect-square overflow-hidden rounded-xl border border-border/60">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={coverImage} alt="cover" className="size-full object-cover" />
            </div>
          )}
        </div>
      )}

      <div className="mt-5 border-t border-border/60 pt-4">
        {galleryImages.length === 0 && (
          <p className="text-xs text-muted-foreground">
            No gallery images yet. Add image URLs to showcase the food.
          </p>
        )}

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {galleryImages.map((_, index) => (
            <div key={index} className="flex items-start gap-2">
              <div className="relative min-w-0 flex-1">
                <input
                  {...register(`galleryImages.${index}`)}
                  placeholder="https://..."
                  className={inputStyles}
                />
                {galleryImages[index] && (
                  <div className="mt-1.5 aspect-video overflow-hidden rounded-lg border border-border/60">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={galleryImages[index]} alt="" className="size-full object-cover" />
                  </div>
                )}
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                className="mt-0.5 text-destructive hover:text-destructive/80"
                onClick={() => removeImage(index)}
              >
                <Trash2 className="size-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </FormSection>
  );
}
