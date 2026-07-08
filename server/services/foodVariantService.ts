import { PrismaClient, Prisma } from '@prisma/client';
import { catchServiceAsync } from '../utils/catchServiceAsync';

const prisma = new PrismaClient();

export const VariantService = {
  create: catchServiceAsync(async (foodId: string, data: Prisma.FoodVariantCreateInput) =>
    prisma.foodVariant.create({ data: { ...data, food: { connect: { id: foodId } } } }),
  ),

  update: catchServiceAsync(async (id: string, data: Prisma.FoodVariantUpdateInput) =>
    prisma.foodVariant.update({ where: { id }, data }),
  ),

  delete: catchServiceAsync(async (id: string) =>
    prisma.foodVariant.delete({ where: { id } }),
  ),
};
