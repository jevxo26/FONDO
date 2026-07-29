import { api } from "../base-api";
import { getErrorMessage } from "../utils";
import type { Food } from "@/types/food";
import { toast } from "sonner";

export const favoritesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getFavorites: builder.query<Food[], void>({
      query: () => "/foods/favorites",
      providesTags: ["Favorite"],
    }),

    toggleFavorite: builder.mutation<void, Food>({
      query: (food) => ({ url: `/foods/${food.id}/favorite`, method: "POST" }),
      invalidatesTags: ["Favorite"],
      async onQueryStarted(food, { dispatch, queryFulfilled }) {
        let patch: { undo: () => void } | undefined;
        try {
          patch = dispatch(
            favoritesApi.util.updateQueryData("getFavorites", undefined, (draft) => {
              if (!draft.some((f) => f.id === food.id)) draft.unshift(food);
            }),
          );
        } catch { /* no cache entry yet — skip */ }
        toast.success("Added to favorites");
        try {
          await queryFulfilled;
        } catch (err) {
          patch?.undo();
          toast.error(getErrorMessage(err));
        }
      },
    }),

    removeFavorite: builder.mutation<void, Food>({
      query: (food) => ({ url: `/foods/${food.id}/favorite`, method: "DELETE" }),
      invalidatesTags: ["Favorite"],
      async onQueryStarted(food, { dispatch, queryFulfilled }) {
        let patch: { undo: () => void } | undefined;
        try {
          patch = dispatch(
            favoritesApi.util.updateQueryData("getFavorites", undefined, (draft) => {
              const idx = draft.findIndex((f) => f.id === food.id);
              if (idx !== -1) draft.splice(idx, 1);
            }),
          );
        } catch { /* skip */ }
        toast.success("Removed from favorites");
        try {
          await queryFulfilled;
        } catch (err) {
          patch?.undo();
          toast.error(getErrorMessage(err));
        }
      },
    }),
  }),
  overrideExisting: true,
});

export const { useGetFavoritesQuery, useToggleFavoriteMutation, useRemoveFavoriteMutation } =
  favoritesApi;
