import { Request, Response } from 'express';
import { sendResponse } from '../utils/sendResponse';
import { AuthService } from '../services/authService';
import { catchAsync } from '../utils/catchAsync';

const login = catchAsync(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return sendResponse(res, {
      statusCode: 400,
      message: 'Email and password are required',
    });
  }

  const ipAddress = (req.ip || req.headers['x-forwarded-for'] as string || req.socket.remoteAddress) || 'unknown';
  const userAgent = (req.headers['user-agent'] as string) || 'Unknown Device';

  const result = await AuthService.loginUserFromDB(email, password, { ipAddress, userAgent });

  // HTTP-only cookie
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
      accesToken: result.accessToken,
    },
  });
});

export const AuthController = {
  login
};