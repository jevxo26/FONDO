import { PrismaClient, Prisma } from '@prisma/client';
import { catchServiceAsync } from '../utils/catchServiceAsync';

const prisma = new PrismaClient();

export const AddonService = {
  create: catchServiceAsync(async (foodId: string, data: Prisma.FoodAddonCreateInput) =>
    prisma.foodAddon.create({
      data: { ...data, food: { connect: { id: foodId } } },
      include: { items: true },
    }),
  ),

  update: catchServiceAsync(async (id: string, data: Prisma.FoodAddonUpdateInput) =>
    prisma.foodAddon.update({ where: { id }, data, include: { items: true } }),
  ),

  delete: catchServiceAsync(async (id: string) =>
    prisma.foodAddon.delete({ where: { id } }),
  ),

  createItem: catchServiceAsync(async (addonId: string, data: Prisma.FoodAddonItemCreateInput) =>
    prisma.foodAddonItem.create({ data: { ...data, addon: { connect: { id: addonId } } } }),
  ),

  updateItem: catchServiceAsync(async (id: string, data: Prisma.FoodAddonItemUpdateInput) =>
    prisma.foodAddonItem.update({ where: { id }, data }),
  ),

  deleteItem: catchServiceAsync(async (id: string) =>
    prisma.foodAddonItem.delete({ where: { id } }),
  ),
};
