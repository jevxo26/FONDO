import AppError from "../utils/AppError";
import { catchServiceAsync } from "../utils/catchServiceAsync";
import prisma from "../lib/prisma";

const getSettings = catchServiceAsync(async (userId: string) => {
  const settings = await prisma.userNotificationSetting.findUnique({
    where: { userId },
  });

  if (!settings) {
    throw new AppError(404, "Notification settings not found");
  }

  return settings;
});

const updateSettings = catchServiceAsync(
  async (userId: string, data: Record<string, any>) => {
    return prisma.userNotificationSetting.upsert({
      where: { userId },
      update: data,
      create: { userId, ...data },
    });
  },
);

export const NotificationService = {
  getSettings,
  updateSettings,
};
