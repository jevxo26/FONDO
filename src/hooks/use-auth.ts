"use client";

import { useCallback, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAppSelector } from "@/store/store";
import {
  useLoginMutation,
  useRegisterMutation,
  useFetchMeQuery,
  useLogoutMutation,
} from "@/store/api/slices/auth-api";
import { getToken } from "@/lib/token";
import type { RegisterInput } from "@/lib/validations/auth";

export function useAuth() {
  const { user, isAuthenticated } = useAppSelector((s) => s.auth);
  const [loginMutation, { isLoading: loginLoading }] = useLoginMutation();
  const [registerMutation, { isLoading: registerLoading }] = useRegisterMutation();
  const [logoutMutation, { isLoading: logoutLoading }] = useLogoutMutation();

  useFetchMeQuery(undefined, { skip: !getToken() || isAuthenticated });

  const login = useCallback(
    (identity: string, password: string) => loginMutation({ identity, password }).unwrap(),
    [loginMutation],
  );

  const register = useCallback(
    (data: Omit<RegisterInput, "confirmPassword">) => registerMutation(data).unwrap(),
    [registerMutation],
  );

  const logout = useCallback(() => logoutMutation().unwrap(), [logoutMutation]);

  return {
    user,
    isAuthenticated,
    loading: loginLoading || registerLoading || logoutLoading,
    login,
    register,
    logout,
  };
}

export function useRequireAuth(redirectTo = "/login") {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated } = useAppSelector((s) => s.auth);
  const hasToken = !!getToken();

  const { isLoading } = useFetchMeQuery(undefined, {
    skip: !hasToken,
  });

  const loading = hasToken && !isAuthenticated && isLoading;

  useEffect(() => {
    if (!loading && !isAuthenticated && !hasToken) {
      router.push(`${redirectTo}?redirect=${encodeURIComponent(pathname)}`);
    }
  }, [loading, isAuthenticated, hasToken, router, redirectTo, pathname]);

  return { isAuthenticated, loading };
}
