import { useState } from "react";
import { uploadImage } from "@/lib/img-upload";

export function useUploadImage() {
  const [isLoading, setIsLoading] = useState(false);

  const mutateAsync = async (file: File) => {
    setIsLoading(true);
    try {
      return await uploadImage(file);
    } catch (error) {
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
