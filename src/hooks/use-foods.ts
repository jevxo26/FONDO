"use client";

import { useGetFoodsQuery, useGetFoodBySlugQuery } from "@/store/api/slices/foods-api";

export function useGetFoods(page = 1, limit = 12) {
  const { data, isLoading, error } = useGetFoodsQuery({ page, limit });
  return { data, isLoading, error };
}

export function useGetFoodBySlug(slug: string) {
  const { data, isLoading, error } = useGetFoodBySlugQuery(slug, { skip: !slug });
  return { data, isLoading, error };
}
