import { catchServiceAsync } from "../utils/catchServiceAsync";
import prisma from "../lib/prisma";

const listLoginHistory = catchServiceAsync(
  async (userId: string, page: number = 1, limit: number = 20) => {
    const skip = (page - 1) * limit;

    const [items, total] = await Promise.all([
      prisma.userLoginHistory.findMany({
        where: { userId },
        orderBy: { loggedInAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.userLoginHistory.count({ where: { userId } }),
    ]);

    return {
      items,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  },
);

export const LoginHistoryService = {
  listLoginHistory,
};
