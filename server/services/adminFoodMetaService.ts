import type { InferType } from "yup";
import type { Prisma } from "@prisma/client";
import type {
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
import prisma from "../lib/prisma";

export const getNutrition = catchServiceAsync(async (foodId: string) => {
  const nutrition = await prisma.foodNutrition.findUnique({ where: { foodId } });
  if (!nutrition) throw new AppError(404, "Nutrition info not found");

  return nutrition;
});

export const updateNutrition = catchServiceAsync(
  async (foodId: string, data: InferType<typeof updateNutritionSchema>) => {
    const food = await prisma.food.findFirst({ where: { id: foodId, deletedAt: null } });
    if (!food) throw new AppError(404, "Food not found");

    return prisma.foodNutrition.upsert({
      where: { foodId },
      update: data as unknown as Prisma.FoodNutritionUpdateInput,
      create: { foodId, ...data } as unknown as Prisma.FoodNutritionCreateInput,
    });
  },
);

export const createIngredient = catchServiceAsync(
  async (foodId: string, data: InferType<typeof createIngredientSchema>) => {
    const food = await prisma.food.findFirst({ where: { id: foodId, deletedAt: null } });
    if (!food) throw new AppError(404, "Food not found");

    return prisma.foodIngredient.create({ data: { ...data, foodId } as unknown as Prisma.FoodIngredientCreateInput });
  },
);

export const deleteIngredient = catchServiceAsync(async (id: string) => {
  const ing = await prisma.foodIngredient.findUnique({ where: { id } });
  if (!ing) throw new AppError(404, "Ingredient not found");

  return prisma.foodIngredient.delete({ where: { id } });
});

export const createAllergen = catchServiceAsync(
  async (foodId: string, data: InferType<typeof createAllergenSchema>) => {
    const food = await prisma.food.findFirst({ where: { id: foodId, deletedAt: null } });
    if (!food) throw new AppError(404, "Food not found");

    return prisma.foodAllergen.create({ data: { ...data, foodId } as unknown as Prisma.FoodAllergenCreateInput });
  },
);

export const deleteAllergen = catchServiceAsync(async (id: string) => {
  const allergen = await prisma.foodAllergen.findUnique({ where: { id } });
  if (!allergen) throw new AppError(404, "Allergen not found");

  return prisma.foodAllergen.delete({ where: { id } });
});

export const createPrice = catchServiceAsync(
  async (foodId: string, data: InferType<typeof createPriceSchema>) => {
    const food = await prisma.food.findFirst({ where: { id: foodId, deletedAt: null } });
    if (!food) throw new AppError(404, "Food not found");

    return prisma.foodPrice.create({ data: { ...data, foodId } as unknown as Prisma.FoodPriceCreateInput });
  },
);

export const createDiscount = catchServiceAsync(
  async (foodId: string, data: InferType<typeof createDiscountSchema>) => {
    const food = await prisma.food.findFirst({ where: { id: foodId, deletedAt: null } });
    if (!food) throw new AppError(404, "Food not found");

    return prisma.foodDiscount.create({ data: { ...data, foodId } as unknown as Prisma.FoodDiscountCreateInput });
  },
);

export const deleteDiscount = catchServiceAsync(async (id: string) => {
  const discount = await prisma.foodDiscount.findUnique({ where: { id } });
  if (!discount) throw new AppError(404, "Discount not found");

  return prisma.foodDiscount.update({ where: { id }, data: { status: "inactive" } as unknown as Prisma.FoodDiscountUpdateInput });
});

export const addFoodTags = catchServiceAsync(
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

export const removeFoodTag = catchServiceAsync(async (foodId: string, tagId: string) => {
  const mapping = await prisma.foodTagMapping.findFirst({
    where: { foodId, tagId },
  });
  if (!mapping) throw new AppError(404, "Tag mapping not found");

  return prisma.foodTagMapping.delete({ where: { id: mapping.id } });
});

export const createTag = catchServiceAsync(async (data: InferType<typeof createTagSchema>) => {
  const existing = await prisma.foodTag.findUnique({ where: { slug: data.slug } });
  if (existing) throw new AppError(400, "A tag with this slug already exists");

  return prisma.foodTag.create({ data: data as unknown as Prisma.FoodTagCreateInput });
});

export const createLabel = catchServiceAsync(
  async (foodId: string, data: InferType<typeof createLabelSchema>) => {
    const food = await prisma.food.findFirst({ where: { id: foodId, deletedAt: null } });
    if (!food) throw new AppError(404, "Food not found");

    return prisma.foodLabel.create({ data: { ...data, foodId } as unknown as Prisma.FoodLabelCreateInput });
  },
);

export const deleteLabel = catchServiceAsync(async (id: string) => {
  const label = await prisma.foodLabel.findUnique({ where: { id } });
  if (!label) throw new AppError(404, "Label not found");

  return prisma.foodLabel.delete({ where: { id } });
});

export const updateAvailability = catchServiceAsync(
  async (foodId: string, data: InferType<typeof updateAvailabilitySchema>) => {
    const food = await prisma.food.findFirst({ where: { id: foodId, deletedAt: null } });
    if (!food) throw new AppError(404, "Food not found");

    return prisma.foodAvailability.upsert({
      where: { foodId },
      update: data as unknown as Prisma.FoodAvailabilityUpdateInput,
      create: { foodId, ...data } as unknown as Prisma.FoodAvailabilityCreateInput,
    });
  },
);

export const createSchedule = catchServiceAsync(
  async (foodId: string, data: InferType<typeof createScheduleSchema>) => {
    const food = await prisma.food.findFirst({ where: { id: foodId, deletedAt: null } });
    if (!food) throw new AppError(404, "Food not found");

    return prisma.foodSchedule.create({ data: { ...data, foodId } as unknown as Prisma.FoodScheduleCreateInput });
  },
);

export const deleteSchedule = catchServiceAsync(async (id: string) => {
  const schedule = await prisma.foodSchedule.findUnique({ where: { id } });
  if (!schedule) throw new AppError(404, "Schedule not found");

  return prisma.foodSchedule.update({ where: { id }, data: { status: "deleted" } as unknown as Prisma.FoodScheduleUpdateInput });
});

export const updateVisibility = catchServiceAsync(
  async (foodId: string, data: InferType<typeof updateVisibilitySchema>) => {
    const food = await prisma.food.findFirst({ where: { id: foodId, deletedAt: null } });
    if (!food) throw new AppError(404, "Food not found");

    return prisma.foodVisibility.upsert({
      where: { foodId },
      update: data as unknown as Prisma.FoodVisibilityUpdateInput,
      create: { foodId, ...data } as unknown as Prisma.FoodVisibilityCreateInput,
    });
  },
);


