import { Router } from "express";
import { VendorFoodController } from "../controllers/vendorFoodController";
import { hasPermission, verifyToken } from "../middlewares/authMiddleware";
import { validate } from "../middlewares/validate";
import {
  createVendorFoodSchema,
  updateVendorFoodStatusSchema,
} from "../validations/vendorFood.validation";

const router = Router();

const pFoods = hasPermission("foods");

router.post("/", verifyToken, pFoods, validate(createVendorFoodSchema), VendorFoodController.createFood);
router.get("/", verifyToken, pFoods, VendorFoodController.listFoods);
router.get("/:id", verifyToken, pFoods, VendorFoodController.getFood);
router.patch(
  "/:id/status",
  verifyToken,
  pFoods,
  validate(updateVendorFoodStatusSchema),
  VendorFoodController.updateFoodStatus,
);

export default router;
