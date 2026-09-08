import { MealType, PackageStatus, Prisma } from "@prisma/client";
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

interface _CreateReviewInput {
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
      status: PackageStatus.APPROVED,
      deletedAt: null,
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

const collectFoodIds = (data: VendorPackageInput): string[] => {
  const ids = new Set<string>();
  data.days.forEach((day) =>
    day.meals.forEach((meal) => meal.foods.forEach((food) => ids.add(food.foodId))),
  );
  return [...ids];
};

const assertFoodsBelongToVendor = async (vendorId: string, foodIds: string[]) => {
  const owned = await prisma.vendorFood.findMany({
    where: { vendorId, deletedAt: null, foodId: { in: foodIds }, food: { status: "APPROVED" } },
    select: { foodId: true },
  });
  const ownedSet = new Set(owned.map((vf) => vf.foodId));
  const missing = foodIds.filter((id) => !ownedSet.has(id));
  if (missing.length) {
    throw new Error(`Food(s) are not on this vendor's approved menu: ${missing.join(", ")}`);
  }
};

const createVendorPackage = async (vendorId: string, data: VendorPackageInput) => {
  await assertFoodsBelongToVendor(vendorId, collectFoodIds(data));

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
      status: PackageStatus.PENDING,

      packageCategory: {
        connect: {
          id: data.packageCategoryId,
        },
      },

      vendor: {
        connect: { id: vendorId },
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

const createAdminPackage = async (adminUserId: string, data: VendorPackageInput & { vendorId: string }) => {
  await assertFoodsBelongToVendor(data.vendorId, collectFoodIds(data));

  const createData: Prisma.PackageUncheckedCreateInput = {
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
    status: PackageStatus.APPROVED,
    approvedBy: adminUserId,
    approvedAt: new Date(),
    packageCategoryId: data.packageCategoryId,
    vendorId: data.vendorId,
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
  };

  return await prisma.package.create({ data: createData });
};

interface AdminPackageQuery {
  status?: PackageStatus;
  vendorId?: string;
  search?: string;
  page?: number;
  limit?: number;
}

const listPackagesAdmin = async (query: AdminPackageQuery) => {
  const { status, vendorId, search } = query;
  const page = Math.max(1, query.page ?? 1);
  const limit = Math.min(100, Math.max(1, query.limit ?? 20));

  const where: Prisma.PackageWhereInput = {
    deletedAt: null,
    status: status || undefined,
    vendorId: vendorId || undefined,
    name: search ? { contains: search, mode: "insensitive" } : undefined,
  };

  const [items, total] = await Promise.all([
    prisma.package.findMany({
      where,
      include: {
        packageCategory: true,
        vendor: { select: { id: true, businessName: true } },
        approver: { select: { id: true, firstName: true, lastName: true } },
        prices: true,
        rating: true,
        _count: { select: { days: true, reviews: true } },
      },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.package.count({ where }),
  ]);

  return { items, pagination: { page, limit, total, pages: Math.ceil(total / limit) } };
};

const listVendorPackages = async (vendorId: string) => {
  return await prisma.package.findMany({
    where: { vendorId, deletedAt: null },
    include: {
      packageCategory: true,
      approver: { select: { id: true, firstName: true, lastName: true } },
      prices: true,
      rating: true,
      _count: { select: { days: true, reviews: true } },
    },
    orderBy: { createdAt: "desc" },
  });
};

const approvePackage = async (packageId: string, adminUserId: string) => {
  const pkg = await prisma.package.findUnique({ where: { id: packageId } });
  if (!pkg) throw new Error("Package not found");
  if (pkg.status === PackageStatus.APPROVED) throw new Error("Package is already approved");

  return await prisma.package.update({
    where: { id: packageId },
    data: {
      status: PackageStatus.APPROVED,
      approvedBy: adminUserId,
      approvedAt: new Date(),
      rejectionReason: null,
    },
  });
};

const rejectPackage = async (packageId: string, adminUserId: string, reason: string) => {
  const pkg = await prisma.package.findUnique({ where: { id: packageId } });
  if (!pkg) throw new Error("Package not found");
  if (pkg.status === PackageStatus.APPROVED) throw new Error("Approved packages cannot be rejected");

  return await prisma.package.update({
    where: { id: packageId },
    data: {
      status: PackageStatus.REJECTED,
      approvedBy: adminUserId,
      approvedAt: new Date(),
      rejectionReason: reason,
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
const recalculatePackageRating = async (packageId: string) => {
  const approvedReviews = await prisma.packageReview.findMany({
    where: { packageId, status: "approved" },
  });

  const totalReview = approvedReviews.length;

  if (totalReview === 0) {
    await prisma.packageRating.upsert({
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
  let fiveStar = 0, fourStar = 0, threeStar = 0, twoStar = 0, oneStar = 0;

  approvedReviews.forEach((r) => {
    totalRatingSum += r.rating;
    if (r.rating === 5) fiveStar++;
    else if (r.rating === 4) fourStar++;
    else if (r.rating === 3) threeStar++;
    else if (r.rating === 2) twoStar++;
    else if (r.rating === 1) oneStar++;
  });

  const averageRating = parseFloat((totalRatingSum / totalReview).toFixed(1));

  await prisma.packageRating.upsert({
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
    await recalculatePackageRating(packageId);

    return newReview;
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

    await recalculatePackageRating(existingReview.packageId);

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

    await recalculatePackageRating(existingReview.packageId);

    return deletedReview;
  });
};

const updateReviewStatus = async (reviewId: string, status: "approved" | "rejected" | "pending") => {
  const existingReview = await prisma.packageReview.findUnique({
    where: { id: reviewId },
  });

  if (!existingReview) {
    throw new Error("Review not found");
  }

  const updatedReview = await prisma.packageReview.update({
    where: { id: reviewId },
    data: { status },
  });

  await recalculatePackageRating(existingReview.packageId);

  return updatedReview;
};

const getPendingReviews = async () => {
  const reviews = await prisma.packageReview.findMany({
    where: {
      status: "pending",
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      package: {
        select: {
          id: true,
          name: true,
          thumbnail: true,
        },
      },
    },
  });

  return reviews;
};

const updateVendorPackage = async (
  packageId: string,
  vendorId: string,
  data: Partial<VendorPackageInput>,
) => {
  const existing = await prisma.package.findFirst({
    where: { id: packageId, vendorId, deletedAt: null },
  });

  if (!existing) {
    throw new Error("Package not found or unauthorized");
  }

  if (data.days) {
    await assertFoodsBelongToVendor(vendorId, collectFoodIds(data as VendorPackageInput));
  }

  return await prisma.$transaction(async (tx) => {
    // If updating days/meals/foods, remove existing nested days structure first
    if (data.days) {
      await tx.packageDay.deleteMany({ where: { packageId } });
    }

    return await tx.package.update({
      where: { id: packageId },
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
        status: PackageStatus.PENDING, // Vendor edits reset status to pending approval
        packageCategoryId: data.packageCategoryId,
        days: data.days
          ? {
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
          }
          : undefined,
      },
    });
  });
};

const updateAdminPackage = async (
  packageId: string,
  data: Partial<VendorPackageInput & { vendorId?: string }>,
) => {
  const existing = await prisma.package.findFirst({
    where: { id: packageId, deletedAt: null },
  });

  if (!existing) {
    throw new Error("Package not found");
  }

  const vendorId = data.vendorId || existing.vendorId;

  if (data.days && vendorId) {
    await assertFoodsBelongToVendor(vendorId, collectFoodIds(data as VendorPackageInput));
  }

  return await prisma.$transaction(async (tx) => {
    if (data.days) {
      await tx.packageDay.deleteMany({ where: { packageId } });
    }

    return await tx.package.update({
      where: { id: packageId },
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
        packageCategoryId: data.packageCategoryId,
        vendorId: data.vendorId,
        days: data.days
          ? {
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
          }
          : undefined,
      },
    });
  });
};

const deleteVendorPackage = async (packageId: string, vendorId: string) => {
  const existing = await prisma.package.findFirst({
    where: { id: packageId, vendorId, deletedAt: null },
  });

  if (!existing) {
    throw new Error("Package not found or unauthorized");
  }

  return await prisma.package.update({
    where: { id: packageId },
    data: { deletedAt: new Date() },
  });
};

const deleteAdminPackage = async (packageId: string) => {
  const existing = await prisma.package.findFirst({
    where: { id: packageId, deletedAt: null },
  });

  if (!existing) {
    throw new Error("Package not found");
  }

  return await prisma.package.update({
    where: { id: packageId },
    data: { deletedAt: new Date() },
  });
};

export const PackageService = {
  getAllPackages,
  getPackageById,
  createVendorPackage,
  createAdminPackage,
  listPackagesAdmin,
  listVendorPackages,
  approvePackage,
  rejectPackage,
  createCustomMealRequest,
  getPendingCustomRequests,
  vendorAcceptCustomRequest,
  confirmCustomOrderPayment,
  createPackageCategory,
  getAllCategories,
  createPackageReview,
  updatePackageReview,
  deletePackageReview,
  updateReviewStatus,
  getPendingReviews,
  updateVendorPackage,
  updateAdminPackage,
  deleteVendorPackage,
  deleteAdminPackage,
};