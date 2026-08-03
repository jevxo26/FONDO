import { Router } from "express";
import { AdminFoodController } from "../controllers/adminFoodController";
import { authorize, hasPermission, verifyToken } from "../middlewares/authMiddleware";
import { validate } from "../middlewares/validate";
import {
  createFoodSchema,
  updateFoodSchema,
  createCategorySchema,
  updateCategorySchema,
  createSubCategorySchema,
  updateSubCategorySchema,
  createVariantSchema,
  updateVariantSchema,
  createAddonSchema,
  updateAddonSchema,
  createAddonItemSchema,
  updateAddonItemSchema,
  updateNutritionSchema,
  createIngredientSchema,
  createAllergenSchema,
  createPriceSchema,
  createDiscountSchema,
  addFoodTagsSchema,
  createTagSchema,
  createLabelSchema,
  updateAvailabilitySchema,
  createScheduleSchema,
  updateVisibilitySchema,
  createFoodImageSchema,
} from "../validations/adminFood.validation";
import { rejectFoodSchema } from "../validations/vendorFood.validation";

const router = Router();

router.use(verifyToken, authorize("SUPER_ADMIN", "ADMIN"));

const pFoods = hasPermission("foods");

// Queries
router.get("/foods", pFoods, AdminFoodController.listFoods);
router.get("/foods/:id", pFoods, AdminFoodController.getFood);
router.get("/categories", pFoods, AdminFoodController.listCategories);
router.get("/tags", pFoods, AdminFoodController.listTags);

// Food
router.post("/foods", pFoods, validate(createFoodSchema), AdminFoodController.createFood);
router.put("/foods/:id", pFoods, validate(updateFoodSchema), AdminFoodController.updateFood);
router.delete("/foods/:id", pFoods, AdminFoodController.deleteFood);

// Food Approval
router.patch("/foods/:id/approve", pFoods, AdminFoodController.approveFood);
router.patch(
  "/foods/:id/reject",
  pFoods,
  validate(rejectFoodSchema),
  AdminFoodController.rejectFood,
);

// Category
router.post(
  "/categories",
  pFoods,
  validate(createCategorySchema),
  AdminFoodController.createCategory,
);
router.put(
  "/categories/:id",
  pFoods,
  validate(updateCategorySchema),
  AdminFoodController.updateCategory,
);
router.delete("/categories/:id", pFoods, AdminFoodController.deleteCategory);

// SubCategory
router.post(
  "/categories/:categoryId/subcategories",
  pFoods,
  validate(createSubCategorySchema),
  AdminFoodController.createSubCategory,
);
router.put(
  "/subcategories/:id",
  pFoods,
  validate(updateSubCategorySchema),
  AdminFoodController.updateSubCategory,
);
router.delete("/subcategories/:id", pFoods, AdminFoodController.deleteSubCategory);

// Variant
router.post(
  "/foods/:foodId/variants",
  pFoods,
  validate(createVariantSchema),
  AdminFoodController.createVariant,
);
router.put("/variants/:id", pFoods, validate(updateVariantSchema), AdminFoodController.updateVariant);
router.delete("/variants/:id", pFoods, AdminFoodController.deleteVariant);

// Addon
router.post(
  "/foods/:foodId/addons",
  pFoods,
  validate(createAddonSchema),
  AdminFoodController.createAddon,
);
router.put("/addons/:id", pFoods, validate(updateAddonSchema), AdminFoodController.updateAddon);
router.delete("/addons/:id", pFoods, AdminFoodController.deleteAddon);

// Addon Item
router.post(
  "/addons/:addonId/items",
  pFoods,
  validate(createAddonItemSchema),
  AdminFoodController.createAddonItem,
);
router.put(
  "/addon-items/:id",
  pFoods,
  validate(updateAddonItemSchema),
  AdminFoodController.updateAddonItem,
);
router.delete("/addon-items/:id", pFoods, AdminFoodController.deleteAddonItem);

// Nutrition
router.get("/foods/:foodId/nutrition", pFoods, AdminFoodController.getNutrition);
router.patch(
  "/foods/:foodId/nutrition",
  pFoods,
  validate(updateNutritionSchema),
  AdminFoodController.updateNutrition,
);

// Ingredient
router.post(
  "/foods/:foodId/ingredients",
  pFoods,
  validate(createIngredientSchema),
  AdminFoodController.createIngredient,
);
router.delete("/ingredients/:id", pFoods, AdminFoodController.deleteIngredient);

// Allergen
router.post(
  "/foods/:foodId/allergens",
  pFoods,
  validate(createAllergenSchema),
  AdminFoodController.createAllergen,
);
router.delete("/allergens/:id", pFoods, AdminFoodController.deleteAllergen);

// Price
router.post("/foods/:foodId/prices", pFoods, validate(createPriceSchema), AdminFoodController.createPrice);
router.delete("/prices/:id", pFoods, AdminFoodController.deletePrice);

// Food Image
router.post(
  "/foods/:foodId/images",
  pFoods,
  validate(createFoodImageSchema),
  AdminFoodController.createFoodImage,
);
router.delete("/food-images/:id", pFoods, AdminFoodController.deleteFoodImage);

// Discount
router.post(
  "/foods/:foodId/discounts",
  pFoods,
  validate(createDiscountSchema),
  AdminFoodController.createDiscount,
);
router.delete("/discounts/:id", pFoods, AdminFoodController.deleteDiscount);

// Tags
router.post(
  "/foods/:foodId/tags",
  pFoods,
  validate(addFoodTagsSchema),
  AdminFoodController.addFoodTags,
);
router.delete("/foods/:foodId/tags/:tagId", pFoods, AdminFoodController.removeFoodTag);
router.post("/tags", pFoods, validate(createTagSchema), AdminFoodController.createTag);

// Label
router.post(
  "/foods/:foodId/labels",
  pFoods,
  validate(createLabelSchema),
  AdminFoodController.createLabel,
);
router.delete("/labels/:id", pFoods, AdminFoodController.deleteLabel);

// Availability
router.patch(
  "/foods/:foodId/availability",
  pFoods,
  validate(updateAvailabilitySchema),
  AdminFoodController.updateAvailability,
);

// Schedule
router.post(
  "/foods/:foodId/schedules",
  pFoods,
  validate(createScheduleSchema),
  AdminFoodController.createSchedule,
);
router.delete("/schedules/:id", pFoods, AdminFoodController.deleteSchedule);

// Visibility
router.patch(
  "/foods/:foodId/visibility",
  pFoods,
  validate(updateVisibilitySchema),
  AdminFoodController.updateVisibility,
);

export default router;
