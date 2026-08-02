import { Router } from "express";
import { PackageController } from "../controllers/packageController";
import { verifyToken } from "../middlewares/authMiddleware";

const router = Router();

// Category Routes
router.post("/categories", PackageController.createCategory);
router.get("/categories", PackageController.getCategories);

// --- Public Routes ---
router.get("/", PackageController.getPackages);
router.get("/:id", PackageController.getPackageDetails);

// --- Vendor Management Routes ---
router.post("/vendor/create", PackageController.createPackage); // verifyVendor (Use hardcod vendor now)
router.get("/vendor/open-requests", PackageController.getVendorOpenRequests); // verifyVendor
router.patch("/vendor/accept-request/:id", PackageController.acceptCustomRequest); // verifyVendor

// --- Customer Routes ---
router.post("/custom-request", verifyToken, PackageController.createCustomRequest);
router.post("/custom-request/:id/pay", PackageController.payForCustomOrder); // verifyAuth

// --- Review Routes ---
router.post("/:packageId/reviews", verifyToken, PackageController.createReview);
router.patch("/reviews/:reviewId", verifyToken, PackageController.updateReview);
router.delete("/reviews/:reviewId", verifyToken, PackageController.deleteReview);

// TODO: add admin validation
// Get Review and update status Approve / Reject [ADMIN only]
// GET Only Pending Reviews Route
router.get("/reviews/pending", verifyToken, PackageController.getPendingReviews);
router.patch(
    "/reviews/:reviewId/status",
    verifyToken,
    PackageController.updateReviewStatus
);
export default router;
