import { PrismaClient, Prisma } from '@prisma/client';
import { catchServiceAsync } from '../utils/catchServiceAsync';

const prisma = new PrismaClient();

export const CategoryService = {
  getAll: catchServiceAsync(async () =>
    prisma.category.findMany({
      where: { deletedAt: null },
      orderBy: { sortOrder: 'asc' },
      include: { subCategories: { where: { deletedAt: null } } },
    }),
  ),

  getBySlug: catchServiceAsync(async (slug: string) =>
    prisma.category.findFirstOrThrow({
      where: { slug, deletedAt: null },
      include: {
        subCategories: { where: { deletedAt: null } },
        foods: { where: { deletedAt: null }, take: 10 },
      },
    }),
  ),

  create: catchServiceAsync(async (data: Prisma.CategoryCreateInput) =>
    prisma.category.create({ data }),
  ),

  update: catchServiceAsync(async (id: string, data: Prisma.CategoryUpdateInput) =>
    prisma.category.update({ where: { id }, data }),
  ),

  delete: catchServiceAsync(async (id: string) =>
    prisma.category.update({ where: { id }, data: { deletedAt: new Date() } }),
  ),
};
