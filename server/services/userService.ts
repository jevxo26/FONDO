import { PrismaClient, Prisma } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { catchServiceAsync } from '../utils/catchServiceAsync';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

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