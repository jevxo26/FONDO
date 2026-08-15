"use client";

import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { useEffect } from "react";
import { useForm, useWatch, type FieldErrors } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import type { Resolver } from "react-hook-form";

import {
  adminFoodInitialValues,
  adminFoodSchema,
  type AdminFoodFormValues,
} from "@/lib/schema/admin-food-schema";
import type { AdminFoodDetail, UpdateFoodPayload } from "@/types/admin-food";
import {
  useAdminFood,
  useAdminFoodCategories,
  useUpdateAvailability,
  useUpdateFood,
} from "@/store/api/slices/admin-food-api";
import { useUploadImage } from "@/store/api/slices/image-upload-api";
import { useImageFiles } from "@/hooks/use-image-files";

import { FormHeader } from "@/components/dashboard/admin/foods/form/form-header";
import { GeneralInfoSection } from "@/components/dashboard/admin/foods/form/general-info";
import { ImageSection } from "@/components/dashboard/admin/foods/form/image-section";
import { NutritionSection } from "@/components/dashboard/admin/foods/form/nutrition-section";
import { DietsSection } from "@/components/dashboard/admin/foods/form/diets-section";
import { AvailabilitySection } from "@/components/dashboard/admin/foods/form/availability-section";
import {
  VariantsEditor,
  PricesEditor,
  DiscountsEditor,
  SchedulesEditor,
} from "@/components/dashboard/admin/foods/edit/sub-model-editors-pricing";
import {
  AddonsEditor,
  IngredientsEditor,
  AllergensEditor,
  LabelsEditor,
  TagsEditor,
  GalleryEditor,
} from "@/components/dashboard/admin/foods/edit/sub-model-editors-content";

const toFormValues = (d: AdminFoodDetail): AdminFoodFormValues => ({
  ...adminFoodInitialValues,
  name: d.name,
  slug: d.slug,
  categoryId: d.categoryId,
  subCategoryId: d.subCategoryId ?? "",
  shortDescription: d.shortDescription ?? "",
  description: d.description ?? "",
  thumbnail: d.thumbnail ?? "",
  coverImage: d.coverImage ?? "",
  preparationTime: d.preparationTime,
  calories: d.calories,
  protein: d.protein,
  fat: d.fat,
  carbohydrate: d.carbohydrate,
  fiber: d.fiber,
  sugar: d.sugar,
  sodium: d.sodium,
  cholesterol: d.cholesterol,
  servingSize: d.servingSize ?? "",
  foodType: d.foodType,
  spiceLevel: d.spiceLevel ?? "",
  status: d.status ?? "DRAFT",
  isFeatured: d.isFeatured,
  isPopular: d.isPopular,
  isRecommended: d.isRecommended,
  isVisible: d.visibility?.isVisible ?? true,
  isAvailable: d.availability?.isAvailable ?? true,
  availabilityDays: d.availability?.availableDays ?? [],
  diets: (d.diets ?? []).map((di) => ({ dietType: di.dietType })),
});

