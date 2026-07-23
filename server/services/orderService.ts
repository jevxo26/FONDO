import prisma from "../lib/prisma";
import AppError from "../utils/AppError";
import { catchServiceAsync } from "../utils/catchServiceAsync";

function generateOrderNumber(): string {
  const date = new Date();
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  const seq = String(Math.floor(Math.random() * 99999)).padStart(5, "0");
  return `FND-${y}${m}${d}-${seq}`;
}

const ORDER_INCLUDE = {
  items: { include: { food: true } },
  meals: { include: { foods: true } },
  schedules: true,
  statusHistories: { orderBy: { createdAt: "desc" as const } },
  timeline: { orderBy: { createdAt: "asc" as const } },
  cancellation: true,
  refunds: true,
  feedback: true,
  invoice: true,
  delivery: {
    include: {
      rider: { select: { id: true, fullName: true, phone: true } },
    },
  },
  payment: true,
  customer: { select: { id: true, firstName: true, lastName: true, email: true, phone: true } },
  vendor: { select: { id: true, businessName: true, phone: true, email: true } },
};

export { ORDER_INCLUDE };

export const createOrderFromCart = catchServiceAsync(
  async (
    cart: {
      id: string;
      customerId: string;
      packageId?: string | null;
      customMealPlanId?: string | null;
      subtotal: import("@prisma/client/runtime/library").Decimal;
      discount: import("@prisma/client/runtime/library").Decimal;
      deliveryCharge: import("@prisma/client/runtime/library").Decimal;
      vat: import("@prisma/client/runtime/library").Decimal;
      totalAmount: import("@prisma/client/runtime/library").Decimal;
      couponId?: string | null;
      items: Array<{
        id: string;
        foodId: string;
        quantity: number;
        unitPrice: import("@prisma/client/runtime/library").Decimal;
        totalPrice: import("@prisma/client/runtime/library").Decimal;
        addons: Array<{
          addonItemId: string;
          quantity: number;
          price: import("@prisma/client/runtime/library").Decimal;
        }>;
      }>;
      meals: Array<{
        id: string;
        dayNumber: number;
        mealType: string;
        mealTime?: string | null;
        foods: Array<{
          foodId: string;
          quantity: number;
          isReplacement: boolean;
        }>;
      }>;
    },
    paymentMethodId: string,
    customerId: string,
    notes?: string,
    addressId?: string,
    deliverySchedule?: { deliveryDate: Date; deliverySlot?: string },
  ) => {
    const orderNumber = generateOrderNumber();

    const itemFoodIds = cart.items.map((i) => i.foodId);
    const mealFoodIds = cart.meals.flatMap((m) => m.foods.map((f) => f.foodId));
    const allFoodIds = [...new Set([...itemFoodIds, ...mealFoodIds])];

    const [assignments, vfs] = await Promise.all([
      prisma.vendorFoodAssignment.findMany({
        where: { foodId: { in: allFoodIds }, status: "active" },
        orderBy: { priority: "asc" },
        distinct: ["foodId"],
        include: { vendor: { select: { id: true } } },
      }),
      prisma.vendorFood.findMany({
        where: { foodId: { in: allFoodIds }, status: "active", isPrimary: true },
        include: { vendor: { select: { id: true } } },
      }),
    ]);

    const vendorMap = new Map<string, string>();
    for (const a of assignments) { if (a.vendor) vendorMap.set(a.foodId, a.vendor.id); }
    for (const vf of vfs) { if (!vendorMap.has(vf.foodId) && vf.vendor) vendorMap.set(vf.foodId, vf.vendor.id); }

    const vendorIds = allFoodIds.map((fid) => vendorMap.get(fid)).filter(Boolean) as string[];
    const primaryVendorId = vendorIds.length > 0
      ? vendorIds.sort((a, b) => vendorIds.filter((v) => v === a).length - vendorIds.filter((v) => v === b).length).pop() ?? null
      : null;

    const order = await prisma.$transaction(async (tx) => {
      const created = await tx.order.create({
        data: {
          orderNumber,
          customerId,
          vendorId: primaryVendorId,
          packageId: cart.packageId,
          customMealPlanId: cart.customMealPlanId,
          addressId,
          couponId: cart.couponId,
          subtotal: cart.subtotal,
          discount: cart.discount,
          deliveryCharge: cart.deliveryCharge,
          vat: cart.vat,
          totalAmount: cart.totalAmount,
          paymentStatus: "PENDING",
          orderStatus: "PENDING",
          deliveryStatus: "PENDING",
          notes,
          placedAt: new Date(),
        },
      });

      if (cart.items.length > 0) {
        await tx.orderItem.createMany({
          data: cart.items.map((item) => ({
            orderId: created.id,
            foodId: item.foodId,
            quantity: item.quantity,
            unitPrice: item.unitPrice,
            totalPrice: item.totalPrice,
          })),
        });
      }

      for (const meal of cart.meals) {
        const createdMeal = await tx.orderMeal.create({
          data: {
            orderId: created.id,
            dayNumber: meal.dayNumber,
            mealType: meal.mealType,
            mealTime: meal.mealTime,
            deliveryDate: deliverySchedule?.deliveryDate ?? null,
          },
        });

        for (const mf of meal.foods) {
          await tx.orderMealFood.create({
            data: {
              orderMealId: createdMeal.id,
              foodId: mf.foodId,
              quantity: mf.quantity,
            },
          });
        }
      }

      if (deliverySchedule) {
        await tx.orderSchedule.create({
          data: {
            orderId: created.id,
            deliveryDate: deliverySchedule.deliveryDate,
            deliverySlot: deliverySchedule.deliverySlot,
          },
        });
      }

      await tx.orderStatusHistory.create({
        data: {
          orderId: created.id,
          previousStatus: null,
          currentStatus: "PENDING",
          changedBy: "system",
          remarks: "Order placed",
        },
      });

      await tx.orderTimeline.create({
        data: {
          orderId: created.id,
          title: "Order Placed",
          description: "Your order has been placed successfully.",
          status: "completed",
        },
      });

      await tx.payment.create({
        data: {
          paymentNumber: `PAY-${orderNumber}`,
          orderId: created.id,
          customerId,
          paymentMethodId,
          amount: cart.totalAmount,
          status: "PENDING",
        },
      });

      if (cart.couponId) {
        await tx.couponUsage.create({
          data: {
            couponId: cart.couponId,
            customerId,
            orderId: created.id,
          },
        });
      }

      await tx.cart.update({
        where: { id: cart.id },
        data: { status: "converted" },
      });

      await tx.cartSummary.update({
        where: { cartId: cart.id },
        data: { grandTotal: cart.totalAmount },
      });

      return created;
    });

    return {
      orderId: order.id,
      orderNumber: order.orderNumber,
      totalAmount: Number(order.totalAmount),
      paymentUrl: `/api/payments/${order.id}/process`,
    };
  },
);

