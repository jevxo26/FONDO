"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { Camera, Loader2, Trash2, UploadCloud } from "lucide-react";
import { cn } from "@/lib/utils";

type Variant = "circle" | "rectangle" | "gallery";

interface Props {
  image?: string | null;
  loading?: boolean;
  onUpload: (file: File) => void;
  onRemove?: () => void;
  variant?: Variant;
  error?: boolean;
  errorText?: string;
  className?: string;
}

const variantClasses: Record<Variant, string> = {
  circle: "w-32 h-32 rounded-full",
  rectangle: "w-full h-44 rounded-2xl",
  gallery: "w-full aspect-square rounded-2xl",
};

export default function ImageUploadField({
  image,
  loading = false,
  onUpload,
  onRemove,
  variant = "circle",
  error = false,
  errorText,
  className,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  const hasValidImage = typeof image === "string" && image.trim().length > 0;

  const validateAndUpload = (file: File) => {
    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image file (JPG, PNG, WebP).");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Maximum image size limit is 5MB.");
      return;
    }

    onUpload(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    validateAndUpload(file);
    e.target.value = "";
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (!file) return;
    validateAndUpload(file);
  };

  const isCircle = variant === "circle";

  return (
    <div className={cn("relative inline-block w-full", className)}>
      <input
        ref={inputRef}
        hidden
        type="file"
        accept="image/*"
        onChange={handleFileChange}
      />

      <div
        onClick={() => !loading && inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          if (!loading) setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        className={cn(
          `${variantClasses[variant]} group relative border-2 border-dashed bg-muted/40 transition-all cursor-pointer flex flex-col items-center justify-center overflow-hidden`,
          dragging
            ? "border-primary bg-primary/10 scale-[0.99]"
            : error
              ? "border-destructive/60 hover:border-primary"
              : "border-border hover:border-primary hover:bg-muted/80",
        )}
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
              className={cn("object-cover", !isCircle && "transition-transform duration-500 group-hover:scale-105")}
              unoptimized
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Camera className="w-6 h-6 text-white" />
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center gap-1.5 text-muted-foreground p-4 text-center">
            <UploadCloud className={cn("text-primary/70", isCircle ? "w-5 h-5" : "w-6 h-6")} />
            <span className="text-xs font-medium">
              {variant === "gallery"
                ? "Upload image"
                : `Click to upload ${variant === "rectangle" ? "cover" : "thumbnail"}`}
            </span>
            {variant !== "circle" && (
              <span className="text-[10px] text-muted-foreground/70">or drag &amp; drop</span>
            )}
          </div>
        )}
      </div>

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

      {error && errorText && !hasValidImage && (
        <p className="mt-1.5 text-xs font-medium text-destructive">{errorText}</p>
      )}
    </div>
  );
}
