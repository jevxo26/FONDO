"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import { queryKeys } from "@/lib/query-keys";
import type { Food } from "@/types/food";

export function useFavorites() {
  return useQuery({
    queryKey: queryKeys.favorites.all,
    queryFn: () => api.get<Food[]>("/foods/favorites"),
  });
}

export function useToggleFavorite() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (foodId: string) =>
      api.post(`/foods/${foodId}/favorite`),
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.favorites.all }),
  });
}

export function useRemoveFavorite() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (foodId: string) =>
      api.delete(`/foods/${foodId}/favorite`),
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.favorites.all }),
  });
}
