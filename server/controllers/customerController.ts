import { Response } from "express";
import type { AuthRequest } from "../types/auth.types";
import { catchAsync } from "../utils/catchAsync";
import { sendResponse } from "../utils/sendResponse";
import * as customerService from "../services/customerService";

export const CustomerController = {
  list: catchAsync(async (_req: AuthRequest, res: Response) => {
    const result = await customerService.listCustomers();
    sendResponse(res, { statusCode: 200, data: result });
  }),

  getById: catchAsync(async (req: AuthRequest, res: Response) => {
    const id = req.params.id as string;
    const customer = await customerService.getCustomerDetail(id);
    sendResponse(res, { statusCode: 200, data: customer });
  }),

  listOrders: catchAsync(async (req: AuthRequest, res: Response) => {
    const customerId = req.params.id as string;
    const result = await customerService.listCustomerOrders(customerId);
    sendResponse(res, { statusCode: 200, data: result });
  }),

  listSubscriptions: catchAsync(async (req: AuthRequest, res: Response) => {
    const customerId = req.params.id as string;
    const result = await customerService.listCustomerSubscriptions(customerId);
    sendResponse(res, { statusCode: 200, data: result });
  }),

  getWallet: catchAsync(async (req: AuthRequest, res: Response) => {
    const customerId = req.params.id as string;
    const result = await customerService.getCustomerWallet(customerId);
    sendResponse(res, { statusCode: 200, data: result });
  }),

  listPayments: catchAsync(async (req: AuthRequest, res: Response) => {
    const customerId = req.params.id as string;
    const result = await customerService.listCustomerPayments(customerId);
    sendResponse(res, { statusCode: 200, data: result });
  }),
};
