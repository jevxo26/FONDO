import prisma from "../lib/prisma";
import AppError from "../utils/AppError";
import { catchServiceAsync } from "../utils/catchServiceAsync";

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

    const allowed = ALLOWED_TRANSITIONS[order.orderStatus] ?? [];
    if (!allowed.includes(status)) {
      throw new AppError(400, `Cannot transition from ${order.orderStatus} to ${status}`);
    }

    return prisma.$transaction(async (tx) => {
      await tx.order.update({
        where: { id: orderId },
        data: {
          orderStatus: status as import("@prisma/client").OrderStatus,
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

export const processRefund = catchServiceAsync(
  async (orderId: string, amount: number, refundMethod: string | undefined, reason: string, processedBy: string) => {
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

export const updateMealStatus = catchServiceAsync(async (mealId: string, status: string) => {
  const meal = await prisma.orderMeal.findUnique({ where: { id: mealId } });
  if (!meal) throw new AppError(404, "Order meal not found");

  return prisma.orderMeal.update({
    where: { id: mealId },
    data: { status },
  });
});
