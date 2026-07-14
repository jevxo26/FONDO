"use client";

import { useCallback, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { loginUser, registerUser, fetchMe, logoutUser } from "@/store/slices/authSlice";
import { getToken } from "@/lib/token";
import type { RegisterInput } from "@/lib/validations/auth";

export function useAuth() {
  const dispatch = useAppDispatch();
  const { user, isAuthenticated, loading, error } = useAppSelector((s) => s.auth);

  const login = useCallback(
    (identity: string, password: string) =>
      dispatch(loginUser({ identity, password })).unwrap(),
    [dispatch],
  );

  const register = useCallback(
    (data: Omit<RegisterInput, "confirmPassword">) =>
      dispatch(registerUser(data)).unwrap(),
    [dispatch],
  );

  const logout = useCallback(() => dispatch(logoutUser()).unwrap(), [dispatch]);

  return { user, isAuthenticated, loading, error, login, register, logout };
}

export function useRequireAuth(redirectTo = "/login") {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const { isAuthenticated, loading } = useAppSelector((s) => s.auth);

  useEffect(() => {
    const token = getToken();
    if (token && !isAuthenticated) {
      dispatch(fetchMe());
    }
  }, [dispatch, isAuthenticated]);

  useEffect(() => {
    if (!loading && !isAuthenticated && !getToken()) {
      router.push(`${redirectTo}?redirect=${encodeURIComponent(pathname)}`);
    }
  }, [loading, isAuthenticated, router, redirectTo, pathname]);

  return { isAuthenticated, loading };
}
