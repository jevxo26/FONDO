import { Router } from "express";
import { NotificationController } from "../controllers/notificationController";
import { verifyToken } from "../middlewares/authMiddleware";
import { validate } from "../middlewares/validate";
import { updateNotificationSchema } from "../validations/notification.validation";

const router = Router();

router.use(verifyToken);

router.get("/", NotificationController.get);
router.patch("/", validate(updateNotificationSchema), NotificationController.update);

export default router;
