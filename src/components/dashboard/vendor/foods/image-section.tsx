"use client";

import { FormField } from "@/components/common/form-field";
import { inputStyles } from "@/lib/schema/food-schema";
import { FoodFormValues } from "@/lib/schema/food-schema";
import { Image, Plus, Trash2 } from "lucide-react";
import {
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
  useFieldArray,
  Control,
} from "react-hook-form";
import { Button } from "@/components/ui/button";

interface ImageSectionProps {
  register: UseFormRegister<FoodFormValues>;
  errors: FieldErrors<FoodFormValues>;
  setValue: UseFormSetValue<FoodFormValues>;
  control: Control<FoodFormValues>;
  thumbnailWatched?: string;
  coverImageWatched?: string;
  galleryImagesWatched?: { url: string }[];
}

export function ImageSection({
  register,
  errors,
  setValue,
  control,
  thumbnailWatched,
  coverImageWatched,
  galleryImagesWatched,
}: ImageSectionProps) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "galleryImages",
  });

  return (
    <div className="bg-card p-6 rounded-2xl border border-border shadow-sm space-y-5">
      <div className="border-b border-border pb-3 flex items-center gap-2">
        <Image className="w-5 h-5 text-primary" />
        <h2 className="text-base font-bold text-foreground">Images</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField label="Thumbnail URL" error={errors.thumbnail} required>
          <input
            {...register("thumbnail")}
            placeholder="https://example.com/thumbnail.jpg"
            className={inputStyles}
          />
          {thumbnailWatched && (
            <div className="mt-2">
              <img
                src={thumbnailWatched}
                alt="Thumbnail preview"
                className="w-32 h-32 object-cover rounded-lg border border-border"
                onError={(e) => (e.currentTarget.style.display = "none")}
              />
            </div>
          )}
        </FormField>

        <FormField label="Cover Image URL" error={errors.coverImage}>
          <input
            {...register("coverImage")}
            placeholder="https://example.com/cover.jpg"
            className={inputStyles}
          />
          {coverImageWatched && (
            <div className="mt-2">
              <img
                src={coverImageWatched}
                alt="Cover preview"
                className="w-32 h-32 object-cover rounded-lg border border-border"
                onError={(e) => (e.currentTarget.style.display = "none")}
              />
            </div>
          )}
        </FormField>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-foreground mb-2">Gallery Images</label>

          {fields.map((field, index) => (
            <div key={field.id} className="flex items-center gap-2 mb-2">
              <input
                {...register(`galleryImages.${index}.url`)}
                placeholder="https://example.com/gallery.jpg"
                className={inputStyles}
              />
              {galleryImagesWatched?.[index]?.url && (
                <img
                  src={galleryImagesWatched[index].url}
                  alt={`Gallery ${index}`}
                  className="w-12 h-12 object-cover rounded border border-border flex-shrink-0"
                  onError={(e) => (e.currentTarget.style.display = "none")}
                />
              )}
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => remove(index)}
                className="text-destructive hover:text-destructive/80"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))}

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => append({ url: "" })}
            className="mt-2"
          >
            <Plus className="w-4 h-4 mr-1" />
            Add Gallery Image
          </Button>

          {errors.galleryImages && (
            <p className="text-sm text-destructive mt-1">{errors.galleryImages.message}</p>
          )}
        </div>
      </div>
    </div>
  );
}
