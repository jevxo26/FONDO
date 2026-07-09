import { Request, Response } from 'express';
import { catchAsync } from '../utils/catchAsync';
import { sendResponse } from '../utils/sendResponse';
import { AuthService } from '../services/authService';

const login = catchAsync(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    sendResponse(res, {
      statusCode: 400,
      message: 'Email and password are required',
    });
    return;
  }
  const result = await AuthService.loginUser(email, password);

  // Set HTTP-only cookie for refresh token
  res.cookie('refreshToken', result.refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  sendResponse(res, {
    statusCode: 200,
    message: 'Login successful',
    data: {
      user: result.user,
      token: result.token,
    },
  });
});

export const AuthController = {
  login
}