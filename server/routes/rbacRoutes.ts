import { Router } from "express";
import { RbacController } from "../controllers/rbacController";
import { hasPermission, verifyToken } from "../middlewares/authMiddleware";
import { validate } from "../middlewares/validate";
import { togglePermissionSchema } from "../validations/rbac.validation";

const router = Router();

router.use(verifyToken, hasPermission("users"));

router.get("/permissions", RbacController.listPermissionModules);

router.post(
  "/users/:userId/permissions",
  hasPermission("users"),
  validate(togglePermissionSchema),
  RbacController.toggleUserModule,
);

export default router;
