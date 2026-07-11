"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
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
import { sidebarItems } from "@/data/dashboard";
import { cn } from "@/lib/utils";
import { ChevronUp, LayoutDashboard, LogOut, Settings, User, Utensils } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

const sectionConfig = [
  { label: "Management", items: ["Vendors", "Customers", "Food"] },
  { label: "Operations", items: ["Orders", "Payments", "Riders"] },
  { label: "Analytics", items: ["Packages", "Reports"] },
] as const;

export function AppSidebar() {
  const pathname = usePathname();
  const { setOpenMobile, isMobile } = useSidebar();

  const sections = useMemo(() => {
    const itemMap = new Map(sidebarItems.map((item) => [item.label, item]));
    return sectionConfig.map((section) => ({
      label: section.label,
      items: section.items.map((label) => itemMap.get(label)).filter(Boolean),
    }));
  }, []);

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu className="space-y-4">
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              render={<Link href="/" onClick={() => isMobile && setOpenMobile(false)} />}
            >
              <div className="flex size-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary/80 shadow-sm group-data-[collapsible=icon]:size-8">
                <Utensils className="size-5 text-white group-data-[collapsible=icon]:size-4" />
              </div>
              <div className="grid flex-1 text-left leading-tight group-data-[collapsible=icon]:hidden">
                <span className="font-fraunces text-xl font-bold">FONDO</span>
                <span className="mt-0.5 text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
                  Admin Panel
                </span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton
              render={<Link href="/dashboard" onClick={() => isMobile && setOpenMobile(false)} />}
              isActive={pathname === "/dashboard"}
              tooltip="Overview"
              className="rounded-lg px-3 py-3 h-auto gap-3 transition-all duration-200"
            >
              <LayoutDashboard className="size-5 group-data-[collapsible=icon]:size-4" />
              <span>Overview</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        {sections.map((section) => (
          <SidebarGroup key={section.label}>
            <SidebarGroupLabel className="group-data-[collapsible=icon]:hidden">
              <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-primary/70">
                {section.label}
              </span>
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="group-data-[collapsible=icon]:gap-2">
                {section.items.map((item) => {
                  if (!item) return null;
                  const Icon = item.icon;
                  const isActive = pathname.startsWith(`/dashboard${item.href}`);

                  return (
                    <SidebarMenuItem key={item.href}>
                      <SidebarMenuButton
                        render={
                          <Link
                            href={`/dashboard${item.href}`}
                            onClick={() => isMobile && setOpenMobile(false)}
                          />
                        }
                        isActive={isActive}
                        tooltip={item.label}
                        className={cn(
                          "rounded-lg px-3 py-2.5 h-auto gap-3 text-muted-foreground transition-all duration-200 hover:bg-muted/60",
                          isActive &&
                            "border-l-[3px] border-primary bg-gradient-to-r from-primary/5 to-transparent font-semibold text-primary",
                        )}
                      >
                        <Icon className="size-[18px] shrink-0 group-data-[collapsible=icon]:size-4" />
                        <span>{item.label}</span>
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
        <SidebarMenu className="pt-2">
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger
                className={buttonVariants({
                  variant: "ghost",
                  className:
                    "w-full justify-start gap-3 rounded-lg px-3 py-2.5 h-auto group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-2 group-data-[collapsible=icon]:py-2",
                })}
              >
                <Avatar className="size-7 shrink-0 ring-1 ring-primary/20 ring-offset-1 ring-offset-sidebar">
                  <AvatarFallback className="bg-primary/10 text-[11px] font-bold text-primary">AR</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left leading-tight group-data-[collapsible=icon]:hidden">
                  <span className="truncate text-sm font-semibold">Ahmed Rizvi</span>
                  <span className="truncate text-[10px] text-muted-foreground">System Admin</span>
                </div>
                <ChevronUp className="size-3.5 text-muted-foreground group-data-[collapsible=icon]:hidden" />
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
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
