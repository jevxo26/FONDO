import type { InferType } from "yup";
import type { Prisma } from "@prisma/client";
import type {
  createCategorySchema,
  updateCategorySchema,
  createSubCategorySchema,
  updateSubCategorySchema,
  createVariantSchema,
  updateVariantSchema,
} from "../validations/adminFood.validation";
import AppError from "../utils/AppError";
import { catchServiceAsync } from "../utils/catchServiceAsync";
import prisma from "../lib/prisma";

function toCategoryCreate(
  data: InferType<typeof createCategorySchema>,
): Prisma.CategoryCreateInput {
  return {
    name: data.name!,
    slug: data.slug!,
    description: data.description,
    icon: data.icon,
    image: data.image,
    sortOrder: data.sortOrder,
  };
}

function toCategoryUpdate(
  data: InferType<typeof updateCategorySchema>,
): Prisma.CategoryUpdateInput {
  return {
    name: data.name,
    slug: data.slug,
    description: data.description,
    icon: data.icon,
    image: data.image,
    sortOrder: data.sortOrder,
  };
}

function toSubCategoryCreate(
  data: InferType<typeof createSubCategorySchema>,
  categoryId: string,
): Prisma.SubCategoryCreateInput {
  return {
    name: data.name!,
    slug: data.slug!,
    category: { connect: { id: categoryId } },
    description: data.description,
    icon: data.icon,
    image: data.image,
    sortOrder: data.sortOrder,
  };
}

function toSubCategoryUpdate(
  data: InferType<typeof updateSubCategorySchema>,
): Prisma.SubCategoryUpdateInput {
  return {
    name: data.name,
    slug: data.slug,
    description: data.description,
    icon: data.icon,
    image: data.image,
    sortOrder: data.sortOrder,
  };
}

function toVariantCreate(
  data: InferType<typeof createVariantSchema>,
  foodId: string,
): Prisma.FoodVariantCreateInput {
  return {
    name: data.name!,
    price: data.price!,
    food: { connect: { id: foodId } },
    description: data.description,
    discountPrice: data.discountPrice,
    weight: data.weight,
    servingSize: data.servingSize,
  };
}

function toVariantUpdate(
  data: InferType<typeof updateVariantSchema>,
): Prisma.FoodVariantUpdateInput {
  return {
    name: data.name,
    price: data.price,
    description: data.description,
    discountPrice: data.discountPrice,
    weight: data.weight,
    servingSize: data.servingSize,
  };
}

export const createCategory = catchServiceAsync(
  async (data: InferType<typeof createCategorySchema>) => {
    const existing = await prisma.category.findUnique({ where: { slug: data.slug! } });
    if (existing) throw new AppError(400, "A category with this slug already exists");

    return prisma.category.create({ data: toCategoryCreate(data) });
  },
);

export const updateCategory = catchServiceAsync(
  async (id: string, data: InferType<typeof updateCategorySchema>) => {
    const cat = await prisma.category.findFirst({ where: { id, deletedAt: null } });
    if (!cat) throw new AppError(404, "Category not found");

    if (data.slug) {
      const slugExists = await prisma.category.findFirst({
        where: { slug: data.slug, id: { not: id } },
      });
      if (slugExists) throw new AppError(400, "Another category already uses this slug");
    }

    return prisma.category.update({
      where: { id },
      data: toCategoryUpdate(data),
    });
  },
);

export const deleteCategory = catchServiceAsync(async (id: string) => {
  const cat = await prisma.category.findFirst({ where: { id, deletedAt: null } });
  if (!cat) throw new AppError(404, "Category not found");

  return prisma.category.update({
    where: { id },
    data: { deletedAt: new Date(), status: "inactive" },
  });
});

export const createSubCategory = catchServiceAsync(
  async (categoryId: string, data: InferType<typeof createSubCategorySchema>) => {
    const cat = await prisma.category.findFirst({ where: { id: categoryId, deletedAt: null } });
    if (!cat) throw new AppError(404, "Category not found");

    const existing = await prisma.subCategory.findUnique({ where: { slug: data.slug! } });
    if (existing) throw new AppError(400, "A subcategory with this slug already exists");

    return prisma.subCategory.create({
      data: toSubCategoryCreate(data, categoryId),
    });
  },
);

export const updateSubCategory = catchServiceAsync(
  async (id: string, data: InferType<typeof updateSubCategorySchema>) => {
    const sub = await prisma.subCategory.findFirst({ where: { id, deletedAt: null } });
    if (!sub) throw new AppError(404, "SubCategory not found");

    if (data.slug) {
      const slugExists = await prisma.subCategory.findFirst({
        where: { slug: data.slug, id: { not: id } },
      });
      if (slugExists) throw new AppError(400, "Another subcategory already uses this slug");
    }

    return prisma.subCategory.update({
      where: { id },
      data: toSubCategoryUpdate(data),
    });
  },
);

export const deleteSubCategory = catchServiceAsync(async (id: string) => {
  const sub = await prisma.subCategory.findFirst({ where: { id, deletedAt: null } });
  if (!sub) throw new AppError(404, "SubCategory not found");

  return prisma.subCategory.update({
    where: { id },
    data: { deletedAt: new Date(), status: "inactive" },
  });
});

export const createVariant = catchServiceAsync(
  async (foodId: string, data: InferType<typeof createVariantSchema>) => {
    const food = await prisma.food.findFirst({ where: { id: foodId, deletedAt: null } });
    if (!food) throw new AppError(404, "Food not found");

    return prisma.foodVariant.create({
      data: toVariantCreate(data, foodId),
    });
  },
);

export const updateVariant = catchServiceAsync(
  async (id: string, data: InferType<typeof updateVariantSchema>) => {
    const variant = await prisma.foodVariant.findUnique({ where: { id } });
    if (!variant) throw new AppError(404, "Variant not found");

    return prisma.foodVariant.update({
      where: { id },
      data: toVariantUpdate(data),
    });
  },
);

export const deleteVariant = catchServiceAsync(async (id: string) => {
  const variant = await prisma.foodVariant.findUnique({ where: { id } });
  if (!variant) throw new AppError(404, "Variant not found");

  return prisma.foodVariant.update({
    where: { id },
    data: { status: "deleted" },
  });
});
