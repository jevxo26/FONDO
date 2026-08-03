import { Router } from "express";
import { VendorFoodController } from "../controllers/vendorFoodController";
import { authorize, verifyToken } from "../middlewares/authMiddleware";
import { validate } from "../middlewares/validate";
import {
  createVendorFoodSchema,
  updateVendorFoodStatusSchema,
} from "../validations/vendorFood.validation";

const router = Router();

router.use(verifyToken, authorize("VENDOR", "VENDOR_STAFF"));

router.post("/", validate(createVendorFoodSchema), VendorFoodController.createFood);
router.get("/", VendorFoodController.listFoods);
router.get("/:id", VendorFoodController.getFood);
router.patch(
  "/:id/status",
  validate(updateVendorFoodStatusSchema),
  VendorFoodController.updateFoodStatus,
);

export default router;
