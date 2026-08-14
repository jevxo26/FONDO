"use client";

import { useCallback, useState } from "react";

type SlotImage = { file: File; preview: string } | null;

interface PendingImages {
  thumbnail: SlotImage;
  cover: SlotImage;
  gallery: SlotImage[];
}

const emptyPending: PendingImages = { thumbnail: null, cover: null, gallery: [] };

export function useImageFiles() {
  const [pending, setPending] = useState<PendingImages>(emptyPending);

  const setFile = useCallback((slot: "thumbnail" | "cover", file: File) => {
    setPending((prev) => {
      if (prev[slot]) URL.revokeObjectURL(prev[slot].preview);
      return { ...prev, [slot]: { file, preview: URL.createObjectURL(file) } };
    });
  }, []);

  const clearFile = useCallback((slot: "thumbnail" | "cover") => {
    setPending((prev) => {
      const existing = prev[slot];
      if (existing) URL.revokeObjectURL(existing.preview);
      return { ...prev, [slot]: null };
    });
  }, []);

  const setGalleryFile = useCallback((index: number, file: File | null) => {
    setPending((prev) => {
      const gallery = [...prev.gallery];
      if (gallery[index]) URL.revokeObjectURL(gallery[index].preview);
      gallery[index] = file ? { file, preview: URL.createObjectURL(file) } : null;
      return { ...prev, gallery };
    });
  }, []);

  const appendGallerySlot = useCallback(() => {
    setPending((prev) => ({ ...prev, gallery: [...prev.gallery, null] }));
  }, []);

  const removeGallerySlot = useCallback((index: number) => {
    setPending((prev) => {
      const gallery = prev.gallery.filter((_, i) => i !== index);
      const existing = prev.gallery[index];
      if (existing) URL.revokeObjectURL(existing.preview);
      return { ...prev, gallery };
    });
  }, []);

  const previewFor = useCallback(
    (slot: "thumbnail" | "cover", existing: string): string => pending[slot]?.preview ?? existing,
    [pending],
  );

  const galleryPreview = useCallback(
    (index: number, existing: string): string => pending.gallery[index]?.preview ?? existing,
    [pending],
  );

  const hasPending = useCallback(
    () =>
      Boolean(pending.thumbnail || pending.cover || pending.gallery.some((slot) => slot !== null)),
    [pending],
  );

  const resolve = useCallback(
    async (
      existing: { thumbnail: string; coverImage: string; galleryImages: string[] },
      upload: (file: File) => Promise<string>,
    ) => {
      const [thumbnail, coverImage] = await Promise.all([
        pending.thumbnail ? upload(pending.thumbnail.file) : Promise.resolve(existing.thumbnail),
        pending.cover ? upload(pending.cover.file) : Promise.resolve(existing.coverImage),
      ]);
      const galleryImages = await Promise.all(
        existing.galleryImages.map((url, i) =>
          pending.gallery[i] ? upload(pending.gallery[i].file) : Promise.resolve(url),
        ),
      );
      return { thumbnail, coverImage, galleryImages };
    },
    [pending],
  );

  return {
    pending,
    setFile,
    clearFile,
    setGalleryFile,
    appendGallerySlot,
    removeGallerySlot,
    previewFor,
    galleryPreview,
    hasPending,
    resolve,
  };
}
