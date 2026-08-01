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
import { vendors } from "@/data/vendors";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";
import type { Resolver } from "react-hook-form";
import type { Vendor } from "@/data/vendors";

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

// Simple mock categories - just for testing
const MOCK_CATEGORIES = {
  items: [
    { id: "1", name: "Appetizer", subCategories: [] },
    { id: "2", name: "Main Course", subCategories: [] },
    { id: "3", name: "Dessert", subCategories: [] },
    { id: "4", name: "Beverage", subCategories: [] },
  ],
};

export default function AddFoodPage() {
  const router = useRouter();
  const [showPreview, setShowPreview] = useState(true);
  const [createFood, { isLoading: isSubmitting }] = useCreateVendorFoodMutation();

  const { data: categoriesData } = useGetFoodCategoriesQuery(undefined);

  // Use mock categories if API fails
  const categories = categoriesData?.items?.length ? categoriesData : MOCK_CATEGORIES;

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

  // Watches
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

      toast.success("Food created successfully!", { id: toastId });

      reset(initialValues);
      router.push("/dashboard/vendor/foods");
    } catch (error: any) {
      const message = error?.data?.message || error?.message || "Failed to create food.";
      toast.error(message);
      console.error(error);
    }
  };

  const selectedVendor = vendors?.find((v: Vendor) => v.id === vendorIdWatched);
  const selectedCategory = categories?.items?.find((c) => c.id === categoryIdWatched);

  return (
    <section className="py-6 lg:py-8 bg-background">
      <div className="wrapper max-w-6xl mx-auto space-y-8 px-4">
        <HeaderBar
          onReset={() => reset(initialValues)}
          showPreview={showPreview}
          setShowPreview={setShowPreview}
          isSubmitting={isSubmitting}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <form
            id="food-form"
            onSubmit={handleSubmit(onSubmit)}
            className="lg:col-span-2 space-y-6"
          >
            <GeneralInfoSection
              register={register}
              errors={errors}
              setValue={setValue}
              control={control}
              vendors={vendors}
              categories={categories}
            />

            <ImageSection
              register={register}
              errors={errors}
              setValue={setValue}
              control={control}
              thumbnailWatched={thumbnailWatched}
              coverImageWatched={coverImageWatched}
              galleryImagesWatched={galleryImagesWatched}
            />

            <PricingSection register={register} errors={errors} control={control} />

            <VariantSection
              control={control}
              register={register}
              errors={errors}
              setValue={setValue}
              variantsWatched={variantsWatched}
            />

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

            <AvailabilitySection register={register} errors={errors} control={control} />
          </form>

          <div className="space-y-6">
            <SummarySidebar
              vendorName={selectedVendor?.name || "Not selected"}
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

        {showPreview && (
          <CardPreview
            thumbnail={thumbnailWatched}
            name={nameWatched || "Food Name"}
            vendorName={selectedVendor?.name || "Vendor Name"}
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
      </div>
    </section>
  );
}
