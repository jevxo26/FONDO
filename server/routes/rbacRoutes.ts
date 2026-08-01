import { Router } from "express";
import { RbacController } from "../controllers/rbacController";
import { authorize, hasPermission, verifyToken } from "../middlewares/authMiddleware";
import { validate } from "../middlewares/validate";
import {
  assignPermissionsSchema,
  assignRoleSchema,
  createRoleSchema,
  updateRoleSchema,
} from "../validations/rbac.validation";

const router = Router();

router.use(verifyToken, authorize("SUPER_ADMIN"));

// Roles
router.get("/roles", RbacController.listRoles);
router.get("/roles/:id", RbacController.getRoleById);
router.post(
  "/roles",
  hasPermission("roles:create"),
  validate(createRoleSchema),
  RbacController.createRole,
);
router.put(
  "/roles/:id",
  hasPermission("roles:update"),
  validate(updateRoleSchema),
  RbacController.updateRole,
);
router.delete("/roles/:id", hasPermission("roles:delete"), RbacController.deleteRole);

// Role permissions
router.put(
  "/roles/:id/permissions",
  hasPermission("roles:update"),
  validate(assignPermissionsSchema),
  RbacController.assignPermissions,
);

// Permissions reference
router.get("/permissions", RbacController.listPermissions);

// User role assignment
router.get("/users/:userId/roles", RbacController.getUserRoles);
router.post(
  "/users/:userId/roles",
  hasPermission("users:update"),
  validate(assignRoleSchema),
  RbacController.assignRoleToUser,
);
router.delete(
  "/users/:userId/roles/:roleId",
  hasPermission("users:update"),
  RbacController.removeRoleFromUser,
);

export default router;
