import type { InferType } from "yup";
import type { FoodStatus, FoodType, Prisma } from "@prisma/client";
import type { createVendorFoodSchema } from "../validations/vendorFood.validation";
import AppError from "../utils/AppError";
import { catchServiceAsync } from "../utils/catchServiceAsync";
import prisma from "../lib/prisma";

type CreateVendorFoodInput = InferType<typeof createVendorFoodSchema>;

const stringArray = (value?: (string | undefined)[]) => value?.filter((x): x is string => Boolean(x)) ?? [];

const mapFoodType = (foodType?: string): FoodType =>
  (foodType === "EGG" ? "NON_VEG" : (foodType as FoodType)) || "NON_VEG";

export const createFood = catchServiceAsync(
  async (vendorId: string, data: CreateVendorFoodInput) => {
    const existing = await prisma.food.findUnique({ where: { slug: data.slug } });
    if (existing) throw new AppError(400, "A food with this slug already exists");

    const vendor = await prisma.vendor.findUnique({ where: { id: vendorId, deletedAt: null } });
    if (!vendor) throw new AppError(404, "Vendor not found");

    const foodCode = `FD-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;

    const tagNames = stringArray(data.tags);
    const tags = tagNames.length
      ? await prisma.foodTag.findMany({ where: { name: { in: tagNames } } })
      : [];

    const createData: Prisma.FoodUncheckedCreateInput = {
      categoryId: data.categoryId!,
      subCategoryId: data.subCategoryId,
      foodCode,
      name: data.name!,
      slug: data.slug!,
      shortDescription: data.shortDescription,
      description: data.fullDescription,
      thumbnail: data.thumbnail,
      coverImage: data.coverImage,
      preparationTime: data.preparationTime,
      calories: data.nutrition?.calories,
      protein: data.nutrition?.protein,
      fat: data.nutrition?.fat,
      carbohydrate: data.nutrition?.carbohydrate,
      fiber: data.nutrition?.fiber,
      sugar: data.nutrition?.sugar,
      sodium: data.nutrition?.sodium,
      servingSize: data.nutrition?.servingSize,
      foodType: mapFoodType(data.foodType as string),
      spiceLevel: data.spiceLevel,
      isFeatured: data.featured ?? false,
      isPopular: data.popular ?? false,
      isRecommended: data.recommended ?? false,
      status: "PENDING",
      variants: data.variants?.length
        ? {
            create: data.variants.map((v) => ({
              name: v.variantName!,
              price: v.price!,
              discountPrice: v.discountPrice,
              servingSize: v.servingSize,
            })),
          }
        : undefined,
      prices: {
        create: {
          basePrice: data.basePrice!,
          salePrice: data.discountPrice,
        },
      },
      ingredients: data.ingredients?.length
        ? {
            create: data.ingredients.map((i) => ({ ingredientName: i.name! })),
          }
        : undefined,
      allergens: data.allergens?.length
        ? {
            create: data.allergens.map((a) => ({ allergen: a.name! })),
          }
        : undefined,
      labels: data.labels?.length
        ? {
            create: stringArray(data.labels).map((label) => ({ label })),
          }
        : undefined,
      tagMappings: tags.length
        ? {
            create: tags.map((t) => ({ tagId: t.id })),
          }
        : undefined,
      images: data.galleryImages?.length
        ? {
            create: data.galleryImages
              .filter((g) => g.url?.trim())
              .map((g, i) => ({ image: g.url!, sortOrder: i })),
          }
        : undefined,
      availability: data.availableDays?.length || data.timeSlots?.start || data.timeSlots?.end
        ? {
            create: {
              isAvailable: data.available ?? true,
              availableDays: stringArray(data.availableDays),
              availableFrom: data.timeSlots?.start,
              availableTo: data.timeSlots?.end,
            },
          }
        : undefined,
      visibility: {
        create: {
          isVisible: data.visible ?? true,
          isFeatured: data.featured ?? false,
          isRecommended: data.recommended ?? false,
        },
      },
      vendorFoods: {
        create: {
          vendorId,
          status: "pending",
          statusHistories: {
            create: {
              oldStatus: null,
              newStatus: "PENDING",
              changedBy: vendorId,
              reason: "Vendor submitted food for approval",
            },
          },
        },
      },
      vendorFoodAssignments: {
        create: {
          vendorId,
          priority: 0,
          isDefault: true,
        },
      },
    };

    return prisma.food.create({
      data: createData,
      include: {
        category: { select: { id: true, name: true } },
        visibility: true,
        vendorFoods: {
          include: { statusHistories: { orderBy: { createdAt: "desc" }, take: 1 } },
        },
      },
    });
  },
);

const VENDOR_FOOD_LIST_INCLUDE = {
  food: {
    select: {
      id: true,
      name: true,
      slug: true,
      foodCode: true,
      thumbnail: true,
      coverImage: true,
      foodType: true,
      status: true,
      averageRating: true,
      totalReview: true,
      description: true,
      preparationTime: true,
      category: { select: { id: true, name: true } },
      subCategory: { select: { id: true, name: true } },
      prices: { where: { status: "active" }, orderBy: { createdAt: "desc" }, take: 1 },
    },
  },
} satisfies Prisma.VendorFoodInclude;

type VendorFoodListItem = Prisma.VendorFoodGetPayload<{
  include: typeof VENDOR_FOOD_LIST_INCLUDE;
}>;

const mapVendorFood = (vf: VendorFoodListItem) => ({
  id: vf.id,
  foodId: vf.foodId,
  name: vf.food.name,
  slug: vf.food.slug,
  foodCode: vf.food.foodCode,
  thumbnail: vf.food.thumbnail,
  coverImage: vf.food.coverImage,
  foodType: vf.food.foodType,
  category: vf.food.category,
  subCategory: vf.food.subCategory,
  description: vf.food.description,
  price: vf.food.prices[0]?.salePrice ?? vf.food.prices[0]?.basePrice ?? null,
  salePrice: vf.food.prices[0]?.salePrice ?? null,
  stock: null,
  preparationTime: vf.food.preparationTime,
  status: vf.food.status,
  averageRating: vf.food.averageRating,
  totalReview: vf.food.totalReview,
});

export const listFoods = catchServiceAsync(
  async (params: { vendorId: string; status?: string; search?: string }) => {
    const where: Prisma.VendorFoodWhereInput = { vendorId: params.vendorId, deletedAt: null };

    if (params.status) {
      where.food = { status: params.status as FoodStatus };
    }

    if (params.search) {
      where.food = {
        ...(where.food as Prisma.FoodWhereInput),
        OR: [
          { name: { contains: params.search, mode: "insensitive" } },
          { foodCode: { contains: params.search, mode: "insensitive" } },
        ],
      };
    }

    const items = await prisma.vendorFood.findMany({
      where,
      orderBy: { createdAt: "desc" },
      include: VENDOR_FOOD_LIST_INCLUDE,
    });

    return items.map(mapVendorFood);
  },
);

export const getFood = catchServiceAsync(async (vendorId: string, id: string) => {
  const vf = await prisma.vendorFood.findFirst({
    where: { id, vendorId, deletedAt: null },
    include: {
      food: {
        include: {
          category: { select: { id: true, name: true } },
          subCategory: { select: { id: true, name: true } },
          variants: true,
          addons: { include: { items: true } },
          ingredients: true,
          allergens: true,
          labels: true,
          availability: true,
          schedules: true,
          visibility: true,
          prices: { where: { status: "active" }, orderBy: { createdAt: "desc" }, take: 1 },
        },
      },
    },
  });

  if (!vf) throw new AppError(404, "Food not found for this vendor");

  const { food } = vf;
  return {
    id: vf.id,
    foodId: vf.foodId,
    name: food.name,
    slug: food.slug,
    foodCode: food.foodCode,
    thumbnail: food.thumbnail,
    coverImage: food.coverImage,
    foodType: food.foodType,
    spiceLevel: food.spiceLevel,
    description: food.description,
    shortDescription: food.shortDescription,
    category: food.category,
    subCategory: food.subCategory,
    price: food.prices[0]?.salePrice ?? food.prices[0]?.basePrice ?? null,
    salePrice: food.prices[0]?.salePrice ?? null,
    stock: null,
    preparationTime: food.preparationTime,
    status: food.status,
    averageRating: food.averageRating,
    totalReview: food.totalReview,
    variants: food.variants,
    addons: food.addons,
    ingredients: food.ingredients,
    allergens: food.allergens,
    labels: food.labels,
    availability: food.availability,
    schedules: food.schedules,
    visibility: food.visibility,
  };
});

export const updateFoodStatus = catchServiceAsync(
  async (vendorId: string, id: string, status: "ACTIVE" | "INACTIVE") => {
    const vf = await prisma.vendorFood.findFirst({
      where: { id, vendorId, deletedAt: null },
      select: {
        id: true,
        foodId: true,
        status: true,
        food: { select: { status: true } },
      },
    });

    if (!vf) throw new AppError(404, "Food not found for this vendor");
    if (vf.food.status !== "APPROVED") {
      throw new AppError(400, "Food must be approved by admin before changing availability");
    }

    const newStatus = status === "ACTIVE" ? "active" : "inactive";

    return prisma.$transaction([
      prisma.vendorFood.update({ where: { id: vf.id }, data: { status: newStatus } }),
      prisma.vendorFoodStatusHistory.create({
        data: {
          vendorFoodId: vf.id,
          oldStatus: vf.status,
          newStatus: newStatus.toUpperCase(),
          changedBy: vendorId,
          reason: `Vendor set food ${status.toLowerCase()}`,
        },
      }),
    ]);
  },
);

export const approveFood = catchServiceAsync(
  async (foodId: string, adminUserId: string) => {
    const food = await prisma.food.findFirst({
      where: { id: foodId, deletedAt: null },
      include: { vendorFoods: { where: { deletedAt: null } } },
    });

    if (!food) throw new AppError(404, "Food not found");
    if (food.status === "APPROVED") throw new AppError(400, "Food already approved");

    return prisma.$transaction([
      prisma.food.update({
        where: { id: foodId },
        data: { status: "APPROVED", approvedBy: adminUserId, approvedAt: new Date(), rejectionReason: null },
      }),
      ...food.vendorFoods.map((vf) =>
        prisma.vendorFoodStatusHistory.create({
          data: {
            vendorFoodId: vf.id,
            oldStatus: vf.status,
            newStatus: "APPROVED",
            changedBy: adminUserId,
            reason: "Food approved by admin",
          },
        }),
      ),
    ]);
  },
);

export const rejectFood = catchServiceAsync(
  async (foodId: string, adminUserId: string, reason: string) => {
    const food = await prisma.food.findFirst({
      where: { id: foodId, deletedAt: null },
      include: { vendorFoods: { where: { deletedAt: null } } },
    });

    if (!food) throw new AppError(404, "Food not found");
    if (food.status === "REJECTED") throw new AppError(400, "Food already rejected");

    return prisma.$transaction([
      prisma.food.update({
        where: { id: foodId },
        data: { status: "REJECTED", approvedBy: adminUserId, rejectionReason: reason },
      }),
      ...food.vendorFoods.map((vf) =>
        prisma.vendorFoodStatusHistory.create({
          data: {
            vendorFoodId: vf.id,
            oldStatus: vf.status,
            newStatus: "REJECTED",
            changedBy: adminUserId,
            reason,
          },
        }),
      ),
    ]);
  },
);

export const VendorFoodService = {
  createFood,
  listFoods,
  getFood,
  updateFoodStatus,
  approveFood,
  rejectFood,
};
