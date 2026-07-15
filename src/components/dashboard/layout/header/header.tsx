"use client";

import { useRouter, usePathname } from "next/navigation";
import { Bell, HelpCircle, LogOut, Settings, User } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { HeaderBreadcrumbs } from "./header-breadcrumbs";
import { HeaderQuickActions } from "./header-quick-actions";
import { useAuth } from "@/hooks/useAuth";

export function DashboardHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();

  const userName = user ? `${user.firstName} ${user.lastName}` : "User";
  const initials =
    user
      ? `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`
      : "U";
  const roleLabel = user?.role?.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()) ?? "User";

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  return (
    <header className="sticky top-0 z-30 border-b border-primary/15 bg-secondary/90 px-4 py-3 shadow-[var(--shadow-card)] backdrop-blur-xl transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] lg:px-6">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[3px] bg-gradient-to-r from-primary/40 via-primary/20 to-transparent" />
      <div className="relative flex items-center justify-between">
        <div className="flex items-center gap-4">
          <SidebarTrigger />
          <HeaderBreadcrumbs pathname={pathname} />
          <div className="hidden items-center gap-2 text-sm text-muted-foreground/60 md:flex">
            <div className="h-4 w-px bg-border/50" />
            <span className="ml-2">
              {new Date().toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4 lg:gap-6">
          <HeaderQuickActions />

          <div className="hidden items-center gap-4 border-r border-primary/10 pr-6 md:flex">
            <Button
              variant="ghost"
              size="icon"
              className="relative rounded-xl bg-primary/[0.04] transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-primary/12 hover:text-primary active:scale-[0.95]"
            >
              <Bell className="size-5" />
              <span className="absolute right-1.5 top-1.5 size-2 rounded-full bg-primary ring-2 ring-background shadow-[0_0_8px_rgba(206,163,89,0.4)]" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-xl bg-primary/[0.04] transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-primary/12 hover:text-primary active:scale-[0.95]"
            >
              <Settings className="size-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-xl bg-primary/[0.04] transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-primary/12 hover:text-primary active:scale-[0.95]"
            >
              <HelpCircle className="size-5" />
            </Button>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger>
              <div className="flex cursor-pointer items-center gap-3">
                <div className="hidden text-right md:block">
                  <p className="text-sm font-semibold text-foreground">{userName}</p>
                  <p className="text-[10px] uppercase tracking-tighter text-muted-foreground">{roleLabel}</p>
                </div>
                <Avatar className="size-9 ring-2 ring-primary/30 ring-offset-2 ring-offset-card shadow-[0_0_12px_rgba(206,163,89,0.15)]">
                  <AvatarFallback className="bg-primary/10 text-xs font-bold text-primary">{initials}</AvatarFallback>
                </Avatar>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuGroup>
                <DropdownMenuItem className="flex items-center gap-3 py-2.5">
                  <div className="flex size-8 items-center justify-center rounded-lg bg-primary/8">
                    <User className="size-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Profile</p>
                    <p className="text-[11px] text-muted-foreground">View your profile</p>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center gap-3 py-2.5">
                  <div className="flex size-8 items-center justify-center rounded-lg bg-primary/8">
                    <Settings className="size-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Settings</p>
                    <p className="text-[11px] text-muted-foreground">Dashboard preferences</p>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="flex items-center gap-3 py-2.5 text-destructive"
                  onClick={handleLogout}
                >
                  <div className="flex size-8 items-center justify-center rounded-lg bg-destructive/8">
                    <LogOut className="size-4 text-destructive" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Logout</p>
                    <p className="text-[11px] text-muted-foreground">Sign out of dashboard</p>
                  </div>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
