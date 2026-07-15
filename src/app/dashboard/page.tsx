"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

const ROLE_DASHBOARD: Record<string, string> = {
  ADMIN: "/dashboard/admin",
  SUPER_ADMIN: "/dashboard/admin",
  VENDOR: "/dashboard/vendor",
  VENDOR_STAFF: "/dashboard/vendor",
  KITCHEN_STAFF: "/dashboard/kitchen",
  RIDER: "/dashboard/rider",
  SUPPORT_AGENT: "/dashboard/admin",
};

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
