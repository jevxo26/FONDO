import type { Prisma } from "@prisma/client";
import AppError from "../utils/AppError";
import { catchServiceAsync } from "../utils/catchServiceAsync";
import prisma from "../lib/prisma";

const listFoods = catchServiceAsync(
  async (params: {
    page?: number;
    limit?: number;
    categoryId?: string;
    foodType?: string;
    spiceLevel?: string;
    dietType?: string;
    minPrice?: number;
    maxPrice?: number;
    search?: string;
    sortBy?: string;
    sortOrder?: "asc" | "desc";
  }) => {
    const page = params.page || 1;
    const limit = params.limit || 20;
    const skip = (page - 1) * limit;

    const where: Prisma.FoodWhereInput = { status: "active", deletedAt: null };

    if (params.categoryId) where.categoryId = params.categoryId;
    if (params.foodType) where.foodType = params.foodType as Prisma.FoodWhereInput["foodType"];
    if (params.spiceLevel) where.spiceLevel = params.spiceLevel;
    if (params.search) {
      where.OR = [
        { name: { contains: params.search, mode: "insensitive" } },
        { slug: { contains: params.search, mode: "insensitive" } },
      ];
    }
    if (params.dietType) {
      where.diets = { some: { dietType: params.dietType } };
    }

    const orderBy: Prisma.FoodOrderByWithRelationInput = {};
    if (params.sortBy === "price") {
      orderBy.variants = { _count: "asc" };
      orderBy.prices = { _count: "asc" };
    } else if (params.sortBy === "rating") {
      orderBy.rating = { averageRating: params.sortOrder || "desc" };
    } else if (params.sortBy === "popularity") {
      orderBy.isPopular = "desc";
    } else {
      orderBy.createdAt = params.sortOrder || "desc";
    }

    const [items, total] = await Promise.all([
      prisma.food.findMany({
        where,
        skip,
        take: limit,
        orderBy: Object.keys(orderBy).length > 0 ? orderBy : { createdAt: "desc" },
        include: {
          category: { select: { id: true, name: true, slug: true } },
          variants: { where: { status: "active" }, select: { id: true, name: true, price: true, discountPrice: true, servingSize: true } },
          addons: { where: { status: "active" }, include: { items: { where: { status: "active" } } } },
          rating: { select: { averageRating: true, totalReview: true } },
          labels: true,
          tagMappings: { include: { tag: { select: { name: true } } } },
          diets: { select: { dietType: true } },
          discounts: { where: { status: "active" }, take: 1 },
        },
      }),
      prisma.food.count({ where }),
    ]);

    const mapped = items.map((f) => ({
      id: f.id,
      name: f.name,
      slug: f.slug,
      shortDescription: f.shortDescription,
      thumbnail: f.thumbnail,
      coverImage: f.coverImage,
      foodType: f.foodType,
      spiceLevel: f.spiceLevel,
      preparationTime: f.preparationTime,
      calories: f.calories,
      protein: f.protein,
      fat: f.fat,
      carbohydrate: f.carbohydrate,
      servingSize: f.servingSize,
      isFeatured: f.isFeatured,
      isPopular: f.isPopular,
      isRecommended: f.isRecommended,
      category: f.category,
      variants: f.variants,
      addons: f.addons,
      rating: f.rating,
      labels: f.labels,
      tags: f.tagMappings.map((tm) => tm.tag),
      diets: f.diets,
      discount: f.discounts[0] || null,
    }));

    return { items: mapped, total, page, limit, totalPages: Math.ceil(total / limit) };
  },
);

const getFoodBySlug = catchServiceAsync(async (slug: string) => {
  const food = await prisma.food.findUnique({
    where: { slug, status: "active", deletedAt: null },
    include: {
      category: { select: { id: true, name: true, slug: true } },
      subCategory: { select: { id: true, name: true, slug: true } },
      gallery: { orderBy: { sortOrder: "asc" } },
      variants: { where: { status: "active" } },
      addons: { where: { status: "active" }, include: { items: { where: { status: "active" } } } },
      ingredients: true,
      nutrition: true,
      allergens: true,
      preparation: true,
      availability: true,
      schedules: true,
      prices: { where: { status: "active" }, orderBy: { effectiveFrom: "desc" }, take: 1 },
      discounts: { where: { status: "active" }, orderBy: { startDate: "desc" }, take: 1 },
      labels: true,
      rating: true,
      tagMappings: { include: { tag: { select: { id: true, name: true, slug: true } } } },
      diets: { select: { dietType: true } },
      images: { orderBy: { sortOrder: "asc" } },
    },
  });

  if (!food) throw new AppError(404, "Food not found");

  return {
    ...food,
    tags: food.tagMappings.map((tm) => tm.tag),
  };
});

const getFoodById = catchServiceAsync(async (id: string) => {
  const food = await prisma.food.findUnique({
    where: { id, status: "active", deletedAt: null },
    include: {
      category: { select: { id: true, name: true, slug: true } },
      variants: { where: { status: "active" } },
      addons: { where: { status: "active" }, include: { items: { where: { status: "active" } } } },
      rating: { select: { averageRating: true, totalReview: true } },
      labels: true,
      diets: { select: { dietType: true } },
    },
  });

  if (!food) throw new AppError(404, "Food not found");

  return food;
});

