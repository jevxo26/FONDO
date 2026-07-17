import { Router } from "express";
import { verifyToken, authorize } from "../middlewares/authMiddleware";
import { validate } from "../middlewares/validate";
import { CouponController } from "../controllers/couponController";
import {
  createCouponSchema,
  updateCouponSchema,
  listCouponsSchema,
} from "../validations/coupon.validation";

const router = Router();

router.use(verifyToken, authorize("ADMIN", "SUPER_ADMIN"));

router.get("/", validate(listCouponsSchema, "query"), CouponController.list);
router.get("/:id", CouponController.getById);
router.post("/", validate(createCouponSchema), CouponController.create);
router.patch("/:id", validate(updateCouponSchema), CouponController.update);
router.delete("/:id", CouponController.delete);

export default router;
