"use client";

import { FormField } from "@/components/common/form-field";
import { inputStyles } from "@/lib/schema/food-schema";
import { FoodFormValues } from "@/lib/schema/food-schema";
import { Tag } from "lucide-react";
import { FieldErrors, UseFormRegister, Control } from "react-hook-form";

interface TagSectionProps {
  control: Control<FoodFormValues>;
  register: UseFormRegister<FoodFormValues>;
  errors: FieldErrors<FoodFormValues>;
  labelsWatched?: string[];
  tagsWatched?: string[];
}

const LABEL_OPTIONS = [
  "Featured",
  "Popular",
  "Recommended",
  "Best Seller",
  "Chef Choice",
  "Limited Time",
];

const TAG_OPTIONS = [
  "Healthy",
  "High Protein",
  "Keto",
  "Vegan",
  "Organic",
  "Diet Friendly",
  "Low Carb",
  "Spicy",
  "Gluten Free",
  "Low Fat",
];

export function TagSection({ register, errors, labelsWatched, tagsWatched }: TagSectionProps) {
  return (
    <div className="bg-card p-6 rounded-2xl border border-border shadow-sm space-y-5">
      <div className="border-b border-border pb-3 flex items-center gap-2">
        <Tag className="w-5 h-5 text-primary" />
        <h2 className="text-base font-bold text-foreground">Labels & Tags</h2>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Labels</label>
          <div className="flex flex-wrap gap-3">
            {LABEL_OPTIONS.map((label) => (
              <label key={label} className="flex items-center gap-2 text-sm cursor-pointer">
                <input
                  type="checkbox"
                  {...register("labels")}
                  value={label}
                  className="w-4 h-4 rounded border-input text-primary accent-primary"
                />
                {label}
              </label>
            ))}
          </div>
          {errors.labels && (
            <p className="text-sm text-destructive mt-1">{errors.labels.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Tags</label>
          <div className="flex flex-wrap gap-3">
            {TAG_OPTIONS.map((tag) => (
              <label key={tag} className="flex items-center gap-2 text-sm cursor-pointer">
                <input
                  type="checkbox"
                  {...register("tags")}
                  value={tag}
                  className="w-4 h-4 rounded border-input text-primary accent-primary"
                />
                {tag}
              </label>
            ))}
          </div>
          {errors.tags && <p className="text-sm text-destructive mt-1">{errors.tags.message}</p>}
        </div>
      </div>
    </div>
  );
}
