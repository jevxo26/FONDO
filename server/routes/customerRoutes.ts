import { Router } from "express";
import { verifyToken, authorize } from "../middlewares/authMiddleware";
import { CustomerController } from "../controllers/customerController";

const router = Router();

router.use(verifyToken, authorize("ADMIN", "SUPER_ADMIN"));

router.get("/", CustomerController.list);
router.get("/:id", CustomerController.getById);
router.get("/:id/orders", CustomerController.listOrders);
router.get("/:id/subscriptions", CustomerController.listSubscriptions);
router.get("/:id/wallet", CustomerController.getWallet);
router.get("/:id/payments", CustomerController.listPayments);

export default router;
