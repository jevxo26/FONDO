// lib/upload-imgbb.ts

export async function uploadToImgBB(file: File) {
    const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;

    if (!apiKey) {
        throw new Error("ImgBB API key is missing in environment variables");
    }

    const formData = new FormData();
    formData.append("image", file);

    const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
        method: "POST",
        body: formData,
    });

    const resData = await response.json();

    if (!response.ok || !resData.success) {
        throw new Error(resData?.error?.message || "Failed to upload image to ImgBB");
    }

    return {
        success: true,
        message: "Image uploaded successfully",
        data: {
            url: resData.data.display_url || resData.data.url as string,
        },
    };
}