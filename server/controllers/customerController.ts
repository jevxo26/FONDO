import { Response } from "express";
import type { AuthRequest } from "../types/auth.types";
import { catchAsync } from "../utils/catchAsync";
import { sendResponse } from "../utils/sendResponse";
import * as customerService from "../services/customerService";

export const CustomerController = {
  list: catchAsync(async (req: AuthRequest, res: Response) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const search = req.query.search as string | undefined;
    const status = req.query.status as string | undefined;
    const result = await customerService.listCustomers({ page, limit, search, status });
    sendResponse(res, { statusCode: 200, data: result });
  }),

  getById: catchAsync(async (req: AuthRequest, res: Response) => {
    const id = req.params.id as string;
    const customer = await customerService.getCustomerDetail(id);
    sendResponse(res, { statusCode: 200, data: customer });
  }),

  listOrders: catchAsync(async (req: AuthRequest, res: Response) => {
    const customerId = req.params.id as string;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const status = req.query.status as string | undefined;
    const result = await customerService.listCustomerOrders(customerId, page, limit, status);
    sendResponse(res, { statusCode: 200, data: result });
  }),

  listSubscriptions: catchAsync(async (req: AuthRequest, res: Response) => {
    const customerId = req.params.id as string;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const result = await customerService.listCustomerSubscriptions(customerId, page, limit);
    sendResponse(res, { statusCode: 200, data: result });
  }),

  getWallet: catchAsync(async (req: AuthRequest, res: Response) => {
    const customerId = req.params.id as string;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const result = await customerService.getCustomerWallet(customerId, page, limit);
    sendResponse(res, { statusCode: 200, data: result });
  }),

  listPayments: catchAsync(async (req: AuthRequest, res: Response) => {
    const customerId = req.params.id as string;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const result = await customerService.listCustomerPayments(customerId, page, limit);
    sendResponse(res, { statusCode: 200, data: result });
  }),
};
