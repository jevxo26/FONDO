"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";
import { getDashboardPath } from "@/data/navigation";
import { useAppSelector } from "@/store/store";

export default function DashboardPage() {
  const router = useRouter();
  const { user, isAuthenticated, loading } = useAuth();
  const permissions = useAppSelector((s) => s.auth.permissions);

  useEffect(() => {
    if (!loading && isAuthenticated && user) {
      const route = getDashboardPath(user.role, permissions) ?? "/";
      router.replace(route);
    }
  }, [loading, isAuthenticated, user, permissions, router]);

  return null;
}
