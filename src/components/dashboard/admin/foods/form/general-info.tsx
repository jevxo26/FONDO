"use client";

import { FormField } from "@/components/common/form-field";
import type { AdminFoodFormValues } from "@/lib/schema/admin-food-schema";
import type { AdminFoodCategory } from "@/types/admin-food";
import { FormSection } from "@/components/dashboard/common/form-section";
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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
    <FormSection
      icon={Info}
      title="General Information"
      description="Name, category and classification."
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <FormField label="Food Name" error={errors.name} required className="md:col-span-2">
          <Input
            {...register("name")}
            onChange={(e) => {
              register("name").onChange(e);
              handleNameChange(e);
            }}
            placeholder="e.g. Royal Mutton Kacchi"
          />
        </FormField>

        <FormField label="Slug" error={errors.slug} required>
          <Input {...register("slug")} placeholder="auto-generated-slug" />
        </FormField>

        <FormField label="Status" error={errors.status} required>
          <Controller
            control={control}
            name="status"
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="h-11 w-full">
                  <SelectValue placeholder="Select status..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="APPROVED">Approved</SelectItem>
                  <SelectItem value="ACTIVE">Active</SelectItem>
                  <SelectItem value="DRAFT">Draft</SelectItem>
                  <SelectItem value="ARCHIVED">Archived</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
        </FormField>

        <FormField label="Category" error={errors.categoryId} required>
          <Controller
            control={control}
            name="categoryId"
            render={({ field }) => (
              <Select
                value={field.value ?? ""}
                onValueChange={(value) => {
                  field.onChange(value);
                  setValue("subCategoryId", "");
                }}
              >
                <SelectTrigger className="h-11 w-full">
                  <SelectValue placeholder="Select Category..." />
                </SelectTrigger>
                <SelectContent>
                  {categories?.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </FormField>

        <FormField label="Sub Category" error={errors.subCategoryId}>
          <Controller
            control={control}
            name="subCategoryId"
            render={({ field }) => (
              <Select
                value={field.value ?? ""}
                onValueChange={field.onChange}
                disabled={subCategories.length === 0}
              >
                <SelectTrigger className="h-11 w-full">
                  <SelectValue placeholder="Select Sub Category..." />
                </SelectTrigger>
                <SelectContent>
                  {subCategories.map((sub) => (
                    <SelectItem key={sub.id} value={sub.id}>
                      {sub.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </FormField>

        <FormField label="Food Type" error={errors.foodType} required>
          <Controller
            control={control}
            name="foodType"
            render={({ field }) => (
              <Select value={field.value ?? ""} onValueChange={field.onChange}>
                <SelectTrigger className="h-11 w-full">
                  <SelectValue placeholder="Select type..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="VEG">Vegetarian</SelectItem>
                  <SelectItem value="NON_VEG">Non-Vegetarian</SelectItem>
                  <SelectItem value="VEGAN">Vegan</SelectItem>
                  <SelectItem value="SEAFOOD">Seafood</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
        </FormField>

        <FormField label="Spice Level" error={errors.spiceLevel}>
          <Controller
            control={control}
            name="spiceLevel"
            render={({ field }) => (
              <Select value={field.value ?? ""} onValueChange={field.onChange}>
                <SelectTrigger className="h-11 w-full">
                  <SelectValue placeholder="Select spice level..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="MILD">Mild</SelectItem>
                  <SelectItem value="MEDIUM">Medium</SelectItem>
                  <SelectItem value="HOT">Hot</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
        </FormField>

        <FormField label="Preparation Time (min)" error={errors.preparationTime}>
          <Input type="number" {...register("preparationTime")} placeholder="e.g. 30" />
        </FormField>

        <FormField label="Serving Size" error={errors.servingSize}>
          <Input {...register("servingSize")} placeholder="e.g. 200g" />
        </FormField>

        <FormField
          label="Short Description"
          error={errors.shortDescription}
          className="md:col-span-2"
        >
          <Textarea
            rows={2}
            {...register("shortDescription")}
            placeholder="Brief description of the food..."
          />
        </FormField>

        <FormField label="Full Description" error={errors.description} className="md:col-span-2">
          <Textarea
            rows={3}
            {...register("description")}
            placeholder="Detailed description of the food..."
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
    </FormSection>
  );
}
