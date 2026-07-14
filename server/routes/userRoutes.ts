import { Router } from "express";
import { UserController } from "../controllers/userController";
import { authorize, verifyToken } from "../middlewares/authMiddleware";

const router = Router();

router.get("/", verifyToken, authorize("ADMIN", "SUPER_ADMIN"), UserController.getAllUsers);
router.get("/:id", verifyToken, UserController.getUserById);
router.post("/", UserController.createUser);
router.patch("/:id", verifyToken, UserController.updateUser);

export default router;
