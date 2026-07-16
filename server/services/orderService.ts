import prisma from "../lib/prisma";
import AppError from "../utils/AppError";
import { catchServiceAsync } from "../utils/catchServiceAsync";
import { paginate } from "../utils/pagination";

function generateOrderNumber(): string {
  const date = new Date();
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  const seq = String(Math.floor(Math.random() * 99999)).padStart(5, "0");
  return `FND-${y}${m}${d}-${seq}`;
}

async function findVendorForFood(foodId: string): Promise<string | null> {
  const assignment = await prisma.vendorFoodAssignment.findFirst({
    where: { foodId, status: "active" },
    orderBy: { priority: "asc" },
    include: { vendor: { select: { id: true } } },
  });
  if (assignment) return assignment.vendor.id;

  const vf = await prisma.vendorFood.findFirst({
    where: { foodId, status: "active", isPrimary: true },
    include: { vendor: { select: { id: true } } },
  });
  return vf?.vendor.id ?? null;
}

const ALLOWED_TRANSITIONS: Record<string, string[]> = {
  PENDING: ["CONFIRMED", "CANCELLED"],
  PAYMENT_PENDING: ["CONFIRMED", "CANCELLED"],
  CONFIRMED: ["PREPARING", "CANCELLED"],
  PREPARING: ["READY_FOR_PICKUP"],
  READY_FOR_PICKUP: ["PICKED_UP"],
  PICKED_UP: ["ON_THE_WAY"],
  ON_THE_WAY: ["DELIVERED"],
  DELIVERED: ["COMPLETED"],
  COMPLETED: [],
  CANCELLED: [],
  REFUNDED: [],
};

