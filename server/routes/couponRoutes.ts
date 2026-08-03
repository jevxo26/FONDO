import { Router } from "express";
import { authorize, hasPermission, verifyToken } from "../middlewares/authMiddleware";
import { validate } from "../middlewares/validate";
import { CouponController } from "../controllers/couponController";
import { createCouponSchema, updateCouponSchema } from "../validations/coupon.validation";

const router = Router();

router.use(verifyToken, authorize("SUPER_ADMIN", "ADMIN"), hasPermission("coupons"));

router.get("/", CouponController.list);
router.get("/:id", CouponController.getById);
router.post("/", validate(createCouponSchema), CouponController.create);
router.patch("/:id", validate(updateCouponSchema), CouponController.update);
router.delete("/:id", CouponController.delete);

export default router;
