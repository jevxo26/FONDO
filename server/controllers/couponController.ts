import { Response } from "express";
import type { AuthRequest } from "../types/auth.types";
import { catchAsync } from "../utils/catchAsync";
import { sendResponse } from "../utils/sendResponse";
import * as couponService from "../services/couponService";

export const CouponController = {
  list: catchAsync(async (req: AuthRequest, res: Response) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const search = req.query.search as string | undefined;
    const status = req.query.status as string | undefined;
    const discountType = req.query.discountType as string | undefined;
    const result = await couponService.listCoupons({ page, limit, search, status, discountType });
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
