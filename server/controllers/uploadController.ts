import { Request, Response } from "express";
import { UploadService } from "../services/uploadService";

const uploadImage = async (req: Request, res: Response) => {
    const url = UploadService.uploadImage(req);

    res.status(200).json({
        message: "Image uploaded successfully",
        url,
    });
};

export const UploadController = {
    uploadImage,
};