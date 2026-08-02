import { Prisma, MealType } from "@prisma/client";
import prisma from "../lib/prisma";

interface PackageQuery {
  categoryId?: string;
  packageType?: string;
  search?: string;
}

interface FoodInput {
  foodId: string;
  quantity: number;
}

interface MealInput {
  mealType: MealType;
  mealTime: string;
  foods: FoodInput[];
}

interface DayInput {
  dayNumber: number;
  title?: string | null;
  description?: string | null;
  meals: MealInput[];
}

interface VendorPackageInput {
  packageCode: string;
  name: string;
  slug: string;
  description: string;
  thumbnail: string;
  coverImage: string;
  packageType: string;
  durationDays: number;
  totalMeals: number;
  price: number;
  discountPrice?: number;
  currency: string;
  isCustomizable: boolean;
  status: string;
  packageCategoryId: string;
  days: DayInput[];
}

interface CustomMealFoodInput {
  foodId: string;
  quantity?: number;
  isExtra?: boolean;
}

interface CustomMealInput {
  mealType: MealType;
  mealTime?: string | null;
  foods: CustomMealFoodInput[];
}

interface CustomMealDayInput {
  dayNumber: number;
  meals: CustomMealInput[];
}

interface CustomMealRequestInput {
  packageId?: string;
  name: string;
  totalDays: number;
  totalPrice: number;
  days: CustomMealDayInput[];
}

interface CreateReviewInput {
  rating: number;
  review?: string;
  orderId?: string;
}

interface UpdateReviewInput {
  rating?: number;
  review?: string;
}

const getAllPackages = async (query: PackageQuery) => {
  const { categoryId, packageType, search } = query;
  return await prisma.package.findMany({
    where: {
      status: "active",
      packageCategoryId: categoryId || undefined,
      packageType: packageType || undefined,
      name: search ? { contains: search, mode: "insensitive" } : undefined,
    },
    include: {
      packageCategory: true,
      prices: true,
      rating: true,
      images: true,
      days: {
        include: {
          meals: {
            include: {
              foods: {
                include: {
                  food: true,
                },
              },
            },
          },
        },
      },
    },
  });
};

const getPackageById = async (id: string) => {
  return await prisma.package.findUnique({
    where: { id },
    include: {
      packageCategory: true,
      days: {
        include: {
          meals: {
            include: { foods: { include: { food: true } } },
          },
        },
      },
      prices: true,
      rule: true,
      benefits: true,
      nutrition: true,
      schedule: true,
      images: true,
      tags: true,
      rating: true,
      reviews: {
        where: { status: "approved" }, // Only include approved reviews publicly
        orderBy: { createdAt: "desc" },
        take: 10,
      },
      customization: true,
      availability: true,
    },
  });
};

const createVendorPackage = async (vendorId: string, data: VendorPackageInput) => {
  return await prisma.package.create({
    data: {
      packageCode: data.packageCode,
      name: data.name,
      slug: data.slug,
      description: data.description,
      thumbnail: data.thumbnail,
      coverImage: data.coverImage,
      packageType: data.packageType,
      durationDays: data.durationDays,
      totalMeals: data.totalMeals,
      price: data.price,
      discountPrice: data.discountPrice,
      currency: data.currency,
      isCustomizable: data.isCustomizable,
      status: data.status,

      packageCategory: {
        connect: {
          id: data.packageCategoryId,
        },
      },

      days: {
        create: data.days.map((day: DayInput) => ({
          dayNumber: day.dayNumber,
          title: day.title,
          description: day.description,

          meals: {
            create: day.meals.map((meal: MealInput) => ({
              mealType: meal.mealType,
              mealTime: meal.mealTime,

              foods: {
                create: meal.foods.map((food: FoodInput) => ({
                  foodId: food.foodId,
                  quantity: food.quantity,
                })),
              },
            })),
          },
        })),
      },
    },
  });
};

const createCustomMealRequest = async (customerId: string, data: CustomMealRequestInput) => {
  const { packageId, name, totalDays, totalPrice, days } = data;

  return await prisma.customMealPlan.create({
    data: {
      customerId,
      packageId,
      name,
      totalDays,
      totalPrice,
      vendorApprovalStatus: "pending",
      paymentStatus: "pending",
      days: {
        create: days.map((day: CustomMealDayInput) => ({
          dayNumber: day.dayNumber,
          meals: {
            create: day.meals.map((meal: CustomMealInput) => ({
              mealType: meal.mealType,
              mealTime: meal.mealTime,
              foods: {
                create: meal.foods.map((food: CustomMealFoodInput) => ({
                  foodId: food.foodId,
                  quantity: food.quantity || 1,
                  isExtra: food.isExtra || false,
                })),
              },
            })),
          },
        })),
      },
    },
    include: {
      days: { include: { meals: { include: { foods: true } } } },
    },
  });
};

const getPendingCustomRequests = async () => {
  return await prisma.customMealPlan.findMany({
    where: {
      vendorApprovalStatus: "pending",
      acceptedByVendorId: null,
    },
    include: {
      customer: { select: { id: true, firstName: true, lastName: true, email: true } },
      package: true,
      days: { include: { meals: { include: { foods: true } } } },
    },
  });
};

const vendorAcceptCustomRequest = async (planId: string, vendorId: string) => {
  const plan = await prisma.customMealPlan.findUnique({
    where: { id: planId },
    include: { customer: true },
  });

  if (!plan) throw new Error("Custom meal plan not found");
  if (plan.acceptedByVendorId)
    throw new Error("This request has already been accepted by another vendor");

  const updatedPlan = await prisma.customMealPlan.update({
    where: { id: planId },
    data: {
      acceptedByVendorId: vendorId,
      vendorApprovalStatus: "accepted",
    },
  });

  await prisma.notification.create({
    data: {
      userId: plan.customerId,
      title: "Custom Meal Plan Approved!",
      message: `Your custom meal plan "${plan.name}" has been approved by the vendor. You can proceed to payment.`,
      type: "ORDER",
    },
  });

  return updatedPlan;
};

