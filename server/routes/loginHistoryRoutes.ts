import { Router } from "express";
import { LoginHistoryController } from "../controllers/loginHistoryController";
import { verifyToken } from "../middlewares/authMiddleware";

const router = Router();

router.use(verifyToken);

router.get("/", LoginHistoryController.list);

export default router;
