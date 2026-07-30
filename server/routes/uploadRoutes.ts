import { Router } from "express";
import { upload } from "../config/multer";
import { UploadController } from "../controllers/uploadController";

const router = Router();

router.post(
    "/image",
    upload.single("image"),
    UploadController.uploadImage
);

export default router;