const confirmCustomOrderPayment = async (planId: string) => {
  const plan = await prisma.customMealPlan.findUnique({ where: { id: planId } });

  if (!plan) throw new Error("Custom meal plan not found");
  if (plan.vendorApprovalStatus !== "accepted")
    throw new Error("Vendor has not accepted this request yet");

  return await prisma.customMealPlan.update({
    where: { id: planId },
    data: {
      paymentStatus: "paid",
      status: "active",
    },
  });
};

const createPackageCategory = async (data: Prisma.PackageCategoryCreateInput) => {
  return await prisma.packageCategory.create({
    data,
  });
};

const getAllCategories = async () => {
  return await prisma.packageCategory.findMany({
    where: { status: "active" },
  });
};

// Helper function to recalculate average ratings and breakdown dynamically
const recalculatePackageRating = async (tx: Prisma.TransactionClient, packageId: string) => {
  const reviews = await tx.packageReview.findMany({
    where: { packageId },
  });

  const totalReview = reviews.length;

  if (totalReview === 0) {
    await tx.packageRating.upsert({
      where: { packageId },
      update: {
        averageRating: 0,
        totalReview: 0,
        fiveStar: 0,
        fourStar: 0,
        threeStar: 0,
        twoStar: 0,
        oneStar: 0,
      },
      create: {
        packageId,
        averageRating: 0,
        totalReview: 0,
      },
    });
    return;
  }

  let totalRatingSum = 0;
  let fiveStar = 0;
  let fourStar = 0;
  let threeStar = 0;
  let twoStar = 0;
  let oneStar = 0;

  for (const r of reviews) {
    totalRatingSum += r.rating;
    if (r.rating === 5) fiveStar++;
    else if (r.rating === 4) fourStar++;
    else if (r.rating === 3) threeStar++;
    else if (r.rating === 2) twoStar++;
    else if (r.rating === 1) oneStar++;
  }

  const averageRating = parseFloat((totalRatingSum / totalReview).toFixed(2));

  await tx.packageRating.upsert({
    where: { packageId },
    update: {
      averageRating,
      totalReview,
      fiveStar,
      fourStar,
      threeStar,
      twoStar,
      oneStar,
    },
    create: {
      packageId,
      averageRating,
      totalReview,
      fiveStar,
      fourStar,
      threeStar,
      twoStar,
      oneStar,
    },
  });
};

// --- Review Service CRUD Operations ---

const createPackageReview = async (
  customerId: string,
  packageId: string,
  data: { rating: number; review?: string; orderId?: string }
) => {
  if (!packageId) {
    throw new Error("Package ID is required");
  }

  if (data.rating < 1 || data.rating > 5) {
    throw new Error("Rating must be between 1 and 5");
  }

  // Verify the package exists before creating review
  const packageExists = await prisma.package.findUnique({ where: { id: packageId } });
  if (!packageExists) {
    throw new Error("Package not found");
  }

  return await prisma.$transaction(async (tx) => {
    const newReview = await tx.packageReview.create({
      data: {
        packageId,
        customerId,
        rating: data.rating,
        review: data.review,
        orderId: data.orderId,
        status: "pending", // Status set to pending as per schema default
      },
    });

    // Recalculate average rating for the package
    await recalculatePackageRating(tx, packageId);

    return newReview;
  });
};

const getReviewsByPackageId = async (packageId: string) => {
  return await prisma.packageReview.findMany({
    where: { packageId },
    orderBy: { createdAt: "desc" },
  });
};

const updatePackageReview = async (
  customerId: string,
  reviewId: string,
  data: UpdateReviewInput
) => {
  const existingReview = await prisma.packageReview.findUnique({ where: { id: reviewId } });

  if (!existingReview) throw new Error("Review not found");
  if (existingReview.customerId !== customerId) {
    throw new Error("Unauthorized to edit this review");
  }

  if (data.rating && (data.rating < 1 || data.rating > 5)) {
    throw new Error("Rating must be between 1 and 5");
  }

  return await prisma.$transaction(async (tx) => {
    const updatedReview = await tx.packageReview.update({
      where: { id: reviewId },
      data: {
        rating: data.rating ?? existingReview.rating,
        review: data.review ?? existingReview.review,
      },
    });

    await recalculatePackageRating(tx, existingReview.packageId);

    return updatedReview;
  });
};

const deletePackageReview = async (customerId: string, reviewId: string) => {
  const existingReview = await prisma.packageReview.findUnique({ where: { id: reviewId } });

  if (!existingReview) throw new Error("Review not found");
  if (existingReview.customerId !== customerId) {
    throw new Error("Unauthorized to delete this review");
  }

  return await prisma.$transaction(async (tx) => {
    const deletedReview = await tx.packageReview.delete({
      where: { id: reviewId },
    });

    await recalculatePackageRating(tx, existingReview.packageId);

    return deletedReview;
  });
};

export const PackageService = {
  getAllPackages,
  getPackageById,
  createVendorPackage,
  createCustomMealRequest,
  getPendingCustomRequests,
  vendorAcceptCustomRequest,
  confirmCustomOrderPayment,
  createPackageCategory,
  getAllCategories,
  createPackageReview,
  getReviewsByPackageId,
  updatePackageReview,
  deletePackageReview,
};
