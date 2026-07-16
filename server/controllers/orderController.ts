import { Response } from "express";
import type { AuthRequest } from "../types/auth.types";
import { catchAsync } from "../utils/catchAsync";
import { sendResponse } from "../utils/sendResponse";
import * as orderService from "../services/orderService";

export const OrderController = {
  list: catchAsync(async (req: AuthRequest, res: Response) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const status = req.query.status as string | undefined;
    const result = await orderService.listMyOrders(req.user!.userId, page, limit, status);
    sendResponse(res, { statusCode: 200, data: result });
  }),

  getById: catchAsync(async (req: AuthRequest, res: Response) => {
    const id = req.params.id as string;
    const order = await orderService.getOrderDetail(id, req.user?.userId, req.user?.role);
    sendResponse(res, { statusCode: 200, data: order });
  }),

  update: catchAsync(async (req: AuthRequest, res: Response) => {
    const id = req.params.id as string;
    const { notes, deliverySchedule } = req.body;
    const order = await orderService.updateOrder(id, req.user!.userId, { notes, deliverySchedule });
    sendResponse(res, { statusCode: 200, data: order });
  }),

  softDelete: catchAsync(async (req: AuthRequest, res: Response) => {
    const id = req.params.id as string;
    await orderService.softDeleteOrder(id);
    sendResponse(res, { statusCode: 200, message: "Order deleted" });
  }),

  cancel: catchAsync(async (req: AuthRequest, res: Response) => {
    const id = req.params.id as string;
    const { reason, cancelledBy } = req.body;
    const result = await orderService.cancelOrder(id, reason, cancelledBy, req.user!.userId);
    sendResponse(res, { statusCode: 200, data: result });
  }),

  updateStatus: catchAsync(async (req: AuthRequest, res: Response) => {
    const id = req.params.id as string;
    const { status, remarks } = req.body;
    await orderService.updateStatus(id, status, remarks, req.user!.userId);
    sendResponse(res, { statusCode: 200, message: `Order status updated to ${status}` });
  }),

  assignVendor: catchAsync(async (req: AuthRequest, res: Response) => {
    const id = req.params.id as string;
    const { vendorId } = req.body;
    const order = await orderService.assignVendor(id, vendorId);
    sendResponse(res, { statusCode: 200, data: order });
  }),

  assignRider: catchAsync(async (req: AuthRequest, res: Response) => {
    const id = req.params.id as string;
    const { riderId } = req.body;
    await orderService.assignRider(id, riderId);
    sendResponse(res, { statusCode: 200, message: "Rider assigned" });
  }),

  listAll: catchAsync(async (req: AuthRequest, res: Response) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const { status, paymentStatus, vendorId, customerId, dateFrom, dateTo } = req.query as Record<string, string | undefined>;
    const result = await orderService.listAllOrders({
      page, limit, status, paymentStatus, vendorId, customerId, dateFrom, dateTo,
    });
    sendResponse(res, { statusCode: 200, data: result });
  }),

  listVendor: catchAsync(async (req: AuthRequest, res: Response) => {
    const vendorId = req.params.vendorId as string;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const status = req.query.status as string | undefined;
    const result = await orderService.listVendorOrders(vendorId, page, limit, status);
    sendResponse(res, { statusCode: 200, data: result });
  }),

  processRefund: catchAsync(async (req: AuthRequest, res: Response) => {
    const orderId = req.params.orderId as string;
    const { amount, refundMethod, reason } = req.body;
    const refund = await orderService.processRefund(orderId, amount, refundMethod, reason, req.user!.userId);
    sendResponse(res, { statusCode: 201, data: refund });
  }),

  listRefunds: catchAsync(async (req: AuthRequest, res: Response) => {
    const orderId = req.params.orderId as string;
    const refunds = await orderService.listRefunds(orderId);
    sendResponse(res, { statusCode: 200, data: refunds });
  }),

  submitFeedback: catchAsync(async (req: AuthRequest, res: Response) => {
    const orderId = req.params.orderId as string;
    const { rating, review } = req.body;
    const feedback = await orderService.submitFeedback(orderId, req.user!.userId, rating, review);
    sendResponse(res, { statusCode: 201, data: feedback });
  }),

  getInvoice: catchAsync(async (req: AuthRequest, res: Response) => {
    const orderId = req.params.orderId as string;
    const invoice = await orderService.getInvoice(orderId);
    sendResponse(res, { statusCode: 200, data: invoice });
  }),

  updateMealStatus: catchAsync(async (req: AuthRequest, res: Response) => {
    const mealId = req.params.id as string;
    const { status } = req.body;
    const meal = await orderService.updateMealStatus(mealId, status);
    sendResponse(res, { statusCode: 200, data: meal });
  }),
};
