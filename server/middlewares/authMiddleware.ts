import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { catchAsync } from "../utils/catchAsync";
import AppError from "../utils/AppError";
import { AuthRequest, CustomJwtPayload } from "../types/auth.types";

const JWT_SECRET = process.env.JWT_SECRET || "fallback_secret";

export const verifyToken = catchAsync(
  async (req: AuthRequest, _res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new AppError(401, "Access denied. No token provided.");
    }

    const token = authHeader.split(" ")[1];

    try {
      const decoded = jwt.verify(token, JWT_SECRET) as CustomJwtPayload;
      req.user = decoded;
      next();
    } catch {
      throw new AppError(401, "Invalid or expired token.");
    }
  },
);

export const authorize = (...roles: string[]) => {
  return catchAsync(async (req: AuthRequest, _res: Response, next: NextFunction) => {
    if (!req.user) {
      throw new AppError(401, "Authentication required.");
    }

    if (!roles.includes(req.user.role)) {
      throw new AppError(403, `Access denied. Required role: ${roles.join(" or ")}`);
    }

    next();
  });
};
