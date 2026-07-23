import type { InferType } from "yup";
import type { Prisma } from "@prisma/client";
import type {
  createCategorySchema, updateCategorySchema,
  createSubCategorySchema, updateSubCategorySchema,
  createVariantSchema, updateVariantSchema,
} from "../validations/adminFood.validation";
import AppError from "../utils/AppError";
import { catchServiceAsync } from "../utils/catchServiceAsync";
import prisma from "../lib/prisma";

export const createCategory = catchServiceAsync(async (data: InferType<typeof createCategorySchema>) => {
  const existing = await prisma.category.findUnique({ where: { slug: data.slug } });
  if (existing) throw new AppError(400, "A category with this slug already exists");

  return prisma.category.create({ data: data as unknown as Prisma.CategoryCreateInput });
});

export const updateCategory = catchServiceAsync(async (id: string, data: InferType<typeof updateCategorySchema>) => {
  const cat = await prisma.category.findFirst({ where: { id, deletedAt: null } });
  if (!cat) throw new AppError(404, "Category not found");

  if (data.slug) {
    const slugExists = await prisma.category.findFirst({
      where: { slug: data.slug, id: { not: id } },
    });
    if (slugExists) throw new AppError(400, "Another category already uses this slug");
  }

  return prisma.category.update({ where: { id }, data: data as unknown as Prisma.CategoryUpdateInput });
});

export const deleteCategory = catchServiceAsync(async (id: string) => {
  const cat = await prisma.category.findFirst({ where: { id, deletedAt: null } });
  if (!cat) throw new AppError(404, "Category not found");

  return prisma.category.update({
    where: { id },
    data: { deletedAt: new Date(), status: "inactive" } as unknown as Prisma.CategoryUpdateInput,
  });
});

export const createSubCategory = catchServiceAsync(
  async (categoryId: string, data: InferType<typeof createSubCategorySchema>) => {
    const cat = await prisma.category.findFirst({ where: { id: categoryId, deletedAt: null } });
    if (!cat) throw new AppError(404, "Category not found");

    const existing = await prisma.subCategory.findUnique({ where: { slug: data.slug } });
    if (existing) throw new AppError(400, "A subcategory with this slug already exists");

    return prisma.subCategory.create({ data: { ...data, categoryId } as unknown as Prisma.SubCategoryCreateInput });
  },
);

export const updateSubCategory = catchServiceAsync(async (id: string, data: InferType<typeof updateSubCategorySchema>) => {
  const sub = await prisma.subCategory.findFirst({ where: { id, deletedAt: null } });
  if (!sub) throw new AppError(404, "SubCategory not found");

  if (data.slug) {
    const slugExists = await prisma.subCategory.findFirst({
      where: { slug: data.slug, id: { not: id } },
    });
    if (slugExists) throw new AppError(400, "Another subcategory already uses this slug");
  }

  return prisma.subCategory.update({ where: { id }, data: data as unknown as Prisma.SubCategoryUpdateInput });
});

export const deleteSubCategory = catchServiceAsync(async (id: string) => {
  const sub = await prisma.subCategory.findFirst({ where: { id, deletedAt: null } });
  if (!sub) throw new AppError(404, "SubCategory not found");

  return prisma.subCategory.update({
    where: { id },
    data: { deletedAt: new Date(), status: "inactive" } as unknown as Prisma.SubCategoryUpdateInput,
  });
});

export const createVariant = catchServiceAsync(
  async (foodId: string, data: InferType<typeof createVariantSchema>) => {
    const food = await prisma.food.findFirst({ where: { id: foodId, deletedAt: null } });
    if (!food) throw new AppError(404, "Food not found");

    return prisma.foodVariant.create({ data: { ...data, foodId } as unknown as Prisma.FoodVariantCreateInput });
  },
);

export const updateVariant = catchServiceAsync(async (id: string, data: InferType<typeof updateVariantSchema>) => {
  const variant = await prisma.foodVariant.findUnique({ where: { id } });
  if (!variant) throw new AppError(404, "Variant not found");

  return prisma.foodVariant.update({ where: { id }, data: data as unknown as Prisma.FoodVariantUpdateInput });
});

export const deleteVariant = catchServiceAsync(async (id: string) => {
  const variant = await prisma.foodVariant.findUnique({ where: { id } });
  if (!variant) throw new AppError(404, "Variant not found");

  return prisma.foodVariant.update({ where: { id }, data: { status: "deleted" } as unknown as Prisma.FoodVariantUpdateInput });
});


