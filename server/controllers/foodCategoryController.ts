import { Request, Response } from 'express';
import { CategoryService } from '../services/foodCategoryService';
import { catchAsync } from '../utils/catchAsync';
import { sendResponse } from '../utils/sendResponse';

export const CategoryController = {
  getAll: catchAsync(async (_req: Request, res: Response) => {
    const data = await CategoryService.getAll();
    sendResponse(res, { statusCode: 200, data });
  }),

  getBySlug: catchAsync(async (req: Request, res: Response) => {
    const data = await CategoryService.getBySlug(req.params.slug as string);
    sendResponse(res, { statusCode: 200, data });
  }),

  create: catchAsync(async (req: Request, res: Response) => {
    const data = await CategoryService.create(req.body);
    sendResponse(res, { statusCode: 201, message: 'Category created successfully', data });
  }),

  update: catchAsync(async (req: Request, res: Response) => {
    const data = await CategoryService.update(req.params.id as string, req.body);
    sendResponse(res, { statusCode: 200, message: 'Category updated successfully', data });
  }),

  delete: catchAsync(async (req: Request, res: Response) => {
    await CategoryService.delete(req.params.id as string);
    sendResponse(res, { statusCode: 200, message: 'Category deleted successfully' });
  }),
};
