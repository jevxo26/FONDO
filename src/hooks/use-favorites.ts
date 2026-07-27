"use client";

import { useCallback, useEffect, useState } from "react";
import * as wishlistStorage from "@/lib/wishlist-storage";

interface FoodLike {
  id: string;
  name: string;
  thumbnail?: string;
  slug: string;
  servingSize?: string;
  shortDescription?: string;
  preparationTime?: number;
  variants: Array<{ price: string | number; discountPrice?: string | number | null }>;
  rating?: { averageRating: number };
}

function toWishlistItem(food: FoodLike): wishlistStorage.WishlistItem {
  return {
    id: food.id,
    name: food.name,
    thumbnail: food.thumbnail,
    slug: food.slug,
    servingSize: food.servingSize,
    shortDescription: food.shortDescription,
    preparationTime: food.preparationTime,
    variants: food.variants.map((v) => ({
      price: Number(v.price),
      ...(v.discountPrice != null ? { discountPrice: Number(v.discountPrice) } : {}),
    })),
    rating: food.rating ? { averageRating: food.rating.averageRating } : undefined,
  };
}

export function useFavorites() {
  const [items, setItems] = useState<wishlistStorage.WishlistItem[]>(() =>
    wishlistStorage.getWishlist(),
  );

  useEffect(() => {
    const handler = () => setItems(wishlistStorage.getWishlist());
    window.addEventListener("fondo-wishlist-changed", handler);
    return () => window.removeEventListener("fondo-wishlist-changed", handler);
  }, []);

  return { data: items, isLoading: false, error: null };
}

export function useToggleFavorite() {
  const [isPending, setIsPending] = useState(false);

  const mutate = useCallback(
    (food: FoodLike, options?: { onSettled?: () => void }) => {
      if (isPending) return;
      setIsPending(true);
      try {
        wishlistStorage.addToWishlist(toWishlistItem(food));
        options?.onSettled?.();
      } catch {
        options?.onSettled?.();
      } finally {
        setIsPending(false);
      }
    },
    [isPending],
  );

  const mutateAsync = useCallback(async (food: FoodLike) => {
    wishlistStorage.addToWishlist(toWishlistItem(food));
  }, []);

  return { mutate, mutateAsync, isPending };
}

export function useRemoveFavorite() {
  const [isPending, setIsPending] = useState(false);

  const mutate = useCallback(
    (food: { id: string }, options?: { onSettled?: () => void }) => {
      if (isPending) return;
      setIsPending(true);
      try {
        wishlistStorage.removeFromWishlist(food.id);
        options?.onSettled?.();
      } catch {
        options?.onSettled?.();
      } finally {
        setIsPending(false);
      }
    },
    [isPending],
  );

  const mutateAsync = useCallback(async (food: { id: string }) => {
    wishlistStorage.removeFromWishlist(food.id);
  }, []);

  return { mutate, mutateAsync, isPending };
}
