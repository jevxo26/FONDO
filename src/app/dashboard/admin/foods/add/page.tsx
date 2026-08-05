"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useState } from "react";
import { useForm, useWatch, type FieldErrors } from "react-hook-form";
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
import { useUploadImage } from "@/store/api/slices/image-upload-api";
import { useImageFiles } from "@/hooks/use-image-files";
import type { Food } from "@/types/food";
import { cn } from "@/lib/utils";
import {
  FormShell,
  FormTabs,
  FormSummaryCard,
  FormPreviewCard,
  type FormTab,
  type SummaryRow,
} from "@/components/common/form-system";
import FoodCard from "@/components/common/food-card/food-card";
import { FoodDetailPreview } from "@/components/dashboard/admin/foods/form/food-detail-preview";
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
import {
  AlertTriangle,
  Apple,
  BadgeDollarSign,
  CalendarClock,
  Clock,
  GripVertical,
  ImagePlus,
  Info,
  ListPlus,
  Package,
  Percent,
  Salad,
  Tag,
  UtensilsCrossed,
} from "lucide-react";

const toNumber = (value: unknown): number | null | undefined => {
  if (value === null || value === undefined || value === "") return undefined;
  const n = Number(value);
  return Number.isNaN(n) ? undefined : n;
};

const TAB_FIELDS: Record<string, string[]> = {
  basics: [
    "name",
    "slug",
    "categoryId",
    "subCategoryId",
    "shortDescription",
    "description",
    "foodType",
    "spiceLevel",
    "preparationTime",
    "servingSize",
    "status",
    "isFeatured",
    "isPopular",
    "isRecommended",
    "isVisible",
    "vendorIds",
  ],
  photos: ["thumbnail", "coverImage", "galleryImages"],
  price: ["prices", "discounts", "variants", "addons"],
  nutrition: [
    "calories",
    "protein",
    "fat",
    "carbohydrate",
    "fiber",
    "sugar",
    "sodium",
    "cholesterol",
    "ingredients",
    "allergens",
    "diets",
    "labels",
    "tagIds",
  ],
  availability: ["schedules", "isAvailable", "availabilityDays"],
};

