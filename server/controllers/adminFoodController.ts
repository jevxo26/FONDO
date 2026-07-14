import { Request, Response } from "express";
import { AuthRequest } from "../types/auth.types";
import { catchAsync } from "../utils/catchAsync";
import { sendResponse } from "../utils/sendResponse";
import { AdminFoodService } from "../services/adminFoodService";

// ─── Food ──────────────────────────────────────────────────

const createFood = catchAsync(async (req: Request, res: Response) => {
  const food = await AdminFoodService.createFood(req.body);
  sendResponse(res, { statusCode: 201, message: "Food created", data: food });
});

const updateFood = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const food = await AdminFoodService.updateFood(id, req.body);
  sendResponse(res, { statusCode: 200, message: "Food updated", data: food });
});

const deleteFood = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id as string;
  await AdminFoodService.deleteFood(id);
  sendResponse(res, { statusCode: 200, message: "Food deleted" });
});

// ─── Category ──────────────────────────────────────────────

const createCategory = catchAsync(async (req: Request, res: Response) => {
  const category = await AdminFoodService.createCategory(req.body);
  sendResponse(res, { statusCode: 201, message: "Category created", data: category });
});

const updateCategory = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const category = await AdminFoodService.updateCategory(id, req.body);
  sendResponse(res, { statusCode: 200, message: "Category updated", data: category });
});

const deleteCategory = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id as string;
  await AdminFoodService.deleteCategory(id);
  sendResponse(res, { statusCode: 200, message: "Category deleted" });
});

// ─── SubCategory ───────────────────────────────────────────

const createSubCategory = catchAsync(async (req: Request, res: Response) => {
  const categoryId = req.params.categoryId as string;
  const sub = await AdminFoodService.createSubCategory(categoryId, req.body);
  sendResponse(res, { statusCode: 201, message: "SubCategory created", data: sub });
});

const updateSubCategory = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const sub = await AdminFoodService.updateSubCategory(id, req.body);
  sendResponse(res, { statusCode: 200, message: "SubCategory updated", data: sub });
});

const deleteSubCategory = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id as string;
  await AdminFoodService.deleteSubCategory(id);
  sendResponse(res, { statusCode: 200, message: "SubCategory deleted" });
});

// ─── Variant ───────────────────────────────────────────────

const createVariant = catchAsync(async (req: Request, res: Response) => {
  const foodId = req.params.foodId as string;
  const variant = await AdminFoodService.createVariant(foodId, req.body);
  sendResponse(res, { statusCode: 201, message: "Variant created", data: variant });
});

const updateVariant = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const variant = await AdminFoodService.updateVariant(id, req.body);
  sendResponse(res, { statusCode: 200, message: "Variant updated", data: variant });
});

const deleteVariant = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id as string;
  await AdminFoodService.deleteVariant(id);
  sendResponse(res, { statusCode: 200, message: "Variant deleted" });
});

// ─── Addon ─────────────────────────────────────────────────

const createAddon = catchAsync(async (req: Request, res: Response) => {
  const foodId = req.params.foodId as string;
  const addon = await AdminFoodService.createAddon(foodId, req.body);
  sendResponse(res, { statusCode: 201, message: "Addon created", data: addon });
});

const updateAddon = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const addon = await AdminFoodService.updateAddon(id, req.body);
  sendResponse(res, { statusCode: 200, message: "Addon updated", data: addon });
});

const deleteAddon = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id as string;
  await AdminFoodService.deleteAddon(id);
  sendResponse(res, { statusCode: 200, message: "Addon deleted" });
});

// ─── Addon Item ────────────────────────────────────────────

const createAddonItem = catchAsync(async (req: Request, res: Response) => {
  const addonId = req.params.addonId as string;
  const item = await AdminFoodService.createAddonItem(addonId, req.body);
  sendResponse(res, { statusCode: 201, message: "Addon item created", data: item });
});

const updateAddonItem = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const item = await AdminFoodService.updateAddonItem(id, req.body);
  sendResponse(res, { statusCode: 200, message: "Addon item updated", data: item });
});

const deleteAddonItem = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id as string;
  await AdminFoodService.deleteAddonItem(id);
  sendResponse(res, { statusCode: 200, message: "Addon item deleted" });
});

// ─── Nutrition ─────────────────────────────────────────────

const getNutrition = catchAsync(async (req: Request, res: Response) => {
  const foodId = req.params.foodId as string;
  const nutrition = await AdminFoodService.getNutrition(foodId);
  sendResponse(res, { statusCode: 200, data: nutrition });
});

const updateNutrition = catchAsync(async (req: Request, res: Response) => {
  const foodId = req.params.foodId as string;
  const nutrition = await AdminFoodService.updateNutrition(foodId, req.body);
  sendResponse(res, { statusCode: 200, message: "Nutrition updated", data: nutrition });
});

// ─── Ingredient ────────────────────────────────────────────

