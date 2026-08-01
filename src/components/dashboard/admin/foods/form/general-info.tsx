"use client";

import { FormField } from "@/components/common/form-field";
import { inputStyles } from "@/lib/schema/food-schema";
import type { AdminFoodFormValues } from "@/lib/schema/admin-food-schema";
import type { AdminFoodCategory } from "@/types/admin-food";
import { Info } from "lucide-react";
import { useMemo } from "react";
import {
  Controller,
  type Control,
  type FieldErrors,
  type UseFormRegister,
  type UseFormSetValue,
  useWatch,
} from "react-hook-form";
import { Switch } from "@/components/ui/switch";

interface GeneralInfoSectionProps {
  register: UseFormRegister<AdminFoodFormValues>;
  errors: FieldErrors<AdminFoodFormValues>;
  setValue: UseFormSetValue<AdminFoodFormValues>;
  control: Control<AdminFoodFormValues>;
  categories?: AdminFoodCategory[];
}

export function GeneralInfoSection({
  register,
  errors,
  setValue,
  control,
  categories,
}: GeneralInfoSectionProps) {
  const categoryId = useWatch({ control, name: "categoryId" });

  const subCategories = useMemo(
    () => categories?.find((c) => c.id === categoryId)?.subCategories ?? [],
    [categoryId, categories],
  );

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    register("categoryId").onChange(e);
    setValue("subCategoryId", "");
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    const slug = val
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
    setValue("slug", slug, { shouldValidate: true });
  };

  const flagFields = [
    { name: "isFeatured", label: "Featured" },
    { name: "isPopular", label: "Popular" },
    { name: "isRecommended", label: "Recommended" },
    { name: "isVisible", label: "Visible on menu" },
  ] as const;

  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
      <div className="flex items-center gap-2 border-b border-border pb-3">
        <Info className="size-5 text-primary" />
        <h2 className="text-base font-bold text-foreground">General Information</h2>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
        <FormField label="Food Name" error={errors.name} required className="md:col-span-2">
          <input
            {...register("name")}
            onChange={(e) => {
              register("name").onChange(e);
              handleNameChange(e);
            }}
            placeholder="e.g. Royal Mutton Kacchi"
            className={inputStyles}
          />
        </FormField>

        <FormField label="Slug" error={errors.slug} required>
          <input {...register("slug")} placeholder="auto-generated-slug" className={inputStyles} />
        </FormField>

        <FormField label="Status" error={errors.status} required>
          <select {...register("status")} className={inputStyles}>
            <option value="DRAFT">Draft</option>
            <option value="ACTIVE">Active</option>
            <option value="ARCHIVED">Archived</option>
          </select>
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
        </FormField>

        <FormField label="Food Type" error={errors.foodType} required>
          <select {...register("foodType")} className={inputStyles}>
            <option value="VEG">Vegetarian</option>
            <option value="NON_VEG">Non-Vegetarian</option>
            <option value="VEGAN">Vegan</option>
            <option value="SEAFOOD">Seafood</option>
          </select>
        </FormField>

        <FormField label="Spice Level" error={errors.spiceLevel}>
          <select {...register("spiceLevel")} className={inputStyles}>
            <option value="">Select Spice Level...</option>
            <option value="MILD">Mild</option>
            <option value="MEDIUM">Medium</option>
            <option value="HOT">Hot</option>
          </select>
        </FormField>

        <FormField label="Preparation Time (min)" error={errors.preparationTime}>
          <input
            type="number"
            {...register("preparationTime")}
            placeholder="e.g. 30"
            className={inputStyles}
          />
        </FormField>

        <FormField label="Serving Size" error={errors.servingSize}>
          <input {...register("servingSize")} placeholder="e.g. 200g" className={inputStyles} />
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

        <FormField label="Full Description" error={errors.description} className="md:col-span-2">
          <textarea
            rows={3}
            {...register("description")}
            placeholder="Detailed description of the food..."
            className={inputStyles}
          />
        </FormField>

        <div className="flex flex-wrap gap-6 pt-2 md:col-span-2">
          {flagFields.map((flag) => (
            <Controller
              key={flag.name}
              control={control}
              name={flag.name}
              render={({ field }) => (
                <label className="flex cursor-pointer items-center gap-2.5">
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    onBlur={field.onBlur}
                  />
                  <span className="text-sm font-medium text-foreground">{flag.label}</span>
                </label>
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
