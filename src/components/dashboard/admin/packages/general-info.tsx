import React, { useEffect, useState } from "react";
import { Layers, Store, RefreshCw } from "lucide-react";
import type {
  FieldErrors,
  UseFormWatch,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";
import { inputStyles, PackageFormValues } from "@/lib/schema/package-schema";
import { FormField } from "@/components/common/form-field";
import { PackageCategory } from "@prisma/client";
import ImageUploadField from "@/components/common/image-upload";
import type { AdminVendorOption } from "@/types/admin-food";
import { useUploadImage } from "@/store/api/slices/image-upload-api";

interface GeneralInfoSectionProps {
  register: UseFormRegister<PackageFormValues>;
  errors: FieldErrors<PackageFormValues>;
  packageTypeWatched: string;
  setValue: UseFormSetValue<PackageFormValues>;
  categories?: PackageCategory[];
  watch: UseFormWatch<PackageFormValues>;
  vendors?: AdminVendorOption[];
  isEditMode?: boolean;
}

// Helper utility to generate package code dynamically
const generatePackageCode = (name: string, type: string) => {
  if (!name) return "";
  
  // Extract clean initials or short codes from words (e.g., "Weight Gain" -> "WG")
  const initials = name
    .split(" ")
    .filter(Boolean)
    .map((word) => word[0].toUpperCase())
    .join("")
    .slice(0, 4);

  const typeCode = type ? type.substring(0, 3).toUpperCase() : "PKG";
  const randomSuffix = Math.floor(1000 + Math.random() * 9000); // 4-digit numeric code

  return `PKG-${initials}-${typeCode}-${randomSuffix}`;
};

export function GeneralInfoSection({
  register,
  errors,
  packageTypeWatched,
  setValue,
  categories,
  watch,
  vendors,
  isEditMode = false,
}: GeneralInfoSectionProps) {
  const nameValue = watch("name");
  const slugValue = watch("slug");
  const packageCodeValue = watch("packageCode");

  const [uploadingField, setUploadingField] = useState<"thumbnail" | "coverImage" | null>(null);
  const { mutateAsync: uploadImageApi } = useUploadImage();

  // 1. Auto-generate Slug when name changes
  useEffect(() => {
    if (typeof nameValue === "string" && (!isEditMode || !slugValue)) {
      const generatedSlug = nameValue
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");
      setValue("slug", generatedSlug, { shouldValidate: true });
    }
  }, [nameValue, isEditMode, setValue]);

  // 2. Auto-generate Package Code when Name or Package Type changes
  useEffect(() => {
    if (typeof nameValue === "string" && nameValue.trim().length > 0) {
      // Generate only if packageCode is empty OR in create mode
      if (!packageCodeValue || !isEditMode) {
        const newCode = generatePackageCode(nameValue, packageTypeWatched);
        setValue("packageCode", newCode, { shouldValidate: true });
      }
    }
  }, [nameValue, packageTypeWatched, isEditMode, setValue]);

  const handleRegenerateCode = () => {
    if (!nameValue) return;
    const newCode = generatePackageCode(nameValue, packageTypeWatched);
    setValue("packageCode", newCode, { shouldValidate: true });
  };

  const handleImageUpload = async (
    file: File,
    field: "thumbnail" | "coverImage"
  ) => {
    try {
      setUploadingField(field);
      const res = await uploadImageApi(file);
      if (res?.data?.url) {
        setValue(field, res.data.url, { shouldValidate: true });
      }
    } catch (err) {
      console.error(`Failed to upload ${field}:`, err);
      alert("Image upload failed. Please try again.");
    } finally {
      setUploadingField(null);
    }
  };

  return (
    <div className="bg-card p-6 rounded-2xl border border-border shadow-sm space-y-5">
      <div className="border-b border-border pb-3 flex items-center gap-2">
        <Layers className="w-5 h-5 text-primary" />
        <h2 className="text-base font-bold text-foreground">Package General Info</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Package Name Input */}
        <FormField label="Package Name" error={errors.name} required className="md:col-span-2">
          <input
            {...register("name")}
            placeholder="e.g. 7-Day Premium Weight Gain Plan"
            className={inputStyles}
          />
        </FormField>

        {/* Package Code with Auto-Generate Action */}
        <FormField label="Package Code" error={errors.packageCode} required>
          <div className="relative flex items-center">
            <input
              {...register("packageCode")}
              placeholder="e.g. PKG-WG-WEEK-4821"
              className={`${inputStyles} pr-10`}
            />
            <button
              type="button"
              onClick={handleRegenerateCode}
              title="Auto-regenerate Package Code"
              className="absolute right-2.5 p-1 text-muted-foreground hover:text-primary transition rounded-md bg-muted/50 hover:bg-muted"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </FormField>

        {/* Slug */}
        <FormField label="Slug" error={errors.slug} required>
          <input {...register("slug")} placeholder="auto-generated-slug" className={inputStyles} />
        </FormField>

        {/* Package Category */}
        <FormField label="Package Category" error={errors.packageCategoryId} required className="md:col-span-2">
          <select {...register("packageCategoryId")} className={inputStyles}>
            <option value="">Select Category...</option>
            {categories?.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </FormField>

        {vendors && (
          <FormField label="Vendor" error={errors.vendorId} required className="md:col-span-2">
            <div className="flex items-center gap-2">
              <Store className="w-4 h-4 text-muted-foreground shrink-0" />
              <select {...register("vendorId")} className={inputStyles}>
                <option value="">Select Vendor...</option>
                {vendors.map((v) => (
                  <option key={v.id} value={v.id}>
                    {v.businessName}
                  </option>
                ))}
              </select>
            </div>
            <p className="text-xs text-muted-foreground mt-1.5">
              Foods in the schedule below are limited to this vendor&apos;s approved menu.
            </p>
          </FormField>
        )}

        <FormField label="Description" error={errors.description} required className="md:col-span-2">
          <textarea rows={2} {...register("description")} placeholder="Brief details about package..." className={inputStyles} />
        </FormField>

        {/* Thumbnail Upload */}
        <FormField label="Thumbnail Image" error={errors.thumbnail} required>
          <ImageUploadField
            variant="circle"
            image={watch("thumbnail")}
            loading={uploadingField === "thumbnail"}
            onUpload={(file) => handleImageUpload(file, "thumbnail")}
            onRemove={() => setValue("thumbnail", "", { shouldValidate: true })}
          />
        </FormField>

        {/* Cover Image Upload */}
        <FormField label="Cover Banner Image" error={errors.coverImage} required>
          <ImageUploadField
            variant="rectangle"
            image={watch("coverImage")}
            loading={uploadingField === "coverImage"}
            onUpload={(file) => handleImageUpload(file, "coverImage")}
            onRemove={() => setValue("coverImage", "", { shouldValidate: true })}
          />
        </FormField>

        <FormField
          label="Package Type"
          error={errors.packageType}
          required
          className={packageTypeWatched === "CUSTOM" ? "" : "md:col-span-2"}
        >
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