import { Request, Response } from 'express';
import { VariantService } from '../services/foodVariantService';
import { catchAsync } from '../utils/catchAsync';
import { sendResponse } from '../utils/sendResponse';

export const VariantController = {
  create: catchAsync(async (req: Request, res: Response) => {
    const data = await VariantService.create(req.params.foodId as string, req.body);
    sendResponse(res, { statusCode: 201, message: 'Variant created successfully', data });
  }),

  update: catchAsync(async (req: Request, res: Response) => {
    const data = await VariantService.update(req.params.id as string, req.body);
    sendResponse(res, { statusCode: 200, message: 'Variant updated successfully', data });
  }),

  delete: catchAsync(async (req: Request, res: Response) => {
    await VariantService.delete(req.params.id as string);
    sendResponse(res, { statusCode: 200, message: 'Variant deleted successfully' });
  }),
};
