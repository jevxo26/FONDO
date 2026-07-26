import { Router } from "express";
import { FoodController } from "../controllers/foodController";
import { verifyToken } from "../middlewares/authMiddleware";
import { validate } from "../middlewares/validate";
import { createReviewSchema } from "../validations/food.validation";

const router = Router();

// Public
router.get("/", FoodController.list);
router.get("/slug/:slug", FoodController.getBySlug);
router.get("/categories/list", FoodController.listCategories);
router.get("/categories/:id", FoodController.getCategory);
router.get("/tags/list", FoodController.listTags);

// Authenticated — static routes before :id catch-all
router.get("/favorites", verifyToken, FoodController.listFavorites);

// Dynamic catch-all (must be last)
router.get("/:id", FoodController.getById);
router.post("/:foodId/favorite", verifyToken, FoodController.addFavorite);
router.delete("/:foodId/favorite", verifyToken, FoodController.removeFavorite);
router.get("/:foodId/reviews", FoodController.listReviews);
router.post("/:foodId/reviews", verifyToken, validate(createReviewSchema), FoodController.createReview);

export default router;
