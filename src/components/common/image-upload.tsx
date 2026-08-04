"use client";

import Image from "next/image";
import { Camera } from "lucide-react";
import { useRef } from "react";

interface Props {
  image?: string | null;
  loading?: boolean;
  onUpload(file: File): void;
}

export default function ImageUploadField({
  image,
  loading,
  onUpload,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  // Safely check that image exists and is not an empty string or object
  const hasValidImage = typeof image === "string" && image.trim().length > 0;

  return (
    <>
      <input
        ref={inputRef}
        hidden
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (!file) return;

          if (!file.type.startsWith("image/")) {
            alert("Please select an image.");
            return;
          }
          if (file.size > 5 * 1024 * 1024) {
            alert("Maximum image size is 5MB.");
            return;
          }
          onUpload(file);
          e.target.value = "";
        }}
      />

      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="
          w-32
          h-32
          rounded-full
          border-2
          border-dashed
          border-border
          overflow-hidden
          flex
          items-center
          justify-center
          bg-muted
          hover:border-primary
          transition
        "
      >
        {loading ? (
          <span className="text-xs text-muted-foreground font-medium">Uploading...</span>
        ) : hasValidImage ? (
          <Image
            src={image}
            alt="Uploaded preview"
            width={128}
            height={128}
            className="w-full h-full object-cover"
            unoptimized
          />
        ) : (
          <Camera className="w-8 h-8 text-muted-foreground" />
        )}
      </button>
    </>
  );
}