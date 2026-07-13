"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import {
  ChevronUp,
  LayoutDashboard,
  LogOut,
  Settings,
  User,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

interface SidebarItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

interface DashboardSidebarProps {
  items: SidebarItem[];
  sections: readonly { readonly label: string; readonly items: readonly string[] }[];
  basePath: string;
  panelLabel: string;
  logoIcon: LucideIcon;
  showOverview?: boolean;
  userName?: string;
  userRole?: string;
  userInitials?: string;
}

export function DashboardSidebar({
  items,
  sections: sectionConfig,
  basePath,
  panelLabel,
  logoIcon: LogoIcon,
  showOverview = true,
  userName = "User",
  userRole = "Staff",
  userInitials = "US",
}: DashboardSidebarProps) {
  const pathname = usePathname();
  const { setOpenMobile, isMobile } = useSidebar();

  const sections = useMemo(() => {
    const itemMap = new Map(items.map((item) => [item.label, item]));
    return sectionConfig.map((section) => ({
      label: section.label,
      items: section.items.map((label) => itemMap.get(label)).filter(Boolean) as SidebarItem[],
    }));
  }, [items, sectionConfig]);

  return (
    <Sidebar
      collapsible="icon"
      className="relative bg-gradient-to-b from-secondary via-sidebar to-primary/[0.06]"
    >
      <div className="pointer-events-none absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-primary/40 via-primary/20 to-transparent" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(206,163,89,0.1)_0%,transparent_70%)]" />

      <SidebarHeader>
        <SidebarMenu className="space-y-4">
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              render={<Link href="/" onClick={() => isMobile && setOpenMobile(false)} />}
            >
              <div className="flex size-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary/80 shadow-[0_0_24px_rgba(206,163,89,0.25)] group-data-[collapsible=icon]:size-8">
                <LogoIcon className="size-5 text-white group-data-[collapsible=icon]:size-4" />
              </div>
              <div className="grid flex-1 text-left leading-tight group-data-[collapsible=icon]:hidden">
                <span className="font-fraunces text-xl font-bold">FONDO</span>
                <span className="mt-0.5 text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
                  {panelLabel}
                </span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>

          {showOverview && (
            <SidebarMenuItem>
              <SidebarMenuButton
                render={
                  <Link href={basePath} onClick={() => isMobile && setOpenMobile(false)} />
                }
                isActive={pathname === basePath}
                tooltip="Overview"
                className={cn(
                  "rounded-lg px-3 py-3 h-auto gap-3 transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]",
                  pathname === basePath &&
                    "bg-gradient-to-r from-primary/10 to-primary/5 shadow-[inset_0_1px_1px_rgba(206,163,89,0.15),0_0_16px_rgba(206,163,89,0.12)] font-semibold text-primary",
                )}
              >
                <LayoutDashboard
                  className={cn(
                    "size-5 group-data-[collapsible=icon]:size-4 transition-all duration-300",
                    pathname === basePath && "text-primary",
                  )}
                />
                <div className="flex items-center gap-2">
                  {pathname === basePath && <div className="size-1.5 rotate-45 bg-primary" />}
                  <span>Overview</span>
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )}
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        {sections.map((section, si) => (
          <SidebarGroup key={section.label}>
            {si > 0 && (
              <div className="mx-4 mb-2 h-px bg-gradient-to-r from-transparent via-primary/15 to-transparent group-data-[collapsible=icon]:hidden" />
            )}
            <SidebarGroupLabel className="group-data-[collapsible=icon]:hidden">
              <div className="flex items-center gap-2">
                <div className="size-1.5 rotate-45 bg-primary/40" />
                <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-primary/70">
                  {section.label}
                </span>
              </div>
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="group-data-[collapsible=icon]:gap-2">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const href = `${basePath}${item.href}`;
                  const isActive = pathname.startsWith(href);

                  return (
                    <SidebarMenuItem key={item.href}>
                      <SidebarMenuButton
                        render={
                          <Link
                            href={href}
                            onClick={() => isMobile && setOpenMobile(false)}
                          />
                        }
                        isActive={isActive}
                        tooltip={item.label}
                        className={cn(
                          "rounded-lg px-3 py-2.5 h-auto gap-3 text-muted-foreground transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-primary/8",
                          isActive &&
                            "border-l-[3px] border-primary bg-gradient-to-r from-primary/10 to-primary/5 shadow-[inset_0_1px_1px_rgba(206,163,89,0.15),0_0_16px_rgba(206,163,89,0.12)] font-semibold text-primary",
                        )}
                      >
                        <Icon
                          className={cn(
                            "size-[18px] shrink-0 group-data-[collapsible=icon]:size-4 transition-all duration-300",
                            isActive && "text-primary",
                          )}
                        />
                        <div className="flex items-center gap-2">
                          {isActive && <div className="size-1.5 rotate-45 bg-primary" />}
                          <span>{item.label}</span>
                        </div>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter>
        <div className="mx-4 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        <div className="group-data-[collapsible=icon]:hidden mx-4 mt-3">
          <DropdownMenu>
            <DropdownMenuTrigger
              className={buttonVariants({
                variant: "ghost",
                className:
                  "w-full rounded-xl border border-primary/10 bg-primary/[0.03] p-3 h-auto justify-start gap-3 transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-primary/8 hover:border-primary/20 active:scale-[0.98]",
              })}
            >
              <Avatar className="size-8 shrink-0 ring-2 ring-primary/30 ring-offset-1 ring-offset-sidebar shadow-[0_0_12px_rgba(206,163,89,0.15)]">
                <AvatarFallback className="bg-primary/10 text-[11px] font-bold text-primary">
                  {userInitials}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left leading-tight">
                <span className="truncate text-sm font-semibold text-foreground">{userName}</span>
                <span className="truncate text-[10px] text-muted-foreground">{userRole}</span>
              </div>
              <ChevronUp className="size-3.5 text-muted-foreground" />
            </DropdownMenuTrigger>
            <DropdownMenuContent side="right" align="end" className="w-56">
              <DropdownMenuGroup>
                <DropdownMenuLabel className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                  Account
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="flex items-center gap-3 py-2.5"
                  onClick={() => console.log("Profile")}
                >
                  <div className="flex size-8 items-center justify-center rounded-lg bg-primary/8">
                    <User className="size-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Profile</p>
                    <p className="text-[11px] text-muted-foreground">View your profile</p>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="flex items-center gap-3 py-2.5"
                  onClick={() => console.log("Settings")}
                >
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
                  onClick={() => console.log("Logout")}
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

        <div className="group-data-[collapsible=icon]:block mx-auto hidden py-2">
          <DropdownMenu>
            <DropdownMenuTrigger
              className={buttonVariants({
                variant: "ghost",
                className: "w-full justify-center rounded-lg px-2 py-2 h-auto",
              })}
            >
              <Avatar className="size-7 shrink-0 ring-1 ring-primary/30 ring-offset-1 ring-offset-sidebar">
                <AvatarFallback className="bg-primary/10 text-[11px] font-bold text-primary">
                  {userInitials}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="right" align="end" className="w-56">
              <DropdownMenuItem>
                <User className="size-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="size-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">
                <LogOut className="size-4" />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
