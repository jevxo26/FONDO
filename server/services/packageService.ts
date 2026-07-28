/* eslint-disable @typescript-eslint/no-explicit-any */
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getAllPackages = async (query: any) => {
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

// Package details with all related information.
const getPackageById = async (id: string) => {
  return await prisma.package.findUnique({
    where: { id },
    include: {
      packageCategory: true,
      days: {
        include: {
          meals: {
            include: { foods: true },
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
      reviews: true,
      rating: true,
      customization: true,
      availability: true,
    },
  });
};

const createVendorPackage = async (vendorId: string, data: any) => {
  return await prisma.package.create({
    data: {
      ...data,
      // If your schema stores the vendor ID in the package, include it here.
    },
  });
};

const createCustomMealRequest = async (customerId: string, data: any) => {
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
        create: days.map((day: any) => ({
          dayNumber: day.dayNumber,
          meals: {
            create: day.meals.map((meal: any) => ({
              mealType: meal.mealType,
              mealTime: meal.mealTime,
              foods: {
                create: meal.foods.map((food: any) => ({
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

  // TO REVIEW
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

// Order confirm after confirm
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

// admin or vendor
const createPackageCategory = async (data: any) => {
  return await prisma.packageCategory.create({
    data,
  });
};

const getAllCategories = async () => {
  return await prisma.packageCategory.findMany({
    where: { status: "active" },
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
};
