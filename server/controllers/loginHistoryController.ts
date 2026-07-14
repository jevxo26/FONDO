import { Response } from "express";
import { AuthRequest } from "../types/auth.types";
import { catchAsync } from "../utils/catchAsync";
import { sendResponse } from "../utils/sendResponse";
import { LoginHistoryService } from "../services/loginHistoryService";

const list = catchAsync(async (req: AuthRequest, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 20;

  const result = await LoginHistoryService.listLoginHistory(
    req.user!.userId,
    page,
    limit,
  );

  sendResponse(res, {
    statusCode: 200,
    data: result,
  });
});

export const LoginHistoryController = {
  list,
};
