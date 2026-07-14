import { Router } from "express";
import { DeviceController } from "../controllers/deviceController";
import { verifyToken } from "../middlewares/authMiddleware";
import { validate } from "../middlewares/validate";
import { registerDeviceSchema } from "../validations/device.validation";

const router = Router();

router.use(verifyToken);

router.get("/", DeviceController.list);
router.post("/", validate(registerDeviceSchema), DeviceController.register);
router.delete("/:id", DeviceController.unregister);

export default router;
