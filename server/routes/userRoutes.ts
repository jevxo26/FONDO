import { Router } from "express";
import { UserController } from "../controllers/userController";
import { hasPermission, verifyToken } from "../middlewares/authMiddleware";
import { validate } from "../middlewares/validate";
import { createUserSchema, updateProfileSchema } from "../validations/user.validation";
import addressRoutes from "./addressRoutes";
import deviceRoutes from "./deviceRoutes";
import notificationRoutes from "./notificationRoutes";
import loginHistoryRoutes from "./loginHistoryRoutes";

const router = Router();

// Profile routes
router.patch("/me", verifyToken, validate(updateProfileSchema), UserController.updateMe);
router.delete("/me", verifyToken, UserController.deleteMe);

// Sub-resources
router.use("/me/addresses", addressRoutes);
router.use("/me/devices", deviceRoutes);
router.use("/me/notification-settings", notificationRoutes);
router.use("/me/login-history", loginHistoryRoutes);

// Admin routes
router.get("/", verifyToken, hasPermission("users"), UserController.getAllUsers);
router.post("/", verifyToken, hasPermission("users"), validate(createUserSchema), UserController.createUser);
router.get("/:id", verifyToken, hasPermission("users"), UserController.getUserById);
router.patch("/:id", verifyToken, hasPermission("users"), UserController.updateUser);
router.delete("/:id", verifyToken, hasPermission("users"), UserController.deleteUser);

export default router;
