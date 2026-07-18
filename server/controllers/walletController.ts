import { Response } from "express";
import type { AuthRequest } from "../types/auth.types";
import { catchAsync } from "../utils/catchAsync";
import { sendResponse } from "../utils/sendResponse";
import * as walletService from "../services/walletService";

export const WalletController = {
  get: catchAsync(async (req: AuthRequest, res: Response) => {
    const customerId = req.user!.userId;
    const wallet = await walletService.getWallet(customerId);
    sendResponse(res, { statusCode: 200, data: wallet });
  }),

  transactions: catchAsync(async (req: AuthRequest, res: Response) => {
    const customerId = req.user!.userId;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const type = req.query.type as string | undefined;
    const result = await walletService.listTransactions(customerId, page, limit, type);
    sendResponse(res, { statusCode: 200, data: result });
  }),

  topup: catchAsync(async (req: AuthRequest, res: Response) => {
    const customerId = req.user!.userId;
    const result = await walletService.topupWallet(customerId, req.body);
    sendResponse(res, { statusCode: 201, data: result });
  }),

  topupSuccess: catchAsync(async (req: AuthRequest, res: Response) => {
    await walletService.topupSuccess(req.query as Record<string, string>);
    res.redirect(302, "/wallet");
  }),

  withdraw: catchAsync(async (req: AuthRequest, res: Response) => {
    const customerId = req.user!.userId;
    const result = await walletService.requestWithdraw(customerId, req.body);
    sendResponse(res, { statusCode: 201, data: result });
  }),

  approveWithdraw: catchAsync(async (req: AuthRequest, res: Response) => {
    const adminId = req.user!.userId;
    const id = req.params.id as string;
    const result = await walletService.approveWithdraw(adminId, id);
    sendResponse(res, { statusCode: 200, data: result });
  }),
};
