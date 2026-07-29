"use client";

import {
  useUpdateProfileMutation,
  useChangePasswordMutation,
} from "@/store/api/slices/profile-api";
import { createMutationWrapper } from "@/store/api/mutation-wrapper";

export function useUpdateProfile() {
  const [trigger, { isLoading }] = useUpdateProfileMutation();
  return { ...createMutationWrapper(trigger), isPending: isLoading };
}

export function useChangePassword() {
  const [trigger, { isLoading }] = useChangePasswordMutation();
  return { ...createMutationWrapper(trigger), isPending: isLoading };
}