function isValidTransition(from: string, to: string): boolean {
  return (ALLOWED_TRANSITIONS[from] ?? []).includes(to);
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
  customer: { select: { id: true, fullName: true, email: true, phone: true } },
  vendor: { select: { id: true, businessName: true, phone: true, email: true } },
};

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
    addressId: string,
    paymentMethodId: string,
    customerId: string,
    notes?: string,
    deliverySchedule?: { deliveryDate: Date; deliverySlot?: string },
  ) => {
    const orderNumber = generateOrderNumber();

    const itemFoodIds = cart.items.map((i) => i.foodId);
    const mealFoodIds = cart.meals.flatMap((m) => m.foods.map((f) => f.foodId));
    const allFoodIds = [...new Set([...itemFoodIds, ...mealFoodIds])];

    const vendorIds: string[] = [];
    for (const foodId of allFoodIds) {
      const vid = await findVendorForFood(foodId);
      if (vid) vendorIds.push(vid);
    }
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

      for (const item of cart.items) {
        await tx.orderItem.create({
          data: {
            orderId: created.id,
            foodId: item.foodId,
            quantity: item.quantity,
            unitPrice: item.unitPrice,
            totalPrice: item.totalPrice,
          },
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

export const listMyOrders = catchServiceAsync(
  async (userId: string, page: number, limit: number, status?: string) => {
    const where: Record<string, unknown> = { customerId: userId, deletedAt: null };
    if (status) where.orderStatus = status;

    return paginate(
      prisma.order,
      { where, orderBy: { placedAt: "desc" }, include: { items: true, payment: true } },
      page,
      limit,
    );
  },
);

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

export const cancelOrder = catchServiceAsync(
  async (orderId: string, reason: string, cancelledBy: string, userId: string) => {
    const order = await prisma.order.findUnique({ where: { id: orderId } });
    if (!order) throw new AppError(404, "Order not found");

    if (cancelledBy === "customer" && order.customerId !== userId) {
      throw new AppError(403, "You can only cancel your own orders");
    }

    if (!["PENDING", "CONFIRMED", "PAYMENT_PENDING"].includes(order.orderStatus)) {
      throw new AppError(400, `Cannot cancel order in ${order.orderStatus} status`);
    }

    return prisma.$transaction(async (tx) => {
      await tx.order.update({
        where: { id: orderId },
        data: { orderStatus: "CANCELLED", cancelledAt: new Date() },
      });

      await tx.orderCancellation.create({
        data: { orderId, cancelledBy, reason },
      });

      await tx.orderStatusHistory.create({
        data: {
          orderId,
          previousStatus: order.orderStatus,
          currentStatus: "CANCELLED",
          changedBy: cancelledBy === "customer" ? "customer" : userId,
          remarks: `Cancelled: ${reason}`,
        },
      });

      await tx.orderTimeline.create({
        data: {
          orderId,
          title: "Order Cancelled",
          description: reason,
          status: "cancelled",
        },
      });

      await tx.payment.updateMany({
        where: { orderId, status: { in: ["PENDING", "PROCESSING"] } },
        data: { status: "REFUNDED" },
      });

      return { orderId, status: "CANCELLED" };
    });
  },
);

export const updateStatus = catchServiceAsync(
  async (orderId: string, status: string, remarks: string | undefined, userId: string) => {
    const order = await prisma.order.findUnique({ where: { id: orderId } });
    if (!order) throw new AppError(404, "Order not found");

    if (!isValidTransition(order.orderStatus, status)) {
      throw new AppError(400, `Cannot transition from ${order.orderStatus} to ${status}`);
    }

    return prisma.$transaction(async (tx) => {
      await tx.order.update({
        where: { id: orderId },
        data: {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          orderStatus: status as any,
          ...(status === "COMPLETED" ? { completedAt: new Date() } : {}),
          ...(status === "CANCELLED" ? { cancelledAt: new Date() } : {}),
          ...(status === "CONFIRMED" ? { confirmedAt: new Date() } : {}),
        },
      });

      await tx.orderStatusHistory.create({
        data: {
          orderId,
          previousStatus: order.orderStatus,
          currentStatus: status,
          changedBy: userId,
          remarks,
        },
      });

      await tx.orderTimeline.create({
        data: {
          orderId,
          title: `Status updated to ${status}`,
          description: remarks,
          status: status === "CANCELLED" ? "cancelled" : "completed",
        },
      });
    });
  },
);

export const assignVendor = catchServiceAsync(
  async (orderId: string, vendorId: string) => {
    const order = await prisma.order.findUnique({ where: { id: orderId } });
    if (!order) throw new AppError(404, "Order not found");

    const vendor = await prisma.vendor.findUnique({ where: { id: vendorId } });
    if (!vendor) throw new AppError(404, "Vendor not found");

    return prisma.$transaction(async (tx) => {
      const updated = await tx.order.update({
        where: { id: orderId },
        data: { vendorId },
      });

      await tx.orderStatusHistory.create({
        data: {
          orderId,
          previousStatus: order.orderStatus,
          currentStatus: order.orderStatus,
          changedBy: "admin",
          remarks: `Vendor assigned: ${vendor.businessName}`,
        },
      });

      return updated;
    });
  },
);

export const assignRider = catchServiceAsync(
  async (orderId: string, riderId: string) => {
    const order = await prisma.order.findUnique({ where: { id: orderId } });
    if (!order) throw new AppError(404, "Order not found");

    const rider = await prisma.rider.findUnique({ where: { id: riderId } });
    if (!rider) throw new AppError(404, "Rider not found");

    return prisma.$transaction(async (tx) => {
      const existing = await tx.delivery.findUnique({ where: { orderId } });
      if (existing) {
        await tx.delivery.update({
          where: { orderId },
          data: { riderId, deliveryStatus: "ASSIGNED" },
        });
      } else {
        const code = `DEL-${order.orderNumber}`;
        await tx.delivery.create({
          data: {
            orderId,
            riderId,
            vendorId: order.vendorId,
            deliveryCode: code,
            deliveryStatus: "ASSIGNED",
          },
        });
      }

      await tx.order.update({
        where: { id: orderId },
        data: { deliveryStatus: "ASSIGNED" },
      });

      await tx.orderStatusHistory.create({
        data: {
          orderId,
          previousStatus: order.orderStatus,
          currentStatus: order.orderStatus,
          changedBy: "admin",
          remarks: `Rider assigned: ${rider.fullName}`,
        },
      });
    });
  },
);

export const listAllOrders = catchServiceAsync(
  async (query: {
    page?: number;
    limit?: number;
    status?: string;
    paymentStatus?: string;
    vendorId?: string;
    customerId?: string;
    dateFrom?: string;
    dateTo?: string;
  }) => {
    const where: Record<string, unknown> = { deletedAt: null };
    if (query.status) where.orderStatus = query.status;
    if (query.paymentStatus) where.paymentStatus = query.paymentStatus;
    if (query.vendorId) where.vendorId = query.vendorId;
    if (query.customerId) where.customerId = query.customerId;
    if (query.dateFrom || query.dateTo) {
      const placedAt: Record<string, Date> = {};
      if (query.dateFrom) placedAt.gte = new Date(query.dateFrom);
      if (query.dateTo) placedAt.lte = new Date(query.dateTo);
      where.placedAt = placedAt;
    }

    return paginate(
      prisma.order,
      {
        where,
        orderBy: { placedAt: "desc" },
        include: { customer: { select: { id: true, fullName: true, phone: true } }, items: { include: { food: true } }, payment: true },
      },
      query.page ?? 1,
      query.limit ?? 20,
    );
  },
);

export const listVendorOrders = catchServiceAsync(
  async (vendorId: string, page: number, limit: number, status?: string) => {
    const where: Record<string, unknown> = { vendorId, deletedAt: null };
    if (status) where.orderStatus = status;

    return paginate(
      prisma.order,
      { where, orderBy: { placedAt: "desc" }, include: { customer: { select: { id: true, fullName: true } }, items: { include: { food: true } } } },
      page,
      limit,
    );
  },
);

export const processRefund = catchServiceAsync(
  async (
    orderId: string,
    amount: number,
    refundMethod: string | undefined,
    reason: string,
    processedBy: string,
  ) => {
    const order = await prisma.order.findUnique({ where: { id: orderId } });
    if (!order) throw new AppError(404, "Order not found");
    if (order.orderStatus !== "CANCELLED") {
      throw new AppError(400, "Can only refund cancelled orders");
    }

    const payment = await prisma.payment.findUnique({ where: { orderId } });
    if (!payment) throw new AppError(404, "Payment not found");

    return prisma.$transaction(async (tx) => {
      const refund = await tx.orderRefund.create({
        data: {
          orderId,
          paymentId: payment.id,
          refundAmount: amount,
          refundMethod,
          refundStatus: "completed",
          processedBy,
          processedAt: new Date(),
        },
      });

      await tx.payment.update({
        where: { id: payment.id },
        data: { status: Number(payment.amount) === amount ? "REFUNDED" : "PARTIALLY_REFUNDED" },
      });

      await tx.orderStatusHistory.create({
        data: {
          orderId,
          previousStatus: order.orderStatus,
          currentStatus: "REFUNDED",
          changedBy: processedBy,
          remarks: `Refund processed: ${reason}`,
        },
      });

      await tx.order.update({
        where: { id: orderId },
        data: { orderStatus: "REFUNDED" },
      });

      return refund;
    });
  },
);

export const listRefunds = catchServiceAsync(async (orderId: string) => {
  return prisma.orderRefund.findMany({ where: { orderId }, orderBy: { createdAt: "desc" } });
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

export const updateMealStatus = catchServiceAsync(
  async (mealId: string, status: string) => {
    const meal = await prisma.orderMeal.findUnique({ where: { id: mealId } });
    if (!meal) throw new AppError(404, "Order meal not found");

    return prisma.orderMeal.update({
      where: { id: mealId },
      data: { status },
    });
  },
);
