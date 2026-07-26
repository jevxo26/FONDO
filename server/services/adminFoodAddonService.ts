import type { InferType } from "yup";
import type { Prisma } from "@prisma/client";
import type {
  createAddonSchema, updateAddonSchema,
  createAddonItemSchema, updateAddonItemSchema,
} from "../validations/adminFood.validation";
import AppError from "../utils/AppError";
import { catchServiceAsync } from "../utils/catchServiceAsync";
import prisma from "../lib/prisma";

export const createAddon = catchServiceAsync(
  async (foodId: string, data: InferType<typeof createAddonSchema>) => {
    const food = await prisma.food.findFirst({ where: { id: foodId, deletedAt: null } });
    if (!food) throw new AppError(404, "Food not found");

    return prisma.foodAddon.create({ data: { ...data, foodId } as unknown as Prisma.FoodAddonCreateInput });
  },
);

export const updateAddon = catchServiceAsync(async (id: string, data: InferType<typeof updateAddonSchema>) => {
  const addon = await prisma.foodAddon.findUnique({ where: { id } });
  if (!addon) throw new AppError(404, "Addon group not found");

  return prisma.foodAddon.update({ where: { id }, data: data as unknown as Prisma.FoodAddonUpdateInput });
});

export const deleteAddon = catchServiceAsync(async (id: string) => {
  const addon = await prisma.foodAddon.findUnique({ where: { id } });
  if (!addon) throw new AppError(404, "Addon group not found");

  await prisma.foodAddonItem.updateMany({
    where: { addonId: id },
    data: { status: "deleted" } as unknown as Prisma.FoodAddonItemUpdateInput,
  });

  return prisma.foodAddon.update({ where: { id }, data: { status: "deleted" } as unknown as Prisma.FoodAddonUpdateInput });
});

export const createAddonItem = catchServiceAsync(
  async (addonId: string, data: InferType<typeof createAddonItemSchema>) => {
    const addon = await prisma.foodAddon.findUnique({ where: { id: addonId } });
    if (!addon) throw new AppError(404, "Addon group not found");

    return prisma.foodAddonItem.create({ data: { ...data, addonId } as unknown as Prisma.FoodAddonItemCreateInput });
  },
);

export const updateAddonItem = catchServiceAsync(async (id: string, data: InferType<typeof updateAddonItemSchema>) => {
  const item = await prisma.foodAddonItem.findUnique({ where: { id } });
  if (!item) throw new AppError(404, "Addon item not found");

  return prisma.foodAddonItem.update({ where: { id }, data: data as unknown as Prisma.FoodAddonItemUpdateInput });
});

export const deleteAddonItem = catchServiceAsync(async (id: string) => {
  const item = await prisma.foodAddonItem.findUnique({ where: { id } });
  if (!item) throw new AppError(404, "Addon item not found");

  return prisma.foodAddonItem.update({ where: { id }, data: { status: "deleted" } as unknown as Prisma.FoodAddonItemUpdateInput });
});


