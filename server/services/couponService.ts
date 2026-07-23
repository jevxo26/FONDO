import type { DiscountType } from "@prisma/client";
import prisma from "../lib/prisma";
import AppError from "../utils/AppError";
import { catchServiceAsync } from "../utils/catchServiceAsync";

export const listCoupons = catchServiceAsync(async () => {
  return prisma.coupon.findMany({ where: {}, orderBy: { createdAt: "desc" } });
});

export const getCouponById = catchServiceAsync(async (id: string) => {
  const coupon = await prisma.coupon.findUnique({ where: { id } });
  if (!coupon) throw new AppError(404, "Coupon not found");
  return coupon;
});

export const createCoupon = catchServiceAsync(async (data: Record<string, unknown>) => {
  const existing = await prisma.coupon.findUnique({ where: { couponCode: data.couponCode as string } });
  if (existing) throw new AppError(409, "Coupon code already exists");

  return prisma.coupon.create({
    data: {
      couponCode: data.couponCode as string,
      title: data.title as string | undefined,
      description: data.description as string | undefined,
      discountType: data.discountType as DiscountType,
      discountValue: data.discountValue as number,
      minimumOrderAmount: data.minimumOrderAmount as number | undefined,
      maximumDiscount: data.maximumDiscount as number | undefined,
      usageLimit: data.usageLimit as number | undefined,
      perUserLimit: (data.perUserLimit as number) || 1,
      startDate: data.startDate ? new Date(data.startDate as string) : undefined,
      endDate: data.endDate ? new Date(data.endDate as string) : undefined,
      status: (data.status as string) || "active",
    },
  });
});

export const updateCoupon = catchServiceAsync(async (id: string, data: Record<string, unknown>) => {
  const coupon = await prisma.coupon.findUnique({ where: { id } });
  if (!coupon) throw new AppError(404, "Coupon not found");

  return prisma.coupon.update({
    where: { id },
    data: {
      ...(data.title !== undefined && { title: data.title as string }),
      ...(data.description !== undefined && { description: data.description as string }),
      ...(data.discountType !== undefined && { discountType: data.discountType as DiscountType }),
      ...(data.discountValue !== undefined && { discountValue: data.discountValue as number }),
      ...(data.minimumOrderAmount !== undefined && { minimumOrderAmount: data.minimumOrderAmount as number | null }),
      ...(data.maximumDiscount !== undefined && { maximumDiscount: data.maximumDiscount as number | null }),
      ...(data.usageLimit !== undefined && { usageLimit: data.usageLimit as number | null }),
      ...(data.perUserLimit !== undefined && { perUserLimit: data.perUserLimit as number }),
      ...(data.startDate !== undefined && { startDate: data.startDate ? new Date(data.startDate as string) : null }),
      ...(data.endDate !== undefined && { endDate: data.endDate ? new Date(data.endDate as string) : null }),
      ...(data.status !== undefined && { status: data.status as string }),
    },
  });
});

export const deleteCoupon = catchServiceAsync(async (id: string) => {
  const coupon = await prisma.coupon.findUnique({ where: { id } });
  if (!coupon) throw new AppError(404, "Coupon not found");

  await prisma.coupon.delete({ where: { id } });
});
