"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import type { Food } from "@/types/food";
import { toast } from "sonner";
import { handleApiError } from "@/lib/api-error";
import { queryKeys } from "@/lib/query-keys";

export function useFavorites() {
  return useQuery({
    queryKey: queryKeys.favorites.all,
    queryFn: () => api.get<Food[]>("/foods/favorites"),
    staleTime: 30_000,
    gcTime: 60_000,
  });
}

export function useToggleFavorite() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (food: Food) => api.post(`/foods/${food.id}/favorite`),
    onMutate: async (food) => {
      await qc.cancelQueries({ queryKey: queryKeys.favorites.all });
      const prev = qc.getQueryData<Food[]>(queryKeys.favorites.all);
      qc.setQueryData<Food[]>(queryKeys.favorites.all, (old) => [food, ...(old ?? [])]);
      return { prev };
    },
    onSuccess: () => {
      toast.success("Added to favorites");
    },
    onError: (err, _, context) => {
      qc.setQueryData(queryKeys.favorites.all, context?.prev);
      toast.error(handleApiError(err));
    },
    onSettled: () => {
      qc.invalidateQueries({ queryKey: queryKeys.favorites.all });
    },
  });
}

export function useRemoveFavorite() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (food: Food) => api.delete(`/foods/${food.id}/favorite`),
    onMutate: async (food) => {
      await qc.cancelQueries({ queryKey: queryKeys.favorites.all });
      const prev = qc.getQueryData<Food[]>(queryKeys.favorites.all);
      qc.setQueryData<Food[]>(queryKeys.favorites.all, (old) => (old ?? []).filter((f) => f.id !== food.id));
      return { prev };
    },
    onSuccess: () => {
      toast.success("Removed from favorites");
    },
    onError: (err, _, context) => {
      qc.setQueryData(queryKeys.favorites.all, context?.prev);
      toast.error(handleApiError(err));
    },
    onSettled: () => {
      qc.invalidateQueries({ queryKey: queryKeys.favorites.all });
    },
  });
}
