// /components/dashboard/admin/cms/blog-categories/blog-category-form.tsx
"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { FormField } from "@/components/common/form-field";

const blogCategorySchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  slug: yup.string().required("Slug is required"),
  description: yup.string().optional(),
  status: yup.string().oneOf(["ACTIVE", "INACTIVE"]).required("Status is required"),
});

type BlogCategoryFormValues = yup.InferType<typeof blogCategorySchema>;

interface BlogCategoryFormProps {
  onSubmit: (data: BlogCategoryFormValues) => void;
  onCancel: () => void;
  defaultValues?: Partial<BlogCategoryFormValues>;
}

export function BlogCategoryForm({ onSubmit, onCancel, defaultValues }: BlogCategoryFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<BlogCategoryFormValues>({
    resolver: yupResolver(blogCategorySchema) as any,
    defaultValues: {
      status: "ACTIVE",
      ...defaultValues,
    },
  });

  const name = watch("name");

  // Auto-generate slug from name
  const generateSlug = (value: string) => {
    return value
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
  };

  return (
    <Card>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <FormField label="Name" error={errors.name} required>
              <Input
                placeholder="Enter category name"
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
                {...register("name")}
                onChange={(e) => {
                  register("name").onChange(e);
                  if (!defaultValues?.slug) {
                    setValue("slug", generateSlug(e.target.value));
                  }
                }}
              />
            </FormField>

            <FormField label="Slug" error={errors.slug} required>
              <Input
                placeholder="Enter slug"
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
                {...register("slug")}
              />
            </FormField>

            <FormField label="Description" error={errors.description} className="md:col-span-2">
              <Textarea
                placeholder="Enter category description"
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
                rows={3}
                {...register("description")}
              />
            </FormField>

            <FormField label="Status" error={errors.status} required>
              <Select
                onValueChange={(value) => setValue("status", value as "ACTIVE" | "INACTIVE")}
                defaultValue={defaultValues?.status}
              >
                <SelectTrigger className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ACTIVE">Active</SelectItem>
                  <SelectItem value="INACTIVE">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </FormField>
          </div>

          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit">Save Category</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
