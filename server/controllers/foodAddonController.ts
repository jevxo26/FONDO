import { Request, Response } from 'express';
import { AddonService } from '../services/foodAddonService';
import { catchAsync } from '../utils/catchAsync';
import { sendResponse } from '../utils/sendResponse';

export const AddonController = {
  create: catchAsync(async (req: Request, res: Response) => {
    const data = await AddonService.create(req.params.foodId as string, req.body);
    sendResponse(res, { statusCode: 201, message: 'Addon created successfully', data });
  }),

  update: catchAsync(async (req: Request, res: Response) => {
    const data = await AddonService.update(req.params.id as string, req.body);
    sendResponse(res, { statusCode: 200, message: 'Addon updated successfully', data });
  }),

  delete: catchAsync(async (req: Request, res: Response) => {
    await AddonService.delete(req.params.id as string);
    sendResponse(res, { statusCode: 200, message: 'Addon deleted successfully' });
  }),

  createItem: catchAsync(async (req: Request, res: Response) => {
    const data = await AddonService.createItem(req.params.addonId as string, req.body);
    sendResponse(res, { statusCode: 201, message: 'Addon item created successfully', data });
  }),

  updateItem: catchAsync(async (req: Request, res: Response) => {
    const data = await AddonService.updateItem(req.params.id as string, req.body);
    sendResponse(res, { statusCode: 200, message: 'Addon item updated successfully', data });
  }),

  deleteItem: catchAsync(async (req: Request, res: Response) => {
    await AddonService.deleteItem(req.params.id as string);
    sendResponse(res, { statusCode: 200, message: 'Addon item deleted successfully' });
  }),
};
