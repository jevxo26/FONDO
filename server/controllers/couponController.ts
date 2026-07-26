import { Response } from "express";
import type { AuthRequest } from "../types/auth.types";
import { catchAsync } from "../utils/catchAsync";
import { sendResponse } from "../utils/sendResponse";
import * as couponService from "../services/couponService";

export const CouponController = {
  list: catchAsync(async (_req: AuthRequest, res: Response) => {
    const result = await couponService.listCoupons();
    sendResponse(res, { statusCode: 200, data: result });
  }),

  getById: catchAsync(async (req: AuthRequest, res: Response) => {
    const id = req.params.id as string;
    const coupon = await couponService.getCouponById(id);
    sendResponse(res, { statusCode: 200, data: coupon });
  }),

  create: catchAsync(async (req: AuthRequest, res: Response) => {
    const coupon = await couponService.createCoupon(req.body);
    sendResponse(res, { statusCode: 201, data: coupon });
  }),

  update: catchAsync(async (req: AuthRequest, res: Response) => {
    const id = req.params.id as string;
    const coupon = await couponService.updateCoupon(id, req.body);
    sendResponse(res, { statusCode: 200, data: coupon });
  }),

  delete: catchAsync(async (req: AuthRequest, res: Response) => {
    const id = req.params.id as string;
    await couponService.deleteCoupon(id);
    sendResponse(res, { statusCode: 200, message: "Coupon deleted" });
  }),
};
