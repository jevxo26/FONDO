import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Cart } from "@/hooks/use-cart";

interface CartDataState {
  cart: Cart | null;
}

const initialState: CartDataState = {
  cart: null,
};

const cartDataSlice = createSlice({
  name: "cartData",
  initialState,
  reducers: {
    setCartData(state, action: PayloadAction<Cart>) {
      state.cart = action.payload;
    },
    clearCartData(state) {
      state.cart = null;
    },
  },
});

export const { setCartData, clearCartData } = cartDataSlice.actions;
export default cartDataSlice.reducer;
