import { api } from "./api-client";

export interface ImageUploadResult {
  success: boolean;
  message: string;
  data: { url: string };
}

export async function uploadImage(file: File): Promise<ImageUploadResult> {
  const formData = new FormData();
  formData.append("image", file);

  const data = await api.post<{ url: string }>("/upload/image", formData);

  return {
    success: true,
    message: "Image uploaded successfully",
    data: { url: data.url },
  };
}
