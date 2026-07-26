import { api } from "../base-api";
import type { UpdateProfilePayload, ChangePasswordPayload } from "@/types/user";

export const profileApi = api.injectEndpoints({
  endpoints: (builder) => ({
    updateProfile: builder.mutation<void, UpdateProfilePayload>({
      query: (body) => ({ url: "/users/me", method: "PATCH", body }),
      invalidatesTags: ["Profile"],
    }),

    changePassword: builder.mutation<void, ChangePasswordPayload>({
      query: (body) => ({ url: "/auth/change-password", method: "POST", body }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useUpdateProfileMutation,
  useChangePasswordMutation,
} = profileApi;
