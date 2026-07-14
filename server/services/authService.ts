import { PrismaClient, UserStatus } from '@prisma/client';
import { catchServiceAsync } from '../utils/catchServiceAsync';
import { isPasswordValid } from '../utils/bcryptService';
import { createAccessToken, createRefreshToken } from '../utils/jwtService';
import AppError from '../utils/AppError';

const prisma = new PrismaClient();

type TClientInfo = {
    ipAddress: string;
    userAgent: string;
};

const loginUserFromDB = catchServiceAsync(async (email: string, password: string, clientInfo: TClientInfo) => {
    const user = await prisma.user.findUnique({
        where: { email },
    });

    if (!user || user.deletedAt || !user.password) {
        throw new AppError(401, 'Invalid email or password');
    }

    if (user.status === UserStatus.SUSPENDED) {
        throw new AppError(403, `Your account is ${user.status.toLowerCase()}. Please contact support.`);
    }

    const isMatch = await isPasswordValid(password, user.password);
    if (!isMatch) {
        throw new AppError(401, 'Invalid email or password');
    }

    const accessToken = createAccessToken(user.id, user.email);
    const refreshToken = createRefreshToken(user.id);

    const uniqueDeviceId = Buffer.from(`${user.id}-${clientInfo.userAgent}`).toString('base64').substring(0, 30);

    await prisma.userDevice.upsert({
        where: { deviceId: uniqueDeviceId },
        update: {
            ipAddress: clientInfo.ipAddress,
            lastActiveAt: new Date()
        },
        create: {
            userId: user.id,
            deviceId: uniqueDeviceId,
            deviceName: clientInfo.userAgent.substring(0, 50),
            ipAddress: clientInfo.ipAddress,
        }
    });

    await prisma.userSession.create({
        data: {
            userId: user.id,
            deviceId: uniqueDeviceId,
            accessToken: accessToken,
            refreshToken: refreshToken,
            ipAddress: clientInfo.ipAddress,
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        }
    });

    const updatedUser = await prisma.user.update({
        where: { id: user.id },
        data: {
            lastLoginAt: new Date(),
        },
        select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            phone: true,
            status: true,
            gender: true,
            roles: {
                select: {
                    userId: true,
                    roleId: true,
                    status: true,
                    role: { select: { name: true, slug: true } }
                }
            },
            createdAt: true,
        },
    });

    return {
        user: updatedUser,
        accessToken,
        refreshToken,
    };
});

export const AuthService = {
    loginUserFromDB
};