import { Request, Response } from "express";
import { AuthRequest } from "../types/auth.types";
import { catchAsync } from "../utils/catchAsync";
import { sendResponse } from "../utils/sendResponse";
import { FoodService } from "../services/foodService";

const list = catchAsync(async (req: Request, res: Response) => {
  const result = await FoodService.listFoods({
    page: parseInt(req.query.page as string) || 1,
    limit: parseInt(req.query.limit as string) || 20,
    categoryId: req.query.categoryId as string,
    foodType: req.query.foodType as string,
    spiceLevel: req.query.spiceLevel as string,
    dietType: req.query.dietType as string,
    minPrice: req.query.minPrice ? parseFloat(req.query.minPrice as string) : undefined,
    maxPrice: req.query.maxPrice ? parseFloat(req.query.maxPrice as string) : undefined,
    search: req.query.search as string,
    sortBy: req.query.sortBy as string,
    sortOrder: (req.query.sortOrder as "asc" | "desc") || "desc",
  });

  sendResponse(res, { statusCode: 200, data: result });
});

const getBySlug = catchAsync(async (req: Request, res: Response) => {
  const slug = req.params.slug as string;
  const food = await FoodService.getFoodBySlug(slug);

  sendResponse(res, { statusCode: 200, data: food });
});

const getById = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const food = await FoodService.getFoodById(id);

  sendResponse(res, { statusCode: 200, data: food });
});

const listCategories = catchAsync(async (_req: Request, res: Response) => {
  const categories = await FoodService.listCategories();

  sendResponse(res, { statusCode: 200, data: { items: categories } });
});

const getCategory = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const category = await FoodService.getCategoryById(id);

  sendResponse(res, { statusCode: 200, data: category });
});

const listTags = catchAsync(async (_req: Request, res: Response) => {
  const tags = await FoodService.listTags();

  sendResponse(res, { statusCode: 200, data: { items: tags } });
});

const addFavorite = catchAsync(async (req: AuthRequest, res: Response) => {
  const foodId = req.params.foodId as string;
  const favorite = await FoodService.addFavorite(req.user!.userId, foodId);

  sendResponse(res, {
    statusCode: 201,
    message: "Added to favorites",
    data: favorite,
  });
});

const removeFavorite = catchAsync(async (req: AuthRequest, res: Response) => {
  const foodId = req.params.foodId as string;
  await FoodService.removeFavorite(req.user!.userId, foodId);

  sendResponse(res, { statusCode: 200, message: "Removed from favorites" });
});

const listReviews = catchAsync(async (req: Request, res: Response) => {
  const foodId = req.params.foodId as string;
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 20;

  const result = await FoodService.listReviews(foodId, page, limit);

  sendResponse(res, { statusCode: 200, data: result });
});

const createReview = catchAsync(async (req: AuthRequest, res: Response) => {
  const foodId = req.params.foodId as string;
  const review = await FoodService.createReview(
    foodId,
    req.user!.userId,
    req.body,
  );

  sendResponse(res, {
    statusCode: 201,
    message: "Review submitted successfully",
    data: review,
  });
});

export const FoodController = {
  list,
  getBySlug,
  getById,
  listCategories,
  getCategory,
  listTags,
  addFavorite,
  removeFavorite,
  listReviews,
  createReview,
};
