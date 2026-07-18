import prisma from "../lib/prisma";
import AppError from "../utils/AppError";
import { catchServiceAsync } from "../utils/catchServiceAsync";
import { paginate } from "../utils/pagination";
import * as sslcommerz from "./sslcommerz";

async function getOrCreateWallet(customerId: string) {
  let wallet = await prisma.customerWallet.findUnique({ where: { customerId } });
  if (!wallet) {
    const walletNumber = `WAL-${Date.now().toString(36).toUpperCase()}`;
    wallet = await prisma.customerWallet.create({
      data: { customerId, walletNumber, balance: 0, holdBalance: 0, currency: "BDT", status: "active" },
    });
  }
  return wallet;
}

export const getWallet = catchServiceAsync(async (customerId: string) => {
  return getOrCreateWallet(customerId);
});

export const listTransactions = catchServiceAsync(async (customerId: string, page = 1, limit = 20, type?: string) => {
  const wallet = await getOrCreateWallet(customerId);
  const where: Record<string, unknown> = { walletId: wallet.id };
  if (type) where.transactionType = type.toUpperCase();

  return paginate(prisma.customerWalletTransaction, { where, orderBy: { createdAt: "desc" } }, page, limit);
});

export const topupWallet = catchServiceAsync(async (customerId: string, data: { amount: number; paymentMethodId?: string }) => {
  const wallet = await getOrCreateWallet(customerId);

  const gateway = await prisma.paymentGateway.findFirst({ where: { status: "active" }, orderBy: { createdAt: "asc" } });
  if (!gateway) throw new AppError(503, "No active payment gateway");

  const customer = await prisma.user.findUnique({ where: { id: customerId } });
  if (!customer) throw new AppError(404, "Customer not found");

  const tranId = `TOPUP-${Date.now()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

  const topup = await prisma.walletTopup.create({
    data: { walletId: wallet.id, amount: data.amount, status: "pending" },
  });

  const result = await sslcommerz.initPayment(
    { storeId: gateway.storeId!, secretKey: gateway.secretKey!, sandboxMode: gateway.sandboxMode },
    {
      totalAmount: data.amount,
      tranId,
      currency: "BDT",
      customerName: `${customer.firstName} ${customer.lastName}`.trim() || customer.phone,
      customerPhone: customer.phone,
      customerEmail: customer.email || `${customer.phone}@fondo.bd`,
      customerAddress: "",
      successUrl: `${process.env.BASE_URL || "http://localhost:3000"}/api/wallet/topup/success?topupId=${topup.id}`,
      failUrl: `${process.env.BASE_URL || "http://localhost:3000"}/api/wallet/topup/fail?topupId=${topup.id}`,
      cancelUrl: `${process.env.BASE_URL || "http://localhost:3000"}/api/wallet/topup/cancel?topupId=${topup.id}`,
    },
  );

  if (result.status !== "success") {
    await prisma.walletTopup.update({ where: { id: topup.id }, data: { status: "failed" } });
    throw new AppError(502, `Gateway error: ${result.failedreason || "Unknown"}`);
  }

  return { paymentId: topup.id, gatewayUrl: result.GatewayPageURL };
});

export const topupSuccess = catchServiceAsync(async (query: Record<string, string>) => {
  const { topupId, tran_id, val_id } = query;
  if (!topupId) throw new AppError(400, "Missing topupId");

  const topup = await prisma.walletTopup.findUnique({ where: { id: topupId }, include: { wallet: true } });
  if (!topup) throw new AppError(404, "Topup not found");
  if (topup.status === "completed") return { success: true };

  if (val_id) {
    const gateway = await prisma.paymentGateway.findFirst({ where: { status: "active" } });
    if (gateway?.storeId && gateway?.secretKey) {
      const validation = await sslcommerz.validatePayment(
        { storeId: gateway.storeId, secretKey: gateway.secretKey, sandboxMode: gateway.sandboxMode },
        val_id,
      );
      if (validation.validated) {
        await prisma.$transaction([
          prisma.walletTopup.update({ where: { id: topupId }, data: { status: "completed", paymentId: tran_id } }),
          prisma.customerWallet.update({ where: { id: topup.wallet.id }, data: { balance: { increment: Number(topup.amount) } } }),
          prisma.customerWalletTransaction.create({
            data: {
              walletId: topup.wallet.id,
              transactionType: "CREDIT",
              amount: topup.amount,
              balanceBefore: Number(topup.wallet.balance),
              balanceAfter: Number(topup.wallet.balance) + Number(topup.amount),
              referenceType: "topup",
              referenceId: topupId,
              remarks: "Wallet topup via SSLCommerz",
            },
          }),
        ]);
      }
    }
  }

  return { success: true };
});

export const requestWithdraw = catchServiceAsync(
  async (customerId: string, data: { amount: number; withdrawMethod: string; accountNumber: string }) => {
    const wallet = await getOrCreateWallet(customerId);

    if (Number(wallet.balance) < data.amount) throw new AppError(400, "Insufficient balance");

    const withdraw = await prisma.walletWithdraw.create({
      data: { walletId: wallet.id, amount: data.amount, withdrawMethod: data.withdrawMethod, accountNumber: data.accountNumber, status: "pending" },
    });

    await prisma.customerWallet.update({
      where: { id: wallet.id },
      data: { holdBalance: { increment: data.amount } },
    });

    return withdraw;
  },
);

export const approveWithdraw = catchServiceAsync(async (adminId: string, withdrawId: string) => {
  const withdraw = await prisma.walletWithdraw.findUnique({ where: { id: withdrawId }, include: { wallet: true } });
  if (!withdraw) throw new AppError(404, "Withdraw request not found");
  if (withdraw.status !== "pending") throw new AppError(400, "Withdraw already processed");

  await prisma.$transaction([
    prisma.walletWithdraw.update({ where: { id: withdrawId }, data: { status: "approved", approvedBy: adminId, processedAt: new Date() } }),
    prisma.customerWallet.update({ where: { id: withdraw.wallet.id }, data: { holdBalance: { decrement: Number(withdraw.amount) }, balance: { decrement: Number(withdraw.amount) } } }),
    prisma.customerWalletTransaction.create({
      data: {
        walletId: withdraw.wallet.id,
        transactionType: "DEBIT",
        amount: withdraw.amount,
        balanceBefore: Number(withdraw.wallet.balance),
        balanceAfter: Number(withdraw.wallet.balance) - Number(withdraw.amount),
        referenceType: "withdraw",
        referenceId: withdrawId,
        remarks: "Withdrawal approved",
      },
    }),
  ]);

  return { success: true };
});
