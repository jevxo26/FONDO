import { PrismaClient, Prisma } from '@prisma/client';
import { catchServiceAsync } from '../utils/catchServiceAsync';

const prisma = new PrismaClient();

const getAllUsers = catchServiceAsync(async () => {
  return prisma.user.findMany();
});

const createUser = catchServiceAsync(async (data: Prisma.UserCreateInput) => {
  return prisma.user.create({ data });
});

export const UserService = {
  getAllUsers,
  createUser
}