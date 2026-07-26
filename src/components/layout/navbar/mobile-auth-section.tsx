"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { LayoutDashboard, LogOut, User } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { ROLE_DASHBOARD } from "@/data/navigation";

export function MobileAuthSection({ closeAndClear }: { closeAndClear: () => void }) {
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    closeAndClear();
    router.push("/");
  };

  const dashboardHref = user ? ROLE_DASHBOARD[user.role] : null;

  if (!isAuthenticated || !user) {
    return (
      <Link href="/login" onClick={closeAndClear}
        className="flex w-full items-center justify-center gap-2 rounded-full border border-border py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted">
        <User className="size-4" />
        Sign In
      </Link>
    );
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-3 px-2 py-2">
        <span className="flex size-8 items-center justify-center rounded-full bg-foreground text-xs font-bold text-background">
          {user.firstName[0]?.toUpperCase()}
        </span>
        <div className="text-sm">
          <p className="font-medium text-foreground">{user.firstName} {user.lastName}</p>
          <p className="text-xs text-foreground/60">{user.email}</p>
        </div>
      </div>
      {dashboardHref && (
        <Link href={dashboardHref} onClick={closeAndClear}
          className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted">
          <LayoutDashboard className="size-4" />
          Dashboard
        </Link>
      )}
      <button onClick={handleLogout}
        className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-destructive transition-colors hover:bg-muted">
        <LogOut className="size-4" />
        Logout
      </button>
    </div>
  );
}
