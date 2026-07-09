"use client";

import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FieldGroup } from "@/components/ui/field";
import { FormField } from "@/components/common/form-field";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import type { AdminFoodItem } from "@/data/foods";

const schema = yup.object({
  name: yup.string().required("Food name is required"),
  shortDescription: yup.string().max(200),
  basePrice: yup
    .number()
    .typeError("Must be a number")
    .positive("Must be positive")
    .required("Price is required"),
  categoryName: yup.string().required("Category is required"),
  foodType: yup
    .string()
    .oneOf(["VEG", "NON_VEG", "VEGAN", "SEAFOOD"])
    .required("Food type is required"),
  spiceLevel: yup
    .string()
    .oneOf(["MILD", "MEDIUM", "HOT", "EXTRA_HOT"])
    .required("Spice level is required"),
  servingSize: yup.string(),
  preparationTime: yup.number().typeError("Must be a number").min(0),
  calories: yup.number().typeError("Must be a number").min(0),
  thumbnail: yup.string().url("Must be a valid URL"),
});

type FormValues = yup.InferType<typeof schema>;

interface EditFoodModalProps {
  food: AdminFoodItem;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EditFoodModal({ food, open, onOpenChange }: EditFoodModalProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: food.name,
      basePrice: food.basePrice,
      categoryName: food.categoryName,
      foodType: food.foodType,
      spiceLevel: food.spiceLevel,
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log("Update food", food.id, data);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Food Item</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <FieldGroup>
            <FormField label="Food Name" htmlFor="name" error={errors.name} required>
              <Input
                id="name"
                placeholder="e.g. Royal Mutton Kacchi"
                aria-invalid={!!errors.name}
                {...register("name")}
              />
            </FormField>

            <FormField
              label="Short Description"
              htmlFor="shortDescription"
              error={errors.shortDescription}
            >
              <Textarea
                id="shortDescription"
                placeholder="Brief description..."
                rows={2}
                {...register("shortDescription")}
              />
            </FormField>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Controller
                name="categoryName"
                control={control}
                render={({ field }) => (
                  <FormField label="Category" htmlFor="categoryName" error={errors.categoryName} required>
                    <Select value={field.value || ""} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {["Bengali", "Chinese", "Italian", "Indian", "Desserts"].map(
                          (cat) => (
                            <SelectItem key={cat} value={cat}>
                              {cat}
                            </SelectItem>
                          ),
                        )}
                      </SelectContent>
                    </Select>
                  </FormField>
                )}
              />

              <FormField label="Base Price (৳)" htmlFor="basePrice" error={errors.basePrice} required>
                <Input
                  id="basePrice"
                  type="number"
                  placeholder="350"
                  aria-invalid={!!errors.basePrice}
                  {...register("basePrice")}
                />
              </FormField>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Controller
                name="foodType"
                control={control}
                render={({ field }) => (
                  <FormField label="Food Type" htmlFor="foodType" error={errors.foodType} required>
                    <Select value={field.value || ""} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {["VEG", "NON_VEG", "VEGAN", "SEAFOOD"].map((t) => (
                          <SelectItem key={t} value={t}>
                            {t.replace("_", " ")}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormField>
                )}
              />

              <Controller
                name="spiceLevel"
                control={control}
                render={({ field }) => (
                  <FormField label="Spice Level" htmlFor="spiceLevel" error={errors.spiceLevel} required>
                    <Select value={field.value || ""} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {["MILD", "MEDIUM", "HOT", "EXTRA_HOT"].map((s) => (
                          <SelectItem key={s} value={s}>
                            {s.replace("_", " ")}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormField>
                )}
              />
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <FormField label="Serving Size" htmlFor="servingSize" error={errors.servingSize}>
                <Input
                  id="servingSize"
                  placeholder="e.g. 1 plate (350g)"
                  {...register("servingSize")}
                />
              </FormField>

              <FormField label="Prep Time (min)" htmlFor="preparationTime" error={errors.preparationTime}>
                <Input
                  id="preparationTime"
                  type="number"
                  placeholder="30"
                  {...register("preparationTime")}
                />
              </FormField>

              <FormField label="Calories" htmlFor="calories" error={errors.calories}>
                <Input
                  id="calories"
                  type="number"
                  placeholder="450"
                  {...register("calories")}
                />
              </FormField>
            </div>

            <FormField label="Thumbnail URL" htmlFor="thumbnail" error={errors.thumbnail}>
              <Input
                id="thumbnail"
                placeholder="https://example.com/image.jpg"
                {...register("thumbnail")}
              />
            </FormField>

            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button type="submit" className="flex-1">
                Save Changes
              </Button>
            </div>
          </FieldGroup>
        </form>
      </DialogContent>
    </Dialog>
  );
}