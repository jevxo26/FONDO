import prisma from "../lib/prisma";
import AppError from "../utils/AppError";
import { catchServiceAsync } from "../utils/catchServiceAsync";


export const listCustomers = catchServiceAsync(async () => {
  const users = await prisma.user.findMany({
    where: { role: "CUSTOMER", deletedAt: null },
    orderBy: { createdAt: "desc" },
    include: {
      _count: { select: { orders: true, subscriptions: true } },
      wallet: { select: { balance: true, holdBalance: true, status: true } },
    },
  });

  const userIds = users.map((u) => u.id);

  const [paymentAggrs, lastOrders] = await Promise.all([
    prisma.payment.groupBy({
      by: ["customerId"],
      where: { customerId: { in: userIds }, status: "COMPLETED" },
      _sum: { amount: true },
    }),
    prisma.order.groupBy({
      by: ["customerId"],
      where: { customerId: { in: userIds }, deletedAt: null },
      _max: { placedAt: true },
    }),
  ]);

  const spentMap = new Map(paymentAggrs.map((p) => [p.customerId, Number(p._sum.amount ?? 0)]));
  const lastOrderMap = new Map(lastOrders.map((o) => [o.customerId, o._max.placedAt]));

  const enriched = users.map((user) => ({
    id: user.id,
    fullName: `${user.firstName} ${user.lastName}`.trim(),
    phone: user.phone,
    email: user.email,
    status: user.status,
    totalOrders: user._count?.orders ?? 0,
    totalSpent: spentMap.get(user.id) ?? 0,
    subscriptionCount: user._count?.subscriptions ?? 0,
    walletBalance: user.wallet ? Number(user.wallet.balance) : 0,
    lastOrderDate: lastOrderMap.get(user.id) ?? null,
    joinedAt: user.createdAt,
  }));

  return { items: enriched, total: enriched.length, page: 1, limit: enriched.length, totalPages: 1 };
});

export const getCustomerDetail = catchServiceAsync(async (customerId: string) => {
  const user = await prisma.user.findFirst({
    where: { id: customerId, role: "CUSTOMER", deletedAt: null },
    include: {
      profile: true,
      addresses: true,
      wallet: { include: { transactions: { orderBy: { createdAt: "desc" }, take: 10 } } },
      _count: { select: { orders: true, subscriptions: true, payments: true } },
    },
  });

  if (!user) throw new AppError(404, "Customer not found");

  const aggr = await prisma.payment.aggregate({
    where: { customerId: user.id, status: "COMPLETED" },
    _sum: { amount: true },
  });
  const totalSpent = Number(aggr._sum.amount ?? 0);

  const lastOrder = await prisma.order.findFirst({
    where: { customerId: user.id, deletedAt: null },
    orderBy: { placedAt: "desc" },
    select: { placedAt: true, orderStatus: true, totalAmount: true },
  });

  return {
    id: user.id,
    fullName: `${user.firstName} ${user.lastName}`.trim(),
    phone: user.phone,
    email: user.email,
    avatar: user.avatar,
    gender: user.gender,
    dateOfBirth: user.dateOfBirth,
    status: user.status,
    isPhoneVerified: user.isPhoneVerified,
    isEmailVerified: user.isEmailVerified,
    lastLoginAt: user.lastLoginAt,
    joinedAt: user.createdAt,
    profile: user.profile,
    addresses: user.addresses,
    wallet: user.wallet,
    totalOrders: user._count?.orders ?? 0,
    totalSubscriptions: user._count?.subscriptions ?? 0,
    totalPayments: user._count?.payments ?? 0,
    totalSpent,
    lastOrder,
  };
});

export const listCustomerOrders = catchServiceAsync(async (customerId: string) => {
  const items = await prisma.order.findMany({
    where: { customerId, deletedAt: null },
    orderBy: { placedAt: "desc" },
    include: { items: { include: { food: { select: { id: true, name: true, images: true } } } }, payment: { select: { status: true, amount: true } } },
  });
  return { items, total: items.length, page: 1, limit: items.length, totalPages: 1 };
});

export const listCustomerSubscriptions = catchServiceAsync(async (customerId: string) => {
  const items = await prisma.subscription.findMany({
    where: { customerId },
    orderBy: { createdAt: "desc" },
  });
  return { items, total: items.length, page: 1, limit: items.length, totalPages: 1 };
});

export const getCustomerWallet = catchServiceAsync(async (customerId: string) => {
  const wallet = await prisma.customerWallet.findUnique({
    where: { customerId },
  });

  if (!wallet) {
    return { wallet: null, transactions: [] };
  }

  const transactions = await prisma.customerWalletTransaction.findMany({
    where: { walletId: wallet.id },
    orderBy: { createdAt: "desc" },
  });

  return { wallet, transactions };
});

export const listCustomerPayments = catchServiceAsync(async (customerId: string) => {
  const items = await prisma.payment.findMany({
    where: { customerId },
    orderBy: { createdAt: "desc" },
    include: { order: { select: { orderNumber: true } } },
  });
  return { items, total: items.length, page: 1, limit: items.length, totalPages: 1 };
});
