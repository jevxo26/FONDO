import { Request } from "express";
import path from "path";
import fs from "fs/promises";
import { randomUUID } from "crypto";
import { cloudinary, isCloudinaryConfigured } from "../config/cloudinary";

const UPLOADS_DIR = path.join(process.cwd(), "public", "uploads");

const uploadToCloudinary = (buffer: Buffer): Promise<string> =>
    new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            { folder: "fondo/foods", resource_type: "image" },
            (error, result) => {
                if (error) {
                    reject(new Error("Failed to upload image to Cloudinary"));
                    return;
                }
                resolve(result?.secure_url || "");
            },
        );
        stream.end(buffer);
    });

const uploadToLocal = (buffer: Buffer, originalname: string): Promise<string> =>
    fs
        .mkdir(UPLOADS_DIR, { recursive: true })
        .then(() => {
            const ext = path.extname(originalname).toLowerCase() || ".png";
            const filename = `${randomUUID()}${ext}`;
            return fs.writeFile(path.join(UPLOADS_DIR, filename), buffer).then(() => `/uploads/${filename}`);
        });

const uploadImage = async (req: Request) => {
    if (!req.file) {
        throw new Error("Image is required");
    }

    if (isCloudinaryConfigured) {
        const url = await uploadToCloudinary(req.file.buffer);
        if (url) return url;
        throw new Error("Failed to upload image to Cloudinary");
    }

    const localUrl = await uploadToLocal(req.file.buffer, req.file.originalname);
    return `${req.protocol}://${req.get("host")}${localUrl}`;
};

export const UploadService = {
    uploadImage,
};
