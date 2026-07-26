"use client";

import {
  useGetFavoritesQuery,
  useToggleFavoriteMutation,
  useRemoveFavoriteMutation,
} from "@/store/api/slices/favorites-api";
import { createMutationWrapper } from "@/store/api/mutation-wrapper";

export function useFavorites() {
  const { data, isLoading, error } = useGetFavoritesQuery(undefined);
  return { data, isLoading, error };
}

export function useToggleFavorite() {
  const [trigger, { isLoading }] = useToggleFavoriteMutation();
  return { ...createMutationWrapper(trigger), isPending: isLoading };
}

export function useRemoveFavorite() {
  const [trigger, { isLoading }] = useRemoveFavoriteMutation();
  return { ...createMutationWrapper(trigger), isPending: isLoading };
}
