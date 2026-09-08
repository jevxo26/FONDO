// /components/dashboard/admin/cms/pages/page-form.tsx
"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent } from "@/components/ui/card";
import { FormField } from "@/components/common/form-field";
import { RichTextEditor } from "@/components/dashboard/admin/cms/shared/rich-text-editor";

const pageSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  slug: yup.string().required("Slug is required"),
  content: yup.string().required("Content is required"),
  metaTitle: yup.string().optional(),
  metaDescription: yup.string().optional(),
  isPublished: yup.boolean().default(false),
});

type PageFormValues = yup.InferType<typeof pageSchema>;

interface PageFormProps {
  onSubmit: (data: PageFormValues) => void;
  onCancel: () => void;
  defaultValues?: Partial<PageFormValues>;
}

export function PageForm({ onSubmit, onCancel, defaultValues }: PageFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<PageFormValues>({
    resolver: yupResolver(pageSchema) as never,
    defaultValues: {
      isPublished: false,
      ...defaultValues,
    },
  });

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
            <FormField label="Title" error={errors.title} required>
              <Input
                placeholder="Enter page title"
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

            <FormField label="Content" error={errors.content} required className="md:col-span-2">
              <RichTextEditor
                // eslint-disable-next-line react-hooks/incompatible-library
                value={watch("content") || ""}
                onChange={(value) => setValue("content", value, { shouldValidate: true })}
              />
            </FormField>

            <div className="md:col-span-2">
              <h4 className="text-sm font-medium text-foreground mb-4">SEO Settings</h4>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <FormField label="Meta Title" error={errors.metaTitle}>
                  <Input
                    placeholder="Enter meta title"
                    className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
                    {...register("metaTitle")}
                  />
                </FormField>

                <FormField label="Meta Description" error={errors.metaDescription}>
                  <Textarea
                    placeholder="Enter meta description"
                    className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
                    rows={2}
                    {...register("metaDescription")}
                  />
                </FormField>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <label className="text-sm font-medium text-foreground">Published</label>
              <p className="text-sm text-muted-foreground">Make this page publicly accessible</p>
            </div>
            <Switch
              checked={watch("isPublished")}
              onCheckedChange={(checked) => setValue("isPublished", checked)}
            />
          </div>

          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit">Save Page</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
