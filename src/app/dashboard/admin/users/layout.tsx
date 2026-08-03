"use client";

import { RequirePermission } from "@/components/common/require-permission";

export default function UsersLayout({ children }: { children: React.ReactNode }) {
  return <RequirePermission permission="users">{children}</RequirePermission>;
}
