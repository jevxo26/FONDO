"use client";

import { CardPreview } from "@/components/dashboard/admin/packages/card-preview";
import { DaysScheduleSection } from "@/components/dashboard/admin/packages/day-shedule";
import { GeneralInfoSection } from "@/components/dashboard/admin/packages/general-info";
import { HeaderBar } from "@/components/dashboard/admin/packages/header-bar";
import { PriceSummarySidebar } from "@/components/dashboard/admin/packages/price-summary";
import { Skeleton } from "@/components/ui/skeleton";
import { initialValues, PackageFormValues, packageSchema } from "@/lib/schema/package-schema";
import { useGetVendorFoods } from "@/store/api/slices/foods-api";
import {
  useGetPackageByIdQuery,
  useGetPackageCategoriesQuery,
  useUpdatePackageMutation,
} from "@/store/api/slices/packages-api";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import type { Resolver } from "react-hook-form";
import { useForm, useWatch } from "react-hook-form";
import { notFound, useRouter } from "next/navigation";
import type { Food } from "@/types/food";
import type { PackageCategory, PackageDay, PackageMeal, PackageFood } from "@/types/package";
import * as React from "react";

interface EditPageProps {
  params: Promise<{
    id: string;
  }>;
}

// Type for vendor food from the API (based on useGetVendorFoods response)
interface VendorFood {
  foodId: string;
  id?: string;
  name: string;
  price?: number | string;
  variants?: Array<{
    price?: number | string;
    id?: string;
    name?: string;
    discountPrice?: string | null;
    servingSize?: string;
  }>;
  category?: string | { id: string; name: string } | null;
  thumbnail?: string;
  description?: string;
  slug?: string;
  foodType?: string;
  spiceLevel?: string;
  isFeatured?: boolean;
  isPopular?: boolean;
  isRecommended?: boolean;
  averageRating?: number;
  totalReview?: number;
}

// Type for form days
interface FormFoodItem {
  foodId: string;
  quantity: number;
}

interface FormMeal {
  mealType: string;
  mealTime: string;
  foods: FormFoodItem[];
}

interface FormDay {
  dayNumber: number;
  title: string;
  description: string;
  meals: FormMeal[];
}

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

const getUniqueSuffix = () => {
  return Math.floor(Math.random() * 100000)
    .toString()
    .padStart(5, "0");
};

// Transform package days to form days with proper types
const transformDaysToForm = (days: PackageDay[] = []): FormDay[] => {
  return days.map((day) => ({
    dayNumber: day.dayNumber || 1,
    title: day.title || "",
    description: day.description || "",
    meals: day.meals?.map((meal: PackageMeal) => ({
      mealType: meal.mealType || "BREAKFAST",
      mealTime: meal.mealTime || "08:00",
      foods: meal.foods?.map((food: PackageFood) => ({
        foodId: food.foodId || food.food?.id || "",
        quantity: food.quantity || 1,
      })) || [{ foodId: "", quantity: 1 }],
    })) || [{ mealType: "BREAKFAST", mealTime: "08:00", foods: [{ foodId: "", quantity: 1 }] }],
  }));
};

