"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { ROLE_DASHBOARD } from "@/data/navigation";

export default function DashboardPage() {
  const router = useRouter();
  const { user, isAuthenticated, loading } = useAuth();

  useEffect(() => {
    if (!loading && isAuthenticated && user) {
      const route = ROLE_DASHBOARD[user.role] || "/";
      router.replace(route);
    }
  }, [loading, isAuthenticated, user, router]);

  return null;
}
