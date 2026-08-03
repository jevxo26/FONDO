"use client";

import { FormField } from "@/components/common/form-field";
import { inputStyles } from "@/lib/schema/food-schema";
import { FoodFormValues } from "@/lib/schema/food-schema";
import { Vendor } from "@/data/vendors";
import { Info } from "lucide-react";
import { FieldErrors, UseFormRegister, UseFormSetValue, Control, useWatch } from "react-hook-form";
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
  vendors?: Vendor[];
  categories?: Category[];
  vendorIdFromUrl?: string;
}

export function GeneralInfoSection({
  register,
  errors,
  setValue,
  control,
  vendors,
  categories,
  vendorIdFromUrl,
}: GeneralInfoSectionProps) {
  const categoryIdWatched = useWatch({
    control,
    name: "categoryId",
  });

  const subCategories = useMemo(() => {
    const selectedCategory = categories?.find((cat) => cat.id === categoryIdWatched);
    return selectedCategory?.subCategories || [];
  }, [categoryIdWatched, categories]);

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
    <div className="bg-card p-6 rounded-2xl border border-border shadow-sm space-y-5">
      <div className="border-b border-border pb-3 flex items-center gap-2">
        <Info className="w-5 h-5 text-primary" />
        <h2 className="text-base font-bold text-foreground">General Information</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField label="Vendor" error={errors.vendorId} required className="md:col-span-2">
          <select {...register("vendorId")} className={inputStyles} disabled={!!vendorIdFromUrl}>
            <option value="">Select Vendor...</option>
            {vendors?.map((vendor) => (
              <option key={vendor.id} value={vendor.id}>
                {vendor.name} - {vendor.kitchen}
              </option>
            ))}
          </select>
        </FormField>

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
            {subCategories.map((sub) => (
              <option key={sub.id} value={sub.id}>
                {sub.name}
              </option>
            ))}
          </select>
          {subCategories.length === 0 && categoryIdWatched && (
            <p className="text-xs text-muted-foreground mt-1">No sub categories available</p>
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
    </div>
  );
}
