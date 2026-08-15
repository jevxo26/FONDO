import prisma from "../lib/prisma";
import AppError from "../utils/AppError";
import { catchServiceAsync } from "../utils/catchServiceAsync";
import { generateInvoicePdf } from "./invoicePdfService";

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

  if (existing && existing.pdfUrl) return existing;

  // Generate PDF if not yet created or pdfUrl missing
  const { pdfUrl, invoiceNumber } = await generateInvoicePdf(orderId);

  if (existing) {
    return prisma.orderInvoice.update({
      where: { id: existing.id },
      data: { pdfUrl },
    });
  }

  return prisma.orderInvoice.create({
    data: {
      orderId,
      invoiceNumber,
      subtotal: order.subtotal,
      discount: order.discount,
      vat: order.vat,
      deliveryCharge: order.deliveryCharge,
      grandTotal: order.totalAmount,
      pdfUrl,
    },
  });
});
