import { Router } from "express";
import { verifyToken, authorize } from "../middlewares/authMiddleware";
import { validate } from "../middlewares/validate";
import { OrderController } from "../controllers/orderController";
import {
  updateOrderSchema,
  cancelOrderSchema,
  updateStatusSchema,
  assignVendorSchema,
  assignRiderSchema,
  processRefundSchema,
  submitFeedbackSchema,
  updateMealStatusSchema,
} from "../validations/order.validation";

const router = Router();

// Customer endpoints
router.get("/orders", verifyToken, OrderController.list);
router.get("/orders/:id", verifyToken, OrderController.getById);
router.patch("/orders/:id", verifyToken, validate(updateOrderSchema), OrderController.update);
router.post("/orders/:id/cancel", verifyToken, validate(cancelOrderSchema), OrderController.cancel);
router.post("/orders/:orderId/feedback", verifyToken, validate(submitFeedbackSchema), OrderController.submitFeedback);
router.get("/orders/:orderId/invoice", verifyToken, OrderController.getInvoice);

// Admin-only
router.delete("/orders/:id", verifyToken, authorize("SUPER_ADMIN"), OrderController.softDelete);
router.patch("/orders/:id/status", verifyToken, authorize("ADMIN", "VENDOR"), validate(updateStatusSchema), OrderController.updateStatus);
router.patch("/orders/:id/assign-vendor", verifyToken, authorize("ADMIN"), validate(assignVendorSchema), OrderController.assignVendor);
router.patch("/orders/:id/assign-rider", verifyToken, authorize("ADMIN", "VENDOR"), validate(assignRiderSchema), OrderController.assignRider);
router.get("/admin/orders", verifyToken, authorize("ADMIN", "SUPER_ADMIN"), OrderController.listAll);
router.get("/vendors/:vendorId/orders", verifyToken, authorize("VENDOR"), OrderController.listVendor);
router.post("/orders/:orderId/refund", verifyToken, authorize("ADMIN"), validate(processRefundSchema), OrderController.processRefund);
router.get("/orders/:orderId/refunds", verifyToken, authorize("ADMIN"), OrderController.listRefunds);
router.patch("/order-meals/:id/status", verifyToken, authorize("ADMIN", "VENDOR"), validate(updateMealStatusSchema), OrderController.updateMealStatus);

export default router;
