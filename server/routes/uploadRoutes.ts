import { Router } from "express";
import { upload } from "../config/multer";
import { UploadController } from "../controllers/uploadController";
import { verifyToken } from "../middlewares/authMiddleware";

const router = Router();

router.post(
    "/image",
    verifyToken,
    upload.single("image"),
    UploadController.uploadImage
);

export default router;