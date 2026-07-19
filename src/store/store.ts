import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import appReducer from "./slices/appSlice";
import uiReducer from "./slices/uiSlice";
import authReducer from "./slices/authSlice";
import counterReducer from "./slices/counterSlice";
import cartDataReducer from "./slices/cartDataSlice";
import favoritesDataReducer from "./slices/favoritesDataSlice";

export const store = configureStore({
  reducer: {
    app: appReducer,
    ui: uiReducer,
    auth: authReducer,
    counter: counterReducer,
    cartData: cartDataReducer,
    favoritesData: favoritesDataReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
