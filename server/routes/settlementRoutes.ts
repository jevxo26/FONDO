import { Router } from "express";
import { authorize, hasPermission, verifyToken } from "../middlewares/authMiddleware";
import { validate } from "../middlewares/validate";
import { SettlementController } from "../controllers/settlementController";
import {
  createSettlementSchema,
  processSettlementSchema,
  platformRevenueQuerySchema,
} from "../validations/settlement.validation";

const router = Router();

const pReports = hasPermission("reports");
const pSettings = hasPermission("settings");

// Vendor wallet & settlements (Admin views OR vendor self-view)
router.get("/vendors/:vendorId/wallet", verifyToken, SettlementController.getVendorWallet);
router.get(
  "/vendors/:vendorId/wallet/transactions",
  verifyToken,
  SettlementController.listVendorWalletTransactions,
);
router.get("/vendors/:vendorId/settlements", verifyToken, SettlementController.listVendorSettlements);

// Settlement detail
router.get(
  "/settlements/:id",
  verifyToken,
  authorize("SUPER_ADMIN", "ADMIN"),
  pReports,
  SettlementController.getSettlementDetail,
);

// Admin endpoints
router.get(
  "/admin/settlements",
  verifyToken,
  authorize("SUPER_ADMIN", "ADMIN"),
  pSettings,
  SettlementController.listAllSettlements,
);
router.post(
  "/admin/settlements",
  verifyToken,
  authorize("SUPER_ADMIN", "ADMIN"),
  pSettings,
  validate(createSettlementSchema),
  SettlementController.createSettlement,
);
router.post(
  "/settlements/:id/process",
  verifyToken,
  authorize("SUPER_ADMIN", "ADMIN"),
  pSettings,
  validate(processSettlementSchema),
  SettlementController.processSettlement,
);

// Platform revenue (Admin)
router.get(
  "/platform/revenue",
  verifyToken,
  authorize("SUPER_ADMIN", "ADMIN"),
  pSettings,
  validate(platformRevenueQuerySchema, "query"),
  SettlementController.getPlatformRevenue,
);

export default router;
