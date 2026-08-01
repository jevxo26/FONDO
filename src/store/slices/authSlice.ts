import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getToken, clearToken } from "@/lib/token";
import { decodeJwt } from "@/lib/jwt";
import type { User } from "@/types/auth";

interface AuthState {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  permissions: string[];
}

const initialToken = getToken();
const initialPermissions = (decodeJwt(initialToken ?? "")?.permissions as string[]) ?? [];

const initialState: AuthState = {
  user: null,
  accessToken: initialToken,
  isAuthenticated: false,
  permissions: initialPermissions,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials(state, action: PayloadAction<{ user: User; token: string }>) {
      state.user = action.payload.user;
      state.accessToken = action.payload.token;
      state.permissions = (decodeJwt(action.payload.token)?.permissions as string[]) ?? [];
      state.isAuthenticated = true;
    },
    clearCredentials(state) {
      state.user = null;
      state.accessToken = null;
      state.permissions = [];
      state.isAuthenticated = false;
      clearToken();
    },
  },
});

export const { setCredentials, clearCredentials } = authSlice.actions;
export default authSlice.reducer;
