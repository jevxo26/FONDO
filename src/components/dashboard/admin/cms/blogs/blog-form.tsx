// /components/dashboard/admin/cms/blogs/blog-form.tsx
"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { RichTextEditor } from "@/components/dashboard/admin/cms/shared/rich-text-editor";
import { mockBlogCategories } from "@/data/mock-blog-categories";

const blogSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  slug: yup.string().required("Slug is required"),
  thumbnail: yup.string().optional(),
  content: yup.string().required("Content is required"),
  author: yup.string().required("Author is required"),
  categoryId: yup.string().required("Category is required"),
  status: yup.string().oneOf(["DRAFT", "PUBLISHED"]).required("Status is required"),
});

type BlogFormValues = yup.InferType<typeof blogSchema>;

interface BlogFormProps {
  onSubmit: (data: BlogFormValues) => void;
  onCancel: () => void;
  defaultValues?: Partial<BlogFormValues>;
}

export function BlogForm({ onSubmit, onCancel, defaultValues }: BlogFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<BlogFormValues>({
    resolver: yupResolver(blogSchema) as never,
    defaultValues: {
      status: "DRAFT",
      ...defaultValues,
    },
  });

  // eslint-disable-next-line react-hooks/incompatible-library
  const thumbnail = watch("thumbnail");

  // Auto-generate slug from title
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
            <FormField label="Title" error={errors.title} required className="md:col-span-2">
              <Input
                placeholder="Enter blog title"
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
                {...register("title")}
                onChange={(e) => {
                  register("title").onChange(e);
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

            <FormField label="Author" error={errors.author} required>
              <Input
                placeholder="Enter author name"
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
                {...register("author")}
              />
            </FormField>

            <FormField label="Category" error={errors.categoryId} required>
              <Select
                onValueChange={(value) => { if (value) setValue("categoryId", value); }}
                defaultValue={defaultValues?.categoryId}
              >
                <SelectTrigger className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {mockBlogCategories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormField>

            <FormField label="Thumbnail" error={errors.thumbnail} className="md:col-span-2">
              <ImageUpload
                value={thumbnail}
                onChange={(url) => setValue("thumbnail", url, { shouldValidate: true })}
              />
            </FormField>

            <FormField label="Content" error={errors.content} required className="md:col-span-2">
              <RichTextEditor
                value={watch("content") || ""}
                onChange={(value) => setValue("content", value, { shouldValidate: true })}
              />
            </FormField>

            <FormField label="Status" error={errors.status} required>
              <Select
                onValueChange={(value) => setValue("status", value as "DRAFT" | "PUBLISHED")}
                defaultValue={defaultValues?.status}
              >
                <SelectTrigger className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="DRAFT">Draft</SelectItem>
                  <SelectItem value="PUBLISHED">Published</SelectItem>
                </SelectContent>
              </Select>
            </FormField>
          </div>

          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit">Save Blog</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
