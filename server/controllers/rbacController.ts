import { Response } from "express";
import type { AuthRequest } from "../types/auth.types";
import { catchAsync } from "../utils/catchAsync";
import { sendResponse } from "../utils/sendResponse";
import * as rbacService from "../services/rbacService";

export const RbacController = {
  listPermissionModules: catchAsync(async (req: AuthRequest, res: Response) => {
    const result = await rbacService.listPermissionModules(
      (req.query.userId as string) || undefined,
    );
    sendResponse(res, { statusCode: 200, data: result });
  }),

  toggleUserModule: catchAsync(async (req: AuthRequest, res: Response) => {
    const { module, enabled } = req.body as { module: string; enabled: boolean };
    const result = await rbacService.toggleUserModule(
      req.params.userId as string,
      module,
      Boolean(enabled),
    );
    sendResponse(res, { statusCode: 200, data: result });
  }),
};
