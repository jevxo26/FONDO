import type { InferType } from "yup";
import type { DiscountType, FoodType, Prisma } from "@prisma/client";
import type { createFoodSchema, updateFoodSchema } from "../validations/adminFood.validation";
import AppError from "../utils/AppError";
import { catchServiceAsync } from "../utils/catchServiceAsync";
import prisma from "../lib/prisma";

export const createFood = catchServiceAsync(async (data: InferType<typeof createFoodSchema>) => {
  const existing = await prisma.food.findUnique({ where: { slug: data.slug } });
  if (existing) throw new AppError(400, "A food with this slug already exists");

  const foodCode = `FD-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;

  const createData: Prisma.FoodUncheckedCreateInput = {
    categoryId: data.categoryId!,
    subCategoryId: data.subCategoryId,
    foodCode,
    name: data.name!,
    slug: data.slug!,
    shortDescription: data.shortDescription,
    description: data.description,
    thumbnail: data.thumbnail,
    coverImage: data.coverImage,
    preparationTime: data.preparationTime,
    calories: data.calories,
    protein: data.protein,
    fat: data.fat,
    carbohydrate: data.carbohydrate,
    servingSize: data.servingSize,
    foodType: data.foodType as FoodType,
    spiceLevel: data.spiceLevel,
    isFeatured: data.isFeatured ?? false,
    isPopular: data.isPopular ?? false,
    isRecommended: data.isRecommended ?? false,
    status: data.status ?? "draft",
    visibility: { create: data.visibility ?? {} },
  };

  if (data.variants?.length) {
    createData.variants = {
      create: data.variants.map((v) => ({
        name: v.name!,
        price: v.price!,
        description: v.description,
        discountPrice: v.discountPrice,
        weight: v.weight,
        servingSize: v.servingSize,
        status: v.status,
      })),
    };
  }

  if (data.addons?.length) {
    createData.addons = {
      create: data.addons.map((a) => ({
        name: a.name!,
        isRequired: a.isRequired ?? false,
        maxSelection: a.maxSelection,
        status: a.status,
        ...(a.items?.length
          ? {
              items: {
                create: a.items.map((item) => ({
                  name: item.name!,
                  price: item.price!,
                  image: item.image,
                  status: item.status,
                })),
              },
            }
          : {}),
      })),
    };
  }

  if (data.prices?.length) {
    createData.prices = {
      create: data.prices.map((p) => ({
        basePrice: p.basePrice!,
        salePrice: p.salePrice,
        currency: p.currency,
        effectiveFrom: p.effectiveFrom,
        effectiveTo: p.effectiveTo,
        status: p.status,
      })),
    };
  }

  if (data.discounts?.length) {
    createData.discounts = {
      create: data.discounts.map((d) => ({
        discountType: d.discountType as DiscountType,
        discountValue: d.discountValue!,
        startDate: d.startDate,
        endDate: d.endDate,
        status: d.status,
      })),
    };
  }

  if (data.schedules?.length) {
    createData.schedules = {
      create: data.schedules.map((s) => ({
        mealType: s.mealType as "BREAKFAST" | "LUNCH" | "DINNER" | "SNACKS",
        startTime: s.startTime!,
        endTime: s.endTime!,
        status: s.status,
      })),
    };
  }

  if (data.availability) {
    createData.availability = { create: data.availability as Prisma.FoodAvailabilityCreateInput };
  }

  if (data.ingredients?.length) {
    createData.ingredients = {
      create: data.ingredients.map((i) => ({
        ingredientName: i.ingredientName!,
        quantity: i.quantity,
        unit: i.unit,
        isOptional: i.isOptional,
      })),
    };
  }

  if (data.allergens?.length) {
    createData.allergens = {
      create: data.allergens.map((a) => ({
        allergen: a.allergen!,
        description: a.description,
      })),
    };
  }

  if (data.labels?.length) {
    createData.labels = {
      create: data.labels.map((l) => ({ label: l.label!, color: l.color })),
    };
  }

  if (data.diets?.length) {
    createData.diets = {
      create: data.diets.map((d) => ({ dietType: d.dietType! })),
    };
  }

  if (data.tagIds?.length) {
    createData.tagMappings = {
      create: data.tagIds.map((tagId) => ({ tagId: tagId! })),
    };
  }

  if (data.gallery?.length) {
    createData.gallery = {
      create: data.gallery.map((image, i) => ({ image: image!, sortOrder: i })),
    };
  }

  if (data.images?.length) {
    createData.images = {
      create: data.images.map((image, i) => ({ image: image!, sortOrder: i })),
    };
  }

  return prisma.food.create({
    data: createData,
    include: {
      category: { select: { id: true, name: true, slug: true } },
      visibility: true,
    },
  });
});

export const updateFood = catchServiceAsync(
  async (id: string, data: InferType<typeof updateFoodSchema>) => {
    const food = await prisma.food.findFirst({ where: { id, deletedAt: null } });
    if (!food) throw new AppError(404, "Food not found");

    if (data.slug) {
      const slugExists = await prisma.food.findFirst({
        where: { slug: data.slug, id: { not: id } },
      });
      if (slugExists) throw new AppError(400, "Another food already uses this slug");
    }

    const { diets, ...rest } = data;

    const updateData: Prisma.FoodUpdateInput = {
      ...(rest as unknown as Prisma.FoodUpdateInput),
    };

    if (diets?.length) {
      updateData.diets = { deleteMany: {}, create: diets.map((d) => ({ dietType: d.dietType })) };
    }

    return prisma.food.update({ where: { id }, data: updateData });
  },
);

export const deleteFood = catchServiceAsync(async (id: string) => {
  const food = await prisma.food.findFirst({ where: { id, deletedAt: null } });
  if (!food) throw new AppError(404, "Food not found");

  return prisma.food.update({
    where: { id },
    data: { deletedAt: new Date(), status: "archived" } as unknown as Prisma.FoodUpdateInput,
  });
});
