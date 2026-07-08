import { PrismaClient, Prisma } from '@prisma/client';
import { catchServiceAsync } from '../utils/catchServiceAsync';
import { encryptPassword } from '../utils/bcryptService';
import { sendUserDataAsResponse } from '../utils/responseStyle';

const prisma = new PrismaClient();

const getAllUsers = catchServiceAsync(async () => {
  return prisma.user.findMany();
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
    select: sendUserDataAsResponse
  });
})

const updateUser = catchServiceAsync(async (id: string, data: Prisma.UserUpdateInput) => {
  return prisma.user.update({
    where: { id },
    data,
    select: sendUserDataAsResponse
  });
});

export const UserService = {
  getAllUsers,
  createUser,
  getUserById,
  updateUser
}