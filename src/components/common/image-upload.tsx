"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { Camera, Loader2, Trash2 } from "lucide-react";

interface Props {
  image?: string | null;
  loading?: boolean;
  onUpload: (file: File) => void;
  onRemove?: () => void;
  variant?: "circle" | "rectangle"; // Thumbnail এর জন্য circle, Cover এর জন্য rectangle
}

export default function ImageUploadField({
  image,
  loading = false,
  onUpload,
  onRemove,
  variant = "circle",
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  const hasValidImage = typeof image === "string" && image.trim().length > 0;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image file (JPG, PNG, WebP).");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Maximum image size limit is 5MB.");
      return;
    }

    onUpload(file);
    e.target.value = "";
  };

  const containerStyle =
    variant === "circle"
      ? "w-32 h-32 rounded-full"
      : "w-full h-44 rounded-2xl";

  return (
    <div className="relative inline-block w-full">
      <input
        ref={inputRef}
        hidden
        type="file"
        accept="image/*"
        onChange={handleFileChange}
      />

      <div
        onClick={() => !loading && inputRef.current?.click()}
        className={`
          ${containerStyle}
          relative border-2 border-dashed border-border bg-muted/40 
          hover:border-primary hover:bg-muted/80 transition-all cursor-pointer 
          flex flex-col items-center justify-center overflow-hidden group
        `}
      >
        {loading ? (
          <div className="flex flex-col items-center gap-1 text-primary">
            <Loader2 className="w-6 h-6 animate-spin" />
            <span className="text-[11px] font-medium">Uploading...</span>
          </div>
        ) : hasValidImage ? (
          <>
            <Image
              src={image}
              alt="Uploaded preview"
              fill
              sizes="(max-width: 768px) 100vw, 300px"
              className="object-cover"
              unoptimized
            />
            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Camera className="w-6 h-6 text-white" />
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center gap-1.5 text-muted-foreground p-4 text-center">
            <Camera className="w-6 h-6" />
            <span className="text-xs font-medium">
              Click to upload {variant === "rectangle" ? "Cover" : "Thumbnail"}
            </span>
          </div>
        )}
      </div>

      {/* Remove Image Button */}
      {hasValidImage && !loading && onRemove && (
        <button
          type="button"
          onClick={onRemove}
          className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground p-1.5 rounded-full shadow-md hover:bg-destructive/90 transition-transform active:scale-95"
          title="Remove Image"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
}