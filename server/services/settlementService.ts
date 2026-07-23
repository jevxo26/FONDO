import prisma from "../lib/prisma";
import AppError from "../utils/AppError";
import { catchServiceAsync } from "../utils/catchServiceAsync";

export const getVendorWallet = catchServiceAsync(async (vendorId: string) => {
  let wallet = await prisma.vendorWallet.findUnique({ where: { vendorId } });
  if (!wallet) {
    wallet = await prisma.vendorWallet.create({
      data: { vendorId, balance: 0, holdBalance: 0, currency: "BDT", status: "active" },
    });
  }
  return wallet;
});

export const listVendorWalletTransactions = catchServiceAsync(async (vendorId: string) => {
  const wallet = await prisma.vendorWallet.findUnique({ where: { vendorId } });
  if (!wallet) throw new AppError(404, "Vendor wallet not found");

  return prisma.vendorWalletTransaction.findMany({ where: { walletId: wallet.id }, orderBy: { createdAt: "desc" } });
});

export const listVendorSettlements = catchServiceAsync(async (vendorId: string) => {
  return prisma.vendorSettlement.findMany({ where: { vendorId }, orderBy: { createdAt: "desc" } });
});

export const getSettlementDetail = catchServiceAsync(async (settlementId: string) => {
  const settlement = await prisma.vendorSettlement.findUnique({
    where: { id: settlementId },
    include: {
      vendor: { select: { businessName: true } },
      items: true,
      transactions: true,
    },
  });
  if (!settlement) throw new AppError(404, "Settlement not found");
  return settlement;
});

export const createSettlementBatch = catchServiceAsync(
  async (data: { vendorId: string; settlementPeriodStart: string; settlementPeriodEnd: string }) => {
    const vendor = await prisma.vendor.findUnique({ where: { id: data.vendorId } });
    if (!vendor) throw new AppError(404, "Vendor not found");

    const startDate = new Date(data.settlementPeriodStart);
    const endDate = new Date(data.settlementPeriodEnd);

    const orders = await prisma.order.findMany({
      where: { vendorId: data.vendorId, placedAt: { gte: startDate, lte: endDate }, paymentStatus: "COMPLETED" },
      include: { platformRevenues: true },
    });

    if (orders.length === 0) throw new AppError(400, "No completed orders in period");

    const grossAmount = orders.reduce((sum, o) => sum + Number(o.totalAmount), 0);
    const totalCommission = orders.reduce((sum, o) => {
      const rev = o.platformRevenues?.[0];
      return sum + (rev ? Number(rev.commissionAmount) : 0);
    }, 0);
    const vatAmount = orders.reduce((sum, o) => sum + Number(o.vat), 0);
    const netAmount = grossAmount - totalCommission - vatAmount;

    const settlementNumber = `STL-${Date.now().toString(36).toUpperCase()}`;

    const settlement = await prisma.vendorSettlement.create({
      data: {
        vendorId: data.vendorId,
        settlementNumber,
        settlementPeriodStart: startDate,
        settlementPeriodEnd: endDate,
        totalOrders: orders.length,
        grossAmount,
        totalCommission,
        vatAmount,
        adjustmentAmount: 0,
        totalPayable: netAmount,
        netAmount,
        paymentStatus: "pending",
        items: {
          create: orders.map((o) => ({
            orderId: o.id,
            orderAmount: o.totalAmount,
            commission: o.platformRevenues?.[0]?.commissionAmount || 0,
            payableAmount: Number(o.totalAmount) - (Number(o.platformRevenues?.[0]?.commissionAmount) || 0),
          })),
        },
      },
      include: { items: true },
    });

    return settlement;
  },
);

export const processSettlement = catchServiceAsync(
  async (settlementId: string, data: { transactionId?: string; paymentMethod?: string; processedAt?: string }) => {
    const settlement = await prisma.vendorSettlement.findUnique({ where: { id: settlementId } });
    if (!settlement) throw new AppError(404, "Settlement not found");
    if (settlement.paymentStatus !== "pending") throw new AppError(400, "Settlement already processed");

    const wallet = await prisma.vendorWallet.findUnique({ where: { vendorId: settlement.vendorId } });
    if (!wallet) throw new AppError(404, "Vendor wallet not found");

    await prisma.$transaction([
      prisma.vendorSettlement.update({
        where: { id: settlementId },
        data: { paymentStatus: "paid", paymentDate: data.processedAt ? new Date(data.processedAt) : new Date(), transactionId: data.transactionId },
      }),
      prisma.vendorSettlementTransaction.create({
        data: {
          settlementId,
          transactionId: data.transactionId,
          amount: settlement.netAmount!,
          paymentMethod: data.paymentMethod,
          status: "completed",
          processedAt: new Date(),
        },
      }),
      prisma.vendorWallet.update({ where: { id: wallet.id }, data: { balance: { increment: Number(settlement.netAmount!) } } }),
      prisma.vendorWalletTransaction.create({
        data: {
          walletId: wallet.id,
          transactionType: "CREDIT",
          amount: settlement.netAmount!,
          balanceBefore: Number(wallet.balance),
          balanceAfter: Number(wallet.balance) + Number(settlement.netAmount!),
          referenceId: settlementId,
          remarks: `Settlement ${settlement.settlementNumber}`,
        },
      }),
    ]);

    return { success: true };
  },
);

export const getPlatformRevenue = catchServiceAsync(async (from?: string, to?: string) => {
  const where: Record<string, unknown> = {};
  if (from || to) {
    const dateFilter: Record<string, Date> = {};
    if (from) dateFilter.gte = new Date(from);
    if (to) dateFilter.lte = new Date(to);
    where.createdAt = dateFilter;
  }

  const revenues = await prisma.platformRevenue.findMany({ where });

  const totalRevenue = revenues.reduce((s, r) => s + Number(r.netRevenue), 0);
  const commissionRevenue = revenues.reduce((s, r) => s + Number(r.commissionAmount), 0);
  const deliveryRevenue = revenues.reduce((s, r) => s + Number(r.deliveryCharge), 0);
  const serviceCharge = revenues.reduce((s, r) => s + Number(r.serviceCharge), 0);
  const vat = revenues.reduce((s, r) => s + Number(r.vat), 0);

  return {
    totalRevenue,
    commissionRevenue,
    deliveryRevenue,
    subscriptionRevenue: serviceCharge,
    vat,
    period: { from: from || null, to: to || null },
  };
});
