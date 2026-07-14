import { Request, Response } from "express";
import { AuthRequest } from "../types/auth.types";
import { catchAsync } from "../utils/catchAsync";
import { sendResponse } from "../utils/sendResponse";
import { AuthService } from "../services/authService";

const login = catchAsync(async (req: Request, res: Response) => {
  const { email, phone, password } = req.body;
  const identifier = email || phone;

  const result = await AuthService.loginUser(identifier, password);

  res.cookie("refreshToken", result.refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  sendResponse(res, {
    statusCode: 200,
    message: "Login successful",
    data: {
      user: result.user,
      token: result.token,
    },
  });
});

const register = catchAsync(async (req: Request, res: Response) => {
  const user = await AuthService.registerUser(req.body);

  sendResponse(res, {
    statusCode: 201,
    message: "Registration successful",
    data: user,
  });
});

const sendOtp = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.sendOtp(req.body);

  sendResponse(res, {
    statusCode: 200,
    message: "OTP sent successfully",
    data: result,
  });
});

const verifyOtp = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.verifyOtp(req.body);

  sendResponse(res, {
    statusCode: 200,
    message: "OTP verified successfully",
    data: result,
  });
});

const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const token = req.cookies?.refreshToken || req.body?.refreshToken;
  if (!token) {
    sendResponse(res, { statusCode: 400, message: "Refresh token is required" });
    return;
  }

  const result = await AuthService.refreshToken(token);

  sendResponse(res, {
    statusCode: 200,
    message: "Token refreshed successfully",
    data: result,
  });
});

const logout = catchAsync(async (req: Request, res: Response) => {
  const refreshToken = req.cookies?.refreshToken;

  const result = await AuthService.logoutUser(refreshToken);

  res.clearCookie("refreshToken");

  sendResponse(res, {
    statusCode: 200,
    message: result.message,
  });
});

const me = catchAsync(async (req: AuthRequest, res: Response) => {
  const user = await AuthService.getMe(req.user!.userId);

  sendResponse(res, {
    statusCode: 200,
    message: "User fetched successfully",
    data: user,
  });
});

const forgotPassword = catchAsync(async (req: Request, res: Response) => {
  const { email } = req.body;
  const result = await AuthService.forgotPassword(email);

  sendResponse(res, {
    statusCode: 200,
    message: "If the email exists, a reset link has been sent",
    data: result,
  });
});

const resetPassword = catchAsync(async (req: Request, res: Response) => {
  const { token, password } = req.body;
  const result = await AuthService.resetPassword(token, password);

  sendResponse(res, {
    statusCode: 200,
    message: result.message,
  });
});

const changePassword = catchAsync(async (req: AuthRequest, res: Response) => {
  const { currentPassword, newPassword } = req.body;
  const result = await AuthService.changePassword(
    req.user!.userId,
    currentPassword,
    newPassword,
  );

  sendResponse(res, {
    statusCode: 200,
    message: result.message,
  });
});

export const AuthController = {
  login,
  register,
  sendOtp,
  verifyOtp,
  refreshToken,
  logout,
  me,
  forgotPassword,
  resetPassword,
  changePassword,
};
