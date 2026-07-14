import type { InferType } from "yup";
import type { Prisma } from "@prisma/client";
import type {
  createFoodSchema, updateFoodSchema,
  createCategorySchema, updateCategorySchema,
  createSubCategorySchema, updateSubCategorySchema,
  createVariantSchema, updateVariantSchema,
  createAddonSchema, updateAddonSchema,
  createAddonItemSchema, updateAddonItemSchema,
  updateNutritionSchema,
  createIngredientSchema,
  createAllergenSchema,
  createPriceSchema,
  createDiscountSchema,
  createTagSchema,
  createLabelSchema,
  updateAvailabilitySchema,
  createScheduleSchema,
  updateVisibilitySchema,
} from "../validations/adminFood.validation";
import AppError from "../utils/AppError";
import { catchServiceAsync } from "../utils/catchServiceAsync";
import { toPrisma } from "../utils/prismaUtils";
import prisma from "../lib/prisma";

// ─── Food CRUD ─────────────────────────────────────────────

const createFood = catchServiceAsync(async (data: InferType<typeof createFoodSchema>) => {
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

const updateFood = catchServiceAsync(async (id: string, data: InferType<typeof updateFoodSchema>) => {
  const food = await prisma.food.findFirst({ where: { id, deletedAt: null } });
  if (!food) throw new AppError(404, "Food not found");

  if (data.slug) {
    const slugExists = await prisma.food.findFirst({
      where: { slug: data.slug, id: { not: id } },
    });
    if (slugExists) throw new AppError(400, "Another food already uses this slug");
  }

  return prisma.food.update({ where: { id }, data: toPrisma<Prisma.FoodUpdateInput>(data) });
});

const deleteFood = catchServiceAsync(async (id: string) => {
  const food = await prisma.food.findFirst({ where: { id, deletedAt: null } });
  if (!food) throw new AppError(404, "Food not found");

  return prisma.food.update({
    where: { id },
    data: toPrisma<Prisma.FoodUpdateInput>({ deletedAt: new Date(), status: "archived" }),
  });
});

// ─── Category CRUD ─────────────────────────────────────────

const createCategory = catchServiceAsync(async (data: InferType<typeof createCategorySchema>) => {
  const existing = await prisma.category.findUnique({ where: { slug: data.slug } });
  if (existing) throw new AppError(400, "A category with this slug already exists");

  return prisma.category.create({ data: toPrisma<Prisma.CategoryCreateInput>(data) });
});

const updateCategory = catchServiceAsync(async (id: string, data: InferType<typeof updateCategorySchema>) => {
  const cat = await prisma.category.findFirst({ where: { id, deletedAt: null } });
  if (!cat) throw new AppError(404, "Category not found");

  if (data.slug) {
    const slugExists = await prisma.category.findFirst({
      where: { slug: data.slug, id: { not: id } },
    });
    if (slugExists) throw new AppError(400, "Another category already uses this slug");
  }

  return prisma.category.update({ where: { id }, data: toPrisma<Prisma.CategoryUpdateInput>(data) });
});

const deleteCategory = catchServiceAsync(async (id: string) => {
  const cat = await prisma.category.findFirst({ where: { id, deletedAt: null } });
  if (!cat) throw new AppError(404, "Category not found");

  return prisma.category.update({
    where: { id },
    data: toPrisma<Prisma.CategoryUpdateInput>({ deletedAt: new Date(), status: "inactive" }),
  });
});

// ─── SubCategory CRUD ──────────────────────────────────────

const createSubCategory = catchServiceAsync(
  async (categoryId: string, data: InferType<typeof createSubCategorySchema>) => {
    const cat = await prisma.category.findFirst({ where: { id: categoryId, deletedAt: null } });
    if (!cat) throw new AppError(404, "Category not found");

    const existing = await prisma.subCategory.findUnique({ where: { slug: data.slug } });
    if (existing) throw new AppError(400, "A subcategory with this slug already exists");

    return prisma.subCategory.create({ data: toPrisma<Prisma.SubCategoryCreateInput>({ ...data, categoryId }) });
  },
);

const updateSubCategory = catchServiceAsync(async (id: string, data: InferType<typeof updateSubCategorySchema>) => {
  const sub = await prisma.subCategory.findFirst({ where: { id, deletedAt: null } });
  if (!sub) throw new AppError(404, "SubCategory not found");

  if (data.slug) {
    const slugExists = await prisma.subCategory.findFirst({
      where: { slug: data.slug, id: { not: id } },
    });
    if (slugExists) throw new AppError(400, "Another subcategory already uses this slug");
  }

  return prisma.subCategory.update({ where: { id }, data: toPrisma<Prisma.SubCategoryUpdateInput>(data) });
});

const deleteSubCategory = catchServiceAsync(async (id: string) => {
  const sub = await prisma.subCategory.findFirst({ where: { id, deletedAt: null } });
  if (!sub) throw new AppError(404, "SubCategory not found");

  return prisma.subCategory.update({
    where: { id },
    data: toPrisma<Prisma.SubCategoryUpdateInput>({ deletedAt: new Date(), status: "inactive" }),
  });
});

// ─── Variant CRUD ──────────────────────────────────────────

const createVariant = catchServiceAsync(
  async (foodId: string, data: InferType<typeof createVariantSchema>) => {
    const food = await prisma.food.findFirst({ where: { id: foodId, deletedAt: null } });
    if (!food) throw new AppError(404, "Food not found");

    return prisma.foodVariant.create({ data: toPrisma<Prisma.FoodVariantCreateInput>({ ...data, foodId }) });
  },
);

const updateVariant = catchServiceAsync(async (id: string, data: InferType<typeof updateVariantSchema>) => {
  const variant = await prisma.foodVariant.findUnique({ where: { id } });
  if (!variant) throw new AppError(404, "Variant not found");

  return prisma.foodVariant.update({ where: { id }, data: toPrisma<Prisma.FoodVariantUpdateInput>(data) });
});

const deleteVariant = catchServiceAsync(async (id: string) => {
  const variant = await prisma.foodVariant.findUnique({ where: { id } });
  if (!variant) throw new AppError(404, "Variant not found");

  return prisma.foodVariant.update({ where: { id }, data: toPrisma<Prisma.FoodVariantUpdateInput>({ status: "deleted" }) });
});

// ─── Addon CRUD ────────────────────────────────────────────

const createAddon = catchServiceAsync(
  async (foodId: string, data: InferType<typeof createAddonSchema>) => {
    const food = await prisma.food.findFirst({ where: { id: foodId, deletedAt: null } });
    if (!food) throw new AppError(404, "Food not found");

    return prisma.foodAddon.create({ data: toPrisma<Prisma.FoodAddonCreateInput>({ ...data, foodId }) });
  },
);

const updateAddon = catchServiceAsync(async (id: string, data: InferType<typeof updateAddonSchema>) => {
  const addon = await prisma.foodAddon.findUnique({ where: { id } });
  if (!addon) throw new AppError(404, "Addon group not found");

  return prisma.foodAddon.update({ where: { id }, data: toPrisma<Prisma.FoodAddonUpdateInput>(data) });
});

const deleteAddon = catchServiceAsync(async (id: string) => {
  const addon = await prisma.foodAddon.findUnique({ where: { id } });
  if (!addon) throw new AppError(404, "Addon group not found");

  await prisma.foodAddonItem.updateMany({
    where: { addonId: id },
    data: toPrisma<Prisma.FoodAddonItemUpdateInput>({ status: "deleted" }),
  });

  return prisma.foodAddon.update({ where: { id }, data: toPrisma<Prisma.FoodAddonUpdateInput>({ status: "deleted" }) });
});

// ─── Addon Item CRUD ───────────────────────────────────────

const createAddonItem = catchServiceAsync(
  async (addonId: string, data: InferType<typeof createAddonItemSchema>) => {
    const addon = await prisma.foodAddon.findUnique({ where: { id: addonId } });
    if (!addon) throw new AppError(404, "Addon group not found");

    return prisma.foodAddonItem.create({ data: toPrisma<Prisma.FoodAddonItemCreateInput>({ ...data, addonId }) });
  },
);

const updateAddonItem = catchServiceAsync(async (id: string, data: InferType<typeof updateAddonItemSchema>) => {
  const item = await prisma.foodAddonItem.findUnique({ where: { id } });
  if (!item) throw new AppError(404, "Addon item not found");

  return prisma.foodAddonItem.update({ where: { id }, data: toPrisma<Prisma.FoodAddonItemUpdateInput>(data) });
});

const deleteAddonItem = catchServiceAsync(async (id: string) => {
  const item = await prisma.foodAddonItem.findUnique({ where: { id } });
  if (!item) throw new AppError(404, "Addon item not found");

  return prisma.foodAddonItem.update({ where: { id }, data: toPrisma<Prisma.FoodAddonItemUpdateInput>({ status: "deleted" }) });
});

// ─── Nutrition ─────────────────────────────────────────────

const getNutrition = catchServiceAsync(async (foodId: string) => {
  const nutrition = await prisma.foodNutrition.findUnique({ where: { foodId } });
  if (!nutrition) throw new AppError(404, "Nutrition info not found");

  return nutrition;
});

const updateNutrition = catchServiceAsync(
  async (foodId: string, data: InferType<typeof updateNutritionSchema>) => {
    const food = await prisma.food.findFirst({ where: { id: foodId, deletedAt: null } });
    if (!food) throw new AppError(404, "Food not found");

    return prisma.foodNutrition.upsert({
      where: { foodId },
      update: toPrisma<Prisma.FoodNutritionUpdateInput>(data),
      create: toPrisma<Prisma.FoodNutritionCreateInput>({ foodId, ...data }),
    });
  },
);

// ─── Ingredients ───────────────────────────────────────────

const createIngredient = catchServiceAsync(
  async (foodId: string, data: InferType<typeof createIngredientSchema>) => {
    const food = await prisma.food.findFirst({ where: { id: foodId, deletedAt: null } });
    if (!food) throw new AppError(404, "Food not found");

    return prisma.foodIngredient.create({ data: toPrisma<Prisma.FoodIngredientCreateInput>({ ...data, foodId }) });
  },
);

const deleteIngredient = catchServiceAsync(async (id: string) => {
  const ing = await prisma.foodIngredient.findUnique({ where: { id } });
  if (!ing) throw new AppError(404, "Ingredient not found");

  return prisma.foodIngredient.delete({ where: { id } });
});

// ─── Allergens ─────────────────────────────────────────────

const createAllergen = catchServiceAsync(
  async (foodId: string, data: InferType<typeof createAllergenSchema>) => {
    const food = await prisma.food.findFirst({ where: { id: foodId, deletedAt: null } });
    if (!food) throw new AppError(404, "Food not found");

    return prisma.foodAllergen.create({ data: toPrisma<Prisma.FoodAllergenCreateInput>({ ...data, foodId }) });
  },
);

const deleteAllergen = catchServiceAsync(async (id: string) => {
  const allergen = await prisma.foodAllergen.findUnique({ where: { id } });
  if (!allergen) throw new AppError(404, "Allergen not found");

  return prisma.foodAllergen.delete({ where: { id } });
});

// ─── Prices ────────────────────────────────────────────────

const createPrice = catchServiceAsync(
  async (foodId: string, data: InferType<typeof createPriceSchema>) => {
    const food = await prisma.food.findFirst({ where: { id: foodId, deletedAt: null } });
    if (!food) throw new AppError(404, "Food not found");

    return prisma.foodPrice.create({ data: toPrisma<Prisma.FoodPriceCreateInput>({ ...data, foodId }) });
  },
);

// ─── Discounts ─────────────────────────────────────────────

const createDiscount = catchServiceAsync(
  async (foodId: string, data: InferType<typeof createDiscountSchema>) => {
    const food = await prisma.food.findFirst({ where: { id: foodId, deletedAt: null } });
    if (!food) throw new AppError(404, "Food not found");

    return prisma.foodDiscount.create({ data: toPrisma<Prisma.FoodDiscountCreateInput>({ ...data, foodId }) });
  },
);

const deleteDiscount = catchServiceAsync(async (id: string) => {
  const discount = await prisma.foodDiscount.findUnique({ where: { id } });
  if (!discount) throw new AppError(404, "Discount not found");

  return prisma.foodDiscount.update({ where: { id }, data: toPrisma<Prisma.FoodDiscountUpdateInput>({ status: "inactive" }) });
});

// ─── Tags ──────────────────────────────────────────────────

const addFoodTags = catchServiceAsync(
  async (foodId: string, tagIds: string[]) => {
    const food = await prisma.food.findFirst({ where: { id: foodId, deletedAt: null } });
    if (!food) throw new AppError(404, "Food not found");

    const existing = await prisma.foodTagMapping.findMany({
      where: { foodId, tagId: { in: tagIds } },
    });
    const existingTagIds = new Set(existing.map((e) => e.tagId));
    const newTagIds = tagIds.filter((t) => !existingTagIds.has(t));

    if (newTagIds.length === 0) return { count: 0 };

    await prisma.foodTagMapping.createMany({
      data: newTagIds.map((tagId) => ({ foodId, tagId })),
    });

    return { count: newTagIds.length };
  },
);

const removeFoodTag = catchServiceAsync(async (foodId: string, tagId: string) => {
  const mapping = await prisma.foodTagMapping.findFirst({
    where: { foodId, tagId },
  });
  if (!mapping) throw new AppError(404, "Tag mapping not found");

  return prisma.foodTagMapping.delete({ where: { id: mapping.id } });
});

const createTag = catchServiceAsync(async (data: InferType<typeof createTagSchema>) => {
  const existing = await prisma.foodTag.findUnique({ where: { slug: data.slug } });
  if (existing) throw new AppError(400, "A tag with this slug already exists");

  return prisma.foodTag.create({ data: toPrisma<Prisma.FoodTagCreateInput>(data) });
});

// ─── Labels ────────────────────────────────────────────────

const createLabel = catchServiceAsync(
  async (foodId: string, data: InferType<typeof createLabelSchema>) => {
    const food = await prisma.food.findFirst({ where: { id: foodId, deletedAt: null } });
    if (!food) throw new AppError(404, "Food not found");

    return prisma.foodLabel.create({ data: toPrisma<Prisma.FoodLabelCreateInput>({ ...data, foodId }) });
  },
);

const deleteLabel = catchServiceAsync(async (id: string) => {
  const label = await prisma.foodLabel.findUnique({ where: { id } });
  if (!label) throw new AppError(404, "Label not found");

  return prisma.foodLabel.delete({ where: { id } });
});

// ─── Availability ──────────────────────────────────────────

const updateAvailability = catchServiceAsync(
  async (foodId: string, data: InferType<typeof updateAvailabilitySchema>) => {
    const food = await prisma.food.findFirst({ where: { id: foodId, deletedAt: null } });
    if (!food) throw new AppError(404, "Food not found");

    return prisma.foodAvailability.upsert({
      where: { foodId },
      update: toPrisma<Prisma.FoodAvailabilityUpdateInput>(data),
      create: toPrisma<Prisma.FoodAvailabilityCreateInput>({ foodId, ...data }),
    });
  },
);

// ─── Schedule ──────────────────────────────────────────────

const createSchedule = catchServiceAsync(
  async (foodId: string, data: InferType<typeof createScheduleSchema>) => {
    const food = await prisma.food.findFirst({ where: { id: foodId, deletedAt: null } });
    if (!food) throw new AppError(404, "Food not found");

    return prisma.foodSchedule.create({ data: toPrisma<Prisma.FoodScheduleCreateInput>({ ...data, foodId }) });
  },
);

const deleteSchedule = catchServiceAsync(async (id: string) => {
  const schedule = await prisma.foodSchedule.findUnique({ where: { id } });
  if (!schedule) throw new AppError(404, "Schedule not found");

  return prisma.foodSchedule.update({ where: { id }, data: toPrisma<Prisma.FoodScheduleUpdateInput>({ status: "deleted" }) });
});

// ─── Visibility ────────────────────────────────────────────

const updateVisibility = catchServiceAsync(
  async (foodId: string, data: InferType<typeof updateVisibilitySchema>) => {
    const food = await prisma.food.findFirst({ where: { id: foodId, deletedAt: null } });
    if (!food) throw new AppError(404, "Food not found");

    return prisma.foodVisibility.upsert({
      where: { foodId },
      update: toPrisma<Prisma.FoodVisibilityUpdateInput>(data),
      create: toPrisma<Prisma.FoodVisibilityCreateInput>({ foodId, ...data }),
    });
  },
);

export const AdminFoodService = {
  createFood, updateFood, deleteFood,
  createCategory, updateCategory, deleteCategory,
  createSubCategory, updateSubCategory, deleteSubCategory,
  createVariant, updateVariant, deleteVariant,
  createAddon, updateAddon, deleteAddon,
  createAddonItem, updateAddonItem, deleteAddonItem,
  getNutrition, updateNutrition,
  createIngredient, deleteIngredient,
  createAllergen, deleteAllergen,
  createPrice,
  createDiscount, deleteDiscount,
  addFoodTags, removeFoodTag, createTag,
  createLabel, deleteLabel,
  updateAvailability,
  createSchedule, deleteSchedule,
  updateVisibility,
};
