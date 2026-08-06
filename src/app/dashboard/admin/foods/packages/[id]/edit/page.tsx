"use client";

import { CardPreview } from "@/components/dashboard/admin/packages/card-preview";
import { DaysScheduleSection } from "@/components/dashboard/admin/packages/day-shedule";
import { GeneralInfoSection } from "@/components/dashboard/admin/packages/general-info";
import { HeaderBar } from "@/components/dashboard/admin/packages/header-bar";
import { PriceSummarySidebar } from "@/components/dashboard/admin/packages/price-summary";
import { PackageFormValues } from "@/lib/schema/package-schema";
import { useGetPackageByIdQuery, useUpdatePackageMutation } from "@/store/api/slices/packages-api";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function EditPackagePage({ params }: { params: { id: string } }) {
  const [showPreview, setShowPreview] = useState(false);

  // Fetch package details from API/rtk-query
  const { data: packageData, isLoading } = useGetPackageByIdQuery(params.id);
  const [updatePackage, { isLoading: isSubmitting }] = useUpdatePackageMutation();

  const form = useForm<PackageFormValues>({
    defaultValues: {
      days: [],
      price: 0,
      discountPrice: 0,
      discountPercent: 0,
      packageType: "WEEKLY",
      status: "active",
      isCustomizable: false,
    },
  });

  const { register, handleSubmit, control, watch, setValue, reset, formState: { errors } } = form;

  // Populate form with fetched data
  useEffect(() => {
    if (packageData) {
      reset(packageData);
    }
  }, [packageData, reset]);

  const onSubmit = async (values: PackageFormValues) => {
    await updatePackage({ id: params.id, ...values });
  };

  if (isLoading) return <div>Loading package details...</div>;

  return (
    <form id="package-form" onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <HeaderBar
        isEditMode={true}
        isSubmitting={isSubmitting}
        showPreview={showPreview}
        setShowPreview={setShowPreview}
        onReset={() => reset(packageData)}
      />

      {showPreview && (
        <CardPreview
          nameWatched={watch("name")}
          thumbnailWatched={watch("thumbnail")}
          packageTypeWatched={watch("packageType")}
          customTypeNameWatched={watch("customTypeName")}
          isCustomizableWatched={watch("isCustomizable")}
          descriptionWatched={watch("description")}
          durationWatched={watch("durationDays")}
          totalMealsCount={0}
          price={watch("price") || 0}
          discountPrice={watch("discountPrice") || 0}
          discountPercent={watch("discountPercent") || 0}
          daysWatched={watch("days") || []}
          allFoods={[]}
        />
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <GeneralInfoSection
            isEditMode={true}
            register={register}
            errors={errors}
            watch={watch}
            setValue={setValue}
            packageTypeWatched={watch("packageType")}
          />
          <DaysScheduleSection
            control={control}
            register={register}
            errors={errors}
            daysWatched={watch("days") || []}
          />
        </div>

        <div>
          <PriceSummarySidebar
            register={register}
            errors={errors}
            packageTypeWatched={watch("packageType")}
            price={watch("price") || 0}
            discountPrice={watch("discountPrice") || 0}
            discountPercent={watch("discountPercent") || 0}
            totalMealsCount={0}
            totalFoodsCount={0}
          />
        </div>
      </div>
    </form>
  );
}