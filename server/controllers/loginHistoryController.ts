import { Response } from "express";
import { AuthRequest } from "../types/auth.types";
import { catchAsync } from "../utils/catchAsync";
import { sendResponse } from "../utils/sendResponse";
import { LoginHistoryService } from "../services/loginHistoryService";

const list = catchAsync(async (req: AuthRequest, res: Response) => {
  const result = await LoginHistoryService.listLoginHistory(req.user!.userId);

  sendResponse(res, {
    statusCode: 200,
    data: result,
  });
});

export const LoginHistoryController = {
  list,
};