export const listMyOrders = catchServiceAsync(async (userId: string) => {
  return prisma.order.findMany({
    where: { customerId: userId, deletedAt: null },
    orderBy: { placedAt: "desc" },
    include: { items: true, payment: true },
  });
});

export const getOrderDetail = catchServiceAsync(
  async (orderId: string, userId?: string, role?: string) => {
    const order = await prisma.order.findFirst({
      where: { id: orderId, deletedAt: null },
      include: ORDER_INCLUDE,
    });

    if (!order) throw new AppError(404, "Order not found");

    if (role === "CUSTOMER" && order.customerId !== userId) {
      throw new AppError(403, "Access denied");
    }

    return order;
  },
);

export const updateOrder = catchServiceAsync(
  async (
    orderId: string,
    userId: string,
    data: { notes?: string; deliverySchedule?: { deliveryDate: Date; deliverySlot?: string } },
  ) => {
    const order = await prisma.order.findFirst({
      where: { id: orderId, customerId: userId, deletedAt: null },
    });
    if (!order) throw new AppError(404, "Order not found");
    if (!["PENDING", "CONFIRMED"].includes(order.orderStatus)) {
      throw new AppError(400, "Order can only be updated when PENDING or CONFIRMED");
    }

    const updateData: Record<string, unknown> = {};
    if (data.notes !== undefined) updateData.notes = data.notes;

    const updated = await prisma.$transaction(async (tx) => {
      const result = await tx.order.update({
        where: { id: orderId },
        data: updateData,
      });

      if (data.deliverySchedule) {
        await tx.orderSchedule.upsert({
          where: { id: (await tx.orderSchedule.findFirst({ where: { orderId } }))?.id ?? "" },
          update: {
            deliveryDate: data.deliverySchedule.deliveryDate,
            deliverySlot: data.deliverySchedule.deliverySlot,
          },
          create: {
            orderId,
            deliveryDate: data.deliverySchedule.deliveryDate,
            deliverySlot: data.deliverySchedule.deliverySlot,
          },
        });
      }

      return result;
    });

    return updated;
  },
);

export const softDeleteOrder = catchServiceAsync(async (orderId: string) => {
  const order = await prisma.order.findUnique({ where: { id: orderId } });
  if (!order) throw new AppError(404, "Order not found");

  return prisma.order.update({
    where: { id: orderId },
    data: { deletedAt: new Date() },
  });
});

export const listAllOrders = catchServiceAsync(async () => {
  return prisma.order.findMany({
    where: { deletedAt: null },
    orderBy: { placedAt: "desc" },
    include: {
      customer: { select: { id: true, firstName: true, lastName: true, phone: true } },
      items: { include: { food: true } },
      payment: true,
    },
  });
});

export const listVendorOrders = catchServiceAsync(async (vendorId: string) => {
  return prisma.order.findMany({
    where: { vendorId, deletedAt: null },
    orderBy: { placedAt: "desc" },
    include: {
      customer: { select: { id: true, firstName: true, lastName: true } },
      items: { include: { food: true } },
    },
  });
});

export const submitFeedback = catchServiceAsync(
  async (orderId: string, customerId: string, rating: number, review?: string) => {
    const order = await prisma.order.findFirst({
      where: { id: orderId, customerId, deletedAt: null },
    });
    if (!order) throw new AppError(404, "Order not found");
    if (!["DELIVERED", "COMPLETED"].includes(order.orderStatus)) {
      throw new AppError(400, "Feedback only allowed for delivered/completed orders");
    }

    return prisma.orderFeedback.upsert({
      where: { orderId },
      create: { orderId, customerId, rating, review },
      update: { rating, review },
    });
  },
);

export const getInvoice = catchServiceAsync(async (orderId: string) => {
  const order = await prisma.order.findUnique({ where: { id: orderId } });
  if (!order) throw new AppError(404, "Order not found");

  const existing = await prisma.orderInvoice.findUnique({ where: { orderId } });
  if (existing) return existing;

  const invNum = `INV-${order.orderNumber}`;
  return prisma.orderInvoice.create({
    data: {
      orderId,
      invoiceNumber: invNum,
      subtotal: order.subtotal,
      discount: order.discount,
      vat: order.vat,
      deliveryCharge: order.deliveryCharge,
      grandTotal: order.totalAmount,
    },
  });
});
