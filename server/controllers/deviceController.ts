import { Response } from "express";
import { AuthRequest } from "../types/auth.types";
import { catchAsync } from "../utils/catchAsync";
import { sendResponse } from "../utils/sendResponse";
import { DeviceService } from "../services/deviceService";

const list = catchAsync(async (req: AuthRequest, res: Response) => {
  const devices = await DeviceService.listDevices(req.user!.userId);

  sendResponse(res, {
    statusCode: 200,
    data: { items: devices },
  });
});

const register = catchAsync(async (req: AuthRequest, res: Response) => {
  const device = await DeviceService.registerDevice(req.user!.userId, req.body);

  sendResponse(res, {
    statusCode: 201,
    message: "Device registered successfully",
    data: device,
  });
});

const unregister = catchAsync(async (req: AuthRequest, res: Response) => {
  const id = req.params.id as string;
  await DeviceService.unregisterDevice(req.user!.userId, id);

  sendResponse(res, {
    statusCode: 200,
    message: "Device unregistered successfully",
  });
});

export const DeviceController = {
  list,
  register,
  unregister,
};
