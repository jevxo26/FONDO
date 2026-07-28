"use client";

import React, { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { CATEGORIES, initialDummyData, PackageFormValues, packageSchema } from "@/lib/schema/package-schema";
import { HeaderBar } from "./header-bar";
import { GeneralInfoSection } from "./general-info";
import { DaysScheduleSection } from "./day-shedule";
import { PriceSummarySidebar } from "./price-summary";
import { CardPreview } from "./card-preview";


export default function AddPackageForm() {
  const [showPreview, setShowPreview] = useState(true);

  const { register, control, handleSubmit, reset, setValue, formState: { errors, isSubmitting } } = useForm<PackageFormValues>({
    resolver: yupResolver(packageSchema) as any,
    defaultValues: initialDummyData,
  });

  // Dynamic Watches
  const packageTypeWatched = useWatch({ control, name: "packageType" });
  const price = useWatch({ control, name: "price" }) || 0;
  const discountPrice = useWatch({ control, name: "discountPrice" }) || 0;
  const daysWatched = useWatch({ control, name: "days" }) || [];
  const nameWatched = useWatch({ control, name: "name" });
  const descriptionWatched = useWatch({ control, name: "description" });
  const categoryIdWatched = useWatch({ control, name: "packageCategoryId" });
  const thumbnailWatched = useWatch({ control, name: "thumbnail" });
  const durationWatched = useWatch({ control, name: "durationDays" });
  const customTypeNameWatched = useWatch({ control, name: "customTypeName" });
  const isCustomizableWatched = useWatch({ control, name: "isCustomizable" });

  const selectedCategoryName = CATEGORIES.find((c) => c.id === categoryIdWatched)?.name || "Meal Package";
  const totalMealsCount = daysWatched.reduce((acc, day) => acc + (day?.meals?.length || 0), 0);
  const totalFoodsCount = daysWatched.reduce(
    (acc, day) => acc + (day?.meals?.reduce((mAcc, m) => mAcc + (m?.foods?.length || 0), 0) || 0),
    0
  );

  const onSubmit = (data: PackageFormValues) => {
    console.group("=== PACKAGE FORM SUBMITTED DATA ===");
    console.log("Full Package Payload:", data);
    console.groupEnd();
    alert("প্যাকেজ সফলভাবে সাবমিট হয়েছে! কনসোল চেক করুন।");
  };

  return (
    <section className="py-6 lg:py-8 bg-background">
      <div className="wrapper max-w-6xl mx-auto space-y-8 px-4">
        {/* Top Header Bar */}
        <HeaderBar
          onReset={() => reset(initialDummyData)}
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
            />

            <DaysScheduleSection
              control={control}
              register={register}
              errors={errors}
              daysWatched={daysWatched}
            />
          </form>

          {/* Pricing Sidebar */}
          <div className="space-y-6">
            <PriceSummarySidebar
              register={register}
              errors={errors}
              packageTypeWatched={packageTypeWatched}
              price={price}
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
            daysWatched={daysWatched}
          />
        )}
      </div>
    </section>
  );
}