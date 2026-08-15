"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useRequireAuth, useAuth } from "@/hooks/use-auth";
import { getDashboardPath } from "@/data/navigation";
import { useAppSelector } from "@/store/store";


export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, isAuthenticated } = useAuth();
  const permissions = useAppSelector((s) => s.auth.permissions);
  useRequireAuth();

  useEffect(() => {
    if (isAuthenticated && user) {
      const correctDashboard = getDashboardPath(user.role, permissions);
      if (!correctDashboard) {
        router.replace("/");
        return;
      }

      const currentSection = pathname.split("/")[2];
      if (currentSection && correctDashboard !== `/dashboard/${currentSection}`) {
        router.replace(correctDashboard);
      }
    }
  }, [isAuthenticated, user, permissions, pathname, router]);

  return <>{children}</>;
}
