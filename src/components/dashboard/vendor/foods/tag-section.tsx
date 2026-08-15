"use client";

import type { FoodFormValues } from "@/lib/schema/food-schema";
import { FormSection } from "@/components/dashboard/common/form-section";
import { Tag } from "lucide-react";
import type { Control, FieldErrors, UseFormRegister } from "react-hook-form";
import { cn } from "@/lib/utils";

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

function ChipGroup({
  label,
  options,
  registerName,
  errors,
  register,
}: {
  label: string;
  options: string[];
  registerName: "labels" | "tags";
  errors: FieldErrors<FoodFormValues>;
  register: UseFormRegister<FoodFormValues>;
}) {
  const err = errors[registerName];

  return (
    <div>
      <p className="mb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
        {label}
      </p>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <label
            key={option}
            className={cn(
              "cursor-pointer select-none rounded-full border px-3 py-1.5 text-xs font-medium transition-colors has-[:checked]:border-primary has-[:checked]:bg-primary has-[:checked]:text-primary-foreground has-[:checked]:shadow-[0_2px_8px_rgba(168,90,56,0.25)]",
              "border-border bg-muted text-muted-foreground hover:border-primary/40",
            )}
          >
            <input type="checkbox" {...register(registerName)} value={option} className="sr-only" />
            {option}
          </label>
        ))}
      </div>
      {err && <p className="mt-1 text-sm text-destructive">{err.message}</p>}
    </div>
  );
}

export function TagSection({ register, errors, labelsWatched, tagsWatched }: TagSectionProps) {
  return (
    <FormSection
      icon={Tag}
      title="Labels & Tags"
      description="Highlight the dish for customers."
      count={(labelsWatched?.length ?? 0) + (tagsWatched?.length ?? 0)}
    >
      <div className="space-y-5">
        <ChipGroup
          label="Labels"
          options={LABEL_OPTIONS}
          registerName="labels"
          errors={errors}
          register={register}
        />
        <ChipGroup
          label="Tags"
          options={TAG_OPTIONS}
          registerName="tags"
          errors={errors}
          register={register}
        />
      </div>
    </FormSection>
  );
}
