import { catchServiceAsync } from "../utils/catchServiceAsync";
import prisma from "../lib/prisma";

const listLoginHistory = catchServiceAsync(async (userId: string) => {
  return prisma.userLoginHistory.findMany({
    where: { userId },
    orderBy: { loggedInAt: "desc" },
  });
});

export const LoginHistoryService = {
  listLoginHistory,
};