export default function EditFoodPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const id = params.id;
  const { data: detail, isLoading } = useAdminFood(id);
  const { data: categories } = useAdminFoodCategories();
  const { mutateAsync: updateFood, isPending: updating } = useUpdateFood();
  const { mutateAsync: updateAvailability, isPending: updatingAvailability } =
    useUpdateAvailability();
  const { mutateAsync: uploadImage, isLoading: uploadingImage } = useUploadImage();
  const images = useImageFiles();

  const {
    register,
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<AdminFoodFormValues>({
    resolver: yupResolver(adminFoodSchema) as Resolver<AdminFoodFormValues>,
    defaultValues: adminFoodInitialValues,
  });

  useEffect(() => {
    if (detail) {
      reset(toFormValues(detail));
    }
  }, [detail, reset]);

  const thumbnail = useWatch({ control, name: "thumbnail" });
  const coverImage = useWatch({ control, name: "coverImage" });
  const galleryImages = useWatch({ control, name: "galleryImages" }) ?? [];

  const imageHandlers = {
    thumbnailPreview: images.previewFor("thumbnail", thumbnail),
    coverPreview: images.previewFor("cover", coverImage),
    galleryPreviews: galleryImages.map((url, i) => images.galleryPreview(i, url)),
    onThumbnail: (file: File) => images.setFile("thumbnail", file),
    onCover: (file: File) => images.setFile("cover", file),
    onGallery: (index: number, file: File) => images.setGalleryFile(index, file),
    onAppend: () => images.appendGallerySlot(),
    onRemoveThumbnail: () => {
      setValue("thumbnail", "");
      images.clearFile("thumbnail");
    },
    onRemoveCover: () => {
      setValue("coverImage", "");
      images.clearFile("cover");
    },
    onRemoveGallery: (index: number) => images.removeGallerySlot(index),
  };

  const onInvalid = (formErrors: FieldErrors<AdminFoodFormValues>) => {
    const count = Object.keys(formErrors).length;
    toast.error(
      count > 1 ? `${count} fields need attention` : "Please fix the highlighted field",
    );
    requestAnimationFrame(() => {
      document.querySelector('[data-invalid="true"]')?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    });
  };

  const onSubmit = async (data: AdminFoodFormValues) => {
    if (updating || updatingAvailability || uploadingImage) return;

    let thumbnailUrl = data.thumbnail;
    let coverUrl = data.coverImage;

    try {
      const toastId = toast.loading("Saving food...");
      if (images.hasPending()) {
        toast.loading("Uploading images...", { id: toastId });
        const resolved = await images.resolve(
          {
            thumbnail: data.thumbnail,
            coverImage: data.coverImage,
            galleryImages: data.galleryImages,
          },
          async (file) => (await uploadImage(file)).data.url,
        );
        thumbnailUrl = resolved.thumbnail;
        coverUrl = resolved.coverImage;
      }

      const payload: UpdateFoodPayload = {
        categoryId: data.categoryId,
        subCategoryId: data.subCategoryId || null,
        name: data.name,
        slug: data.slug,
        shortDescription: data.shortDescription || undefined,
        description: data.description || undefined,
        thumbnail: thumbnailUrl || undefined,
        coverImage: coverUrl || undefined,
        preparationTime: data.preparationTime,
        calories: data.calories,
        protein: data.protein,
        fat: data.fat,
        carbohydrate: data.carbohydrate,
        fiber: data.fiber,
        sugar: data.sugar,
        sodium: data.sodium,
        cholesterol: data.cholesterol,
        servingSize: data.servingSize || undefined,
        foodType: data.foodType,
        spiceLevel: data.spiceLevel || undefined,
        isFeatured: data.isFeatured,
        isPopular: data.isPopular,
        isRecommended: data.isRecommended,
        status: data.status,
        diets: data.diets.filter((d) => d.dietType.trim().length > 0),
      };

      await updateFood({ id, body: payload });
      await updateAvailability({
        foodId: id,
        body: { isAvailable: data.isAvailable, availableDays: data.availabilityDays },
      });
      toast.success("Food updated!", { id: toastId });
      router.refresh();
    } catch (error) {
      const err = error as { data?: { message?: string }; message?: string };
      toast.error(err?.data?.message || err?.message || "Failed to update food");
    }
  };

  if (isLoading) {
    return (
      <section className="py-6 lg:py-8">
        <div className="wrapper max-w-6xl px-4">
          <p className="text-sm text-muted-foreground">Loading food...</p>
        </div>
      </section>
    );
  }

  if (!detail) {
    return (
      <section className="py-6 lg:py-8">
        <div className="wrapper max-w-6xl px-4">
          <p className="text-sm text-muted-foreground">Food not found.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-6 lg:py-8">
      <div className="wrapper max-w-6xl space-y-6 px-4">
        <FormHeader
          title={`Edit ${detail.name}`}
          description="Update basic info and manage sub-models."
          isPending={updating || updatingAvailability || uploadingImage}
          formId="admin-food-edit-form"
        />

        <div className="grid grid-cols-1 gap-6">
          <form id="admin-food-edit-form" onSubmit={handleSubmit(onSubmit, onInvalid)} className="space-y-6">
            <GeneralInfoSection
              register={register}
              errors={errors}
              setValue={setValue}
              control={control}
              categories={categories}
            />
            <ImageSection
              register={register}
              errors={errors}
              control={control}
              setValue={setValue}
              thumbnail={thumbnail}
              coverImage={coverImage}
              galleryImages={galleryImages}
              images={imageHandlers}
            />
            <NutritionSection register={register} errors={errors} control={control} />
            <DietsSection register={register} errors={errors} control={control} />
            <AvailabilitySection errors={errors} control={control} />
          </form>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <VariantsEditor foodId={id} items={detail.variants} />
            <PricesEditor foodId={id} items={detail.prices} />
            <DiscountsEditor foodId={id} items={detail.discounts} />
            <SchedulesEditor foodId={id} items={detail.schedules} />
            <AddonsEditor foodId={id} items={detail.addons} />
            <IngredientsEditor foodId={id} items={detail.ingredients} />
            <AllergensEditor foodId={id} items={detail.allergens} />
            <LabelsEditor foodId={id} items={detail.labels} />
            <TagsEditor foodId={id} items={detail.tags} />
            <GalleryEditor foodId={id} items={detail.images} />
          </div>
        </div>
      </div>
    </section>
  );
}
