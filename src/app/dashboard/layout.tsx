"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useRequireAuth, useAuth } from "@/hooks/useAuth";
import { ROLE_DASHBOARD } from "@/data/navigation";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, isAuthenticated } = useAuth();
  useRequireAuth();

  useEffect(() => {
    if (isAuthenticated && user) {
      const correctDashboard = ROLE_DASHBOARD[user.role];
      if (!correctDashboard) {
        router.replace("/");
        return;
      }

      const currentSection = pathname.split("/")[2];
      if (currentSection && correctDashboard !== `/dashboard/${currentSection}`) {
        router.replace(correctDashboard);
      }
    }
  }, [isAuthenticated, user, pathname, router]);

  return <>{children}</>;
}
