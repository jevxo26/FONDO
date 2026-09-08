// /components/dashboard/admin/cms/banners/banner-form.tsx
"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ImageUpload } from "@/components/dashboard/admin/cms/shared/image-upload";
import { Card, CardContent } from "@/components/ui/card";
import { FormField } from "@/components/common/form-field";

const bannerSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  subtitle: yup.string().optional(),
  imageUrl: yup.string().required("Image is required"),
  redirectType: yup
    .string()
    .oneOf(["product", "category", "page", "url"])
    .required("Redirect type is required"),
  redirectId: yup.string().optional(),
  displayOrder: yup
    .number()
    .min(0, "Display order must be 0 or greater")
    .required("Display order is required"),
  startDate: yup.string().optional(),
  endDate: yup.string().optional(),
  isActive: yup.boolean().default(true),
});

type BannerFormValues = yup.InferType<typeof bannerSchema>;

interface BannerFormProps {
  onSubmit: (data: BannerFormValues) => void;
  onCancel: () => void;
  defaultValues?: Partial<BannerFormValues>;
}

export function BannerForm({ onSubmit, onCancel, defaultValues }: BannerFormProps) {
  const {
    register,
    handleSubmit,
    control: _control,
    formState: { errors },
    watch,
    setValue,
  } = useForm<BannerFormValues>({
    resolver: yupResolver(bannerSchema) as never,
    defaultValues: {
      isActive: true,
      displayOrder: 0,
      ...defaultValues,
    },
  });

  // eslint-disable-next-line react-hooks/incompatible-library
  const imageUrl = watch("imageUrl");

  return (
    <Card>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <FormField label="Title" error={errors.title} required className="md:col-span-2">
              <Input
                placeholder="Enter banner title"
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
                {...register("title")}
              />
            </FormField>

            <FormField label="Subtitle" error={errors.subtitle} className="md:col-span-2">
              <Input
                placeholder="Enter subtitle"
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
                {...register("subtitle")}
              />
            </FormField>

            <FormField label="Image" error={errors.imageUrl} required className="md:col-span-2">
              <ImageUpload
                value={imageUrl}
                onChange={(url) => setValue("imageUrl", url, { shouldValidate: true })}
              />
            </FormField>

            <FormField label="Redirect Type" error={errors.redirectType} required>
              <Select
                onValueChange={(value) =>
                  setValue("redirectType", value as BannerFormValues["redirectType"])
                }
                defaultValue={defaultValues?.redirectType}
              >
                <SelectTrigger className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm">
                  <SelectValue placeholder="Select redirect type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="product">Product</SelectItem>
                  <SelectItem value="category">Category</SelectItem>
                  <SelectItem value="page">Page</SelectItem>
                  <SelectItem value="url">URL</SelectItem>
                </SelectContent>
              </Select>
            </FormField>

            <FormField label="Redirect ID / URL" error={errors.redirectId}>
              <Input
                placeholder="Enter redirect ID or URL"
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
                {...register("redirectId")}
              />
            </FormField>

            <FormField label="Display Order" error={errors.displayOrder} required>
              <Input
                type="number"
                placeholder="0"
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
                {...register("displayOrder", { valueAsNumber: true })}
              />
            </FormField>

            <FormField label="Start Date" error={errors.startDate}>
              <Input
                type="date"
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
                {...register("startDate")}
              />
            </FormField>

            <FormField label="End Date" error={errors.endDate}>
              <Input
                type="date"
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
                {...register("endDate")}
              />
            </FormField>
          </div>

          <div className="flex items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <label className="text-sm font-medium text-foreground">Active</label>
              <p className="text-sm text-muted-foreground">
                Enable this banner to display on the homepage
              </p>
            </div>
            <Switch
              checked={watch("isActive")}
              onCheckedChange={(checked) => setValue("isActive", checked)}
            />
          </div>

          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit">Save Banner</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
