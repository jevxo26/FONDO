import { Router } from "express";
import { CartController } from "../controllers/cartController";
import { verifyToken } from "../middlewares/authMiddleware";
import { validate } from "../middlewares/validate";
import {
  initCartSchema,
  addItemSchema,
  updateItemSchema,
  addAddonSchema,
  addMealSchema,
  addFoodToMealSchema,
  applyCouponSchema,
  selectAddressSchema,
  placeOrderSchema,
} from "../validations/cart.validation";

const router = Router();

// Cart
router.get("/", verifyToken, CartController.getCart);
router.post("/", verifyToken, validate(initCartSchema), CartController.initCart);
router.delete("/", verifyToken, CartController.clearCart);

// Items
router.post("/items", verifyToken, validate(addItemSchema), CartController.addItem);
router.patch("/items/:id", verifyToken, validate(updateItemSchema), CartController.updateItem);
router.delete("/items/:id", verifyToken, CartController.removeItem);

// Item Addons
router.post("/items/:itemId/addons", verifyToken, validate(addAddonSchema), CartController.addAddon);
router.delete("/addons/:id", verifyToken, CartController.removeAddon);

// Meals (package flow)
router.post("/meals", verifyToken, validate(addMealSchema), CartController.addMeal);
router.delete("/meals/:id", verifyToken, CartController.removeMeal);
router.post("/meals/:mealId/foods", verifyToken, validate(addFoodToMealSchema), CartController.addFoodToMeal);
router.delete("/meals/:mealId/foods/:foodId", verifyToken, CartController.removeFoodFromMeal);

// Checkout
router.post("/checkout", verifyToken, CartController.getCheckoutSummary);
router.post("/checkout/apply-coupon", verifyToken, validate(applyCouponSchema), CartController.applyCoupon);
router.delete("/checkout/remove-coupon", verifyToken, CartController.removeCoupon);
router.post("/checkout/select-address", verifyToken, validate(selectAddressSchema), CartController.selectAddress);

// Place Order
router.post("/checkout/place-order", verifyToken, validate(placeOrderSchema), CartController.placeOrder);

export default router;
