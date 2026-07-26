import prisma from "../lib/prisma";
import type { Prisma } from "@prisma/client";
import AppError from "../utils/AppError";
import { catchServiceAsync } from "../utils/catchServiceAsync";
import * as sslcommerz from "./sslcommerz";

function generatePaymentNumber(): string {
  return `PAY-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
}

async function getGateway(code?: string) {
  if (code) {
    const gw = await prisma.paymentGateway.findUnique({ where: { code } });
    if (gw && gw.status === "active") return gw;
  }
  const gw = await prisma.paymentGateway.findFirst({ where: { status: "active" }, orderBy: { createdAt: "asc" } });
  if (!gw) throw new AppError(503, "No active payment gateway");
  return gw;
}

export const listPaymentMethods = catchServiceAsync(async () => {
  return prisma.paymentMethod.findMany({ where: { isActive: true } });
});

export const initiatePayment = catchServiceAsync(
  async (customerId: string, data: { orderId: string; paymentMethodId?: string; amount: number; currency?: string; gatewayCode?: string }) => {
    const gateway = await getGateway(data.gatewayCode);
    const order = await prisma.order.findUnique({ where: { id: data.orderId } });
    if (!order) throw new AppError(404, "Order not found");
    if (order.customerId !== customerId) throw new AppError(403, "Not your order");

    const existingPayment = await prisma.payment.findUnique({ where: { orderId: data.orderId } });
    if (existingPayment && existingPayment.status === "COMPLETED") {
      throw new AppError(409, "Order already paid");
    }

    const tranId = `TXN-${Date.now()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    const paymentNumber = generatePaymentNumber();

    const payment = existingPayment
      ? await prisma.payment.update({
          where: { id: existingPayment.id },
          data: { transactionId: tranId, paymentMethodId: data.paymentMethodId, amount: data.amount, currency: data.currency || "BDT", status: "PENDING", gatewayId: gateway.id },
        })
      : await prisma.payment.create({
          data: {
            paymentNumber,
            orderId: data.orderId,
            customerId,
            paymentMethodId: data.paymentMethodId,
            transactionId: tranId,
            amount: data.amount,
            currency: data.currency || "BDT",
            status: "PENDING",
            gatewayId: gateway.id,
          },
        });

    const customer = await prisma.user.findUnique({ where: { id: customerId } });
    if (!customer) throw new AppError(404, "Customer not found");

    const result = await sslcommerz.initPayment(
      { storeId: gateway.storeId!, secretKey: gateway.secretKey!, sandboxMode: gateway.sandboxMode },
      {
        totalAmount: data.amount,
        tranId,
        currency: data.currency || "BDT",
        customerName: `${customer.firstName} ${customer.lastName}`.trim() || customer.phone,
        customerPhone: customer.phone,
        customerEmail: customer.email || `${customer.phone}@fondo.bd`,
        customerAddress: "",
        successUrl: `${process.env.BASE_URL || "http://localhost:3000"}/api/payments/success`,
        failUrl: `${process.env.BASE_URL || "http://localhost:3000"}/api/payments/fail`,
        cancelUrl: `${process.env.BASE_URL || "http://localhost:3000"}/api/payments/cancel`,
      },
    );

    if (result.status !== "success") {
      await prisma.payment.update({ where: { id: payment.id }, data: { status: "FAILED", failureReason: result.failedreason } });
      throw new AppError(502, `Gateway error: ${result.failedreason || "Unknown"}`);
    }

    await prisma.paymentTransaction.create({
      data: {
        paymentId: payment.id,
        gatewayTransactionId: result.tran_id,
        transactionType: "payment",
        amount: data.amount,
        currency: data.currency || "BDT",
        status: "initiated",
        gatewayResponse: result as unknown as Prisma.InputJsonValue,
      },
    });

    return { paymentId: payment.id, gatewayUrl: result.GatewayPageURL, transactionId: tranId };
  },
);

export const handleSuccess = catchServiceAsync(async (query: Record<string, string>) => {
  const { tran_id, val_id } = query;
  if (!tran_id || !val_id) throw new AppError(400, "Missing transaction params");

  const payment = await prisma.payment.findFirst({ where: { transactionId: tran_id } });
  if (!payment) throw new AppError(404, "Payment not found");

  const gateway = payment.gatewayId
    ? (await prisma.paymentGateway.findUnique({ where: { id: payment.gatewayId } })) ?? (await getGateway())
    : await getGateway();

  const validation = await sslcommerz.validatePayment(
    { storeId: gateway.storeId!, secretKey: gateway.secretKey!, sandboxMode: gateway.sandboxMode },
    val_id,
  );

  if (validation.validated) {
    await prisma.payment.update({ where: { id: payment.id }, data: { status: "COMPLETED", paymentDate: new Date(), gatewayResponse: query as unknown as Prisma.InputJsonValue } });
    await prisma.order.update({ where: { id: payment.orderId }, data: { paymentStatus: "COMPLETED" } });
    await prisma.paymentTransaction.updateMany({
      where: { paymentId: payment.id, gatewayTransactionId: tran_id },
      data: { status: "success", gatewayTransactionId: val_id, processedAt: new Date() },
    });
  } else {
    await prisma.payment.update({ where: { id: payment.id }, data: { status: "FAILED", failureReason: "Validation failed" } });
  }

  return { success: validation.validated, orderId: payment.orderId, transactionId: tran_id };
});

export const handleFail = catchServiceAsync(async (query: Record<string, string>) => {
  const tran_id = query.tran_id;
  if (!tran_id) throw new AppError(400, "Missing transaction id");

  await prisma.payment.updateMany({
    where: { transactionId: tran_id },
    data: { status: "FAILED", failureReason: query.error || "Gateway declined" },
  });

  return { success: true, transactionId: tran_id };
});

