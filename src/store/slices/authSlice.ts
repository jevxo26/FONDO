import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { clearToken } from "@/lib/token";
import { decodeJwt } from "@/lib/jwt";
import type { User } from "@/types/auth";

interface AuthState {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  permissions: string[];
}

const initialState: AuthState = {
  user: null,
  accessToken: null,
  isAuthenticated: false,
  permissions: [],
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials(state, action: PayloadAction<{ user: User; token: string }>) {
      const jwt = decodeJwt(action.payload.token);
      state.user = action.payload.user;
      state.accessToken = action.payload.token;
      state.permissions = (jwt?.permissions as string[]) ?? [];
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
