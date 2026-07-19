"use client";

import { useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import type { Food } from "@/types/food";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { setFavorites, addFavorite, removeFavorite } from "@/store/slices/favoritesDataSlice";
import { incrementFavoritesCount, decrementFavoritesCount } from "@/store/slices/counterSlice";
import { toast } from "sonner";
import { handleApiError } from "@/lib/api-error";

export function useFavorites() {
  const dispatch = useAppDispatch();
  const reduxFavorites = useAppSelector((s) => s.favoritesData.favorites);

  const query = useQuery({
    queryKey: ["favorites"],
    queryFn: () => api.get<Food[]>("/foods/favorites"),
    staleTime: 30_000,
    gcTime: 60_000,
  });

  useEffect(() => {
    if (query.data) dispatch(setFavorites(query.data));
  }, [query.data, dispatch]);

  return {
    ...query,
    data: reduxFavorites ?? query.data,
  };
}

export function useToggleFavorite() {
  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: (food: Food) => api.post(`/foods/${food.id}/favorite`),
    onMutate: (food) => {
      dispatch(addFavorite(food));
    },
    onSuccess: () => {
      dispatch(incrementFavoritesCount());
      toast.success("Added to favorites");
    },
    onError: (err, food) => {
      dispatch(removeFavorite(food.id));
      toast.error(handleApiError(err));
    },
  });
}

export function useRemoveFavorite() {
  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: (food: Food) => api.delete(`/foods/${food.id}/favorite`),
    onMutate: (food) => {
      dispatch(removeFavorite(food.id));
    },
    onSuccess: () => {
      dispatch(decrementFavoritesCount());
      toast.success("Removed from favorites");
    },
    onError: (err, food) => {
      dispatch(addFavorite(food));
      toast.error(handleApiError(err));
    },
  });
}
