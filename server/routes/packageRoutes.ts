import { Router } from "express";
import { PackageController } from "../controllers/packageController";
import { authorize, hasPermission, verifyToken } from "../middlewares/authMiddleware";

const router = Router();

const pPackages = hasPermission("packages");

// Category Routes
router.post(
  "/categories",
  verifyToken,
  authorize("SUPER_ADMIN", "ADMIN"),
  pPackages,
  PackageController.createCategory,
);
router.get("/categories", PackageController.getCategories);

// --- Public Routes ---
router.get("/", PackageController.getPackages);
router.get("/:id", PackageController.getPackageDetails);

// --- Vendor Management Routes ---
router.post(
  "/vendor/create",
  verifyToken,
  pPackages,
  PackageController.createPackage,
);
router.get(
  "/vendor/open-requests",
  verifyToken,
  pPackages,
  PackageController.getVendorOpenRequests,
);
router.patch(
  "/vendor/accept-request/:id",
  verifyToken,
  pPackages,
  PackageController.acceptCustomRequest,
);

// --- Customer Routes ---
router.post("/custom-request", verifyToken, PackageController.createCustomRequest);
router.post("/custom-request/:id/pay", verifyToken, PackageController.payForCustomOrder);

// --- Review Routes ---
router.post("/:packageId/reviews", verifyToken, PackageController.createReview);
router.patch("/reviews/:reviewId", verifyToken, PackageController.updateReview);
router.delete("/reviews/:reviewId", verifyToken, PackageController.deleteReview);

// Admin review moderation
router.get(
  "/reviews/pending",
  verifyToken,
  authorize("SUPER_ADMIN", "ADMIN"),
  pPackages,
  PackageController.getPendingReviews,
);
router.patch(
  "/reviews/:reviewId/status",
  verifyToken,
  authorize("SUPER_ADMIN", "ADMIN"),
  pPackages,
  PackageController.updateReviewStatus,
);
export default router;
