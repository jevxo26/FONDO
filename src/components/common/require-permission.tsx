"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useHasAnyPermission } from "@/hooks/use-permission";

export function RequirePermission({
  permission,
  children,
}: {
  permission: string;
  children: React.ReactNode;
}) {
  const allowed = useHasAnyPermission([permission]);
  const router = useRouter();

  useEffect(() => {
    if (!allowed) {
      router.replace("/dashboard");
    }
  }, [allowed, router]);

  if (!allowed) return null;
  return <>{children}</>;
}
