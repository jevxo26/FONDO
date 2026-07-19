import { Response } from "express";
import type { AuthRequest } from "../types/auth.types";
import { catchAsync } from "../utils/catchAsync";
import { sendResponse } from "../utils/sendResponse";
import * as paymentService from "../services/paymentService";

export const PaymentController = {
  listMethods: catchAsync(async (_req: AuthRequest, res: Response) => {
    const methods = await paymentService.listPaymentMethods();
    sendResponse(res, { statusCode: 200, data: { items: methods } });
  }),

  initiate: catchAsync(async (req: AuthRequest, res: Response) => {
    const customerId = req.user!.userId;
    const result = await paymentService.initiatePayment(customerId, req.body);
    sendResponse(res, { statusCode: 201, data: result });
  }),

  success: catchAsync(async (req: AuthRequest, res: Response) => {
    const result = await paymentService.handleSuccess(req.query as Record<string, string>);
    const params = new URLSearchParams();
    if (result.orderId) params.set("orderId", result.orderId);
    if (result.transactionId) params.set("txId", result.transactionId);
    const qs = params.toString();
    res.redirect(302, result.success ? `/payment-success?${qs}` : `/payment-failed?${qs}`);
  }),

  fail: catchAsync(async (req: AuthRequest, res: Response) => {
    const result = await paymentService.handleFail(req.query as Record<string, string>);
    const params = new URLSearchParams();
    if (result.transactionId) params.set("txId", result.transactionId);
    res.redirect(302, `/payment-failed?${params.toString()}`);
  }),

  cancel: catchAsync(async (req: AuthRequest, res: Response) => {
    const result = await paymentService.handleCancel(req.query as Record<string, string>);
    const params = new URLSearchParams();
    if (result.transactionId) params.set("txId", result.transactionId);
    res.redirect(302, `/payment-cancelled?${params.toString()}`);
  }),

  ipn: catchAsync(async (req: AuthRequest, res: Response) => {
    const result = await paymentService.handleIpn(req.body);
    res.json(result);
  }),

  retry: catchAsync(async (req: AuthRequest, res: Response) => {
    const customerId = req.user!.userId;
    const id = req.params.id as string;
    const result = await paymentService.retryPayment(customerId, id, req.body);
    sendResponse(res, { statusCode: 200, data: result });
  }),

  refund: catchAsync(async (req: AuthRequest, res: Response) => {
    const adminId = req.user!.userId;
    const id = req.params.id as string;
    const result = await paymentService.refundPayment(adminId, id, req.body);
    sendResponse(res, { statusCode: 200, data: result });
  }),

  adjust: catchAsync(async (req: AuthRequest, res: Response) => {
    const adminId = req.user!.userId;
    const id = req.params.id as string;
    const result = await paymentService.adjustPayment(adminId, id, req.body);
    sendResponse(res, { statusCode: 200, data: result });
  }),

  list: catchAsync(async (req: AuthRequest, res: Response) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const status = req.query.status as string | undefined;
    const customerId = req.user!.role === "CUSTOMER" ? req.user!.userId : (req.query.customerId as string | undefined);
    const from = req.query.from as string | undefined;
    const to = req.query.to as string | undefined;
    const result = await paymentService.listPayments({ page, limit, status, customerId, from, to });
    sendResponse(res, { statusCode: 200, data: result });
  }),

  getById: catchAsync(async (req: AuthRequest, res: Response) => {
    const id = req.params.id as string;
    const payment = await paymentService.getPaymentDetail(id);
    sendResponse(res, { statusCode: 200, data: payment });
  }),
};
