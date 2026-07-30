"use client";

import React, { useEffect, useState } from "react";
import type { PackageCategory } from "@prisma/client";
import type { Resolver } from "react-hook-form";
import { useForm, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { initialValues, PackageFormValues, packageSchema } from "@/lib/schema/package-schema";
import { HeaderBar } from "@/components/dashboard/admin/packages/header-bar";
import { GeneralInfoSection } from "@/components/dashboard/admin/packages/general-info";
import { DaysScheduleSection } from "@/components/dashboard/admin/packages/day-shedule";
import { PriceSummarySidebar } from "@/components/dashboard/admin/packages/price-summary";
import { CardPreview } from "@/components/dashboard/admin/packages/card-preview";
import { useGetPackageCategories, useCreatePackage } from "@/store/api/slices/packages-api";
import { useGetFoods } from "@/store/api/slices/foods-api";

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

const normalizePackageCode = (value: string) =>
  value
    .trim()
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "")
    .toUpperCase();

const getUniqueSuffix = () => {
  return Math.floor(Math.random() * 100000).toString().padStart(5, "0");
};

const getPackageCode = (value: string) => {
  const base = normalizePackageCode(value || "PKG");
  return `${base}-${getUniqueSuffix()}`;
};

export default function AddPackageForm() {
  const { data: categories } = useGetPackageCategories();
  const { data: foods } = useGetFoods(1, 500);
  const [showPreview, setShowPreview] = useState(true);

  const { register, control, handleSubmit, reset, setValue, formState: { errors, isSubmitting } } = useForm<PackageFormValues>({
    resolver: yupResolver(packageSchema) as Resolver<PackageFormValues>,
    defaultValues: initialValues,
  });

  // Dynamic Watches
  const packageTypeWatched = useWatch({ control, name: "packageType" });
  const price = useWatch({ control, name: "price" }) || 0;
  const discountPrice = useWatch({ control, name: "discountPrice" }) || 0;
  const discountPercent = useWatch({ control, name: "discountPercent" }) || 0;
  const daysWatched = useWatch({ control, name: "days" }) || [];
  const nameWatched = useWatch({ control, name: "name" });
  const descriptionWatched = useWatch({ control, name: "description" });
  const categoryIdWatched = useWatch({ control, name: "packageCategoryId" });
  const thumbnailWatched = useWatch({ control, name: "thumbnail" });
  const durationWatched = useWatch({ control, name: "durationDays" });
  const customTypeNameWatched = useWatch({ control, name: "customTypeName" });
  const isCustomizableWatched = useWatch({ control, name: "isCustomizable" });

  const selectedCategoryName = categories?.find((c: PackageCategory) => c.id === categoryIdWatched)?.name || "Meal Package";
  const selectedCategory = categories?.find((c: PackageCategory) => c.id === categoryIdWatched);
  const totalMealsCount = daysWatched.reduce((acc, day) => acc + (day?.meals?.length || 0), 0);
  const totalFoodsCount = daysWatched.reduce(
    (acc, day) => acc + (day?.meals?.reduce((mAcc, m) => mAcc + (m?.foods?.length || 0), 0) || 0),
    0
  );

  const filteredFoods = foods?.items.filter((food) => {
    const matchCategory = food.category.name === selectedCategory?.name;
    const matchDiet = food.diets?.some((d) => d.dietType === selectedCategory?.name);
    return matchCategory || matchDiet;
  });

  const selectedFoodPriceItems = daysWatched.flatMap((day) =>
    day.meals?.flatMap((meal) =>
      meal.foods?.map((foodItem) => ({ foodId: foodItem.foodId, quantity: foodItem.quantity })) ?? [],
    ) ?? [],
  );

  const getFoodPrice = (foodId: string) => {
    const food = foods?.items.find((item) => item.id === foodId);
    const variant = food?.variants?.[0];
    return Number(variant?.price ?? 0);
  };

  const computedPrice = selectedFoodPriceItems.reduce(
    (sum, item) => sum + item.quantity * getFoodPrice(item.foodId),
    0,
  );

  const computedDiscountPrice = Math.round(
    selectedFoodPriceItems.reduce((sum, item) => sum + item.quantity * getFoodPrice(item.foodId), 0) * (1 - Math.min(100, Math.max(0, discountPercent)) / 100),
  );

  useEffect(() => {
    setValue("price", computedPrice, { shouldValidate: true });
    setValue("discountPrice", computedDiscountPrice, { shouldValidate: true });
  }, [computedPrice, computedDiscountPrice, setValue]);

  const { createPackage } = useCreatePackage();

  const allFoodItems = foods?.items ?? [];

  const onSubmit = async (data: PackageFormValues) => {
    try {
      const packageCode = getPackageCode(data.packageCode || data.name);
      const slug = `${slugify(data.slug || data.name)}-${getUniqueSuffix()}`;

      await createPackage({
        ...data,
        packageCode,
        slug,
        price: computedPrice,
        discountPrice: computedDiscountPrice,
        totalMeals: totalMealsCount,
      }).unwrap();
      alert("Package created successfully.");
      reset(initialValues);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Unable to submit package.";
      console.error(error);
      alert(message);
    }
  };

  return (
    <section className="py-6 lg:py-8 bg-background">
      <div className="wrapper max-w-6xl mx-auto space-y-8 px-4">
        {/* Top Header Bar */}
        <HeaderBar
          onReset={() => reset(initialValues)}
          showPreview={showPreview}
          setShowPreview={setShowPreview}
          isSubmitting={isSubmitting}
        />

        {/* Form Body Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <form id="package-form" onSubmit={handleSubmit(onSubmit)} className="lg:col-span-2 space-y-6">
            <GeneralInfoSection
              register={register}
              errors={errors}
              packageTypeWatched={packageTypeWatched}
              setValue={setValue}
              categories={categories}
            />

            <DaysScheduleSection
              control={control}
              register={register}
              errors={errors}
              daysWatched={daysWatched}
              foods={filteredFoods}
            />
          </form>

          {/* Pricing Sidebar */}
          <div className="space-y-6">
            <PriceSummarySidebar
              register={register}
              errors={errors}
              packageTypeWatched={packageTypeWatched}
              price={price}
              discountPercent={discountPercent}
              discountPrice={discountPrice}
              customTypeNameWatched={customTypeNameWatched}
              durationWatched={durationWatched}
              totalMealsCount={totalMealsCount}
              totalFoodsCount={totalFoodsCount}
            />
          </div>
        </div>

        {/* Live Preview Card */}
        {showPreview && (
          <CardPreview
            thumbnailWatched={thumbnailWatched}
            nameWatched={nameWatched}
            packageTypeWatched={packageTypeWatched}
            customTypeNameWatched={customTypeNameWatched}
            isCustomizableWatched={isCustomizableWatched}
            selectedCategoryName={selectedCategoryName}
            descriptionWatched={descriptionWatched}
            durationWatched={durationWatched}
            totalMealsCount={totalMealsCount}
            price={price}
            discountPrice={discountPrice}
            discountPercent={discountPercent}
            daysWatched={daysWatched}
            allFoods={allFoodItems}
          />
        )}
      </div>
    </section>
  );
}
