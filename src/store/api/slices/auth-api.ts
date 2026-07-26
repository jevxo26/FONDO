import { api } from "../base-api";
import { setToken, clearToken, getToken } from "@/lib/token";
import { setCredentials, clearCredentials } from "@/store/slices/authSlice";
import type { User } from "@/types/auth";
import type { ChangePasswordPayload } from "@/types/user";

interface LoginResponse {
  user: User;
  token: string;
}

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, { identity: string; password: string }>({
      query: ({ identity, password }) => ({
        url: "/auth/login",
        method: "POST",
        body: identity.includes("@")
          ? { email: identity, password }
          : { phone: identity, password },
      }),
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        const { data } = await queryFulfilled;
        setToken(data.token);
        dispatch(setCredentials({ user: data.user, token: data.token }));
      },
    }),

    register: builder.mutation<User, {
      firstName: string;
      lastName: string;
      phone: string;
      email: string;
      password: string;
    }>({
      query: (body) => ({ url: "/auth/register", method: "POST", body }),
    }),

    fetchMe: builder.query<User, void>({
      query: () => ({ url: "/auth/me", method: "GET" }),
      providesTags: ["Profile"],
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setCredentials({ user: data, token: getToken() ?? "" }));
        } catch {
          clearToken();
        }
      },
      keepUnusedDataFor: 300,
    }),

    logout: builder.mutation<void, void>({
      query: () => ({ url: "/auth/logout", method: "POST" }),
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
        } finally {
          clearToken();
          dispatch(clearCredentials());
        }
      },
    }),

    changePassword: builder.mutation<void, ChangePasswordPayload>({
      query: (body) => ({ url: "/auth/change-password", method: "POST", body }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useFetchMeQuery,
  useLogoutMutation,
  useChangePasswordMutation,
} = authApi;
