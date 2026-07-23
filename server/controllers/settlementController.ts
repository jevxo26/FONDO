import { Response } from "express";
import type { AuthRequest } from "../types/auth.types";
import { catchAsync } from "../utils/catchAsync";
import { sendResponse } from "../utils/sendResponse";
import * as settlementService from "../services/settlementService";

export const SettlementController = {
  getVendorWallet: catchAsync(async (req: AuthRequest, res: Response) => {
    const vendorId = req.params.vendorId as string;
    const wallet = await settlementService.getVendorWallet(vendorId);
    sendResponse(res, { statusCode: 200, data: wallet });
  }),

  listVendorWalletTransactions: catchAsync(async (req: AuthRequest, res: Response) => {
    const vendorId = req.params.vendorId as string;
    const result = await settlementService.listVendorWalletTransactions(vendorId);
    sendResponse(res, { statusCode: 200, data: result });
  }),

  listVendorSettlements: catchAsync(async (req: AuthRequest, res: Response) => {
    const vendorId = req.params.vendorId as string;
    const result = await settlementService.listVendorSettlements(vendorId);
    sendResponse(res, { statusCode: 200, data: result });
  }),

  getSettlementDetail: catchAsync(async (req: AuthRequest, res: Response) => {
    const id = req.params.id as string;
    const settlement = await settlementService.getSettlementDetail(id);
    sendResponse(res, { statusCode: 200, data: settlement });
  }),

  createSettlement: catchAsync(async (req: AuthRequest, res: Response) => {
    const settlement = await settlementService.createSettlementBatch(req.body);
    sendResponse(res, { statusCode: 201, data: settlement });
  }),

  processSettlement: catchAsync(async (req: AuthRequest, res: Response) => {
    const id = req.params.id as string;
    const result = await settlementService.processSettlement(id, req.body);
    sendResponse(res, { statusCode: 200, data: result });
  }),

  getPlatformRevenue: catchAsync(async (req: AuthRequest, res: Response) => {
    const from = req.query.from as string | undefined;
    const to = req.query.to as string | undefined;
    const revenue = await settlementService.getPlatformRevenue(from, to);
    sendResponse(res, { statusCode: 200, data: revenue });
  }),
};
