import { Router } from "express";
import { UserController } from "../controllers/userController";
import { authorize, verifyToken } from "../middlewares/authMiddleware";
import { validate } from "../middlewares/validate";
import { updateProfileSchema } from "../validations/user.validation";
import addressRoutes from "./addressRoutes";
import deviceRoutes from "./deviceRoutes";
import notificationRoutes from "./notificationRoutes";
import loginHistoryRoutes from "./loginHistoryRoutes";

const router = Router();

// Admin routes
router.get("/", verifyToken, authorize("ADMIN", "SUPER_ADMIN"), UserController.getAllUsers);
router.post("/", UserController.createUser);
router.get("/:id", verifyToken, UserController.getUserById);
router.patch("/:id", verifyToken, UserController.updateUser);

// Profile routes
router.patch("/me", verifyToken, validate(updateProfileSchema), UserController.updateMe);
router.delete("/me", verifyToken, UserController.deleteMe);

// Sub-resources
router.use("/me/addresses", addressRoutes);
router.use("/me/devices", deviceRoutes);
router.use("/me/notification-settings", notificationRoutes);
router.use("/me/login-history", loginHistoryRoutes);

export default router;
