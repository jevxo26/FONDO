import { Response } from "express";
import { AuthRequest } from "../types/auth.types";
import { catchAsync } from "../utils/catchAsync";
import { sendResponse } from "../utils/sendResponse";
import AppError from "../utils/AppError";
import prisma from "../lib/prisma";
import { VendorFoodService } from "../services/vendorFoodService";

const resolveVendorId = async (req: AuthRequest) => {
  const userId = req.user!.userId;
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { vendorId: true },
  });

  let vendorId = user?.vendorId ?? null;
  if (!vendorId) {
    const staff = await prisma.vendorStaff.findFirst({
      where: { userId },
      select: { vendorId: true },
    });
    vendorId = staff?.vendorId ?? null;
  }

  if (!vendorId) throw new AppError(403, "No vendor account linked to this user");
  return vendorId;
};

const createFood = catchAsync(async (req: AuthRequest, res: Response) => {
  const vendorId = await resolveVendorId(req);
  const food = await VendorFoodService.createFood(vendorId, req.body);

  sendResponse(res, { statusCode: 201, message: "Food submitted for approval", data: food });
});

const listFoods = catchAsync(async (req: AuthRequest, res: Response) => {
  const vendorId = await resolveVendorId(req);
  const result = await VendorFoodService.listFoods({
    vendorId,
    status: req.query.status as string,
    search: req.query.search as string,
  });

  sendResponse(res, { statusCode: 200, data: result });
});

const getFood = catchAsync(async (req: AuthRequest, res: Response) => {
  const vendorId = await resolveVendorId(req);
  const food = await VendorFoodService.getFood(vendorId, req.params.id as string);

  sendResponse(res, { statusCode: 200, data: food });
});

const updateFoodStatus = catchAsync(async (req: AuthRequest, res: Response) => {
  const vendorId = await resolveVendorId(req);
  const result = await VendorFoodService.updateFoodStatus(
    vendorId,
    req.params.id as string,
    req.body.status,
  );

  sendResponse(res, { statusCode: 200, message: "Food status updated", data: result });
});

export const VendorFoodController = {
  createFood,
  listFoods,
  getFood,
  updateFoodStatus,
};
