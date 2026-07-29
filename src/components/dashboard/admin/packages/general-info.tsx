import React from "react";
import { Layers } from "lucide-react";
import type { FieldErrors } from "react-hook-form";
import { UseFormRegister, UseFormSetValue } from "react-hook-form";
import { inputStyles, PackageFormValues } from "@/lib/schema/package-schema";
import { FormField } from "@/components/common/form-field";
import { PackageCategory } from "@prisma/client";

export function GeneralInfoSection({
  register,
  errors,
  packageTypeWatched,
  setValue,
  categories
}: {
  register: UseFormRegister<PackageFormValues>;
  errors: FieldErrors<PackageFormValues>;
  packageTypeWatched: string;
  setValue: UseFormSetValue<PackageFormValues>;
  categories?: PackageCategory[]
}) {
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    const generatedSlug = val.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
    setValue("slug", generatedSlug, { shouldValidate: true });
  };



  return (
    <div className="bg-card p-6 rounded-2xl border border-border shadow-sm space-y-5">
      <div className="border-b border-border pb-3 flex items-center gap-2">
        <Layers className="w-5 h-5 text-primary" />
        <h2 className="text-base font-bold text-foreground">Package General Info</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField label="Package Name" error={errors.name} required className="md:col-span-2">
          <input
            {...register("name")}
            onChange={(e) => {
              register("name").onChange(e);
              handleNameChange(e);
            }}
            placeholder="e.g. 7-Day Premium Weight Gain Plan"
            className={inputStyles}
          />
        </FormField>

        <FormField label="Package Code" error={errors.packageCode} required>
          <input {...register("packageCode")} placeholder="PKG-WG-PRO" className={inputStyles} />
        </FormField>

        <FormField label="Slug" error={errors.slug} required>
          <input {...register("slug")} placeholder="auto-generated-slug" className={inputStyles} />
        </FormField>

        <FormField label="Package Category" error={errors.packageCategoryId} required className="md:col-span-2">
          <select {...register("packageCategoryId")} className={inputStyles}>
            <option value="">Select Category...</option>
            {categories?.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </FormField>

        <FormField label="Description" error={errors.description} required className="md:col-span-2">
          <textarea rows={2} {...register("description")} placeholder="Brief details about package..." className={inputStyles} />
        </FormField>

        <FormField label="Thumbnail Image URL" error={errors.thumbnail} required>
          <input {...register("thumbnail")} placeholder="https://..." className={inputStyles} />
        </FormField>

        <FormField label="Cover Image URL" error={errors.coverImage} required>
          <input {...register("coverImage")} placeholder="https://..." className={inputStyles} />
        </FormField>

        <FormField label="Package Type" error={errors.packageType} required className={packageTypeWatched === "CUSTOM" ? "" : "md:col-span-2"}>
          <select
            {...register("packageType")}
            onChange={(e) => {
              register("packageType").onChange(e);
              if (e.target.value === "WEEKLY") setValue("durationDays", 7);
              if (e.target.value === "MONTHLY") setValue("durationDays", 30);
            }}
            className={inputStyles}
          >
            <option value="WEEKLY">WEEKLY (7 Days)</option>
            <option value="MONTHLY">MONTHLY (30 Days)</option>
            <option value="CUSTOM">CUSTOM (Flexible Days)</option>
          </select>
        </FormField>

        {packageTypeWatched === "CUSTOM" && (
          <FormField label="Custom Type Name" error={errors.customTypeName} required>
            <input {...register("customTypeName")} placeholder="e.g. 15-Day Fortnightly Plan" className={inputStyles} />
          </FormField>
        )}

        <FormField label="Status" error={errors.status} required>
          <select {...register("status")} className={inputStyles}>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </FormField>

        <div className="flex items-center gap-2.5 pt-4">
          <input type="checkbox" id="isCustomizable" {...register("isCustomizable")} className="w-4 h-4 rounded border-input text-primary accent-primary" />
          <label htmlFor="isCustomizable" className="text-xs font-medium text-foreground cursor-pointer select-none">
            Allow Customization
          </label>
        </div>
      </div>
    </div>
  );
}