import { Response } from "express";
import { AuthRequest } from "../types/auth.types";
import { catchAsync } from "../utils/catchAsync";
import { sendResponse } from "../utils/sendResponse";
import { AddressService } from "../services/addressService";

const list = catchAsync(async (req: AuthRequest, res: Response) => {
  const addresses = await AddressService.listAddresses(req.user!.userId);

  sendResponse(res, {
    statusCode: 200,
    data: { items: addresses },
  });
});

const create = catchAsync(async (req: AuthRequest, res: Response) => {
  const address = await AddressService.createAddress(req.user!.userId, req.body);

  sendResponse(res, {
    statusCode: 201,
    message: "Address created successfully",
    data: address,
  });
});

const update = catchAsync(async (req: AuthRequest, res: Response) => {
  const id = req.params.id as string;
  const address = await AddressService.updateAddress(
    req.user!.userId,
    id,
    req.body,
  );

  sendResponse(res, {
    statusCode: 200,
    message: "Address updated successfully",
    data: address,
  });
});

const remove = catchAsync(async (req: AuthRequest, res: Response) => {
  const id = req.params.id as string;
  await AddressService.deleteAddress(req.user!.userId, id);

  sendResponse(res, {
    statusCode: 200,
    message: "Address deleted successfully",
  });
});

const setDefault = catchAsync(async (req: AuthRequest, res: Response) => {
  const id = req.params.id as string;
  const address = await AddressService.setDefaultAddress(
    req.user!.userId,
    id,
  );

  sendResponse(res, {
    statusCode: 200,
    message: "Default address updated successfully",
    data: address,
  });
});

export const AddressController = {
  list,
  create,
  update,
  remove,
  setDefault,
};
