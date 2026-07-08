import { PrismaClient, Prisma } from '@prisma/client';
import { catchServiceAsync } from '../utils/catchServiceAsync';

const prisma = new PrismaClient();

type Pagination = { page: number; limit: number };
type FoodFilters = {
  search?: string;
  categoryId?: string;
  foodType?: string;
  isFeatured?: boolean;
  isPopular?: boolean;
  isRecommended?: boolean;
  status?: string;
  minPrice?: number;
  maxPrice?: number;
  tags?: string[];
  dietTypes?: string[];
};

const buildWhere = (f: FoodFilters): Prisma.FoodWhereInput => {
  const where: Prisma.FoodWhereInput = { deletedAt: null };
  if (f.search) {
    where.OR = [
      { name: { contains: f.search, mode: 'insensitive' } },
      { shortDescription: { contains: f.search, mode: 'insensitive' } },
    ];
  }
  if (f.categoryId) where.categoryId = f.categoryId;
  if (f.foodType) where.foodType = f.foodType as any;
  if (f.status) where.status = f.status;
  if (f.isFeatured !== undefined) where.isFeatured = f.isFeatured;
  if (f.isPopular !== undefined) where.isPopular = f.isPopular;
  if (f.isRecommended !== undefined) where.isRecommended = f.isRecommended;
  if (f.minPrice !== undefined || f.maxPrice !== undefined) {
    where.prices = {
      some: {
        status: 'ACTIVE',
        ...(f.minPrice !== undefined && { basePrice: { gte: f.minPrice } }),
        ...(f.maxPrice !== undefined && { basePrice: { lte: f.maxPrice } }),
      },
    };
  }
  if (f.tags?.length) where.tagMappings = { some: { tag: { slug: { in: f.tags } } } };
  if (f.dietTypes?.length) where.diets = { some: { dietType: { in: f.dietTypes } } };
  return where;
};

const include = {
  category: true,
  subCategory: true,
  variants: { where: { status: 'ACTIVE' } },
  addons: { where: { status: 'ACTIVE' }, include: { items: { where: { status: 'ACTIVE' } } } },
  nutrition: true,
  ingredients: true,
  allergens: true,
  schedules: { where: { status: 'ACTIVE' } },
  prices: { where: { status: 'ACTIVE' }, orderBy: { effectiveFrom: 'desc' as const } },
  discounts: { where: { status: 'ACTIVE' } },
  tagMappings: { include: { tag: true } },
  labels: true,
  diets: true,
};

const listInclude = {
  category: true,
  prices: { where: { status: 'ACTIVE' }, orderBy: { effectiveFrom: 'desc' as const }, take: 1 },
  tagMappings: { include: { tag: true } },
  labels: true,
  diets: true,
};

export const FoodService = {
  getAll: catchServiceAsync(async (filters: FoodFilters, pagination: Pagination) => {
    const where = buildWhere(filters);
    const { page = 1, limit = 20 } = pagination;
    const [foods, total] = await Promise.all([
      prisma.food.findMany({
        where, skip: (page - 1) * limit, take: limit,
        orderBy: { createdAt: 'desc' }, include: listInclude,
      }),
      prisma.food.count({ where }),
    ]);
    return { foods, total, page, limit, totalPages: Math.ceil(total / limit) };
  }),

  getBySlug: catchServiceAsync(async (slug: string) =>
    prisma.food.findFirstOrThrow({ where: { slug, deletedAt: null }, include }),
  ),

  getById: catchServiceAsync(async (id: string) =>
    prisma.food.findFirstOrThrow({ where: { id, deletedAt: null }, include }),
  ),

  create: catchServiceAsync(async (data: Prisma.FoodCreateInput) =>
    prisma.food.create({ data, include }),
  ),

  update: catchServiceAsync(async (id: string, data: Prisma.FoodUpdateInput) =>
    prisma.food.update({ where: { id }, data, include }),
  ),

  delete: catchServiceAsync(async (id: string) =>
    prisma.food.update({ where: { id }, data: { deletedAt: new Date() } }),
  ),
};
