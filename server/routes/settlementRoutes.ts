import { Router } from "express";
import { verifyToken, authorize } from "../middlewares/authMiddleware";
import { validate } from "../middlewares/validate";
import { SettlementController } from "../controllers/settlementController";
import { createSettlementSchema, processSettlementSchema, platformRevenueQuerySchema } from "../validations/settlement.validation";

const router = Router();

// Vendor wallet & settlements (Vendor or Admin)
router.get("/vendors/:vendorId/wallet", verifyToken, authorize("VENDOR", "ADMIN", "SUPER_ADMIN"), SettlementController.getVendorWallet);
router.get("/vendors/:vendorId/wallet/transactions", verifyToken, authorize("VENDOR", "ADMIN", "SUPER_ADMIN"), SettlementController.listVendorWalletTransactions);
router.get("/vendors/:vendorId/settlements", verifyToken, authorize("VENDOR", "ADMIN", "SUPER_ADMIN"), SettlementController.listVendorSettlements);

// Settlement detail
router.get("/settlements/:id", verifyToken, authorize("VENDOR", "ADMIN", "SUPER_ADMIN"), SettlementController.getSettlementDetail);

// Admin endpoints
router.post("/admin/settlements", verifyToken, authorize("ADMIN", "SUPER_ADMIN"), validate(createSettlementSchema), SettlementController.createSettlement);
router.post("/settlements/:id/process", verifyToken, authorize("ADMIN", "SUPER_ADMIN"), validate(processSettlementSchema), SettlementController.processSettlement);

// Platform revenue (Admin)
router.get("/platform/revenue", verifyToken, authorize("ADMIN", "SUPER_ADMIN"), validate(platformRevenueQuerySchema, "query"), SettlementController.getPlatformRevenue);

export default router;
