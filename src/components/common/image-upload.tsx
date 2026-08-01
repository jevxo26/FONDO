"use client";

import Image from "next/image";
import { Camera } from "lucide-react";
import { useRef } from "react";

interface Props {
  image?: string;
  loading?: boolean;
  onUpload(file: File): void;
}

export default function ImageUploadField({
  image,
  loading,
  onUpload,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <input
        ref={inputRef}
        hidden
        type="file"
        accept="image/*"
        onChange={(e) => {

          const file = e.target.files?.[0];

          if (file) {

            onUpload(file);

            e.target.value = "";
          }

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
          "Uploading..."
        ) : image ? (
          <Image
            src={image}
            alt=""
            width={128}
            height={128}
            className="w-full h-full object-cover"
            unoptimized
          />
        ) : (
          <Camera className="w-8 h-8" />
        )}
      </button>
    </>
  );
}