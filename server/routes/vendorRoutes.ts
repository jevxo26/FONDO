import { Router } from "express";
import { VendorController } from "../controllers/vendorController";

const router = Router();

// --- Core Vendor Lifecycle ---
router.post("/add", VendorController.createVendor);
router.get("/all", VendorController.getAllVendors);
router.get("/:vendorCode", VendorController.getVendorByVendorCode);
router.patch("/:vendorCode", VendorController.updateVendor);
router.delete("/:vendorCode", VendorController.softDeleteVendor);

// --- Vendor Profile Sub-Resource ---
router.put("/:vendorCode/profile", VendorController.upsertVendorProfile);

// --- Logistics & Operations Management (Branches & Kitchens) ---
router.post("/:vendorCode/branches", VendorController.addBranch);
router.get("/:vendorCode/branches", VendorController.getVendorBranches);
router.post("/branches/:branchId/kitchens", VendorController.addKitchenToBranch);

// --- Compliance Management (Legal Documents) ---
router.post("/:vendorCode/documents", VendorController.uploadDocument);
router.patch("/documents/:docId/verify", VendorController.verifyDocument);

// --- Financial Management (Wallets & Settlements) ---
router.get("/:vendorCode/wallet", VendorController.getWalletBalance);
router.get("/:vendorCode/settlements", VendorController.getSettlementHistory);
router.post("/:vendorCode/settlements/trigger", VendorController.generateSettlementPeriod);

// --- Operational Meta Configurations ---
router.patch("/:vendorCode/settings", VendorController.updateSettings);
router.put("/:vendorCode/operating-hours", VendorController.setOperatingHours);

export default router;