import { Router } from "express";
import { authorize, hasPermission, verifyToken } from "../middlewares/authMiddleware";
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
router.post(
  "/orders/:orderId/feedback",
  verifyToken,
  validate(submitFeedbackSchema),
  OrderController.submitFeedback,
);
router.get(
  "/orders/:orderId/invoice",
  verifyToken,
  OrderController.getInvoice,
);
router.get(
  "/orders/:orderId/invoice/download",
  verifyToken,
  OrderController.downloadInvoice,
);

// Admin-only (platform-wide data + actions)
const pOrders = hasPermission("orders");
router.delete("/orders/:id", authorize("SUPER_ADMIN", "ADMIN"), pOrders, OrderController.softDelete);
router.patch(
  "/orders/:id/status",
  authorize("SUPER_ADMIN", "ADMIN"),
  pOrders,
  validate(updateStatusSchema),
  OrderController.updateStatus,
);
router.patch(
  "/orders/:id/assign-vendor",
  authorize("SUPER_ADMIN", "ADMIN"),
  pOrders,
  validate(assignVendorSchema),
  OrderController.assignVendor,
);
router.patch(
  "/orders/:id/assign-rider",
  authorize("SUPER_ADMIN", "ADMIN"),
  pOrders,
  validate(assignRiderSchema),
  OrderController.assignRider,
);
router.get(
  "/admin/orders",
  authorize("SUPER_ADMIN", "ADMIN"),
  pOrders,
  OrderController.listAll,
);
router.get(
  "/vendors/:vendorId/orders",
  authorize("SUPER_ADMIN", "ADMIN"),
  pOrders,
  OrderController.listVendor,
);
router.post(
  "/orders/:orderId/refund",
  authorize("SUPER_ADMIN", "ADMIN"),
  pOrders,
  validate(processRefundSchema),
  OrderController.processRefund,
);
router.get(
  "/orders/:orderId/refunds",
  authorize("SUPER_ADMIN", "ADMIN"),
  pOrders,
  OrderController.listRefunds,
);
router.patch(
  "/order-meals/:id/status",
  authorize("SUPER_ADMIN", "ADMIN"),
  pOrders,
  validate(updateMealStatusSchema),
  OrderController.updateMealStatus,
);

export default router;
