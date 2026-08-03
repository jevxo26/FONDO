"use client";

import { FormField } from "@/components/common/form-field";
import { inputStyles } from "@/lib/schema/food-schema";
import type { FoodFormValues } from "@/lib/schema/food-schema";
import { FormSection } from "@/components/dashboard/common/form-section";
import { Image, Plus, Trash2 } from "lucide-react";
import type {
  Control,
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";
import { useFieldArray } from "react-hook-form";
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
    <FormSection
      icon={Image}
      title="Photos"
      description="Set a thumbnail, cover and gallery for the food."
      action={
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => append({ url: "" })}
        >
          <Plus className="mr-1 size-4" />
          Add Gallery Image
        </Button>
      }
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <FormField label="Thumbnail URL" error={errors.thumbnail} required>
          <input
            {...register("thumbnail")}
            placeholder="https://example.com/thumbnail.jpg"
            className={inputStyles}
          />
          {thumbnailWatched && (
            <div className="mt-2 overflow-hidden rounded-xl border border-border/60">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={thumbnailWatched}
                alt="Thumbnail preview"
                className="aspect-[4/3] w-full object-cover"
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
            <div className="mt-2 overflow-hidden rounded-xl border border-border/60">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={coverImageWatched}
                alt="Cover preview"
                className="aspect-[4/3] w-full object-cover"
                onError={(e) => (e.currentTarget.style.display = "none")}
              />
            </div>
          )}
        </FormField>

        <div className="md:col-span-2">
          <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Gallery Images
          </label>

          {fields.length === 0 && (
            <p className="mb-3 text-xs text-muted-foreground">
              No gallery images yet. Add image URLs to showcase the food.
            </p>
          )}

          <div className="space-y-2">
            {fields.map((field, index) => (
              <div key={field.id} className="flex items-center gap-2">
                <div className="min-w-0 flex-1">
                  <input
                    {...register(`galleryImages.${index}.url`)}
                    placeholder="https://example.com/gallery.jpg"
                    className={inputStyles}
                  />
                  {galleryImagesWatched?.[index]?.url && (
                    <div className="mt-1.5 overflow-hidden rounded-lg border border-border/60">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={galleryImagesWatched[index].url}
                        alt={`Gallery ${index + 1}`}
                        className="aspect-video w-full object-cover"
                        onError={(e) => (e.currentTarget.style.display = "none")}
                      />
                    </div>
                  )}
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  onClick={() => remove(index)}
                  className="shrink-0 text-destructive hover:text-destructive/80"
                >
                  <Trash2 className="size-4" />
                </Button>
              </div>
            ))}
          </div>

          {errors.galleryImages && (
            <p className="mt-1 text-sm text-destructive">{errors.galleryImages.message}</p>
          )}
        </div>
      </div>
    </FormSection>
  );
}