const listCategories = catchServiceAsync(async () => {
  return prisma.category.findMany({
    where: { status: "active", deletedAt: null },
    orderBy: { sortOrder: "asc" },
    include: {
      subCategories: { where: { status: "active", deletedAt: null }, orderBy: { sortOrder: "asc" } },
      _count: { select: { foods: { where: { status: "active", deletedAt: null } } } },
    },
  });
});

const getCategoryById = catchServiceAsync(async (id: string) => {
  const category = await prisma.category.findUnique({
    where: { id, status: "active", deletedAt: null },
    include: {
      subCategories: { where: { status: "active", deletedAt: null }, orderBy: { sortOrder: "asc" } },
      _count: { select: { foods: { where: { status: "active", deletedAt: null } } } },
    },
  });

  if (!category) throw new AppError(404, "Category not found");

  return category;
});

const listTags = catchServiceAsync(async () => {
  return prisma.foodTag.findMany({
    orderBy: { name: "asc" },
    include: {
      _count: { select: { tagMappings: true } },
    },
  });
});

const addFavorite = catchServiceAsync(async (userId: string, foodId: string) => {
  const food = await prisma.food.findUnique({ where: { id: foodId } });
  if (!food) throw new AppError(404, "Food not found");

  const existing = await prisma.foodFavorite.findFirst({
    where: { userId, foodId },
  });

  if (existing) return existing;

  return prisma.foodFavorite.create({
    data: { userId, foodId },
  });
});

const removeFavorite = catchServiceAsync(async (userId: string, foodId: string) => {
  const existing = await prisma.foodFavorite.findFirst({
    where: { userId, foodId },
  });

  if (!existing) throw new AppError(404, "Favorite not found");

  return prisma.foodFavorite.delete({
    where: { id: existing.id },
  });
});

const listFavorites = catchServiceAsync(async (userId: string) => {
  const favorites = await prisma.foodFavorite.findMany({
    where: { userId },
    include: {
      food: {
        include: {
          category: { select: { id: true, name: true, slug: true } },
          variants: { where: { status: "active" }, select: { id: true, name: true, price: true, discountPrice: true, servingSize: true } },
          addons: { where: { status: "active" }, include: { items: { where: { status: "active" } } } },
          rating: { select: { averageRating: true, totalReview: true } },
          labels: true,
          tagMappings: { include: { tag: { select: { name: true } } } },
          diets: { select: { dietType: true } },
          discounts: { where: { status: "active" }, take: 1 },
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });
  return favorites.map((f) => f.food);
});

const listReviews = catchServiceAsync(
  async (foodId: string, page: number = 1, limit: number = 20) => {
    const skip = (page - 1) * limit;

    const [items, total] = await Promise.all([
      prisma.foodReview.findMany({
        where: { foodId, status: "approved" },
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
        include: {
          customer: { select: { id: true, firstName: true, lastName: true, avatar: true } },
        },
      }),
      prisma.foodReview.count({ where: { foodId, status: "approved" } }),
    ]);

    return { items, total, page, limit, totalPages: Math.ceil(total / limit) };
  },
);

const createReview = catchServiceAsync(
  async (foodId: string, customerId: string, data: { rating: number; review?: string }) => {
    const food = await prisma.food.findUnique({ where: { id: foodId } });
    if (!food) throw new AppError(404, "Food not found");

    const review = await prisma.foodReview.create({
      data: {
        foodId,
        customerId,
        rating: data.rating,
        review: data.review,
        status: "approved",
      },
    });

    await updateFoodRating(foodId);

    return review;
  },
);

async function updateFoodRating(foodId: string) {
  const stats = await prisma.foodReview.aggregate({
    where: { foodId, status: "approved" },
    _avg: { rating: true },
    _count: true,
  });

  const starCounts = await prisma.foodReview.groupBy({
    by: ["rating"],
    where: { foodId, status: "approved" },
    _count: true,
  });

  const countMap: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  starCounts.forEach((s) => (countMap[s.rating] = s._count));

  await prisma.foodRating.upsert({
    where: { foodId },
    update: {
      averageRating: stats._avg.rating || 0,
      totalReview: stats._count,
      fiveStar: countMap[5],
      fourStar: countMap[4],
      threeStar: countMap[3],
      twoStar: countMap[2],
      oneStar: countMap[1],
    },
    create: {
      foodId,
      averageRating: stats._avg.rating || 0,
      totalReview: stats._count,
      fiveStar: countMap[5],
      fourStar: countMap[4],
      threeStar: countMap[3],
      twoStar: countMap[2],
      oneStar: countMap[1],
    },
  });
}

export const FoodService = {
  listFoods,
  getFoodBySlug,
  getFoodById,
  listCategories,
  getCategoryById,
  listTags,
  addFavorite,
  removeFavorite,
  listFavorites,
  listReviews,
  createReview,
};
