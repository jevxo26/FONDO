import { Request, Response } from 'express';
import { FoodService } from '../services/foodService';
import { catchAsync } from '../utils/catchAsync';
import { sendResponse } from '../utils/sendResponse';

const parseBool = (v: any) => v === 'true' ? true : v === 'false' ? false : undefined;

export const FoodController = {
  getAll: catchAsync(async (req: Request, res: Response) => {
    const { page = '1', limit = '20', search, categoryId, foodType, isFeatured, isPopular, isRecommended, status, minPrice, maxPrice, tags, dietTypes } = req.query;

    const filters = {
      search: search as string | undefined,
      categoryId: categoryId as string | undefined,
      foodType: foodType as string | undefined,
      isFeatured: parseBool(isFeatured),
      isPopular: parseBool(isPopular),
      isRecommended: parseBool(isRecommended),
      status: status as string | undefined,
      minPrice: minPrice ? Number(minPrice) : undefined,
      maxPrice: maxPrice ? Number(maxPrice) : undefined,
      tags: tags ? (tags as string).split(',') : undefined,
      dietTypes: dietTypes ? (dietTypes as string).split(',') : undefined,
    };

    const result = await FoodService.getAll(filters, {
      page: Math.max(1, Number(page)),
      limit: Math.min(100, Math.max(1, Number(limit))),
    });

    sendResponse(res, { statusCode: 200, data: result });
  }),

  getBySlug: catchAsync(async (req: Request, res: Response) => {
    const data = await FoodService.getBySlug(req.params.slug as string);
    sendResponse(res, { statusCode: 200, data });
  }),

  getById: catchAsync(async (req: Request, res: Response) => {
    const data = await FoodService.getById(req.params.id as string);
    sendResponse(res, { statusCode: 200, data });
  }),

  create: catchAsync(async (req: Request, res: Response) => {
    const data = await FoodService.create(req.body);
    sendResponse(res, { statusCode: 201, message: 'Food created successfully', data });
  }),

  update: catchAsync(async (req: Request, res: Response) => {
    const data = await FoodService.update(req.params.id as string, req.body);
    sendResponse(res, { statusCode: 200, message: 'Food updated successfully', data });
  }),

  delete: catchAsync(async (req: Request, res: Response) => {
    await FoodService.delete(req.params.id as string);
    sendResponse(res, { statusCode: 200, message: 'Food deleted successfully' });
  }),
};
