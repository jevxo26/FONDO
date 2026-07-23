import prisma from "../lib/prisma";
import AppError from "../utils/AppError";
import { catchServiceAsync } from "../utils/catchServiceAsync";
import { createOrderFromCart } from "./orderService";

export const getSummary = catchServiceAsync(async (cartId: string) => {
  const cart = await prisma.cart.findUnique({
    where: { id: cartId },
    include: {
      summary: true,
      items: {
        include: {
          food: { select: { id: true, name: true, thumbnail: true } },
          addons: true,
        },
      },
      meals: {
        include: {
          foods: { include: { food: { select: { id: true, name: true } } } },
        },
      },
    },
  });

  if (!cart) throw new AppError(404, "Cart not found");
  if (cart.status !== "active") throw new AppError(400, "Cart is not active");

  let couponData = null;
  if (cart.couponId) {
    const coupon = await prisma.coupon.findUnique({ where: { id: cart.couponId } });
    if (coupon && coupon.status === "active" && new Date() <= coupon.endDate!) {
      couponData = { code: coupon.couponCode, discountAmount: Number(cart.discount) };
    }
  }

  const [addresses, paymentMethods] = await Promise.all([
    prisma.userAddress.findMany({
      where: { userId: cart.customerId, deletedAt: null },
      select: { id: true, label: true, area: true, district: true, division: true, road: true, house: true, isDefault: true },
    }),
    prisma.paymentMethod.findMany({
      where: { isActive: true },
      select: { id: true, name: true, logo: true, isDefault: true },
    }),
  ]);

  return {
    subtotal: Number(cart.subtotal),
    discount: Number(cart.discount),
    deliveryCharge: Number(cart.deliveryCharge),
    vat: Number(cart.vat),
    grandTotal: Number(cart.totalAmount),
    itemCount: cart.items.length,
    mealCount: cart.meals.length,
    appliedCoupon: couponData,
    deliveryAddress: addresses.find((a) => a.isDefault) ?? addresses[0] ?? null,
    availablePaymentMethods: paymentMethods,
  };
});

export const applyCoupon = catchServiceAsync(async (cartId: string, couponCode: string) => {
  const cart = await prisma.cart.findUnique({ where: { id: cartId } });
  if (!cart) throw new AppError(404, "Cart not found");
  if (cart.status !== "active") throw new AppError(400, "Cart is not active");

  const coupon = await prisma.coupon.findUnique({ where: { couponCode } });
  if (!coupon) throw new AppError(404, "Coupon not found");
  if (coupon.status !== "active") throw new AppError(400, "Coupon is not active");
  if (new Date() > coupon.endDate!) throw new AppError(400, "Coupon has expired");

  if (Number(cart.subtotal) < Number(coupon.minimumOrderAmount ?? 0)) {
    throw new AppError(400, `Minimum order amount of ${coupon.minimumOrderAmount} required`);
  }

  const usageCount = await prisma.couponUsage.count({
    where: { couponId: coupon.id, customerId: cart.customerId },
  });
  if (coupon.perUserLimit && usageCount >= coupon.perUserLimit) {
    throw new AppError(400, "Coupon usage limit reached");
  }
  if (coupon.usageLimit) {
    const totalUsage = await prisma.couponUsage.count({ where: { couponId: coupon.id } });
    if (totalUsage >= coupon.usageLimit) {
      throw new AppError(400, "Coupon has been fully redeemed");
    }
  }

  const discountAmount = coupon.discountType === "PERCENTAGE"
    ? Number(cart.subtotal) * (Number(coupon.discountValue) / 100)
    : Number(coupon.discountValue);

  await prisma.cart.update({
    where: { id: cartId },
    data: { couponId: coupon.id },
  });

  return { valid: true, discountAmount, newTotal: Number(cart.subtotal) - discountAmount };
});

export const removeCoupon = catchServiceAsync(async (cartId: string) => {
  const cart = await prisma.cart.findUnique({ where: { id: cartId } });
  if (!cart) throw new AppError(404, "Cart not found");

  await prisma.cart.update({
    where: { id: cartId },
    data: { couponId: null },
  });

  return { message: "Coupon removed" };
});

export const selectAddress = catchServiceAsync(async (cartId: string, addressId: string) => {
  const cart = await prisma.cart.findUnique({ where: { id: cartId } });
  if (!cart) throw new AppError(404, "Cart not found");

  const address = await prisma.userAddress.findFirst({
    where: { id: addressId, userId: cart.customerId, deletedAt: null },
  });
  if (!address) throw new AppError(404, "Address not found");

  return { message: "Address selected", addressId };
});

export const placeOrder = catchServiceAsync(
  async (
    cartId: string,
    addressId: string,
    paymentMethodId: string,
    customerId: string,
    notes?: string,
    deliverySchedule?: { deliveryDate: Date; deliverySlot?: string },
  ) => {
    const cart = await prisma.cart.findUnique({
      where: { id: cartId },
      include: { items: { include: { addons: true } }, meals: { include: { foods: true } } },
    });
    if (!cart) throw new AppError(404, "Cart not found");
    if (cart.status !== "active") throw new AppError(400, "Cart is not active");
    if (cart.items.length === 0 && cart.meals.length === 0) {
      throw new AppError(400, "Cart is empty");
    }

    const address = await prisma.userAddress.findFirst({
      where: { id: addressId, userId: customerId, deletedAt: null },
    });
    if (!address) throw new AppError(404, "Address not found");

    return createOrderFromCart(cart, addressId, paymentMethodId, customerId, notes, deliverySchedule);
  },
);
