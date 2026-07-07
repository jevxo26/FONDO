import { Request, Response } from 'express';
import { UserService } from '../services/userService';
import { catchAsync } from '../utils/catchAsync';
import { sendResponse } from '../utils/sendResponse';

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
    message: 'User created successfully',
  });
});

const getUserById = catchAsync(async (req: Request, res: Response) => {
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
      message: 'User not found',
    });
  }
})

const updateUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const user = await UserService.updateUser(id, req.body);

  sendResponse(res, {
    statusCode: 200,
    message: 'User updated successfully',
    data: user,
  });
})

export const UserController = {
  getAllUsers,
  createUser,
  getUserById,
  updateUser
}