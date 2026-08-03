import { Router } from "express";
import { verifyToken, authorize, hasPermission } from "../middlewares/authMiddleware";
import { validate } from "../middlewares/validate";
import { PaymentController } from "../controllers/paymentController";
import {
  initiatePaymentSchema,
  retryPaymentSchema,
  refundPaymentSchema,
  adjustPaymentSchema,
} from "../validations/payment.validation";

const router = Router();

// Public / gateway callbacks
router.get("/payment-methods", PaymentController.listMethods);
router.post("/payments/success", PaymentController.success);
router.get("/payments/success", PaymentController.success);
router.post("/payments/fail", PaymentController.fail);
router.get("/payments/fail", PaymentController.fail);
router.post("/payments/cancel", PaymentController.cancel);
router.get("/payments/cancel", PaymentController.cancel);
router.post("/payments/ipn", PaymentController.ipn);

// Customer
router.post(
  "/payments/initiate",
  verifyToken,
  validate(initiatePaymentSchema),
  PaymentController.initiate,
);
router.post(
  "/payments/:id/retry",
  verifyToken,
  authorize("CUSTOMER"),
  validate(retryPaymentSchema),
  PaymentController.retry,
);

// Admin
router.post(
  "/payments/:id/refund",
  verifyToken,
  authorize("SUPER_ADMIN", "ADMIN"),
  hasPermission("settings"),
  validate(refundPaymentSchema),
  PaymentController.refund,
);
router.post(
  "/payments/:id/adjust",
  verifyToken,
  authorize("SUPER_ADMIN", "ADMIN"),
  hasPermission("settings"),
  validate(adjustPaymentSchema),
  PaymentController.adjust,
);

// Auth (customer sees own, admin sees all)
router.get("/payments", verifyToken, PaymentController.list);
router.get("/payments/:id", verifyToken, PaymentController.getById);

export default router;
