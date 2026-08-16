// @/lib/cloudinary.ts

export async function uploadToCloudinary(file: File): Promise<string> {
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
    console.log("Cloudinary Cloud Name:", cloudName, "Upload Preset:", uploadPreset);
    if (!cloudName || !uploadPreset) {
        throw new Error("Cloudinary cloud name or upload preset is missing in environment variables.");
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);

    const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
            method: "POST",
            body: formData,
        }
    );

    if (!response.ok) {
        // const errorData = await response.json();
        // console.log("Cloudinary response error:", errorData);
        throw new Error("Failed to upload image to Cloudinary");
    }

    const data = await response.json();
    return data.secure_url;
}