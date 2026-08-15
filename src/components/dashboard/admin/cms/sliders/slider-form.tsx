// /components/dashboard/admin/cms/sliders/slider-form.tsx
"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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

const sliderSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup.string().optional(),
  image: yup.string().required("Image is required"),
  buttonText: yup.string().optional(),
  buttonUrl: yup.string().url("Must be a valid URL").optional(),
  displayOrder: yup
    .number()
    .min(0, "Display order must be 0 or greater")
    .required("Display order is required"),
  status: yup.string().oneOf(["ACTIVE", "INACTIVE"]).required("Status is required"),
});

type SliderFormValues = yup.InferType<typeof sliderSchema>;

interface SliderFormProps {
  onSubmit: (data: SliderFormValues) => void;
  onCancel: () => void;
  defaultValues?: Partial<SliderFormValues>;
}

export function SliderForm({ onSubmit, onCancel, defaultValues }: SliderFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<SliderFormValues>({
    resolver: yupResolver(sliderSchema) as any,
    defaultValues: {
      status: "ACTIVE",
      displayOrder: 0,
      ...defaultValues,
    },
  });

  const image = watch("image");

  return (
    <Card>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <FormField label="Title" error={errors.title} required className="md:col-span-2">
              <Input
                placeholder="Enter slider title"
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
                {...register("title")}
              />
            </FormField>

            <FormField label="Description" error={errors.description} className="md:col-span-2">
              <Textarea
                placeholder="Enter slider description"
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
                rows={3}
                {...register("description")}
              />
            </FormField>

            <FormField label="Image" error={errors.image} required className="md:col-span-2">
              <ImageUpload
                value={image}
                onChange={(url) => setValue("image", url, { shouldValidate: true })}
              />
            </FormField>

            <FormField label="Button Text" error={errors.buttonText}>
              <Input
                placeholder="Enter button text"
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
                {...register("buttonText")}
              />
            </FormField>

            <FormField label="Button URL" error={errors.buttonUrl}>
              <Input
                placeholder="Enter button URL"
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
                {...register("buttonUrl")}
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
            <Button type="submit">Save Slider</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
