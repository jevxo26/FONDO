import { api } from "../base-api";
import { createMutationWrapper } from "../mutation-wrapper";
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
  overrideExisting: true,
});

export const { useUpdateProfileMutation, useChangePasswordMutation } = profileApi;

export function useUpdateProfile() {
  const [trigger, { isLoading }] = useUpdateProfileMutation();
  return { ...createMutationWrapper(trigger), isPending: isLoading };
}

export function useChangePassword() {
  const [trigger, { isLoading }] = useChangePasswordMutation();
  return { ...createMutationWrapper(trigger), isPending: isLoading };
}
