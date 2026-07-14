import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { catchAsync } from '../utils/catchAsync';
import AppError from '../utils/AppError';
import { AuthRequest, CustomJwtPayload } from '../types/auth.types';
import { PrismaClient, UserRoleStatus } from '@prisma/client';

const prisma = new PrismaClient();

export const verifyToken = catchAsync(async (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new AppError(401, 'Access denied. No token provided.');
  }

  const token = authHeader.split(' ')[1];

  try {
    const secret = (process.env.JWT_SECRET as string) || 'fondo'; 
    const decoded = jwt.verify(token, secret) as CustomJwtPayload;

    req.user = decoded;
    next();
  } catch (error) {
    next(new AppError(401, 'Invalid or expired token.'));
  }
});

export const authorizeRoles = (...allowedRoles: string[]) => {
  return catchAsync(async (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      throw new AppError(401, 'Authentication required. Please verify token first.');
    }

    const userRoles = await prisma.userRole.findMany({
      where: {
        userId: req.user.userId,
        status: UserRoleStatus.ACTIVE,
      },
      select: {
        role: {
          select: {
            slug: true,
          },
        },
      },
    });

    const currentRoles = userRoles.map((ur) => ur.role.slug);
    const hasPermission = currentRoles.some((role) => allowedRoles.includes(role));

    if (!hasPermission) {
      throw new AppError(403, 'Access denied. You do not have permission to access this resource.');
    }

    next();
  });
};