const createIngredient = catchAsync(async (req: Request, res: Response) => {
  const foodId = req.params.foodId as string;
  const ingredient = await AdminFoodService.createIngredient(foodId, req.body);
  sendResponse(res, { statusCode: 201, message: "Ingredient added", data: ingredient });
});

const deleteIngredient = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id as string;
  await AdminFoodService.deleteIngredient(id);
  sendResponse(res, { statusCode: 200, message: "Ingredient removed" });
});

// ─── Allergen ──────────────────────────────────────────────

const createAllergen = catchAsync(async (req: Request, res: Response) => {
  const foodId = req.params.foodId as string;
  const allergen = await AdminFoodService.createAllergen(foodId, req.body);
  sendResponse(res, { statusCode: 201, message: "Allergen added", data: allergen });
});

const deleteAllergen = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id as string;
  await AdminFoodService.deleteAllergen(id);
  sendResponse(res, { statusCode: 200, message: "Allergen removed" });
});

// ─── Price ─────────────────────────────────────────────────

const createPrice = catchAsync(async (req: Request, res: Response) => {
  const foodId = req.params.foodId as string;
  const price = await AdminFoodService.createPrice(foodId, req.body);
  sendResponse(res, { statusCode: 201, message: "Price added", data: price });
});

// ─── Discount ──────────────────────────────────────────────

const createDiscount = catchAsync(async (req: Request, res: Response) => {
  const foodId = req.params.foodId as string;
  const discount = await AdminFoodService.createDiscount(foodId, req.body);
  sendResponse(res, { statusCode: 201, message: "Discount added", data: discount });
});

const deleteDiscount = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id as string;
  await AdminFoodService.deleteDiscount(id);
  sendResponse(res, { statusCode: 200, message: "Discount removed" });
});

// ─── Tags ──────────────────────────────────────────────────

const addFoodTags = catchAsync(async (req: Request, res: Response) => {
  const foodId = req.params.foodId as string;
  const result = await AdminFoodService.addFoodTags(foodId, req.body.tagIds);
  sendResponse(res, { statusCode: 200, message: `${result.count} tags assigned` });
});

const removeFoodTag = catchAsync(async (req: Request, res: Response) => {
  const foodId = req.params.foodId as string;
  const tagId = req.params.tagId as string;
  await AdminFoodService.removeFoodTag(foodId, tagId);
  sendResponse(res, { statusCode: 200, message: "Tag removed from food" });
});

const createTag = catchAsync(async (req: Request, res: Response) => {
  const tag = await AdminFoodService.createTag(req.body);
  sendResponse(res, { statusCode: 201, message: "Tag created", data: tag });
});

// ─── Label ─────────────────────────────────────────────────

const createLabel = catchAsync(async (req: Request, res: Response) => {
  const foodId = req.params.foodId as string;
  const label = await AdminFoodService.createLabel(foodId, req.body);
  sendResponse(res, { statusCode: 201, message: "Label added", data: label });
});

const deleteLabel = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id as string;
  await AdminFoodService.deleteLabel(id);
  sendResponse(res, { statusCode: 200, message: "Label removed" });
});

// ─── Availability ──────────────────────────────────────────

const updateAvailability = catchAsync(async (req: Request, res: Response) => {
  const foodId = req.params.foodId as string;
  const availability = await AdminFoodService.updateAvailability(foodId, req.body);
  sendResponse(res, { statusCode: 200, message: "Availability updated", data: availability });
});

// ─── Schedule ──────────────────────────────────────────────

const createSchedule = catchAsync(async (req: Request, res: Response) => {
  const foodId = req.params.foodId as string;
  const schedule = await AdminFoodService.createSchedule(foodId, req.body);
  sendResponse(res, { statusCode: 201, message: "Schedule created", data: schedule });
});

const deleteSchedule = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id as string;
  await AdminFoodService.deleteSchedule(id);
  sendResponse(res, { statusCode: 200, message: "Schedule deleted" });
});

// ─── Visibility ────────────────────────────────────────────

const updateVisibility = catchAsync(async (req: Request, res: Response) => {
  const foodId = req.params.foodId as string;
  const visibility = await AdminFoodService.updateVisibility(foodId, req.body);
  sendResponse(res, { statusCode: 200, message: "Visibility updated", data: visibility });
});

export const AdminFoodController = {
  createFood, updateFood, deleteFood,
  createCategory, updateCategory, deleteCategory,
  createSubCategory, updateSubCategory, deleteSubCategory,
  createVariant, updateVariant, deleteVariant,
  createAddon, updateAddon, deleteAddon,
  createAddonItem, updateAddonItem, deleteAddonItem,
  getNutrition, updateNutrition,
  createIngredient, deleteIngredient,
  createAllergen, deleteAllergen,
  createPrice,
  createDiscount, deleteDiscount,
  addFoodTags, removeFoodTag, createTag,
  createLabel, deleteLabel,
  updateAvailability,
  createSchedule, deleteSchedule,
  updateVisibility,
};
