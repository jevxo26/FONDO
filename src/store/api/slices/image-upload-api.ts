import { uploadToImgBB } from "@/lib/img-upload";
import { useState } from "react";

export function useUploadImage() {
    const [isLoading, setIsLoading] = useState(false);

    const mutateAsync = async (file: File) => {
        setIsLoading(true);
        try {
            const res = await uploadToImgBB(file);
            return res; // { success: true, message: "...", data: { url: "https://i.ibb.co/..." } }
        } catch (error) {
            console.error("ImgBB Upload Error:", error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    return {
        mutateAsync,
        isLoading,
    };
}