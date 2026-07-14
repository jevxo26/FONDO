import { Request, Response } from 'express';
import { UserService } from '../services/userService';
import { sendResponse } from '../utils/sendResponse';
import { PrismaClient } from '@prisma/client';
import { catchServiceAsync } from '../utils/catchServiceAsync';

const prisma = new PrismaClient();

const createUser = catchServiceAsync(async (req: Request, res: Response) => {
  const { email, phone } = req.body;

  // Duplicate guard checking
  const existingUser = await prisma.user.findFirst({
    where: {
      OR: [
        { email: email },
        ...(phone ? [{ phone: phone }] : []),
      ],
    },
  });

  if (existingUser) {
    return sendResponse(res, {
      statusCode: 400,
      message: existingUser.email === email
        ? "Email is already registered"
        : "Phone number is already registered",
    });
  }

  const result = await UserService.createUserToDB(req.body);

  sendResponse(res, {
    statusCode: 201,
    message: "User registered successfully. Please verify your account.",
    data: result,
  });
});

const getUserById = catchServiceAsync(async (req: Request, res: Response) => {
  const id = req.params.id as string;

  // Todo: cross check id
  //   const userId = req.user?.userId;

  //   if (id !== userId) {
  //     throw new AppError(403, 'You are not authorized to access this user information');
  //   }

  const result = await UserService.getUserByIdFromDB(id);

  if (!result) {
    return sendResponse(res, {
      statusCode: 404,
      message: "User not found",
      data: null,
    });
  }

  sendResponse(res, {
    statusCode: 200,
    message: "User profile data fetched successfully",
    data: result,
  });
});

const updateUser = catchServiceAsync(async (req: Request, res: Response) => {
  const id = req.params.id as string;

  // Todo: cross check id
  //   const userId = req.user?.userId;

  //   if (id !== userId) {
  //     throw new AppError(403, 'You are not authorized to access this user information');
  //   }

  const forbiddenFields = [
    "id",
    "email",
    "status",
    "isPhoneVerified",
    "isEmailVerified",
    "lastLoginAt",
    "createdAt",
    "updatedAt",
    "deletedAt",
    "profile",
    "security",
    "notificationSetting",
    "addresses",
    "devices",
    "sessions",
    "otps",
    "tokens",
    "loginHistories",
    "roles"
  ];

  const updates = Object.keys(req.body);
  const foundForbiddenFields = updates.filter((field) => forbiddenFields.includes(field));

  if (foundForbiddenFields.length > 0) {
    return sendResponse(res, {
      statusCode: 400,
      message: `Forbidden: You cannot update ${foundForbiddenFields.join(", ")}`,
      data: null,
    });
  }

  const user = await UserService.updateUserToDB(id, req.body);

  sendResponse(res, {
    statusCode: 200,
    message: 'User updated successfully',
    data: user,
  });
});

const getAllUsers = catchServiceAsync(async (req: Request, res: Response) => {
  const users = await UserService.getAllUsersFromDB();

  sendResponse(res, {
    statusCode: 200,
    message: "All users retrieved successfully",
    data: users,
  });
});

export const UserController = {
  createUser,
  getUserById,
  updateUser,
  getAllUsers
}