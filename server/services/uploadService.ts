import { Request } from "express";

const uploadImage = (req: Request) => {
    console.log("req.file", req.file);
    if (!req.file) {
        throw new Error("Image is required");
    }

    return `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
};

export const UploadService = {
    uploadImage,
};