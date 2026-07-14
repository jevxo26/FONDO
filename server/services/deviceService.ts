import type { InferType } from "yup";
import type { registerDeviceSchema } from "../validations/device.validation";
import AppError from "../utils/AppError";
import { catchServiceAsync } from "../utils/catchServiceAsync";
import prisma from "../lib/prisma";

const listDevices = catchServiceAsync(async (userId: string) => {
  return prisma.userDevice.findMany({
    where: { userId },
    orderBy: { lastActiveAt: "desc" },
  });
});

const registerDevice = catchServiceAsync(
  async (userId: string, data: InferType<typeof registerDeviceSchema>) => {
    const existing = await prisma.userDevice.findFirst({
      where: { userId, deviceId: data.deviceId },
    });

    if (existing) {
      return prisma.userDevice.update({
        where: { id: existing.id },
        data: { ...data, lastActiveAt: new Date() },
      });
    }

    return prisma.userDevice.create({
      data: {
        userId,
        deviceId: data.deviceId,
        deviceType: data.deviceType,
        pushToken: data.pushToken,
        deviceName: data.deviceName,
        operatingSystem: data.operatingSystem,
        osVersion: data.osVersion,
        appVersion: data.appVersion,
        browser: data.browser,
        ipAddress: data.ipAddress,
        lastActiveAt: new Date(),
      },
    });
  },
);

const unregisterDevice = catchServiceAsync(
  async (userId: string, deviceId: string) => {
    const device = await prisma.userDevice.findFirst({
      where: { id: deviceId, userId },
    });

    if (!device) {
      throw new AppError(404, "Device not found");
    }

    return prisma.userDevice.delete({
      where: { id: deviceId },
    });
  },
);

export const DeviceService = {
  listDevices,
  registerDevice,
  unregisterDevice,
};
