import multer from "multer";
import path from "path";
import { randomUUID } from "crypto";
import AppError from "../utils/AppError";

const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        cb(null, path.join(process.cwd(), "public", "uploads"));
    },

    filename: (_, file, cb) => {
        const ext = path.extname(file.originalname);
        cb(null, `${randomUUID()}${ext}`);
    },
});

const fileFilter: multer.Options["fileFilter"] = (_req, file, cb) => {
    const allowed = [".jpg", ".jpeg", ".png", ".gif", ".webp"];
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowed.includes(ext)) {
        cb(null, true);
    } else {
        cb(new AppError(400, "Only image files (jpg, jpeg, png, gif, webp) are allowed"));
    }
};

export const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024,
    },
});