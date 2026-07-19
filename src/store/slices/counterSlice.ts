import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CounterState {
  cartCount: number;
  favoritesCount: number;
}

const loadCount = (key: string): number => {
  if (typeof window === "undefined") return 0;
  try {
    return Number(localStorage.getItem(key)) || 0;
  } catch {
    return 0;
  }
};

const saveCount = (key: string, value: number) => {
  try {
    localStorage.setItem(key, String(value));
  } catch {}
};

const initialState: CounterState = {
  cartCount: loadCount("fondo_cart_count"),
  favoritesCount: loadCount("fondo_fav_count"),
};

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    setCartCount(state, action: PayloadAction<number>) {
      state.cartCount = action.payload;
      saveCount("fondo_cart_count", action.payload);
    },
    incrementCartCount(state, action: PayloadAction<number>) {
      state.cartCount += action.payload;
      saveCount("fondo_cart_count", state.cartCount);
    },
    decrementCartCount(state, action: PayloadAction<number>) {
      state.cartCount = Math.max(0, state.cartCount - action.payload);
      saveCount("fondo_cart_count", state.cartCount);
    },
    setFavoritesCount(state, action: PayloadAction<number>) {
      state.favoritesCount = action.payload;
      saveCount("fondo_fav_count", action.payload);
    },
    incrementFavoritesCount(state) {
      state.favoritesCount += 1;
      saveCount("fondo_fav_count", state.favoritesCount);
    },
    decrementFavoritesCount(state) {
      state.favoritesCount = Math.max(0, state.favoritesCount - 1);
      saveCount("fondo_fav_count", state.favoritesCount);
    },
  },
});

export const {
  setCartCount,
  incrementCartCount,
  decrementCartCount,
  setFavoritesCount,
  incrementFavoritesCount,
  decrementFavoritesCount,
} = counterSlice.actions;
export default counterSlice.reducer;
