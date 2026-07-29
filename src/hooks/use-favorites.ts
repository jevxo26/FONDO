"use client";

import { useCallback } from "react";
import { useAuth } from "@/hooks/use-auth";
import {
  useGetFavoritesQuery,
  useToggleFavoriteMutation,
  useRemoveFavoriteMutation,
} from "@/store/api/slices/favorites-api";
import type { Food } from "@/types/food";

export function useFavorites() {
  const { isAuthenticated } = useAuth();
  return useGetFavoritesQuery(undefined, { skip: !isAuthenticated });
}

export function useToggleFavorite() {
  const { isAuthenticated } = useAuth();
  const [trigger, { isLoading }] = useToggleFavoriteMutation();

  const mutate = useCallback(
    (food: Food | { id: string }, options?: { onSettled?: () => void }) => {
      if (!isAuthenticated) {
        options?.onSettled?.();
        return;
      }
      trigger(food as Food)
        .unwrap()
        .finally(() => options?.onSettled?.());
    },
    [trigger, isAuthenticated],
  );

  const mutateAsync = useCallback(
    async (food: Food | { id: string }) => {
      if (!isAuthenticated) return;
      return trigger(food as Food).unwrap();
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
      if (!isAuthenticated) {
        options?.onSettled?.();
        return;
      }
      trigger(food as Food)
        .unwrap()
        .finally(() => options?.onSettled?.());
    },
    [trigger, isAuthenticated],
  );

  const mutateAsync = useCallback(
    async (food: { id: string }) => {
      if (!isAuthenticated) return;
      return trigger(food as Food).unwrap();
    },
    [trigger, isAuthenticated],
  );

  return { mutate, mutateAsync, isPending: isLoading };
}