export default function AddFoodPage() {
  const router = useRouter();
  const { data: categories } = useAdminFoodCategories();
  const { data: tags } = useAdminFoodTags();
  const { data: vendorOptions, isLoading: vendorsLoading } = useAdminVendorOptions();
  const { mutateAsync: createFood, isPending } = useCreateFood();
  const { mutateAsync: uploadImage, isLoading: uploadingImage } = useUploadImage();
  const images = useImageFiles();
  const [tagIds, setTagIds] = useState<string[]>([]);
  const [previewView, setPreviewView] = useState<"card" | "detail">("card");
  const [activeTab, setActiveTab] = useState("basics");

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

  const name = useWatch({ control, name: "name" }) ?? "";
  const categoryId = useWatch({ control, name: "categoryId" }) ?? "";
  const foodType = useWatch({ control, name: "foodType" }) ?? "";
  const preparationTime = useWatch({ control, name: "preparationTime" });
  const isPopular = useWatch({ control, name: "isPopular" }) ?? false;
  const isFeatured = useWatch({ control, name: "isFeatured" }) ?? false;
  const isRecommended = useWatch({ control, name: "isRecommended" }) ?? false;
  const calories = useWatch({ control, name: "calories" });
  const protein = useWatch({ control, name: "protein" });
  const fat = useWatch({ control, name: "fat" });
  const carbohydrate = useWatch({ control, name: "carbohydrate" });
  const fiber = useWatch({ control, name: "fiber" });
  const sugar = useWatch({ control, name: "sugar" });
  const sodium = useWatch({ control, name: "sodium" });
  const cholesterol = useWatch({ control, name: "cholesterol" });
  const thumbnail = useWatch({ control, name: "thumbnail" });
  const coverImage = useWatch({ control, name: "coverImage" });
  const galleryImages = useWatch({ control, name: "galleryImages" }) ?? [];
  const shortDescription = useWatch({ control, name: "shortDescription" }) ?? "";
  const slug = useWatch({ control, name: "slug" }) ?? "";
  const servingSize = useWatch({ control, name: "servingSize" }) ?? "";
  const spiceLevel = useWatch({ control, name: "spiceLevel" }) ?? "";
  const status = useWatch({ control, name: "status" }) ?? "DRAFT";
  const variants = useWatch({ control, name: "variants" }) ?? [];
  const addons = useWatch({ control, name: "addons" }) ?? [];
  const prices = useWatch({ control, name: "prices" }) ?? [];
  const discounts = useWatch({ control, name: "discounts" }) ?? [];
  const schedules = useWatch({ control, name: "schedules" }) ?? [];
  const ingredients = useWatch({ control, name: "ingredients" }) ?? [];
  const allergens = useWatch({ control, name: "allergens" }) ?? [];
  const labels = useWatch({ control, name: "labels" }) ?? [];
  const diets = useWatch({ control, name: "diets" }) ?? [];
  const availabilityDays = useWatch({ control, name: "availabilityDays" }) ?? [];

  const toggleTag = (tagId: string) => {
    const next = tagIds.includes(tagId) ? tagIds.filter((t) => t !== tagId) : [...tagIds, tagId];
    setTagIds(next);
    setValue("tagIds", next);
  };

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

  const hasTabError = (tab: string) =>
    Object.keys(errors).some((key) => TAB_FIELDS[tab].includes(key));

  const completed = {
    basics: Boolean(name.trim() && categoryId && foodType) && !hasTabError("basics"),
    photos: Boolean((thumbnail && coverImage) || images.hasPending()) && !hasTabError("photos"),
    price: prices.some((p) => Number(p.basePrice) > 0) && !hasTabError("price"),
    nutrition:
      Boolean(
        diets.length > 0 ||
          calories ||
          protein ||
          fat ||
          carbohydrate ||
          fiber ||
          sugar ||
          sodium ||
          cholesterol,
      ) && !hasTabError("nutrition"),
    availability:
      Boolean(schedules.length > 0 || availabilityDays.length > 0) && !hasTabError("availability"),
  };

  const tabs: FormTab[] = [
    {
      value: "basics",
      label: "Basics",
      icon: Info,
      completed: completed.basics,
      error: hasTabError("basics"),
    },
    {
      value: "photos",
      label: "Photos",
      icon: ImagePlus,
      completed: completed.photos,
      error: hasTabError("photos"),
    },
    {
      value: "price",
      label: "Price & Variants",
      icon: Package,
      completed: completed.price,
      error: hasTabError("price"),
    },
    {
      value: "nutrition",
      label: "Nutrition & Diet",
      icon: Salad,
      completed: completed.nutrition,
      error: hasTabError("nutrition"),
    },
    {
      value: "availability",
      label: "Availability",
      icon: Clock,
      completed: completed.availability,
      error: hasTabError("availability"),
    },
  ];

  const summaryRows: SummaryRow[] = [
    { key: "prices", label: "Prices", value: prices.length, icon: BadgeDollarSign },
    { key: "discounts", label: "Discounts", value: discounts.length, icon: Percent },
    { key: "variants", label: "Variants", value: variants.length, icon: GripVertical },
    { key: "addons", label: "Addons", value: addons.length, icon: ListPlus },
    { key: "schedules", label: "Schedules", value: schedules.length, icon: CalendarClock },
    { key: "ingredients", label: "Ingredients", value: ingredients.length, icon: Salad },
    { key: "allergens", label: "Allergens", value: allergens.length, icon: AlertTriangle },
    { key: "labels", label: "Labels", value: labels.length, icon: Tag },
    { key: "diets", label: "Diets", value: diets.length, icon: Apple },
  ];

  const basePrice = prices.find((p) => Number(p.basePrice) > 0)?.basePrice ?? 0;
  const salePrice = prices.find((p) => Number(p.basePrice) > 0)?.salePrice ?? null;
  const categoryName = categories?.find((c) => c.id === categoryId)?.name ?? "";

  const previewVariants =
    variants.length > 0
      ? variants.map((v, i) => ({
          id: `preview-v-${i}`,
          name: v.name || `Variant ${i + 1}`,
          price: String(Number(v.price) || 0),
          discountPrice:
            v.discountPrice != null && Number(v.discountPrice) > 0 ? String(v.discountPrice) : null,
          servingSize: v.servingSize || "",
        }))
      : [
          {
            id: "preview-v-0",
            name: "Regular",
            price: String(Number(basePrice) || 0),
            discountPrice: salePrice && Number(salePrice) > 0 ? String(salePrice) : null,
            servingSize,
          },
        ];

  const previewFood: Food = {
    id: "preview",
    name,
    slug,
    shortDescription,
    thumbnail: images.previewFor("thumbnail", thumbnail),
    foodType: (foodType || "VEG") as Food["foodType"],
    spiceLevel: (spiceLevel || "MILD") as Food["spiceLevel"],
    preparationTime: toNumber(preparationTime) ?? 0,
    calories: toNumber(calories) ?? 0,
    protein: toNumber(protein) ?? 0,
    fat: toNumber(fat) ?? 0,
    carbohydrate: toNumber(carbohydrate) ?? 0,
    servingSize,
    status,
    isFeatured,
    isPopular,
    isRecommended,
    category: { id: categoryId, name: categoryName || "Category", slug: "" },
    variants: previewVariants,
    addons: [],
    averageRating: 4.9,
    totalReview: 0,
    labels: labels.map((l, i) => ({
      id: `preview-l-${i}`,
      foodId: "preview",
      label: l.label,
      color: l.color,
      createdAt: "",
      updatedAt: "",
    })),
    tags: [],
    diets: [],
    discount: null,
  };

  const previewControls = (
    <div className="flex rounded-full border border-border/60 bg-muted/50 p-0.5">
      {(["card", "detail"] as const).map((view) => (
        <button
          key={view}
          type="button"
          onClick={() => setPreviewView(view)}
          aria-pressed={previewView === view}
          className={cn(
            "rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider transition-all",
            previewView === view
              ? "bg-primary text-primary-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          {view === "card" ? "Card" : "Detail"}
        </button>
      ))}
    </div>
  );

  const onInvalid = (formErrors: FieldErrors<AdminFoodFormValues>) => {
    const firstTab = tabs.find((t) =>
      TAB_FIELDS[t.value].some((field) => formErrors[field as keyof AdminFoodFormValues]),
    );
    if (firstTab) setActiveTab(firstTab.value);
    const count = Object.keys(formErrors).length;
    toast.error(
      count > 1 ? `${count} fields need attention` : "Please fix the highlighted field",
    );
  };

  const onSubmit = async (data: AdminFoodFormValues) => {
    let thumbnailUrl = data.thumbnail;
    let coverUrl = data.coverImage;
    let galleryUrls = data.galleryImages;

    try {
      const toastId = toast.loading("Creating food...");
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
        galleryUrls = resolved.galleryImages;
      }

      const payload: CreateFoodPayload = {
        categoryId: data.categoryId,
        subCategoryId: data.subCategoryId || undefined,
        name: data.name,
        slug: data.slug,
        shortDescription: data.shortDescription || undefined,
        description: data.description || undefined,
        thumbnail: thumbnailUrl || undefined,
        coverImage: coverUrl || undefined,
        preparationTime: toNumber(data.preparationTime),
        calories: toNumber(data.calories),
        protein: toNumber(data.protein),
        fat: toNumber(data.fat),
        carbohydrate: toNumber(data.carbohydrate),
        fiber: toNumber(data.fiber),
        sugar: toNumber(data.sugar),
        sodium: toNumber(data.sodium),
        cholesterol: toNumber(data.cholesterol),
        servingSize: data.servingSize || undefined,
        foodType: data.foodType,
        spiceLevel: data.spiceLevel || undefined,
        status: data.status,
        isFeatured: data.isFeatured,
        isPopular: data.isPopular,
        isRecommended: data.isRecommended,
        tagIds: data.tagIds,
        vendorIds: data.vendorIds,
        images: galleryUrls.filter((url) => url.trim().length > 0),
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
          .map((p) => ({
            basePrice: toNumber(p.basePrice) ?? 0,
            salePrice: toNumber(p.salePrice),
          })),
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

      const created = await createFood(payload);
      toast.success("Food created successfully!", { id: toastId });
      router.push(`/dashboard/admin/foods/${created.id}`);
    } catch (error) {
      const err = error as { data?: { message?: string }; message?: string };
      toast.error(err?.data?.message || err?.message || "Failed to create food");
    }
  };

  return (
    <FormShell
      icon={UtensilsCrossed}
      title="Add New Food"
      description="Create a food item for the central catalog."
      formId="admin-food-form"
      submitLabel="Save Food"
      isPending={isPending || uploadingImage}
      onReset={() => reset(adminFoodInitialValues)}
      backHref="/dashboard/admin/foods"
      aside={
        <>
          <FormSummaryCard
            title={name || "Untitled Food"}
            subtitle="Catalog summary"
            rows={summaryRows}
          />
          <FormPreviewCard
            title="Live Preview"
            description="How customers see your food."
            controls={previewControls}
          >
            {previewView === "card" ? (
              <FoodCard food={previewFood} preview />
            ) : (
              <FoodDetailPreview food={previewFood} />
            )}
          </FormPreviewCard>
        </>
      }
    >
      <form id="admin-food-form" onSubmit={handleSubmit(onSubmit, onInvalid)}>
        <FormTabs
          tabs={tabs}
          active={activeTab}
          onActiveChange={setActiveTab}
          content={{
            basics: (
              <div className="space-y-6">
                <GeneralInfoSection
                  register={register}
                  errors={errors}
                  setValue={setValue}
                  control={control}
                  categories={categories}
                />
                <VendorAssignment
                  control={control}
                  vendors={vendorOptions}
                  loading={vendorsLoading}
                />
              </div>
            ),
            photos: (
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
            ),
            price: (
              <div className="space-y-6">
                <PricingSection register={register} errors={errors} control={control} />
                <DiscountSection register={register} errors={errors} control={control} />
                <VariantSection register={register} errors={errors} control={control} />
                <AddonSection register={register} errors={errors} control={control} />
              </div>
            ),
            nutrition: (
              <div className="space-y-6">
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
              </div>
            ),
            availability: (
              <div className="space-y-6">
                <ScheduleSection register={register} errors={errors} control={control} />
                <AvailabilitySection errors={errors} control={control} />
              </div>
            ),
          }}
        />
      </form>
    </FormShell>
  );
}
