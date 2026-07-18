import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const CART_KEY = "fondo_cart_count";
const FAV_KEY = "fondo_fav_count";

const loadCount = (key: string, fallback = 0): number => {
  if (typeof window === "undefined") return fallback;
  try {
    const val = localStorage.getItem(key);
    return val ? Math.max(0, parseInt(val, 10) || fallback) : fallback;
  } catch {
    return fallback;
  }
};

const saveCount = (key: string, value: number) => {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, String(value));
  } catch {
  }
};

interface CounterState {
  cartCount: number;
  favoritesCount: number;
}

const initialState: CounterState = {
  cartCount: loadCount(CART_KEY),
  favoritesCount: loadCount(FAV_KEY),
};

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    setCartCount(state, action: PayloadAction<number>) {
      state.cartCount = action.payload;
      saveCount(CART_KEY, action.payload);
    },
    incrementCartCount(state, action: PayloadAction<number = 1>) {
      state.cartCount += action.payload;
      saveCount(CART_KEY, state.cartCount);
    },
    decrementCartCount(state, action: PayloadAction<number = 1>) {
      state.cartCount = Math.max(0, state.cartCount - action.payload);
      saveCount(CART_KEY, state.cartCount);
    },
    setFavoritesCount(state, action: PayloadAction<number>) {
      state.favoritesCount = action.payload;
      saveCount(FAV_KEY, action.payload);
    },
    incrementFavoritesCount(state) {
      state.favoritesCount += 1;
      saveCount(FAV_KEY, state.favoritesCount);
    },
    decrementFavoritesCount(state) {
      state.favoritesCount = Math.max(0, state.favoritesCount - 1);
      saveCount(FAV_KEY, state.favoritesCount);
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
