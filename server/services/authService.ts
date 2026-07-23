import jwt from "jsonwebtoken";
import type { Prisma } from "@prisma/client";
import AppError from "../utils/AppError";
import { encryptPassword, isPasswordValid } from "../utils/bcryptService";
import { catchServiceAsync } from "../utils/catchServiceAsync";
import { createRefreshToken, createToken } from "../utils/jwtService";
import { sendUserDataAsResponse } from "../utils/responseStyle";
import prisma from "../lib/prisma";
import { trackFailedLogin } from "./authOtpService";

export const loginUser = catchServiceAsync(
  async (identifier: string, password: string) => {
    const isEmail = identifier.includes("@");
    const user = await prisma.user.findFirst({
      where: isEmail ? { email: identifier } : { phone: identifier },
    });

    if (!user || !user.password) {
      throw new AppError(401, "Invalid email/phone or password");
    }

    const isMatch = await isPasswordValid(password, user.password);
    if (!isMatch) {
      await trackFailedLogin(user.id);
      throw new AppError(401, "Invalid email/phone or password");
    }

    const token = createToken(user.id, user.email, user.role);
    const refreshToken = createRefreshToken(user.id);

    await prisma.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() },
    });

    await prisma.userSession.create({
      data: {
        userId: user.id,
        accessToken: token,
        refreshToken,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        status: "active",
      },
    });

    await prisma.userLoginHistory.create({
      data: {
        userId: user.id,
        loginMethod: isEmail ? "email" : "phone",
        loginStatus: "success",
        loggedInAt: new Date(),
      },
    });

    const updatedUser = await prisma.user.findUnique({
      where: { id: user.id },
      select: sendUserDataAsResponse,
    });

    return { user: updatedUser, token, refreshToken };
  },
);

export const registerUser = catchServiceAsync(
  async (data: {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    password: string;
    gender?: string;
    avatar?: string;
    dateOfBirth?: Date;
  }) => {
    const existing = await prisma.user.findFirst({
      where: {
        OR: [{ email: data.email }, { phone: data.phone }],
      },
    });

    if (existing) {
      if (existing.email === data.email) {
        throw new AppError(400, "Email is already registered");
      }
      throw new AppError(400, "Phone number is already registered");
    }

    const hashedPassword = await encryptPassword(data.password);

    const user = await prisma.user.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone,
        email: data.email,
        password: hashedPassword,
        gender: data.gender as Prisma.UserCreateInput["gender"],
        avatar: data.avatar,
        dateOfBirth: data.dateOfBirth,
        profile: { create: {} },
        notificationSetting: { create: {} },
        security: { create: {} },
      },
      select: sendUserDataAsResponse,
    });

    return user;
  },
);

export const refreshToken = catchServiceAsync(async (token: string) => {
  const decoded = jwt.verify(
    token,
    (process.env.JWT_REFRESH_SECRET as string) || "refresh_secret",
  ) as { userId: string };

  const session = await prisma.userSession.findFirst({
    where: {
      refreshToken: token,
      status: "active",
      expiresAt: { gte: new Date() },
    },
  });

  if (!session) {
    throw new AppError(401, "Invalid or expired refresh token");
  }

  const user = await prisma.user.findUnique({
    where: { id: decoded.userId },
  });

  if (!user) {
    throw new AppError(401, "User not found");
  }

  const newAccessToken = createToken(user.id, user.email, user.role);

  await prisma.userSession.update({
    where: { id: session.id },
    data: { accessToken: newAccessToken },
  });

  return { token: newAccessToken };
});

export const logoutUser = catchServiceAsync(async (refreshToken: string) => {
  if (!refreshToken) {
    throw new AppError(400, "Refresh token is required");
  }

  const session = await prisma.userSession.findFirst({
    where: { refreshToken, status: "active" },
  });

  if (session) {
    await prisma.userSession.update({
      where: { id: session.id },
      data: { status: "logged_out", logoutAt: new Date() },
    });

    await prisma.userLoginHistory.updateMany({
      where: { userId: session.userId, loggedOutAt: null },
      data: { loggedOutAt: new Date() },
    });
  }

  return { message: "Logged out successfully" };
});

export const getMe = catchServiceAsync(async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      ...sendUserDataAsResponse,
      profile: true,
      addresses: {
        where: { deletedAt: null },
        orderBy: { isDefault: "desc" },
      },
      notificationSetting: true,
    },
  });

  if (!user) {
    throw new AppError(404, "User not found");
  }

  return user;
});
