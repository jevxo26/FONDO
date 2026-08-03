"use client";

import { FormField } from "@/components/common/form-field";
import { inputStyles } from "@/lib/schema/food-schema";
import type { FoodFormValues } from "@/lib/schema/food-schema";
import { FormSection } from "@/components/dashboard/common/form-section";
import { Info } from "lucide-react";
import type { Control, FieldErrors, UseFormRegister, UseFormSetValue } from "react-hook-form";
import { useWatch } from "react-hook-form";
import { useMemo } from "react";

interface Category {
  id: string;
  name: string;
  subCategories?: { id: string; name: string }[];
}

interface GeneralInfoSectionProps {
  register: UseFormRegister<FoodFormValues>;
  errors: FieldErrors<FoodFormValues>;
  setValue: UseFormSetValue<FoodFormValues>;
  control: Control<FoodFormValues>;
  categories?: Category[];
}

export function GeneralInfoSection({
  register,
  errors,
  setValue,
  control,
  categories,
}: GeneralInfoSectionProps) {
  const categoryIdWatched = useWatch({ control, name: "categoryId" });

  const subCategories = useMemo(
    () => categories?.find((cat) => cat.id === categoryIdWatched)?.subCategories ?? [],
    [categoryIdWatched, categories],
  );

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    register("categoryId").onChange(e);
    setValue("subCategoryId", "");
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    const generatedSlug = val
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
    setValue("slug", generatedSlug, { shouldValidate: true });
  };

  return (
    <FormSection icon={Info} title="Basics" description="Name, category and classification.">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <FormField label="Food Name" error={errors.name} required className="md:col-span-2">
          <input
            {...register("name")}
            onChange={(e) => {
              register("name").onChange(e);
              handleNameChange(e);
            }}
            placeholder="e.g. Grilled Chicken Bowl"
            className={inputStyles}
          />
        </FormField>

        <FormField label="Slug" error={errors.slug} required>
          <input {...register("slug")} placeholder="auto-generated-slug" className={inputStyles} />
        </FormField>

        <FormField label="Category" error={errors.categoryId} required>
          <select {...register("categoryId")} onChange={handleCategoryChange} className={inputStyles}>
            <option value="">Select Category...</option>
            {categories?.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </FormField>

        <FormField label="Sub Category" error={errors.subCategoryId}>
          <select
            {...register("subCategoryId")}
            className={inputStyles}
            disabled={subCategories.length === 0}
          >
            <option value="">Select Sub Category...</option>
            {subCategories.map((sub: { id: string; name: string }) => (
              <option key={sub.id} value={sub.id}>
                {sub.name}
              </option>
            ))}
          </select>
          {subCategories.length === 0 && categoryIdWatched && (
            <p className="mt-1 text-xs text-muted-foreground">No sub categories available</p>
          )}
        </FormField>

        <FormField
          label="Short Description"
          error={errors.shortDescription}
          className="md:col-span-2"
        >
          <textarea
            rows={2}
            {...register("shortDescription")}
            placeholder="Brief description of the food..."
            className={inputStyles}
          />
        </FormField>

        <FormField
          label="Full Description"
          error={errors.fullDescription}
          className="md:col-span-2"
        >
          <textarea
            rows={3}
            {...register("fullDescription")}
            placeholder="Detailed description of the food..."
            className={inputStyles}
          />
        </FormField>

        <FormField label="Food Type" error={errors.foodType} required>
          <select {...register("foodType")} className={inputStyles}>
            <option value="">Select Food Type...</option>
            <option value="VEG">Vegetarian</option>
            <option value="NON_VEG">Non-Vegetarian</option>
            <option value="VEGAN">Vegan</option>
            <option value="EGG">Egg</option>
          </select>
        </FormField>

        <FormField label="Spice Level" error={errors.spiceLevel}>
          <select {...register("spiceLevel")} className={inputStyles}>
            <option value="">Select Spice Level...</option>
            <option value="MILD">Mild</option>
            <option value="MEDIUM">Medium</option>
            <option value="HOT">Hot</option>
            <option value="VERY_HOT">Very Hot</option>
          </select>
        </FormField>

        <FormField label="Preparation Time (minutes)" error={errors.preparationTime}>
          <input
            type="number"
            {...register("preparationTime")}
            placeholder="e.g. 30"
            className={inputStyles}
          />
        </FormField>

        <FormField label="Status" error={errors.status} required>
          <select {...register("status")} className={inputStyles}>
            <option value="ACTIVE">Active</option>
            <option value="INACTIVE">Inactive</option>
            <option value="DRAFT">Draft</option>
            <option value="ARCHIVED">Archived</option>
          </select>
        </FormField>
      </div>
    </FormSection>
  );
}
