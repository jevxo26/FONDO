import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { api } from "@/lib/api-client";
import { getToken, setToken, clearToken } from "@/lib/token";

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  avatar: string | null;
  gender: string | null;
  dateOfBirth: string | null;
  role: string;
  status: string;
  isPhoneVerified: boolean;
  isEmailVerified: boolean;
  lastLoginAt: string;
  createdAt: string;
  updatedAt: string;
}

interface LoginResponse {
  user: User;
  token: string;
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  accessToken: getToken(),
  isAuthenticated: false,
  loading: false,
  error: null,
};

export const loginUser = createAsyncThunk<LoginResponse, { identity: string; password: string }>(
  "auth/login",
  async (credentials) => {
    const isEmail = credentials.identity.includes("@");
    const payload = isEmail
      ? { email: credentials.identity, password: credentials.password }
      : { phone: credentials.identity, password: credentials.password };

    const data = await api.post<LoginResponse>("/auth/login", payload);
    setToken(data.token);
    return data;
  },
);

export const registerUser = createAsyncThunk<User, {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  password: string;
}>(
  "auth/register",
  async (userData) => {
    const data = await api.post<User>("/auth/register", userData);
    return data;
  },
);

export const fetchMe = createAsyncThunk<User, void>(
  "auth/fetchMe",
  async () => {
    const data = await api.get<User>("/auth/me");
    return data;
  },
);

export const logoutUser = createAsyncThunk<void, void>(
  "auth/logout",
  async () => {
    await api.post("/auth/logout");
    clearToken();
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials(state, action: PayloadAction<{ user: User; token: string }>) {
      state.user = action.payload.user;
      state.accessToken = action.payload.token;
      state.isAuthenticated = true;
      state.error = null;
    },
    clearCredentials(state) {
      state.user = null;
      state.accessToken = null;
      state.isAuthenticated = false;
      state.error = null;
      clearToken();
    },
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.accessToken = action.payload.token;
        state.isAuthenticated = true;
        state.loading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Login failed";
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Registration failed";
      })
      .addCase(fetchMe.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMe.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.loading = false;
      })
      .addCase(fetchMe.rejected, (state) => {
        state.user = null;
        state.accessToken = null;
        state.isAuthenticated = false;
        state.loading = false;
        clearToken();
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.accessToken = null;
        state.isAuthenticated = false;
        state.loading = false;
        state.error = null;
        clearToken();
      });
  },
});

export const { setCredentials, clearCredentials, clearError } = authSlice.actions;
export default authSlice.reducer;
