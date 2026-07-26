import crypto from "crypto";
import prisma from "../lib/prisma";
import AppError from "../utils/AppError";
import { catchServiceAsync } from "../utils/catchServiceAsync";
import { encryptPassword, isPasswordValid } from "../utils/bcryptService";

export const sendOtp = catchServiceAsync(
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

export const verifyOtp = catchServiceAsync(
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

export const forgotPassword = catchServiceAsync(async (email: string) => {
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

export const resetPassword = catchServiceAsync(
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

export const changePassword = catchServiceAsync(
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

export async function trackFailedLogin(userId: string) {
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
