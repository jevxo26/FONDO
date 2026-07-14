import { Router } from "express";
import { authorize, verifyToken } from "../middlewares/authMiddleware";
import { VendorController } from "../controllers/vendorController";

const router = Router();

router.post("/", verifyToken, authorize("ADMIN", "SUPER_ADMIN"), VendorController.createVendor);

export default router;