export default function VendorEditPackageForm({ params }: EditPageProps) {
  const router = useRouter();
  // Unwrap params using React.use()
  const { id } = React.use(params);

  const { data: packageData, isLoading: isLoadingPackage } = useGetPackageByIdQuery(id);
  const { data: categories } = useGetPackageCategoriesQuery(undefined);
  const { data: vendorFoods, isLoading: isLoadingFoods } = useGetVendorFoods();
  const [showPreview, setShowPreview] = useState(true);
  const [updatePackage, { isLoading: isUpdating }] = useUpdatePackageMutation();

  const {
    register,
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<PackageFormValues>({
    resolver: yupResolver(packageSchema) as Resolver<PackageFormValues>,
    defaultValues: initialValues,
  });

  // Populate form with existing data
  useEffect(() => {
    if (packageData) {
      const price =
        typeof packageData.price === "string"
          ? parseFloat(packageData.price)
          : packageData.price || 0;

      const discountPrice = packageData.discountPrice
        ? typeof packageData.discountPrice === "string"
          ? parseFloat(packageData.discountPrice)
          : packageData.discountPrice
        : 0;

      // Transform days safely
      const transformedDays = packageData.days ? transformDaysToForm(packageData.days) : [];

      reset({
        name: packageData.name || "",
        packageCode: packageData.packageCode || "",
        slug: packageData.slug || "",
        description: packageData.description || "",
        thumbnail: packageData.thumbnail || "",
        coverImage: packageData.coverImage || "",
        packageType: (packageData.packageType as "WEEKLY" | "MONTHLY" | "CUSTOM") || "WEEKLY",
        packageCategoryId: packageData.packageCategoryId || "",
        durationDays: packageData.durationDays || 7,
        price: price || 0,
        discountPrice: discountPrice || 0,
        discountPercent: 0,
        isCustomizable: packageData.isCustomizable || false,
        status: packageData.status?.toLowerCase() === "active" ? "active" : "inactive",
        vendorId: packageData.vendor?.id || "",
        days: transformedDays,
      });
    }
  }, [packageData, reset]);

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

  const selectedCategoryName =
    (categories as PackageCategory[])?.find((c: PackageCategory) => c.id === categoryIdWatched)
      ?.name || "Meal Package";
  const totalMealsCount = daysWatched.reduce((acc, day) => acc + (day?.meals?.length || 0), 0);
  const totalFoodsCount = daysWatched.reduce(
    (acc, day) => acc + (day?.meals?.reduce((mAcc, m) => mAcc + (m?.foods?.length || 0), 0) || 0),
    0,
  );

  // Vendor foods from API - convert to Food type with all required fields
  const filteredFoods: Food[] = (vendorFoods ?? []).map((vf: VendorFood) => {
    // Get price from variants or direct price
    const variantPrice = vf.variants?.[0]?.price;
    const priceValue = vf.price ?? variantPrice ?? 0;

    return {
      id: vf.foodId || vf.id || "",
      name: vf.name,
      slug: vf.slug || vf.name.toLowerCase().replace(/\s+/g, "-"),
      foodType: (vf.foodType as "VEG" | "NON_VEG" | "VEGAN" | "SEAFOOD") || "VEG",
      spiceLevel: (vf.spiceLevel as "MILD" | "MEDIUM" | "HOT") || "MILD",
      isFeatured: vf.isFeatured || false,
      isPopular: vf.isPopular || false,
      isRecommended: vf.isRecommended || false,
      averageRating: vf.averageRating || 0,
      totalReview: vf.totalReview || 0,
      variants: [
        {
          id: vf.variants?.[0]?.id || "",
          name: vf.variants?.[0]?.name || "Default",
          price: String(priceValue),
          discountPrice: vf.variants?.[0]?.discountPrice ?? null,
          servingSize: vf.variants?.[0]?.servingSize || "",
        },
      ],
      // Add empty defaults for other required fields
      addons: [],
      labels: [],
      tags: [],
      diets: [],
      category: {
        id: typeof vf.category === "object" ? vf.category?.id || "" : "",
        name: typeof vf.category === "object" ? vf.category?.name || "" : "",
        slug:
          typeof vf.category === "object"
            ? vf.category?.name?.toLowerCase().replace(/\s+/g, "-") || ""
            : "",
      },
      discount: null,
    } as Food;
  });

  const selectedFoodPriceItems = daysWatched.flatMap(
    (day) =>
      day.meals?.flatMap(
        (meal) =>
          meal.foods?.map((foodItem) => ({
            foodId: foodItem.foodId,
            quantity: foodItem.quantity,
          })) ?? [],
      ) ?? [],
  );

  const getFoodPrice = (foodId: string) => {
    const food = filteredFoods.find((item) => item.id === foodId);
    const variant = food?.variants?.[0];
    return Number(variant?.price ?? 0);
  };

  const computedPrice = selectedFoodPriceItems.reduce(
    (sum, item) => sum + item.quantity * getFoodPrice(item.foodId),
    0,
  );

  const computedDiscountPrice = Math.round(
    computedPrice * (1 - Math.min(100, Math.max(0, discountPercent)) / 100),
  );

  useEffect(() => {
    if (computedPrice > 0) {
      setValue("price", computedPrice, { shouldValidate: true });
      setValue("discountPrice", computedDiscountPrice, { shouldValidate: true });
    }
  }, [computedPrice, computedDiscountPrice, setValue]);

  // const allFoodItems = filteredFoods;

  // Loading state
  if (isLoadingPackage || isLoadingFoods) {
    return (
      <div className="py-6 lg:py-8 bg-background">
        <div className="wrapper max-w-6xl mx-auto space-y-8 px-4">
          <Skeleton className="h-12 w-full" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <Skeleton className="h-64 rounded-2xl" />
              <Skeleton className="h-48 rounded-2xl" />
            </div>
            <div className="space-y-6">
              <Skeleton className="h-96 rounded-2xl" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!packageData) {
    notFound();
  }

  // Don't allow editing approved packages
  if (packageData.status === "APPROVED") {
    router.push(`/dashboard/vendor/packages/${id}`);
    return null;
  }

  const onSubmit = async (data: PackageFormValues) => {
    try {
      const slug = `${slugify(data.slug || data.name)}-${getUniqueSuffix()}`;

      // Remove vendorId from the update payload (it's not needed for update)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { vendorId, ...restData } = data;

      // Build the update payload with proper types
      const updatePayload = {
        name: restData.name,
        packageCode: restData.packageCode || undefined,
        slug: slug,
        description: restData.description,
        thumbnail: restData.thumbnail || undefined,
        coverImage: restData.coverImage || undefined,
        packageType: restData.packageType as "WEEKLY" | "MONTHLY" | "CUSTOM",
        packageCategoryId: restData.packageCategoryId || undefined,
        durationDays: restData.durationDays || durationWatched || 7,
        totalMeals: totalMealsCount,
        price: computedPrice || price,
        discountPrice: computedDiscountPrice || discountPrice || undefined,
        discountPercent: discountPercent || 0,
        isCustomizable: restData.isCustomizable || false,
        status: restData.status === "active" ? "ACTIVE" : "INACTIVE",
        days: restData.days,
      };

      await updatePackage({
        id: id,
        body: updatePayload,
      }).unwrap();

      alert("Package updated successfully.");
      router.push(`/dashboard/vendor/packages/${id}`);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Unable to update package.";
      console.error(error);
      alert(message);
    }
  };

  return (
    <section className="py-6 lg:py-8 bg-background">
      <div className="wrapper max-w-6xl mx-auto space-y-8 px-4">
        <HeaderBar
          onReset={() => reset(initialValues)}
          showPreview={showPreview}
          setShowPreview={setShowPreview}
          isSubmitting={isSubmitting || isUpdating}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <form
            id="package-form"
            onSubmit={handleSubmit(onSubmit)}
            className="lg:col-span-2 space-y-6"
          >
            <GeneralInfoSection
              register={register}
              errors={errors}
              packageTypeWatched={packageTypeWatched}
              setValue={setValue}
              categories={categories}
              watch={watch}
            />

            <DaysScheduleSection
              control={control}
              register={register}
              errors={errors}
              daysWatched={daysWatched}
              foods={filteredFoods}
            />
          </form>

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
            allFoods={filteredFoods}
          />
        )}
      </div>
    </section>
  );
}
