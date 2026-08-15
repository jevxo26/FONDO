import type { Prisma } from "@prisma/client";
import AppError from "../utils/AppError";
import { catchServiceAsync } from "../utils/catchServiceAsync";
import prisma from "../lib/prisma";

const FOOD_STATUS_MAP: Record<string, string> = {
  pending: "PENDING",
  approved: "APPROVED",
  rejected: "REJECTED",
};

function mapStatus(status: string): string {
  return FOOD_STATUS_MAP[status.toLowerCase()] ?? status.toUpperCase();
}

interface AdminFoodListParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  categoryId?: string;
  foodType?: string;
  spiceLevel?: string;
  featured?: string;
  popular?: string;
}

export const listAdminFoods = catchServiceAsync(
  async (params: AdminFoodListParams) => {
    const page = Number(params.page) || 1;
    const limit = params.limit ? Number(params.limit) : undefined;
    const skip = limit ? (page - 1) * limit : undefined;

    const where: Prisma.FoodWhereInput = { deletedAt: null };

    if (params.status) {
      const s = params.status.toUpperCase();
      if (!["PENDING", "APPROVED", "REJECTED"].includes(s)) {
        throw new AppError(400, "Invalid food status filter");
      }
      where.status = s as Prisma.FoodWhereInput["status"];
    }
    if (params.categoryId) where.categoryId = params.categoryId;
    if (params.foodType) where.foodType = params.foodType as Prisma.FoodWhereInput["foodType"];
    if (params.spiceLevel) where.spiceLevel = params.spiceLevel;
    if (params.featured === "true") where.isFeatured = true;
    if (params.popular === "true") where.isPopular = true;
    if (params.search) {
      where.OR = [
        { name: { contains: params.search, mode: "insensitive" } },
        { slug: { contains: params.search, mode: "insensitive" } },
        { foodCode: { contains: params.search, mode: "insensitive" } },
      ];
    }

    const [items, total] = await Promise.all([
      prisma.food.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
        include: {
          category: { select: { id: true, name: true, slug: true } },
          subCategory: { select: { id: true, name: true, slug: true } },
          variants: {
            where: { status: "active" },
            select: {
              id: true,
              name: true,
              price: true,
              discountPrice: true,
              servingSize: true,
            },
            take: 1,
          },
          labels: true,
          tagMappings: { include: { tag: { select: { id: true, name: true, slug: true } } } },
          discounts: { where: { status: "active" }, take: 1 },
          prices: { where: { status: "active" }, orderBy: { effectiveFrom: "desc" }, take: 1 },
          vendorFoods: {
            where: { deletedAt: null },
            select: { vendor: { select: { id: true, businessName: true } } },
            take: 3,
          },
        },
      }),
      prisma.food.count({ where }),
    ]);

    const mapped = items.map((f) => ({
      id: f.id,
      foodCode: f.foodCode,
      name: f.name,
      slug: f.slug,
      thumbnail: f.thumbnail,
      coverImage: f.coverImage,
      category: f.category,
      subCategory: f.subCategory,
      vendors: f.vendorFoods.map((vf) => vf.vendor).filter((v) => v !== null),
      foodType: f.foodType,
      spiceLevel: f.spiceLevel,
      basePrice: f.prices[0]
        ? Number(f.prices[0].basePrice)
        : f.variants[0]
          ? Number(f.variants[0].price)
          : null,
      preparationTime: f.preparationTime,
      status: mapStatus(f.status),
      isFeatured: f.isFeatured,
      isPopular: f.isPopular,
      isRecommended: f.isRecommended,
      averageRating: f.averageRating,
      totalReview: f.totalReview,
      labels: f.labels,
      tags: f.tagMappings.map((tm) => tm.tag),
      discount: f.discounts[0] || null,
      createdAt: f.createdAt,
    }));

    return {
      items: mapped,
      total,
      page: limit ? page : 1,
      limit: limit ?? total,
      totalPages: limit ? Math.ceil(total / limit) : 1,
    };
  },
);

export const getAdminFoodById = catchServiceAsync(async (id: string) => {
  const food = await prisma.food.findFirst({
    where: { id, deletedAt: null },
    include: {
      category: { select: { id: true, name: true, slug: true } },
      subCategory: { select: { id: true, name: true, slug: true } },
      images: { orderBy: { sortOrder: "asc" } },
      variants: { where: { status: { not: "deleted" } }, orderBy: { createdAt: "asc" } },
      addons: {
        where: { status: { not: "deleted" } },
        orderBy: { createdAt: "asc" },
        include: { items: { where: { status: { not: "deleted" } } } },
      },
      ingredients: true,
      allergens: true,
      preparation: true,
      availability: true,
      schedules: { where: { status: { not: "deleted" } } },
      prices: { orderBy: { effectiveFrom: "desc" }, take: 20 },
      discounts: { where: { status: "active" }, orderBy: { startDate: "desc" } },
      labels: true,
      tagMappings: { include: { tag: { select: { id: true, name: true, slug: true } } } },
      diets: true,
      visibility: true,
      vendorFoods: {
        where: { deletedAt: null },
        select: { vendor: { select: { id: true, businessName: true } } },
      },
      _count: { select: { reviews: true, favorites: true } },
    },
  });

  if (!food) throw new AppError(404, "Food not found");

  return {
    ...food,
    tags: food.tagMappings.map((tm) => tm.tag),
    vendors: food.vendorFoods.map((vf) => vf.vendor).filter((v) => v !== null),
  };
});

export const listAdminCategories = catchServiceAsync(async () => {
  return prisma.category.findMany({
    where: { deletedAt: null },
    orderBy: { sortOrder: "asc" },
    include: {
      subCategories: {
        where: { deletedAt: null },
        orderBy: { sortOrder: "asc" },
      },
      _count: { select: { foods: { where: { deletedAt: null } } } },
    },
  });
});

export const listAdminTags = catchServiceAsync(async () => {
  return prisma.foodTag.findMany({
    orderBy: { name: "asc" },
    include: { _count: { select: { tagMappings: true } } },
  });
});
