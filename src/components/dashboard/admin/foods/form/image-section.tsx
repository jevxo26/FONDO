"use client";

import { FormField } from "@/components/common/form-field";
import { FormSection } from "@/components/dashboard/common/form-section";
import ImageUploadField from "@/components/common/image-upload";
import { Button } from "@/components/ui/button";
import type { AdminFoodFormValues } from "@/lib/schema/admin-food-schema";
import { ImageIcon, Plus } from "lucide-react";
import type { Control, FieldErrors, UseFormRegister, UseFormSetValue } from "react-hook-form";

interface ImageSectionHandlers {
  thumbnailPreview: string;
  coverPreview: string;
  galleryPreviews: string[];
  onThumbnail: (file: File) => void;
  onCover: (file: File) => void;
  onGallery: (index: number, file: File) => void;
  onAppend: () => void;
  onRemoveThumbnail: () => void;
  onRemoveCover: () => void;
  onRemoveGallery: (index: number) => void;
}

interface ImageSectionProps {
  register: UseFormRegister<AdminFoodFormValues>;
  errors: FieldErrors<AdminFoodFormValues>;
  control: Control<AdminFoodFormValues>;
  setValue: UseFormSetValue<AdminFoodFormValues>;
  thumbnail?: string;
  coverImage?: string;
  galleryImages?: string[];
  images: ImageSectionHandlers;
}

export function ImageSection({
  register,
  errors,
  control: _control,
  setValue,
  galleryImages = [],
  images,
}: ImageSectionProps) {
  const appendImage = () => {
    setValue("galleryImages", [...galleryImages, ""]);
    images.onAppend();
  };

  const removeImage = (index: number) => {
    setValue(
      "galleryImages",
      galleryImages.filter((_, i) => i !== index),
    );
    images.onRemoveGallery(index);
  };

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
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <FormField label="Thumbnail" error={errors.thumbnail}>
          <ImageUploadField
            variant="circle"
            image={images.thumbnailPreview}
            onUpload={images.onThumbnail}
            onRemove={images.onRemoveThumbnail}
          />
        </FormField>

        <FormField label="Cover Image" error={errors.coverImage}>
          <ImageUploadField
            variant="rectangle"
            image={images.coverPreview}
            onUpload={images.onCover}
            onRemove={images.onRemoveCover}
          />
        </FormField>
      </div>

      <div className="mt-6 border-t border-border/60 pt-5">
        <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Gallery</p>
        <p className="mt-0.5 text-xs text-muted-foreground">
          Images upload when you save the food.
        </p>

        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {galleryImages.map((img, index) => (
            <ImageUploadField
              key={index}
              variant="gallery"
              image={images.galleryPreviews[index] ?? img}
              onUpload={(file) => images.onGallery(index, file)}
              onRemove={() => removeImage(index)}
            />
          ))}

          <button
            type="button"
            onClick={appendImage}
            className="flex aspect-square w-full flex-col items-center justify-center gap-1.5 rounded-2xl border-2 border-dashed border-border bg-muted/40 text-muted-foreground transition-all hover:border-primary hover:text-primary hover:bg-muted/80"
          >
            <Plus className="size-5" />
            <span className="text-xs font-medium">Add</span>
          </button>
        </div>
      </div>

      <input type="hidden" {...register("thumbnail")} />
      <input type="hidden" {...register("coverImage")} />
      {galleryImages.map((_, index) => (
        <input key={index} type="hidden" {...register(`galleryImages.${index}`)} />
      ))}
    </FormSection>
  );
}
