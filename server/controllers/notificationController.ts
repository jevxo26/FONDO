import { Response } from "express";
import { AuthRequest } from "../types/auth.types";
import { catchAsync } from "../utils/catchAsync";
import { sendResponse } from "../utils/sendResponse";
import { NotificationService } from "../services/notificationService";

const get = catchAsync(async (req: AuthRequest, res: Response) => {
  const settings = await NotificationService.getSettings(req.user!.userId);

  sendResponse(res, {
    statusCode: 200,
    data: settings,
  });
});

const update = catchAsync(async (req: AuthRequest, res: Response) => {
  const settings = await NotificationService.updateSettings(
    req.user!.userId,
    req.body,
  );

  sendResponse(res, {
    statusCode: 200,
    message: "Notification settings updated successfully",
    data: settings,
  });
});

export const NotificationController = {
  get,
  update,
};
