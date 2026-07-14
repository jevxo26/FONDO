import crypto from "crypto";
import jwt from "jsonwebtoken";
import type { Prisma } from "@prisma/client";
import AppError from "../utils/AppError";
import { encryptPassword, isPasswordValid } from "../utils/bcryptService";
import { catchServiceAsync } from "../utils/catchServiceAsync";
import { createRefreshToken, createToken } from "../utils/jwtService";
import { sendUserDataAsResponse } from "../utils/responseStyle";
import prisma from "../lib/prisma";

const loginUser = catchServiceAsync(
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

const registerUser = catchServiceAsync(
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

const sendOtp = catchServiceAsync(
  async (payload: { phone?: string; email?: string; purpose: string }) => {
    const user = await prisma.user.findFirst({
      where: {
        OR: [
          ...(payload.phone ? [{ phone: payload.phone }] : []),
          ...(payload.email ? [{ email: payload.email }] : []),
        ],
      },
    });

    const otpCode = crypto.randomInt(100000, 999999).toString();

    await prisma.userOTP.create({
      data: {
        userId: user?.id,
        phone: payload.phone,
        email: payload.email,
        otp: otpCode,
        purpose: payload.purpose,
        expiresAt: new Date(Date.now() + 10 * 60 * 1000),
        status: "active",
      },
    });

    return { otp: otpCode, message: "OTP sent successfully" };
  },
);

const verifyOtp = catchServiceAsync(
  async (payload: { phone?: string; email?: string; otp: string; purpose: string }) => {
    const otpRecord = await prisma.userOTP.findFirst({
      where: {
        ...(payload.phone ? { phone: payload.phone } : {}),
        ...(payload.email ? { email: payload.email } : {}),
        otp: payload.otp,
        purpose: payload.purpose,
        status: "active",
        expiresAt: { gte: new Date() },
      },
      orderBy: { createdAt: "desc" },
    });

    if (!otpRecord) {
      throw new AppError(400, "Invalid or expired OTP");
    }

    if (otpRecord.attemptCount >= 5) {
      throw new AppError(400, "OTP attempt limit exceeded");
    }

    await prisma.userOTP.update({
      where: { id: otpRecord.id },
      data: {
        verifiedAt: new Date(),
        status: "verified",
      },
    });

    if (otpRecord.userId) {
      if (payload.purpose === "PHONE_VERIFY" && payload.phone) {
        await prisma.user.update({
          where: { id: otpRecord.userId },
          data: { isPhoneVerified: true },
        });
      }
      if (payload.purpose === "EMAIL_VERIFY" && payload.email) {
        await prisma.user.update({
          where: { id: otpRecord.userId },
          data: { isEmailVerified: true },
        });
      }
    }

    return { message: "OTP verified successfully" };
  },
);

const refreshToken = catchServiceAsync(async (token: string) => {
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

const logoutUser = catchServiceAsync(async (refreshToken: string) => {
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

const getMe = catchServiceAsync(async (userId: string) => {
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

const forgotPassword = catchServiceAsync(async (email: string) => {
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    return { message: "If the email exists, a reset link has been sent" };
  }

  const resetToken = crypto.randomBytes(32).toString("hex");

  await prisma.userToken.create({
    data: {
      userId: user.id,
      token: crypto.createHash("sha256").update(resetToken).digest("hex"),
      type: "RESET_PASSWORD",
      expiresAt: new Date(Date.now() + 60 * 60 * 1000),
    },
  });

  return { resetToken, expiresIn: 3600 };
});

const resetPassword = catchServiceAsync(
  async (token: string, newPassword: string) => {
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const userToken = await prisma.userToken.findFirst({
      where: {
        token: hashedToken,
        type: "RESET_PASSWORD",
        revokedAt: null,
        expiresAt: { gte: new Date() },
      },
    });

    if (!userToken) {
      throw new AppError(400, "Invalid or expired reset token");
    }

    const hashedPassword = await encryptPassword(newPassword);

    await prisma.$transaction([
      prisma.user.update({
        where: { id: userToken.userId },
        data: { password: hashedPassword },
      }),
      prisma.userToken.update({
        where: { id: userToken.id },
        data: { revokedAt: new Date() },
      }),
      prisma.userSession.updateMany({
        where: { userId: userToken.userId, status: "active" },
        data: { status: "expired", logoutAt: new Date() },
      }),
    ]);

    return { message: "Password reset successful" };
  },
);

const changePassword = catchServiceAsync(
  async (userId: string, currentPassword: string, newPassword: string) => {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user || !user.password) {
      throw new AppError(400, "Invalid request");
    }

    const isMatch = await isPasswordValid(currentPassword, user.password);
    if (!isMatch) {
      throw new AppError(400, "Current password is incorrect");
    }

    const hashedPassword = await encryptPassword(newPassword);

    await prisma.$transaction([
      prisma.user.update({
        where: { id: userId },
        data: { password: hashedPassword },
      }),
      prisma.userSecurity.update({
        where: { userId },
        data: { passwordChangedAt: new Date() },
      }),
      prisma.userSession.updateMany({
        where: { userId, status: "active" },
        data: { status: "expired", logoutAt: new Date() },
      }),
    ]);

    return { message: "Password changed successfully" };
  },
);

async function trackFailedLogin(userId: string) {
  const security = await prisma.userSecurity.findUnique({
    where: { userId },
  });

  const failedCount = (security?.failedLoginCount || 0) + 1;

  await prisma.userSecurity.upsert({
    where: { userId },
    update: {
      failedLoginCount: failedCount,
      lastFailedLoginAt: new Date(),
      accountLocked: failedCount >= 5,
      accountLockedUntil: failedCount >= 5
        ? new Date(Date.now() + 30 * 60 * 1000)
        : undefined,
    },
    create: {
      userId,
      failedLoginCount: failedCount,
      lastFailedLoginAt: new Date(),
      accountLocked: failedCount >= 5,
      accountLockedUntil: failedCount >= 5
        ? new Date(Date.now() + 30 * 60 * 1000)
        : undefined,
    },
  });
}

export const AuthService = {
  loginUser,
  registerUser,
  sendOtp,
  verifyOtp,
  refreshToken,
  logoutUser,
  getMe,
  forgotPassword,
  resetPassword,
  changePassword,
};
