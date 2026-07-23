import * as yup from "yup";

export const initCartSchema = yup.object({
  packageId: yup.string().optional(),
  customMealPlanId: yup.string().optional(),
});

export const addItemSchema = yup.object({
  foodId: yup.string().required("Food ID is required"),
  packageMealId: yup.string().optional(),
  quantity: yup.number().integer().min(1).default(1),
  unitPrice: yup.number().positive("Unit price must be positive").required("Unit price is required"),
});

export const updateItemSchema = yup.object({
  quantity: yup.number().integer().min(1).required("Quantity is required"),
});

export const addAddonSchema = yup.object({
  addonItemId: yup.string().required("Addon item ID is required"),
  quantity: yup.number().integer().min(1).default(1),
  price: yup.number().positive("Price must be positive").required("Price is required"),
});

export const addMealSchema = yup.object({
  dayNumber: yup.number().integer().min(1).required("Day number is required"),
  mealType: yup.string().required("Meal type is required"),
  mealTime: yup.string().optional(),
});

export const addFoodToMealSchema = yup.object({
  foodId: yup.string().required("Food ID is required"),
  quantity: yup.number().integer().min(1).default(1),
  isReplacement: yup.boolean().default(false),
});

export const applyCouponSchema = yup.object({
  couponCode: yup.string().required("Coupon code is required"),
});

export const selectAddressSchema = yup.object({
  addressId: yup.string().required("Address ID is required"),
});

export const placeOrderSchema = yup.object({
  cartId: yup.string().required("Cart ID is required"),
  addressId: yup.string().optional(),
  paymentMethodId: yup.string().required("Payment method ID is required"),
  notes: yup.string().optional(),
  deliverySchedule: yup.object({
    deliveryDate: yup.date().required("Delivery date is required"),
    deliverySlot: yup.string().optional(),
  }).optional(),
});
