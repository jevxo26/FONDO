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
  const user = await UserService.createUser(req.body);
  sendResponse(res, {
    statusCode: 201,
    message: 'User created successfully',
    data: user,
  });
});

export const UserController = {
  getAllUsers,
  createUser
}