import { Request, Response } from "express";
import type { AuthRequest } from "../types/auth.types";
import { catchAsync } from "../utils/catchAsync";
import { sendResponse } from "../utils/sendResponse";
import * as cartService from "../services/cartService";
import * as checkoutService from "../services/checkoutService";

export const CartController = {
  getCart: catchAsync(async (req: AuthRequest, res: Response) => {
    const cart = await cartService.getActiveCart(req.user!.userId);
    sendResponse(res, { statusCode: 200, data: cart });
  }),

  initCart: catchAsync(async (req: AuthRequest, res: Response) => {
    const { packageId, customMealPlanId } = req.body;
    const cart = await cartService.initCart(req.user!.userId, packageId, customMealPlanId);
    sendResponse(res, { statusCode: 201, data: cart });
  }),

  clearCart: catchAsync(async (req: AuthRequest, res: Response) => {
    const userCart = await cartService.getActiveCart(req.user!.userId);
    const cart = await cartService.clearCart(userCart.id);
    sendResponse(res, { statusCode: 200, data: cart });
  }),

  addItem: catchAsync(async (req: AuthRequest, res: Response) => {
    const { foodId, packageMealId, quantity, unitPrice } = req.body;
    const userCart = await cartService.getActiveCart(req.user!.userId);
    const cart = await cartService.addItem(userCart.id, foodId, quantity, unitPrice, packageMealId);
    sendResponse(res, { statusCode: 201, data: cart });
  }),

  updateItem: catchAsync(async (req: AuthRequest, res: Response) => {
    const id = req.params.id as string;
    const { quantity } = req.body;
    const cart = await cartService.updateItemQuantity(id, quantity);
    sendResponse(res, { statusCode: 200, data: cart });
  }),

  removeItem: catchAsync(async (_req: AuthRequest, res: Response) => {
    const id = _req.params.id as string;
    const cart = await cartService.removeItem(id);
    sendResponse(res, { statusCode: 200, data: cart });
  }),

  addAddon: catchAsync(async (_req: AuthRequest, res: Response) => {
    const itemId = _req.params.itemId as string;
    const { addonItemId, quantity, price } = _req.body;
    const cart = await cartService.addAddon(itemId, addonItemId, quantity, price);
    sendResponse(res, { statusCode: 201, data: cart });
  }),

  removeAddon: catchAsync(async (_req: AuthRequest, res: Response) => {
    const id = _req.params.id as string;
    const cart = await cartService.removeAddon(id);
    sendResponse(res, { statusCode: 200, data: cart });
  }),

  addMeal: catchAsync(async (req: AuthRequest, res: Response) => {
    const { dayNumber, mealType, mealTime } = req.body;
    const userCart = await cartService.getActiveCart(req.user!.userId);
    const cart = await cartService.addMeal(userCart.id, dayNumber, mealType, mealTime);
    sendResponse(res, { statusCode: 201, data: cart });
  }),

  removeMeal: catchAsync(async (_req: AuthRequest, res: Response) => {
    const id = _req.params.id as string;
    const cart = await cartService.removeMeal(id);
    sendResponse(res, { statusCode: 200, data: cart });
  }),

  addFoodToMeal: catchAsync(async (_req: AuthRequest, res: Response) => {
    const mealId = _req.params.mealId as string;
    const { foodId, quantity, isReplacement } = _req.body;
    const cart = await cartService.addFoodToMeal(mealId, foodId, quantity ?? 1, isReplacement ?? false);
    sendResponse(res, { statusCode: 201, data: cart });
  }),

  removeFoodFromMeal: catchAsync(async (_req: AuthRequest, res: Response) => {
    const mealId = _req.params.mealId as string;
    const foodId = _req.params.foodId as string;
    const cart = await cartService.removeFoodFromMeal(mealId, foodId);
    sendResponse(res, { statusCode: 200, data: cart });
  }),

  getCheckoutSummary: catchAsync(async (req: AuthRequest, res: Response) => {
    const userCart = await cartService.getActiveCart(req.user!.userId);
    const summary = await checkoutService.getSummary(userCart.id);
    sendResponse(res, { statusCode: 200, data: summary });
  }),

  applyCoupon: catchAsync(async (req: AuthRequest, res: Response) => {
    const userCart = await cartService.getActiveCart(req.user!.userId);
    const { couponCode } = req.body;
    const result = await checkoutService.applyCoupon(userCart.id, couponCode);
    sendResponse(res, { statusCode: 200, data: result });
  }),

  removeCoupon: catchAsync(async (req: AuthRequest, res: Response) => {
    const userCart = await cartService.getActiveCart(req.user!.userId);
    const result = await checkoutService.removeCoupon(userCart.id);
    sendResponse(res, { statusCode: 200, data: result });
  }),

  selectAddress: catchAsync(async (req: AuthRequest, res: Response) => {
    const userCart = await cartService.getActiveCart(req.user!.userId);
    const { addressId } = req.body;
    const result = await checkoutService.selectAddress(userCart.id, addressId);
    sendResponse(res, { statusCode: 200, data: result });
  }),

  placeOrder: catchAsync(async (req: AuthRequest, res: Response) => {
    const { cartId, addressId, paymentMethodId, notes, deliverySchedule } = req.body;
    const result = await checkoutService.placeOrder(
      cartId,
      addressId,
      paymentMethodId,
      req.user!.userId,
      notes,
      deliverySchedule,
    );
    sendResponse(res, { statusCode: 201, data: result });
  }),
};
