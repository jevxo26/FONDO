import { Router } from "express";
import { FoodController } from "../controllers/foodController";
import { verifyToken } from "../middlewares/authMiddleware";
import { validate } from "../middlewares/validate";
import { createReviewSchema } from "../validations/food.validation";

const router = Router();

// Public
router.get("/", FoodController.list);

// Authenticated — must be before /:id to avoid param match
router.get("/favorites", verifyToken, FoodController.listFavorites);

router.get("/:id", FoodController.getById);
router.get("/slug/:slug", FoodController.getBySlug);
router.get("/categories/list", FoodController.listCategories);
router.get("/categories/:id", FoodController.getCategory);
router.get("/tags/list", FoodController.listTags);

// Authenticated
router.post("/:foodId/favorite", verifyToken, FoodController.addFavorite);
router.delete("/:foodId/favorite", verifyToken, FoodController.removeFavorite);
router.get("/:foodId/reviews", FoodController.listReviews);
router.post("/:foodId/reviews", verifyToken, validate(createReviewSchema), FoodController.createReview);

export default router;
