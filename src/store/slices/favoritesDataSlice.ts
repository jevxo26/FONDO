import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Food } from "@/types/food";

interface FavoritesDataState {
  favorites: Food[];
}

const initialState: FavoritesDataState = {
  favorites: [],
};

const favoritesDataSlice = createSlice({
  name: "favoritesData",
  initialState,
  reducers: {
    setFavorites(state, action: PayloadAction<Food[]>) {
      state.favorites = action.payload;
    },
    addFavorite(state, action: PayloadAction<Food>) {
      state.favorites.unshift(action.payload);
    },
    removeFavorite(state, action: PayloadAction<string>) {
      state.favorites = state.favorites.filter((f) => f.id !== action.payload);
    },
  },
});

export const { setFavorites, addFavorite, removeFavorite } = favoritesDataSlice.actions;
export default favoritesDataSlice.reducer;
