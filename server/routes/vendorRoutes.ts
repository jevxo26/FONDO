import { Router } from "express";
import { VendorController } from "../controllers/vendorController";
import { verifyToken, authorize, hasPermission } from "../middlewares/authMiddleware";

const router = Router();

const pView = hasPermission("vendors");
const pCreate = hasPermission("vendors");
const pUpdate = hasPermission("vendors");
const pDelete = hasPermission("vendors");

// Current vendor profile (authenticated vendor user)
router.get(
  "/my-profile",
  verifyToken,
  authorize("VENDOR"),
  VendorController.getMyVendor,
);

// --- Core Vendor Lifecycle (Admin) ---
router.post("/add", verifyToken, pCreate, VendorController.createVendor);
router.get("/all", verifyToken, pView, VendorController.getAllVendors);
router.get("/:vendorCode", VendorController.getVendorByVendorCode);
router.patch("/:vendorCode", verifyToken, pUpdate, VendorController.updateVendor);
router.delete("/:vendorCode", verifyToken, pDelete, VendorController.softDeleteVendor);

// --- Vendor Profile Sub-Resource ---
router.put("/:vendorCode/profile", verifyToken, pUpdate, VendorController.upsertVendorProfile);

// --- Logistics & Operations Management (Branches & Kitchens) ---
router.post("/:vendorCode/branches", verifyToken, pUpdate, VendorController.addBranch);
router.get("/:vendorCode/branches", verifyToken, pView, VendorController.getVendorBranches);
router.post("/branches/:branchId/kitchens", verifyToken, pUpdate, VendorController.addKitchenToBranch);

// --- Compliance Management (Legal Documents) ---
router.post("/:vendorCode/documents", verifyToken, pUpdate, VendorController.uploadDocument);
router.patch("/documents/:docId/verify", verifyToken, pUpdate, VendorController.verifyDocument);

// --- Financial Management (Wallets & Settlements) ---
router.get("/:vendorCode/wallet", verifyToken, pView, VendorController.getWalletBalance);
router.get("/:vendorCode/settlements", verifyToken, pView, VendorController.getSettlementHistory);
router.post(
  "/:vendorCode/settlements/trigger",
  verifyToken,
  hasPermission("settings"),
  VendorController.generateSettlementPeriod,
);

// --- Operational Meta Configurations ---
router.patch("/:vendorCode/settings", verifyToken, pUpdate, VendorController.updateSettings);
router.put("/:vendorCode/operating-hours", verifyToken, pUpdate, VendorController.setOperatingHours);

export default router;
