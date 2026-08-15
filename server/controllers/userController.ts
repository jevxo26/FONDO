import { Request, Response } from "express";
import { UserService } from "../services/userService";
import { catchAsync } from "../utils/catchAsync";
import { sendResponse } from "../utils/sendResponse";
import { AuthRequest } from "../types/auth.types";

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const users = await UserService.getAllUsers();

  sendResponse(res, {
    statusCode: 200,
    data: users,
  });
});

const createUser = catchAsync(async (req: Request, res: Response) => {
  await UserService.createUser(req.body);

  sendResponse(res, {
    statusCode: 201,
    message: "User created successfully",
  });
});

const getUserById = catchAsync(async (req: AuthRequest, res: Response) => {
  const id = req.params.id as string;

  const user = await UserService.getUserById(id);

  if (user) {
    sendResponse(res, {
      statusCode: 200,
      data: user,
    });
  } else {
    sendResponse(res, {
      statusCode: 404,
      message: "User not found",
    });
  }
});

const updateUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const user = await UserService.updateUser(id, req.body);

  sendResponse(res, {
    statusCode: 200,
    message: "User updated successfully",
    data: user,
  });
});

const updateMe = catchAsync(async (req: AuthRequest, res: Response) => {
  const user = await UserService.updateMe(req.user!.userId, req.body);

  sendResponse(res, {
    statusCode: 200,
    message: "Profile updated successfully",
    data: user,
  });
});

const deleteMe = catchAsync(async (req: AuthRequest, res: Response) => {
  await UserService.deleteMe(req.user!.userId);

  sendResponse(res, {
    statusCode: 200,
    message: "Account deleted successfully",
  });
});

const deleteUser = catchAsync(async (req: AuthRequest, res: Response) => {
  const id = req.params.id as string;
  await UserService.deleteUser(id);

  sendResponse(res, {
    statusCode: 200,
    message: "User deleted successfully",
  });
});

export const UserController = {
  getAllUsers,
  createUser,
  getUserById,
  updateUser,
  updateMe,
  deleteMe,
  deleteUser,
};
