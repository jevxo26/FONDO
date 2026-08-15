import { Router } from "express";
import { RiderController } from "../controllers/riderController";
import { verifyToken, authorize, hasPermission } from "../middlewares/authMiddleware";
import { Role } from "@prisma/client";

const router = Router();

const pView = hasPermission("riders");
const pCreate = hasPermission("riders");
const pUpdate = hasPermission("riders");
const pDelete = hasPermission("riders");

// Public Application Endpoint (For Onboarding App/Web)
router.post("/apply", RiderController.createRider);

// Authenticated Rider Personal Profile
router.get(
    "/my-profile",
    verifyToken,
    authorize("RIDER"),
    RiderController.getMyRiderProfile,
);

router.patch(
    "/:riderCode/duty-status",
    verifyToken,
    authorize("RIDER", Role.ADMIN, Role.SUPER_ADMIN),
    RiderController.toggleDutyStatus,
);

// Admin & Backoffice Management
router.post(
    "/add",
    verifyToken,
    pCreate,
    authorize(Role.ADMIN, Role.SUPER_ADMIN),
    RiderController.createRider,
);

router.get("/all", verifyToken, pView, RiderController.getAllRiders);
router.get("/:riderCode", verifyToken, RiderController.getRiderByRiderCode);
router.patch("/:riderCode", verifyToken, pUpdate, RiderController.updateRider);
router.delete("/:riderCode", verifyToken, pDelete, RiderController.softDeleteRider);

// Sub-Resource Management
router.post("/:riderCode/documents", verifyToken, pUpdate, RiderController.uploadDocument);
router.patch("/documents/:docId/verify", verifyToken, pUpdate, RiderController.verifyDocument);

router.get("/:riderCode/wallet", verifyToken, RiderController.getWalletBalance);
router.get("/:riderCode/payouts", verifyToken, RiderController.getPayoutHistory);

router.patch("/:riderCode/settings", verifyToken, pUpdate, RiderController.updateSettings);

export default router;