"use client";

import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api-client";
import { useAppDispatch } from "@/store/store";
import { fetchMe } from "@/store/slices/authSlice";

export function useUpdateProfile() {
  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: (data: {
      firstName?: string;
      lastName?: string;
      phone?: string;
      gender?: string;
      dateOfBirth?: string;
    }) => api.patch("/api/users/me", data),
    onSuccess: () => dispatch(fetchMe()),
  });
}

export function useChangePassword() {
  return useMutation({
    mutationFn: (data: {
      currentPassword: string;
      newPassword: string;
      confirmPassword: string;
    }) => api.post("/api/auth/change-password", data),
  });
}
