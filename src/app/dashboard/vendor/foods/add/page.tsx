"use client";

import { NutritionSectionFood } from "@/components/dashboard/vendor/foods/nutrition-section";
import { SummarySidebar } from "@/components/dashboard/vendor/foods/summary-sidebar";
import { AllergenSection } from "@/components/dashboard/vendor/foods/allergen-section";
import { AvailabilitySection } from "@/components/dashboard/vendor/foods/availability-section";
import { CardPreview } from "@/components/dashboard/vendor/foods/card-preview";
import { GeneralInfoSection } from "@/components/dashboard/vendor/foods/general-info";
import { HeaderBar } from "@/components/dashboard/vendor/foods/header-bar";
import { ImageSection } from "@/components/dashboard/vendor/foods/image-section";
import { IngredientSection } from "@/components/dashboard/vendor/foods/ingredient-section";
import { PricingSection } from "@/components/dashboard/vendor/foods/pricing-section";
import { TagSection } from "@/components/dashboard/vendor/foods/tag-section";
import { VariantSection } from "@/components/dashboard/vendor/foods/variant-section";
import { FoodFormValues, foodSchema, initialValues } from "@/lib/schema/food-schema";
import { useGetFoodCategoriesQuery } from "@/store/api/slices/foods-api";
import { useCreateVendorFoodMutation } from "@/store/api/slices/vendor-food-api";
import { useMyVendor } from "@/store/api/slices/vendor-orders-api";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";
import type { Resolver } from "react-hook-form";
import { ImagePlus, Info, Loader2, Package, Salad, Clock } from "lucide-react";

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

const TABS = [
  { value: "basics", label: "Basics", icon: Info },
  { value: "photos", label: "Photos", icon: ImagePlus },
  { value: "price", label: "Price & Variants", icon: Package },
  { value: "nutrition", label: "Nutrition & Diet", icon: Salad },
  { value: "availability", label: "Availability", icon: Clock },
];

