import { PrismaClient } from '@prisma/client';
import { catchServiceAsync } from '../utils/catchServiceAsync';
import { isPasswordValid } from '../utils/bcryptService';
import { createRefreshToken, createToken } from '../utils/jwtService';
import AppError from '../utils/AppError';
import { sendUserDataAsResponse } from '../utils/responseStyle';

const prisma = new PrismaClient();

export const loginUser = catchServiceAsync(async (email: string, password: string) => {
    const user = await prisma.user.findUnique({
        where: { email },
    });

    if (!user || !user.password) {
        throw new AppError(401, 'Invalid email or password');
    }

    const isMatch = await isPasswordValid(password, user.password);
    if (!isMatch) {
        throw new AppError(401, 'Invalid email or password');
    }

    const token = createToken(user.id, user.email, user.role);
    const refreshToken = createRefreshToken(user.id);

    const updatedUser = await prisma.user.update({
        where: { id: user.id },
        data: {
            lastLoginAt: new Date(),
        },
        select: sendUserDataAsResponse
    });

    return {
        user: updatedUser,
        token,
        refreshToken,
    };
});

export const AuthService = {
    loginUser
}