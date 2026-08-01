import { Response } from "express";
import type { AuthRequest } from "../types/auth.types";
import { catchAsync } from "../utils/catchAsync";
import { sendResponse } from "../utils/sendResponse";
import * as rbacService from "../services/rbacService";

export const RbacController = {
  listRoles: catchAsync(async (_req: AuthRequest, res: Response) => {
    const result = await rbacService.listRoles();
    sendResponse(res, { statusCode: 200, data: result });
  }),

  getRoleById: catchAsync(async (req: AuthRequest, res: Response) => {
    const role = await rbacService.getRoleById(req.params.id as string);
    sendResponse(res, { statusCode: 200, data: role });
  }),

  createRole: catchAsync(async (req: AuthRequest, res: Response) => {
    const role = await rbacService.createRole(req.body);
    sendResponse(res, { statusCode: 201, data: role });
  }),

  updateRole: catchAsync(async (req: AuthRequest, res: Response) => {
    const role = await rbacService.updateRole(req.params.id as string, req.body);
    sendResponse(res, { statusCode: 200, data: role });
  }),

  deleteRole: catchAsync(async (req: AuthRequest, res: Response) => {
    const result = await rbacService.deleteRole(req.params.id as string);
    sendResponse(res, { statusCode: 200, data: result });
  }),

  assignPermissions: catchAsync(async (req: AuthRequest, res: Response) => {
    const role = await rbacService.assignPermissionsToRole(
      req.params.id as string,
      req.body.permissionSlugs,
    );
    sendResponse(res, { statusCode: 200, data: role });
  }),

  listPermissions: catchAsync(async (_req: AuthRequest, res: Response) => {
    const result = await rbacService.listPermissions();
    sendResponse(res, { statusCode: 200, data: result });
  }),

  getUserRoles: catchAsync(async (req: AuthRequest, res: Response) => {
    const result = await rbacService.getUserRoles(req.params.userId as string);
    sendResponse(res, { statusCode: 200, data: result });
  }),

  assignRoleToUser: catchAsync(async (req: AuthRequest, res: Response) => {
    const userRole = await rbacService.assignRoleToUser(
      req.params.userId as string,
      req.body.roleId,
      req.user?.userId,
    );
    sendResponse(res, { statusCode: 201, data: userRole });
  }),

  removeRoleFromUser: catchAsync(async (req: AuthRequest, res: Response) => {
    const result = await rbacService.removeRoleFromUser(
      req.params.userId as string,
      req.params.roleId as string,
    );
    sendResponse(res, { statusCode: 200, data: result });
  }),
};
