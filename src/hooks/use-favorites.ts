"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import * as wishlistStorage from "@/lib/wishlist-storage";
import { useAuth } from "@/hooks/use-auth";
import {
  useGetFavoritesQuery,
  useToggleFavoriteMutation,
  useRemoveFavoriteMutation,
} from "@/store/api/slices/favorites-api";
import { toast } from "sonner";
import { handleApiError } from "@/lib/api-error";

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
  const { isAuthenticated } = useAuth();
  const [local, setLocal] = useState<wishlistStorage.WishlistItem[]>(() =>
    wishlistStorage.getWishlist(),
  );
  const { data: apiFavorites, isLoading, error } = useGetFavoritesQuery(undefined, {
    skip: !isAuthenticated,
  });
  const prevApi = useRef(apiFavorites);

  useEffect(() => {
    const handler = () => setLocal(wishlistStorage.getWishlist());
    window.addEventListener("fondo-wishlist-changed", handler);
    return () => window.removeEventListener("fondo-wishlist-changed", handler);
  }, []);

  useEffect(() => {
    if (apiFavorites && apiFavorites !== prevApi.current) {
      prevApi.current = apiFavorites;
      wishlistStorage.saveWishlist(apiFavorites);
    }
  }, [apiFavorites]);

  return { data: apiFavorites ?? local, isLoading, error };
}

export function useToggleFavorite() {
  const { isAuthenticated } = useAuth();
  const [trigger, { isLoading }] = useToggleFavoriteMutation();

  const mutate = useCallback(
    (food: FoodLike, options?: { onSettled?: () => void }) => {
      if (isLoading) return;
      wishlistStorage.addToWishlist(toWishlistItem(food));
      if (isAuthenticated) {
        trigger(food as never)
          .unwrap()
          .then(() => toast.success("Added to favorites"))
          .catch((err) => toast.error(handleApiError(err)))
          .finally(() => options?.onSettled?.());
      } else {
        options?.onSettled?.();
      }
    },
    [trigger, isLoading, isAuthenticated],
  );

  const mutateAsync = useCallback(
    async (food: FoodLike) => {
      wishlistStorage.addToWishlist(toWishlistItem(food));
      if (isAuthenticated) {
        return trigger(food as never).unwrap();
      }
    },
    [trigger, isAuthenticated],
  );

  return { mutate, mutateAsync, isPending: isLoading };
}

export function useRemoveFavorite() {
  const { isAuthenticated } = useAuth();
  const [trigger, { isLoading }] = useRemoveFavoriteMutation();

  const mutate = useCallback(
    (food: { id: string }, options?: { onSettled?: () => void }) => {
      if (isLoading) return;
      wishlistStorage.removeFromWishlist(food.id);
      if (isAuthenticated) {
        trigger(food as never)
          .unwrap()
          .then(() => toast.success("Removed from favorites"))
          .catch((err) => toast.error(handleApiError(err)))
          .finally(() => options?.onSettled?.());
      } else {
        options?.onSettled?.();
      }
    },
    [trigger, isLoading, isAuthenticated],
  );

  const mutateAsync = useCallback(
    async (food: { id: string }) => {
      wishlistStorage.removeFromWishlist(food.id);
      if (isAuthenticated) {
        return trigger(food as never).unwrap();
      }
    },
    [trigger, isAuthenticated],
  );

  return { mutate, mutateAsync, isPending: isLoading };
}
