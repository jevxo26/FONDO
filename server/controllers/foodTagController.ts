import { Request, Response } from 'express';
import { TagService } from '../services/foodTagService';
import { catchAsync } from '../utils/catchAsync';
import { sendResponse } from '../utils/sendResponse';

export const TagController = {
  getAll: catchAsync(async (_req: Request, res: Response) => {
    const data = await TagService.getAll();
    sendResponse(res, { statusCode: 200, data });
  }),
};
