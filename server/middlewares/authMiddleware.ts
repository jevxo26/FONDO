import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { catchAsync } from "../utils/catchAsync";
import AppError from "../utils/AppError";
import { AuthRequest, CustomJwtPayload } from "../types/auth.types";

export const verifyToken = catchAsync(
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new AppError(401, "Access denied. No token provided.");
    }

    const token = authHeader.split(" ")[1];

    try {
      const secret = (process.env.JWT_SECRET as string) || "fallback_secret";
      const decoded = jwt.verify(token, secret) as CustomJwtPayload;

      req.user = decoded;
      next();
    } catch (error) {
      next(new AppError(401, "Invalid or expired token."));
    }
  },
);

export const isAdmin = catchAsync(async (req: AuthRequest, res: Response, next: NextFunction) => {
  if (!req.user) {
    throw new AppError(401, "Authentication required. Please verify token first.");
  }

  if (req.user.role !== "ADMIN") {
    throw new AppError(403, "Access denied. Admin privileges required.");
  }

  next();
});
