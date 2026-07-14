import AppError from "../utils/AppError";
import { catchServiceAsync } from "../utils/catchServiceAsync";
import prisma from "../lib/prisma";

const listAddresses = catchServiceAsync(async (userId: string) => {
  return prisma.userAddress.findMany({
    where: { userId, deletedAt: null },
    orderBy: [{ isDefault: "desc" }, { createdAt: "desc" }],
  });
});

const createAddress = catchServiceAsync(
  async (userId: string, data: Record<string, any>) => {
    if (data.isDefault) {
      await prisma.userAddress.updateMany({
        where: { userId, isDefault: true },
        data: { isDefault: false },
      });
    }

    return prisma.userAddress.create({
      data: {
        userId,
        receiverName: data.receiverName,
        receiverPhone: data.receiverPhone,
        division: data.division,
        district: data.district,
        area: data.area,
        label: data.label,
        country: data.country,
        upazila: data.upazila,
        road: data.road,
        house: data.house,
        floor: data.floor,
        apartment: data.apartment,
        landmark: data.landmark,
        postalCode: data.postalCode,
        latitude: data.latitude,
        longitude: data.longitude,
        deliveryInstruction: data.deliveryInstruction,
        isDefault: data.isDefault ?? false,
      },
    });
  },
);

const updateAddress = catchServiceAsync(
  async (userId: string, addressId: string, data: Record<string, any>) => {
    const address = await prisma.userAddress.findFirst({
      where: { id: addressId, userId, deletedAt: null },
    });

    if (!address) {
      throw new AppError(404, "Address not found");
    }

    if (data.isDefault) {
      await prisma.userAddress.updateMany({
        where: { userId, isDefault: true, id: { not: addressId } },
        data: { isDefault: false },
      });
    }

    return prisma.userAddress.update({
      where: { id: addressId },
      data,
    });
  },
);

const deleteAddress = catchServiceAsync(
  async (userId: string, addressId: string) => {
    const address = await prisma.userAddress.findFirst({
      where: { id: addressId, userId, deletedAt: null },
    });

    if (!address) {
      throw new AppError(404, "Address not found");
    }

    return prisma.userAddress.update({
      where: { id: addressId },
      data: { deletedAt: new Date() },
    });
  },
);

const setDefaultAddress = catchServiceAsync(
  async (userId: string, addressId: string) => {
    const address = await prisma.userAddress.findFirst({
      where: { id: addressId, userId, deletedAt: null },
    });

    if (!address) {
      throw new AppError(404, "Address not found");
    }

    await prisma.userAddress.updateMany({
      where: { userId, isDefault: true, id: { not: addressId } },
      data: { isDefault: false },
    });

    return prisma.userAddress.update({
      where: { id: addressId },
      data: { isDefault: true },
    });
  },
);

export const AddressService = {
  listAddresses,
  createAddress,
  updateAddress,
  deleteAddress,
  setDefaultAddress,
};
