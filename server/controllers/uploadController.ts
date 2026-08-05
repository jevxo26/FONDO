import { Request, Response } from "express";
import { UploadService } from "../services/uploadService";

const uploadImage = async (req: Request, res: Response) => {
    try {
        const url = await UploadService.uploadImage(req);
        res.status(200).json({
            success: true,
            message: "Image uploaded successfully",
            data: { url },
        });
    } catch (error) {
        const message = error instanceof Error ? error.message : "Image upload failed";
        res.status(400).json({
            success: false,
            message,
            data: null,
        });
    }
};

export const UploadController = {
    uploadImage,
};