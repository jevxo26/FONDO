import { Router } from "express";
import { AdminFoodController } from "../controllers/adminFoodController";
import { authorize, verifyToken } from "../middlewares/authMiddleware";
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

router.use(verifyToken, authorize("ADMIN", "SUPER_ADMIN"));

// Queries
router.get("/foods", AdminFoodController.listFoods);
router.get("/foods/:id", AdminFoodController.getFood);
router.get("/categories", AdminFoodController.listCategories);
router.get("/tags", AdminFoodController.listTags);

// Food
router.post("/foods", validate(createFoodSchema), AdminFoodController.createFood);
router.put("/foods/:id", validate(updateFoodSchema), AdminFoodController.updateFood);
router.delete("/foods/:id", AdminFoodController.deleteFood);

// Food Approval
router.patch("/foods/:id/approve", AdminFoodController.approveFood);
router.patch("/foods/:id/reject", validate(rejectFoodSchema), AdminFoodController.rejectFood);

// Category
router.post("/categories", validate(createCategorySchema), AdminFoodController.createCategory);
router.put("/categories/:id", validate(updateCategorySchema), AdminFoodController.updateCategory);
router.delete("/categories/:id", AdminFoodController.deleteCategory);

// SubCategory
router.post(
  "/categories/:categoryId/subcategories",
  validate(createSubCategorySchema),
  AdminFoodController.createSubCategory,
);
router.put(
  "/subcategories/:id",
  validate(updateSubCategorySchema),
  AdminFoodController.updateSubCategory,
);
router.delete("/subcategories/:id", AdminFoodController.deleteSubCategory);

// Variant
router.post(
  "/foods/:foodId/variants",
  validate(createVariantSchema),
  AdminFoodController.createVariant,
);
router.put("/variants/:id", validate(updateVariantSchema), AdminFoodController.updateVariant);
router.delete("/variants/:id", AdminFoodController.deleteVariant);

// Addon
router.post("/foods/:foodId/addons", validate(createAddonSchema), AdminFoodController.createAddon);
router.put("/addons/:id", validate(updateAddonSchema), AdminFoodController.updateAddon);
router.delete("/addons/:id", AdminFoodController.deleteAddon);

// Addon Item
router.post(
  "/addons/:addonId/items",
  validate(createAddonItemSchema),
  AdminFoodController.createAddonItem,
);
router.put(
  "/addon-items/:id",
  validate(updateAddonItemSchema),
  AdminFoodController.updateAddonItem,
);
router.delete("/addon-items/:id", AdminFoodController.deleteAddonItem);

// Nutrition
router.get("/foods/:foodId/nutrition", AdminFoodController.getNutrition);
router.patch(
  "/foods/:foodId/nutrition",
  validate(updateNutritionSchema),
  AdminFoodController.updateNutrition,
);

// Ingredient
router.post(
  "/foods/:foodId/ingredients",
  validate(createIngredientSchema),
  AdminFoodController.createIngredient,
);
router.delete("/ingredients/:id", AdminFoodController.deleteIngredient);

// Allergen
router.post(
  "/foods/:foodId/allergens",
  validate(createAllergenSchema),
  AdminFoodController.createAllergen,
);
router.delete("/allergens/:id", AdminFoodController.deleteAllergen);

// Price
router.post("/foods/:foodId/prices", validate(createPriceSchema), AdminFoodController.createPrice);
router.delete("/prices/:id", AdminFoodController.deletePrice);

// Food Image
router.post(
  "/foods/:foodId/images",
  validate(createFoodImageSchema),
  AdminFoodController.createFoodImage,
);
router.delete("/food-images/:id", AdminFoodController.deleteFoodImage);

// Discount
router.post(
  "/foods/:foodId/discounts",
  validate(createDiscountSchema),
  AdminFoodController.createDiscount,
);
router.delete("/discounts/:id", AdminFoodController.deleteDiscount);

// Tags
router.post("/foods/:foodId/tags", validate(addFoodTagsSchema), AdminFoodController.addFoodTags);
router.delete("/foods/:foodId/tags/:tagId", AdminFoodController.removeFoodTag);
router.post("/tags", validate(createTagSchema), AdminFoodController.createTag);

// Label
router.post("/foods/:foodId/labels", validate(createLabelSchema), AdminFoodController.createLabel);
router.delete("/labels/:id", AdminFoodController.deleteLabel);

// Availability
router.patch(
  "/foods/:foodId/availability",
  validate(updateAvailabilitySchema),
  AdminFoodController.updateAvailability,
);

// Schedule
router.post(
  "/foods/:foodId/schedules",
  validate(createScheduleSchema),
  AdminFoodController.createSchedule,
);
router.delete("/schedules/:id", AdminFoodController.deleteSchedule);

// Visibility
router.patch(
  "/foods/:foodId/visibility",
  validate(updateVisibilitySchema),
  AdminFoodController.updateVisibility,
);

export default router;
