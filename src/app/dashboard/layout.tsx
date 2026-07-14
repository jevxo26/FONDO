"use client";

import { useRequireAuth } from "@/hooks/useAuth";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useRequireAuth();

  return <>{children}</>;
}
