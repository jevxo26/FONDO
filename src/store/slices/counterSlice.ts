import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CounterState {
  cartCount: number;
  favoritesCount: number;
}

const initialState: CounterState = {
  cartCount: 0,
  favoritesCount: 0,
};

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    setCartCount(state, action: PayloadAction<number>) {
      state.cartCount = action.payload;
    },
    incrementCartCount(state, action: PayloadAction<number>) {
      state.cartCount += action.payload;
    },
    decrementCartCount(state, action: PayloadAction<number>) {
      state.cartCount = Math.max(0, state.cartCount - action.payload);
    },
    setFavoritesCount(state, action: PayloadAction<number>) {
      state.favoritesCount = action.payload;
    },
    incrementFavoritesCount(state) {
      state.favoritesCount += 1;
    },
    decrementFavoritesCount(state) {
      state.favoritesCount = Math.max(0, state.favoritesCount - 1);
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
