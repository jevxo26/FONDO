import { Prisma } from "@prisma/client";
import AppError from "../utils/AppError";
import { catchServiceAsync } from "../utils/catchServiceAsync";
import { encryptPassword } from "../utils/bcryptService";
import { sendUserDataAsResponse } from "../utils/responseStyle";
import prisma from "../lib/prisma";

const getAllUsers = catchServiceAsync(async () => {
  return prisma.user.findMany({
    select: sendUserDataAsResponse,
  });
});

const createUser = catchServiceAsync(async (data: Prisma.UserCreateInput) => {
  if (data.password) {
    data.password = await encryptPassword(data.password);
  }

  return prisma.user.create({ data });
});

const getUserById = catchServiceAsync(async (id: string) => {
  return prisma.user.findUnique({
    where: { id },
    select: sendUserDataAsResponse,
  });
});

const updateUser = catchServiceAsync(async (id: string, data: Prisma.UserUpdateInput) => {
  return prisma.user.update({
    where: { id },
    data,
    select: sendUserDataAsResponse,
  });
});

const updateMe = catchServiceAsync(async (id: string, data: Prisma.UserUpdateInput) => {
  const user = await prisma.user.findUnique({ where: { id } });

  if (!user) {
    throw new AppError(404, "User not found");
  }

  if (data.email) {
    const emailExists = await prisma.user.findFirst({
      where: { email: data.email as string, id: { not: id } },
    });
    if (emailExists) {
      throw new AppError(400, "Email is already in use");
    }
  }

  if (data.phone) {
    const phoneExists = await prisma.user.findFirst({
      where: { phone: data.phone as string, id: { not: id } },
    });
    if (phoneExists) {
      throw new AppError(400, "Phone is already in use");
    }
  }

  return prisma.user.update({
    where: { id },
    data,
    select: sendUserDataAsResponse,
  });
});

const deleteMe = catchServiceAsync(async (id: string) => {
  const user = await prisma.user.findUnique({ where: { id } });

  if (!user) {
    throw new AppError(404, "User not found");
  }

  return prisma.user.update({
    where: { id },
    data: { deletedAt: new Date(), status: "INACTIVE" as Prisma.UserUpdateInput["status"] },
    select: sendUserDataAsResponse,
  });
});

export const UserService = {
  getAllUsers,
  createUser,
  getUserById,
  updateUser,
  updateMe,
  deleteMe,
};