export const handleCancel = catchServiceAsync(async (query: Record<string, string>) => {
  const tran_id = query.tran_id;
  if (!tran_id) throw new AppError(400, "Missing transaction id");

  await prisma.payment.updateMany({
    where: { transactionId: tran_id },
    data: { status: "CANCELLED", failureReason: "User cancelled" },
  });

  return { success: true, transactionId: tran_id };
});

export const handleIpn = catchServiceAsync(async (body: Record<string, string>) => {
  const tran_id = body.tran_id;
  const val_id = body.val_id;
  if (!tran_id) throw new AppError(400, "Missing transaction id");

  const payment = await prisma.payment.findFirst({ where: { transactionId: tran_id } });
  if (!payment) throw new AppError(404, "Payment not found");

  if (payment.status === "COMPLETED") return { success: true };

  if (val_id) {
    const payment = await prisma.payment.findFirst({ where: { transactionId: tran_id } });
    if (!payment) throw new AppError(404, "Payment not found");

  const gateway = payment.gatewayId
    ? (await prisma.paymentGateway.findUnique({ where: { id: payment.gatewayId } })) ?? (await getGateway())
    : await getGateway();
    const validation = await sslcommerz.validatePayment(
      { storeId: gateway.storeId!, secretKey: gateway.secretKey!, sandboxMode: gateway.sandboxMode },
      val_id,
    );
    if (validation.validated) {
      await prisma.payment.update({ where: { id: payment.id }, data: { status: "COMPLETED", paymentDate: new Date(), gatewayResponse: body as unknown as Prisma.InputJsonValue } });
      await prisma.order.update({ where: { id: payment.orderId }, data: { paymentStatus: "COMPLETED" } });
    }
  }

  return { success: true };
});

export const retryPayment = catchServiceAsync(async (customerId: string, paymentId: string, data?: { paymentMethodId?: string }) => {
  const payment = await prisma.payment.findUnique({ where: { id: paymentId } });
  if (!payment) throw new AppError(404, "Payment not found");
  if (payment.customerId !== customerId) throw new AppError(403, "Not your payment");
  if (payment.status === "COMPLETED") throw new AppError(409, "Payment already successful");

  const attemptCount = await prisma.paymentAttempt.count({ where: { paymentId } });

  await prisma.paymentAttempt.create({
    data: { paymentId, attemptNumber: attemptCount + 1, paymentMethod: data?.paymentMethodId, status: "retry" },
  });

  return initiatePayment(customerId, {
    orderId: payment.orderId,
    paymentMethodId: data?.paymentMethodId || payment.paymentMethodId || undefined,
    amount: Number(payment.amount),
    currency: payment.currency,
  });
});

export const refundPayment = catchServiceAsync(async (adminId: string, paymentId: string, data: { amount: number; reason: string }) => {
  const payment = await prisma.payment.findUnique({ where: { id: paymentId } });
  if (!payment) throw new AppError(404, "Payment not found");
  if (payment.status !== "COMPLETED") throw new AppError(400, "Can only refund successful payments");

  const gateway = payment.gatewayId
    ? (await prisma.paymentGateway.findUnique({ where: { id: payment.gatewayId } })) ?? (await getGateway())
    : await getGateway();

  const refund = await prisma.paymentRefund.create({
    data: { paymentId, orderId: payment.orderId, refundAmount: data.amount, reason: data.reason, status: "pending", processedBy: adminId },
  });

  if (gateway.storeId && gateway.secretKey) {
    const lastTxn = await prisma.paymentTransaction.findFirst({
      where: { paymentId, status: "success" },
      orderBy: { processedAt: "desc" },
    });

    if (lastTxn?.gatewayTransactionId) {
      const result = await sslcommerz.initRefund(
        { storeId: gateway.storeId, secretKey: gateway.secretKey, sandboxMode: gateway.sandboxMode },
        lastTxn.gatewayTransactionId,
        data.amount,
        data.reason,
      );

      if (result.status === "success") {
        await prisma.paymentRefund.update({
          where: { id: refund.id },
          data: { status: "processed", gatewayRefundId: result.refundRefId, processedAt: new Date() },
        });
        await prisma.payment.update({ where: { id: paymentId }, data: { status: "REFUNDED" } });
      }
    }
  }

  return refund;
});

export const adjustPayment = catchServiceAsync(
  async (adminId: string, paymentId: string, data: { adjustmentType: string; amount: number; reason: string }) => {
    const payment = await prisma.payment.findUnique({ where: { id: paymentId } });
    if (!payment) throw new AppError(404, "Payment not found");

    return prisma.paymentAdjustment.create({
      data: { paymentId, adjustmentType: data.adjustmentType, amount: data.amount, reason: data.reason, approvedBy: adminId },
    });
  },
);

export const listPayments = catchServiceAsync(async (customerId?: string) => {
  const where = customerId ? { customerId } : {};
  const items = await prisma.payment.findMany({
    where,
    orderBy: { createdAt: "desc" },
    include: { order: { select: { orderNumber: true } } },
  });
  return { items, total: items.length, page: 1, limit: items.length, totalPages: 1 };
});

export const getPaymentDetail = catchServiceAsync(async (paymentId: string) => {
  const payment = await prisma.payment.findUnique({
    where: { id: paymentId },
    include: {
      order: { select: { orderNumber: true, id: true, addressId: true } },
      transactions: { orderBy: { createdAt: "desc" } },
      refunds: true,
      adjustments: true,
      invoice: true,
    },
  });
  if (!payment) throw new AppError(404, "Payment not found");
  return payment;
});
