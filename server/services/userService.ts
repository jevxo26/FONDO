import { PrismaClient, Prisma } from '@prisma/client';
import { catchServiceAsync } from '../utils/catchServiceAsync';
import { encryptPassword } from '../utils/bcryptService';
import { sendUserDataAsResponse } from '../utils/responseStyle';
import { ROLES } from '../utils/roles';

const prisma = new PrismaClient();

const createUserToDB = catchServiceAsync(async (data: Prisma.UserCreateInput) => {
  if (data.password) {
    data.password = await encryptPassword(data.password);
  }

  return prisma.user.create({
    data: {
      ...data,
      profile: { create: {} },
      security: { create: {} },
      notificationSetting: { create: {} },

      roles: {
        create: {
          status: "ACTIVE",
          role: {
            connectOrCreate: {
              where: { slug: ROLES.CUSTOMER },
              create: {
                name: "Customer",
                slug: ROLES.CUSTOMER,
                isDefault: true,
              },
            },
          },
        },
      },
    },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      phone: true,
      status: true,
      roles: {
        select: {
          userId: true,
          roleId: true,
          status: true,
          role: {
            select: { name: true, slug: true }
          },
        },
      },
      createdAt: true,
    },
  });
});

const getUserByIdFromDB = catchServiceAsync(async (userId: string) => {
  return prisma.user.findUnique({
    where: {
      id: userId,
      deletedAt: null
    },
    select: sendUserDataAsResponse
  });
});

const updateUserToDB = catchServiceAsync(async (id: string, payload: Partial<Prisma.UserUpdateInput>) => {
  const dataToUpdate: Prisma.UserUpdateInput = { ...payload };

  if (dataToUpdate.password && typeof dataToUpdate.password === "string") {
    dataToUpdate.password = await encryptPassword(dataToUpdate.password);
  }

  // Todo: image update

  return prisma.user.update({
    where: { id },
    data: dataToUpdate,
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      phone: true,
      status: true,
      roles: {
        select: {
          userId: true,
          roleId: true,
          status: true,
          role: { select: { name: true, slug: true } },
        },
      },
      createdAt: true,
    },
  });
});

const getAllUsersFromDB = catchServiceAsync(async () => {
  return prisma.user.findMany({
    where: { 
      deletedAt: null 
    },
    orderBy: { 
      createdAt: "desc" 
    }, 
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      phone: true,
      status: true,
      gender: true,
      roles: {
        select: {
          userId: true,
          roleId: true,
          status: true,
          role: { select: { name: true, slug: true } },
        },
      },
      createdAt: true,
    }
  });
});

export const UserService = {
  createUserToDB,
  getUserByIdFromDB,
  updateUserToDB,
  getAllUsersFromDB
}