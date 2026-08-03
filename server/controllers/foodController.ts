import { Request, Response } from "express";
import { AuthRequest } from "../types/auth.types";
import { catchAsync } from "../utils/catchAsync";
import { sendResponse } from "../utils/sendResponse";
import { FoodService } from "../services/foodService";
import prisma from "../lib/prisma";
import AppError from "../utils/AppError";

const list = catchAsync(async (req: Request, res: Response) => {
  const result = await FoodService.listFoods({
    page: parseInt(req.query.page as string) || 1,
    limit: req.query.limit ? parseInt(req.query.limit as string) : undefined,
    categoryId: req.query.categoryId as string,
    subCategoryId: req.query.subCategoryId as string,
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

const listVendorFoods = catchAsync(async (req: AuthRequest, res: Response) => {
  const userId = req.user!.userId;
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { vendorId: true },
  });

  let vendorId = user?.vendorId ?? null;
  if (!vendorId) {
    const staff = await prisma.vendorStaff.findFirst({
      where: { userId },
      select: { vendorId: true },
    });
    vendorId = staff?.vendorId ?? null;
  }

  if (!vendorId) {
    throw new AppError(403, "No vendor account linked to this user");
  }

  const result = await FoodService.listVendorFoods({ vendorId });

  sendResponse(res, { statusCode: 200, data: result });
});

const listCategories = catchAsync(async (req: Request, res: Response) => {
  const popular =
    req.query.popular === "true" ? true : req.query.popular === "false" ? false : undefined;
  const categories = await FoodService.listCategories({
    limit: req.query.limit ? parseInt(req.query.limit as string) : undefined,
    popular,
  });

  sendResponse(res, { statusCode: 200, data: categories });
});

const getCategory = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const category = await FoodService.getCategoryById(id);

  sendResponse(res, { statusCode: 200, data: category });
});

const listTags = catchAsync(async (_req: Request, res: Response) => {
  const tags = await FoodService.listTags();

  sendResponse(res, { statusCode: 200, data: tags });
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

const listFavorites = catchAsync(async (req: AuthRequest, res: Response) => {
  const favorites = await FoodService.listFavorites(req.user!.userId);

  sendResponse(res, { statusCode: 200, data: favorites });
});

const listReviews = catchAsync(async (req: Request, res: Response) => {
  const foodId = req.params.foodId as string;

  const result = await FoodService.listReviews(foodId);

  sendResponse(res, { statusCode: 200, data: result });
});

const createReview = catchAsync(async (req: AuthRequest, res: Response) => {
  const foodId = req.params.foodId as string;
  const review = await FoodService.createReview(foodId, req.user!.userId, req.body);

  sendResponse(res, {
    statusCode: 201,
    message: "Review submitted successfully",
    data: review,
  });
});

export const FoodController = {
  list,
  listVendorFoods,
  getBySlug,
  getById,
  listCategories,
  getCategory,
  listTags,
  addFavorite,
  removeFavorite,
  listFavorites,
  listReviews,
  createReview,
};