export default function AddFoodPage() {
  const router = useRouter();
  const [showPreview, setShowPreview] = useState(true);
  const [createFood, { isLoading: isSubmitting }] = useCreateVendorFoodMutation();
  const { data: myVendor, isLoading: vendorLoading } = useMyVendor();
  const { data: categories, isLoading: categoriesLoading } = useGetFoodCategoriesQuery(undefined);

  const {
    register,
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FoodFormValues>({
    resolver: yupResolver(foodSchema) as Resolver<FoodFormValues>,
    defaultValues: initialValues,
  });

  const nameWatched = useWatch({ control, name: "name" });
  const vendorIdWatched = useWatch({ control, name: "vendorId" });
  const categoryIdWatched = useWatch({ control, name: "categoryId" });
  const foodTypeWatched = useWatch({ control, name: "foodType" });
  const statusWatched = useWatch({ control, name: "status" });
  const thumbnailWatched = useWatch({ control, name: "thumbnail" });
  const coverImageWatched = useWatch({ control, name: "coverImage" });
  const galleryImagesWatched = useWatch({ control, name: "galleryImages" });
  const variantsWatched = useWatch({ control, name: "variants" });
  const nutritionWatched = useWatch({ control, name: "nutrition" });
  const ingredientsWatched = useWatch({ control, name: "ingredients" });
  const allergensWatched = useWatch({ control, name: "allergens" });
  const labelsWatched = useWatch({ control, name: "labels" });
  const tagsWatched = useWatch({ control, name: "tags" });
  const availableWatched = useWatch({ control, name: "available" });
  const visibleWatched = useWatch({ control, name: "visible" });
  const featuredWatched = useWatch({ control, name: "featured" });
  const popularWatched = useWatch({ control, name: "popular" });
  const recommendedWatched = useWatch({ control, name: "recommended" });
  const preparationTimeWatched = useWatch({ control, name: "preparationTime" });

  const basePrice = Number(variantsWatched?.find((v) => v.isDefault)?.price) || 0;
  const discountPrice = Number(variantsWatched?.find((v) => v.isDefault)?.discountPrice) || 0;
  const variantCount = variantsWatched?.length || 0;
  const ingredientCount = ingredientsWatched?.length || 0;
  const calories = Number(nutritionWatched?.calories) || 0;

  useEffect(() => {
    if (myVendor?.id && !vendorIdWatched) {
      setValue("vendorId", myVendor.id, { shouldValidate: true });
    }
  }, [myVendor, vendorIdWatched, setValue]);

  useEffect(() => {
    if (nameWatched) {
      const generatedSlug = slugify(nameWatched);
      setValue("slug", generatedSlug, { shouldValidate: true });
    }
  }, [nameWatched, setValue]);

  const onSubmit = async (data: FoodFormValues) => {
    try {
      const toastId = toast.loading("Creating food item...");

      const payload = {
        ...data,
        slug: data.slug || slugify(data.name),
        basePrice: Number(data.basePrice) || 0,
        discountPrice: Number(data.discountPrice) || 0,
        variants: data.variants.map((v) => ({
          ...v,
          price: Number(v.price) || 0,
          discountPrice: Number(v.discountPrice) || 0,
          stock: Number(v.stock) || 0,
        })),
        nutrition: {
          ...data.nutrition,
          calories: Number(data.nutrition.calories) || 0,
          protein: Number(data.nutrition.protein) || 0,
          fat: Number(data.nutrition.fat) || 0,
          carbohydrate: Number(data.nutrition.carbohydrate) || 0,
          fiber: Number(data.nutrition.fiber) || 0,
          sugar: Number(data.nutrition.sugar) || 0,
          sodium: Number(data.nutrition.sodium) || 0,
        },
      };

      await createFood(payload).unwrap();

      toast.success("Food submitted for approval!", { id: toastId });

      reset(initialValues);
      router.push("/dashboard/vendor/foods");
    } catch (error) {
      const err = error as { data?: { message?: string }; message?: string };
      const message = err?.data?.message || err?.message || "Failed to create food.";
      toast.error(message);
      console.error(error);
    }
  };

  const selectedCategory = categories?.find((c) => c.id === categoryIdWatched);

  return (
    <section className="py-6 lg:py-8 bg-background">
      <div className="wrapper max-w-6xl mx-auto space-y-6 px-4">
        <HeaderBar
          onReset={() => reset(initialValues)}
          showPreview={showPreview}
          setShowPreview={setShowPreview}
          isSubmitting={isSubmitting}
          businessName={myVendor?.businessName}
        />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <form id="food-form" onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <Tabs defaultValue="basics" className="gap-4">
                <TabsList className="w-full overflow-x-auto bg-muted/70 p-1">
                  {TABS.map((tab) => (
                    <TabsTrigger key={tab.value} value={tab.value} className="gap-1.5">
                      <tab.icon className="size-4" />
                      {tab.label}
                    </TabsTrigger>
                  ))}
                </TabsList>

                <TabsContent value="basics">
                  <GeneralInfoSection
                    register={register}
                    errors={errors}
                    setValue={setValue}
                    control={control}
                    categories={categories}
                  />
                </TabsContent>

                <TabsContent value="photos">
                  <ImageSection
                    register={register}
                    errors={errors}
                    setValue={setValue}
                    control={control}
                    thumbnailWatched={thumbnailWatched}
                    coverImageWatched={coverImageWatched}
                    galleryImagesWatched={galleryImagesWatched}
                  />
                </TabsContent>

                <TabsContent value="price" className="space-y-6">
                  <PricingSection register={register} errors={errors} control={control} />
                  <VariantSection
                    control={control}
                    register={register}
                    errors={errors}
                    setValue={setValue}
                    variantsWatched={variantsWatched}
                  />
                </TabsContent>

                <TabsContent value="nutrition" className="space-y-6">
                  <NutritionSectionFood register={register} errors={errors} control={control} />
                  <IngredientSection
                    control={control}
                    register={register}
                    errors={errors}
                    ingredientsWatched={ingredientsWatched}
                  />
                  <AllergenSection
                    control={control}
                    register={register}
                    errors={errors}
                    allergensWatched={allergensWatched}
                  />
                  <TagSection
                    control={control}
                    register={register}
                    errors={errors}
                    labelsWatched={labelsWatched}
                    tagsWatched={tagsWatched}
                  />
                </TabsContent>

                <TabsContent value="availability">
                  <AvailabilitySection register={register} errors={errors} control={control} />
                </TabsContent>
              </Tabs>
            </form>
          </div>

          <div className="space-y-6 lg:sticky lg:top-6 self-start">
            {showPreview && (
              <CardPreview
                thumbnail={thumbnailWatched}
                name={nameWatched || "Food Name"}
                vendorName={myVendor?.businessName || "Vendor Name"}
                categoryName={selectedCategory?.name || "Category"}
                foodType={foodTypeWatched || "Food Type"}
                price={basePrice}
                discountPrice={discountPrice}
                nutrition={nutritionWatched}
                labels={labelsWatched || []}
                tags={tagsWatched || []}
                available={availableWatched}
                visible={visibleWatched}
                featured={featuredWatched}
                popular={popularWatched}
                recommended={recommendedWatched}
              />
            )}

            <SummarySidebar
              vendorName={myVendor?.businessName || "Not selected"}
              categoryName={selectedCategory?.name || "Not selected"}
              foodType={foodTypeWatched || "Not set"}
              status={statusWatched || "Not set"}
              basePrice={basePrice}
              discountPrice={discountPrice}
              variantCount={variantCount}
              ingredientCount={ingredientCount}
              calories={calories}
              preparationTime={preparationTimeWatched || 0}
            />
          </div>
        </div>

        {(categoriesLoading || vendorLoading) && (
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Loader2 className="size-3.5 animate-spin" />
            Loading vendor & categories...
          </div>
        )}
      </div>
    </section>
  );
}
