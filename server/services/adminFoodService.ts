import type { InferType } from "yup";
import type { Prisma } from "@prisma/client";
import type { createFoodSchema, updateFoodSchema } from "../validations/adminFood.validation";
import AppError from "../utils/AppError";
import { catchServiceAsync } from "../utils/catchServiceAsync";
import prisma from "../lib/prisma";

export const createFood = catchServiceAsync(async (data: InferType<typeof createFoodSchema>) => {
  const existing = await prisma.food.findUnique({ where: { slug: data.slug } });
  if (existing) throw new AppError(400, "A food with this slug already exists");

  const foodCode = `FD-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;

  return prisma.food.create({
    data: {
      categoryId: data.categoryId,
      subCategoryId: data.subCategoryId,
      foodCode,
      name: data.name,
      slug: data.slug,
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
      foodType: data.foodType,
      spiceLevel: data.spiceLevel,
      isFeatured: data.isFeatured ?? false,
      isPopular: data.isPopular ?? false,
      isRecommended: data.isRecommended ?? false,
      status: data.status ?? "draft",
      nutrition: { create: {} },
      rating: { create: {} },
      visibility: { create: {} },
    } as unknown as Prisma.FoodCreateInput,
    include: {
      category: { select: { id: true, name: true, slug: true } },
      nutrition: true,
      rating: true,
      visibility: true,
    },
  });
});

export const updateFood = catchServiceAsync(async (id: string, data: InferType<typeof updateFoodSchema>) => {
  const food = await prisma.food.findFirst({ where: { id, deletedAt: null } });
  if (!food) throw new AppError(404, "Food not found");

  if (data.slug) {
    const slugExists = await prisma.food.findFirst({
      where: { slug: data.slug, id: { not: id } },
    });
    if (slugExists) throw new AppError(400, "Another food already uses this slug");
  }

  return prisma.food.update({ where: { id }, data: data as unknown as Prisma.FoodUpdateInput });
});

export const deleteFood = catchServiceAsync(async (id: string) => {
  const food = await prisma.food.findFirst({ where: { id, deletedAt: null } });
  if (!food) throw new AppError(404, "Food not found");

  return prisma.food.update({
    where: { id },
    data: { deletedAt: new Date(), status: "archived" } as unknown as Prisma.FoodUpdateInput,
  });
});


