import prisma from "../lib/prisma";
import AppError from "../utils/AppError";
import { catchServiceAsync } from "../utils/catchServiceAsync";
import { ORDER_INCLUDE } from "./orderUtils";

export const listMyOrders = catchServiceAsync(async (userId: string) => {
  return prisma.order.findMany({
    where: { customerId: userId, deletedAt: null },
    orderBy: { placedAt: "desc" },
    include: { items: { include: { food: true } }, payment: true },
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
