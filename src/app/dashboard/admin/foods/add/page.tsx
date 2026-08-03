"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import type { Resolver } from "react-hook-form";

import {
  adminFoodInitialValues,
  adminFoodSchema,
  type AdminFoodFormValues,
} from "@/lib/schema/admin-food-schema";
import type { CreateFoodPayload } from "@/types/admin-food";
import {
  useAdminFoodCategories,
  useAdminFoodTags,
  useAdminVendorOptions,
  useCreateFood,
} from "@/store/api/slices/admin-food-api";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { FormHeader } from "@/components/dashboard/admin/foods/form/form-header";
import { FormSummary } from "@/components/dashboard/admin/foods/form/form-summary";
import { GeneralInfoSection } from "@/components/dashboard/admin/foods/form/general-info";
import { VendorAssignment } from "@/components/dashboard/admin/foods/form/vendor-assignment";
import { ImageSection } from "@/components/dashboard/admin/foods/form/image-section";
import { PricingSection } from "@/components/dashboard/admin/foods/form/pricing-section";
import { DiscountSection } from "@/components/dashboard/admin/foods/form/discount-section";
import { VariantSection } from "@/components/dashboard/admin/foods/form/variant-section";
import { AddonSection } from "@/components/dashboard/admin/foods/form/addon-section";
import { NutritionSection } from "@/components/dashboard/admin/foods/form/nutrition-section";
import { IngredientSection } from "@/components/dashboard/admin/foods/form/ingredient-section";
import { AllergenSection } from "@/components/dashboard/admin/foods/form/allergen-section";
import { TagSection } from "@/components/dashboard/admin/foods/form/tag-section";
import { ScheduleSection } from "@/components/dashboard/admin/foods/form/schedule-section";
import { AvailabilitySection } from "@/components/dashboard/admin/foods/form/availability-section";
import { Info, ImagePlus, Package, Salad, Clock } from "lucide-react";

const toNumber = (value: unknown): number | null | undefined => {
  if (value === null || value === undefined || value === "") return undefined;
  const n = Number(value);
  return Number.isNaN(n) ? undefined : n;
};

const TABS = [
  { value: "basics", label: "Basics", icon: Info },
  { value: "photos", label: "Photos", icon: ImagePlus },
  { value: "price", label: "Price & Variants", icon: Package },
  { value: "nutrition", label: "Nutrition & Diet", icon: Salad },
  { value: "availability", label: "Availability", icon: Clock },
];

