import prisma from "../lib/prisma";
import AppError from "../utils/AppError";
import { catchServiceAsync } from "../utils/catchServiceAsync";
import { paginate } from "../utils/pagination";

export const listCustomers = catchServiceAsync(
  async (query: { page?: number; limit?: number; search?: string; status?: string }) => {
    const where: Record<string, unknown> = { role: "CUSTOMER", deletedAt: null };
    if (query.status) where.status = query.status;

    if (query.search) {
      const s = query.search;
      where.OR = [
        { firstName: { contains: s, mode: "insensitive" } },
        { lastName: { contains: s, mode: "insensitive" } },
        { email: { contains: s, mode: "insensitive" } },
        { phone: { contains: s, mode: "insensitive" } },
      ];
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result = await paginate<any>(
      prisma.user,
      {
        where,
        orderBy: { createdAt: "desc" },
        include: {
          _count: { select: { orders: true, subscriptions: true } },
          wallet: { select: { balance: true, holdBalance: true, status: true } },
        },
      },
      query.page ?? 1,
      query.limit ?? 20,
    );

    const enriched = await Promise.all(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      result.items.map(async (user: any) => {
        const aggr = await prisma.payment.aggregate({
          where: { customerId: user.id, status: "COMPLETED" },
          _sum: { amount: true },
        });
        const totalSpent = Number(aggr._sum.amount ?? 0);

        const lastOrder = await prisma.order.findFirst({
          where: { customerId: user.id, deletedAt: null },
          orderBy: { placedAt: "desc" },
          select: { placedAt: true },
        });

        return {
          id: user.id,
          fullName: `${user.firstName} ${user.lastName}`.trim(),
          phone: user.phone,
          email: user.email,
          status: user.status,
          totalOrders: user._count?.orders ?? 0,
          totalSpent,
          subscriptionCount: user._count?.subscriptions ?? 0,
          walletBalance: user.wallet ? Number(user.wallet.balance) : 0,
          lastOrderDate: lastOrder?.placedAt ?? null,
          joinedAt: user.createdAt,
        };
      }),
    );

    return {
      items: enriched,
      total: result.total,
      page: result.page,
      limit: result.limit,
      totalPages: result.totalPages,
    };
  },
);

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

export const listCustomerOrders = catchServiceAsync(
  async (customerId: string, page: number, limit: number, status?: string) => {
    const where: Record<string, unknown> = { customerId, deletedAt: null };
    if (status) where.orderStatus = status;

    return paginate(
      prisma.order,
      {
        where,
        orderBy: { placedAt: "desc" },
        include: { items: { include: { food: { select: { id: true, name: true, image: true } } } }, payment: { select: { status: true, amount: true } } },
      },
      page,
      limit,
    );
  },
);

export const listCustomerSubscriptions = catchServiceAsync(
  async (customerId: string, page: number, limit: number) => {
    return paginate(
      prisma.subscription,
      { where: { customerId }, orderBy: { createdAt: "desc" } },
      page,
      limit,
    );
  },
);

export const getCustomerWallet = catchServiceAsync(
  async (customerId: string, page: number, limit: number) => {
    const wallet = await prisma.customerWallet.findUnique({
      where: { customerId },
    });

    if (!wallet) {
      return { wallet: null, transactions: { items: [], total: 0, page: 1, limit, totalPages: 0 } };
    }

    const transactions = await paginate(
      prisma.customerWalletTransaction,
      { where: { walletId: wallet.id }, orderBy: { createdAt: "desc" } },
      page,
      limit,
    );

    return { wallet, transactions };
  },
);

export const listCustomerPayments = catchServiceAsync(
  async (customerId: string, page: number, limit: number) => {
    return paginate(
      prisma.payment,
      {
        where: { customerId },
        orderBy: { createdAt: "desc" },
        include: { order: { select: { orderNumber: true } } },
      },
      page,
      limit,
    );
  },
);
