import type { InferType } from "yup";
import type { updateNotificationSchema } from "../validations/notification.validation";
import AppError from "../utils/AppError";
import { catchServiceAsync } from "../utils/catchServiceAsync";
import prisma from "../lib/prisma";

const notificationSelect = {
  pushNotification: true,
  emailNotification: true,
  smsNotification: true,
  orderNotification: true,
  paymentNotification: true,
  promotionNotification: true,
  chatNotification: true,
  marketingNotification: true,
  systemNotification: true,
} as const;

const getSettings = catchServiceAsync(async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: notificationSelect,
  });

  if (!user) {
    throw new AppError(404, "User not found");
  }

  return user;
});

const updateSettings = catchServiceAsync(
  async (userId: string, data: InferType<typeof updateNotificationSchema>) => {
    return prisma.user.update({
      where: { id: userId },
      select: notificationSelect,
      data,
    });
  },
);

export const NotificationService = {
  getSettings,
  updateSettings,
};