export default function AddFoodPage() {
  const router = useRouter();
  const { data: categories } = useAdminFoodCategories();
  const { data: tags } = useAdminFoodTags();
  const { data: vendorOptions, isLoading: vendorsLoading } = useAdminVendorOptions();
  const { mutateAsync: createFood, isPending } = useCreateFood();
  const [tagIds, setTagIds] = useState<string[]>([]);

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

  const name = useWatch({ control, name: "name" });
  const thumbnail = useWatch({ control, name: "thumbnail" });
  const coverImage = useWatch({ control, name: "coverImage" });
  const galleryImages = useWatch({ control, name: "galleryImages" }) ?? [];
  const variants = useWatch({ control, name: "variants" }) ?? [];
  const addons = useWatch({ control, name: "addons" }) ?? [];
  const prices = useWatch({ control, name: "prices" }) ?? [];
  const discounts = useWatch({ control, name: "discounts" }) ?? [];
  const schedules = useWatch({ control, name: "schedules" }) ?? [];
  const ingredients = useWatch({ control, name: "ingredients" }) ?? [];
  const allergens = useWatch({ control, name: "allergens" }) ?? [];
  const labels = useWatch({ control, name: "labels" }) ?? [];
  const diets = useWatch({ control, name: "diets" }) ?? [];

  const toggleTag = (tagId: string) => {
    const next = tagIds.includes(tagId)
      ? tagIds.filter((t) => t !== tagId)
      : [...tagIds, tagId];
    setTagIds(next);
    setValue("tagIds", next);
  };

  const onSubmit = async (data: AdminFoodFormValues) => {
    const payload: CreateFoodPayload = {
      categoryId: data.categoryId,
      subCategoryId: data.subCategoryId || undefined,
      name: data.name,
      slug: data.slug,
      shortDescription: data.shortDescription || undefined,
      description: data.description || undefined,
      thumbnail: data.thumbnail || undefined,
      coverImage: data.coverImage || undefined,
      preparationTime: toNumber(data.preparationTime),
      calories: toNumber(data.calories),
      protein: toNumber(data.protein),
      fat: toNumber(data.fat),
      carbohydrate: toNumber(data.carbohydrate),
      servingSize: data.servingSize || undefined,
      foodType: data.foodType,
      spiceLevel: data.spiceLevel || undefined,
      status: data.status,
      isFeatured: data.isFeatured,
      isPopular: data.isPopular,
      isRecommended: data.isRecommended,
      tagIds: data.tagIds,
      vendorIds: data.vendorIds,
      gallery: data.galleryImages.filter((url) => url.trim().length > 0),
      diets: data.diets.filter((d) => d.dietType.trim().length > 0),
      labels: data.labels.filter((l) => l.label.trim().length > 0),
      ingredients: data.ingredients.filter((i) => i.ingredientName.trim().length > 0),
      allergens: data.allergens.filter((a) => a.allergen.trim().length > 0),
      variants: data.variants
        .filter((v) => v.name.trim().length > 0)
        .map((v) => ({
          name: v.name,
          description: v.description || undefined,
          price: toNumber(v.price) ?? 0,
          discountPrice: toNumber(v.discountPrice),
          weight: v.weight || undefined,
          servingSize: v.servingSize || undefined,
        })),
      addons: data.addons
        .filter((a) => a.name.trim().length > 0)
        .map((a) => ({
          name: a.name,
          isRequired: a.isRequired,
          maxSelection: toNumber(a.maxSelection),
          items: a.items
            .filter((i) => i.name.trim().length > 0)
            .map((i) => ({
              name: i.name,
              price: toNumber(i.price) ?? 0,
              image: i.image || undefined,
            })),
        })),
      prices: data.prices
        .filter((p) => Number(p.basePrice) > 0)
        .map((p) => ({ basePrice: toNumber(p.basePrice) ?? 0, salePrice: toNumber(p.salePrice) })),
      discounts: data.discounts
        .filter((d) => Number(d.discountValue) > 0)
        .map((d) => ({
          discountType: d.discountType,
          discountValue: toNumber(d.discountValue) ?? 0,
        })),
      schedules: data.schedules.filter((s) => s.startTime && s.endTime),
      availability: { isAvailable: data.isAvailable, availableDays: data.availabilityDays },
      visibility: {
        isVisible: data.isVisible,
        isFeatured: data.isFeatured,
        isRecommended: data.isRecommended,
      },
    };

    try {
      const toastId = toast.loading("Creating food...");
      const created = await createFood(payload);
      toast.success("Food created successfully!", { id: toastId });
      router.push(`/dashboard/admin/foods/${created.id}`);
    } catch (error) {
      const err = error as { data?: { message?: string }; message?: string };
      toast.error(err?.data?.message || err?.message || "Failed to create food");
    }
  };

  return (
    <section className="py-6 lg:py-8">
      <div className="wrapper max-w-6xl space-y-6 px-4">
        <FormHeader
          title="Add New Food"
          description="Create a food item for the central catalog."
          isPending={isPending}
          formId="admin-food-form"
          onReset={() => reset(adminFoodInitialValues)}
        />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <form id="admin-food-form" onSubmit={handleSubmit(onSubmit)}>
              <Tabs defaultValue="basics" className="gap-4">
                <TabsList className="w-full overflow-x-auto bg-muted/70 p-1">
                  {TABS.map((tab) => (
                    <TabsTrigger key={tab.value} value={tab.value} className="gap-1.5">
                      <tab.icon className="size-4" />
                      {tab.label}
                    </TabsTrigger>
                  ))}
                </TabsList>

                <TabsContent value="basics" className="space-y-6">
                  <GeneralInfoSection
                    register={register}
                    errors={errors}
                    setValue={setValue}
                    control={control}
                    categories={categories}
                  />
                  <VendorAssignment control={control} vendors={vendorOptions} loading={vendorsLoading} />
                </TabsContent>

                <TabsContent value="photos">
                  <ImageSection
                    register={register}
                    errors={errors}
                    control={control}
                    setValue={setValue}
                    thumbnail={thumbnail}
                    coverImage={coverImage}
                    galleryImages={galleryImages}
                  />
                </TabsContent>

                <TabsContent value="price" className="space-y-6">
                  <PricingSection register={register} errors={errors} control={control} />
                  <DiscountSection register={register} errors={errors} control={control} />
                  <VariantSection register={register} errors={errors} control={control} />
                  <AddonSection register={register} errors={errors} control={control} />
                </TabsContent>

                <TabsContent value="nutrition" className="space-y-6">
                  <NutritionSection register={register} errors={errors} control={control} />
                  <IngredientSection register={register} errors={errors} control={control} />
                  <AllergenSection register={register} errors={errors} control={control} />
                  <TagSection
                    register={register}
                    errors={errors}
                    control={control}
                    tags={tags}
                    tagIds={tagIds}
                    onToggleTag={toggleTag}
                  />
                </TabsContent>

                <TabsContent value="availability" className="space-y-6">
                  <ScheduleSection register={register} errors={errors} control={control} />
                  <AvailabilitySection errors={errors} control={control} />
                </TabsContent>
              </Tabs>
            </form>
          </div>

          <div className="space-y-6 lg:sticky lg:top-6 self-start">
            <FormSummary
              name={name}
              variantsCount={variants.length}
              addonsCount={addons.length}
              pricesCount={prices.length}
              discountsCount={discounts.length}
              schedulesCount={schedules.length}
              ingredientsCount={ingredients.length}
              allergensCount={allergens.length}
              labelsCount={labels.length}
              dietsCount={diets.length}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
