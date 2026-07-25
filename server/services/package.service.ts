import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// ১. সকল প্যাকেজ লিস্ট (ফিল্টারিংসহ)
const getAllPackages = async (query: any) => {
  const { categoryId, packageType, search } = query;
  return await prisma.package.findMany({
    where: {
      status: 'active',
      packageCategoryId: categoryId || undefined,
      packageType: packageType || undefined,
      name: search ? { contains: search, mode: 'insensitive' } : undefined,
    },
    include: {
      packageCategory: true,
      prices: true,
      rating: true,
      images: true,
    },
  });
};

// ২. নির্দিষ্ট প্যাকেজ ডিটেইলস (সব সম্পর্কসহ)
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

// ৩. নতুন প্যাকেজ তৈরি (ভেন্ডরের জন্য)
const createVendorPackage = async (vendorId: string, data: any) => {
  // ডেটার ভেতরে প্রয়োজনীয় ফিল্ড ম্যাপ করে প্যাকেজ তৈরি করা হচ্ছে
  return await prisma.package.create({
    data: {
      ...data,
      // আপনার স্কিমা অনুযায়ী যদি ভেন্ডর আইডি প্যাকেজে রাখতে হয় তবে এখানে যুক্ত করতে পারেন
    },
  });
};

// ৪. ইউজার কর্তৃক কাস্টম মিল প্ল্যান রিকোয়েস্ট তৈরি (পেন্ডিং স্ট্যাটাসসহ)
const createCustomMealRequest = async (customerId: string, data: any) => {
  const { packageId, name, totalDays, totalPrice, days } = data;

  return await prisma.customMealPlan.create({
    data: {
      customerId,
      packageId,
      name,
      totalDays,
      totalPrice,
      vendorApprovalStatus: 'pending',
      paymentStatus: 'pending',
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

// ৫. ভেন্ডরের জন্য পেন্ডিং কাস্টম রিকোয়েস্টগুলো দেখানো (স্ট্যাটাস ও কাস্টমার ডিটেইলসহ)
const getPendingCustomRequests = async () => {
  return await prisma.customMealPlan.findMany({
    where: {
      vendorApprovalStatus: 'pending',
      acceptedByVendorId: null,
    },
    include: {
      customer: { select: { id: true, firstName: true, lastName: true, email: true } },
      package: true,
      days: { include: { meals: { include: { foods: true } } } },
    },
  });
};

// ৬. ভেন্ডর কর্তৃক কাস্টম রিকোয়েস্ট এক্সেপ্ট/অ্যাপ্রুভ করা এবং ইউজারের কাছে নোটিফিকেশন পাঠানো
const vendorAcceptCustomRequest = async (planId: string, vendorId: string) => {
  const plan = await prisma.customMealPlan.findUnique({ 
    where: { id: planId },
    include: { customer: true }
  });

  if (!plan) throw new Error('Custom meal plan not found');
  if (plan.acceptedByVendorId) throw new Error('This request has already been accepted by another vendor');

  // কাস্টম প্ল্যান স্ট্যাটাস আপডেট করা
  const updatedPlan = await prisma.customMealPlan.update({
    where: { id: planId },
    data: {
      acceptedByVendorId: vendorId,
      vendorApprovalStatus: 'accepted',
    },
  });

  // ইউজারের কাছে নোটিফিকেশন পাঠানো
  await prisma.notification.create({
    data: {
      userId: plan.customerId,
      title: 'Custom Meal Plan Approved!',
      message: `Your custom meal plan "${plan.name}" has been approved by the vendor. You can proceed to payment.`,
      type: 'ORDER', 
    },
  });

  return updatedPlan;
};

// ৭. ভেন্ডর অ্যাক্সেপ্ট করার পর ইউজারের পেমেন্ট ও অর্ডার কনফার্মেশন
const confirmCustomOrderPayment = async (planId: string) => {
  const plan = await prisma.customMealPlan.findUnique({ where: { id: planId } });

  if (!plan) throw new Error('Custom meal plan not found');
  if (plan.vendorApprovalStatus !== 'accepted') throw new Error('Vendor has not accepted this request yet');

  return await prisma.customMealPlan.update({
    where: { id: planId },
    data: {
      paymentStatus: 'paid',
      status: 'active',
    },
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
};