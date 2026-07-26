"use client";

import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import { useAppDispatch } from "@/store/store";
import { fetchMe } from "@/store/slices/authSlice";
import type { UpdateProfilePayload, ChangePasswordPayload } from "@/types/user";

export function useUpdateProfile() {
  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: (data: UpdateProfilePayload) => api.patch("/users/me", data),
    onSuccess: () => dispatch(fetchMe()),
  });
}

export function useChangePassword() {
  return useMutation({
    mutationFn: (data: ChangePasswordPayload) => api.post("/auth/change-password", data),
  });
}
