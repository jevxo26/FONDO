"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/common/logo";
import { LayoutDashboard, type LucideIcon } from "lucide-react";
import {
  Sidebar,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import { SidebarNav } from "./sidebar-nav";
import { SidebarUserMenu } from "./sidebar-user-menu";

interface SidebarItem {
  label: string;
  href: string;
  icon: LucideIcon;
  children?: { label: string; href: string; icon: LucideIcon }[];
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
  sections,
  basePath,
  panelLabel,
  logoIcon: _LogoIcon,
  showOverview = true,
  userName = "User",
  userRole = "Staff",
  userInitials = "US",
}: DashboardSidebarProps) {
  const pathname = usePathname();
  const { setOpenMobile, isMobile } = useSidebar();

  return (
    <Sidebar
      collapsible="icon"
      className="relative bg-gradient-to-b from-secondary via-sidebar to-primary/[0.06]"
    >
      <div className="pointer-events-none absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-primary/40 via-primary/20 to-transparent" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,color-mix(in_srgb,var(--primary)_10%,transparent)_0%,transparent_70%)]" />

      <SidebarHeader>
        <SidebarMenu className="space-y-4">
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              render={<Link href="/" onClick={() => isMobile && setOpenMobile(false)} />}
            >
              <Logo
                noLink
                size={40}
                textSize="text-xl"
                subtitle={panelLabel}
                imageBoxClassName="size-10 shadow-[0_0_24px_color-mix(in_srgb,var(--primary)_25%,transparent)] group-data-[collapsible=icon]:size-8"
                hideTextOnCollapse
              />
            </SidebarMenuButton>
          </SidebarMenuItem>

          {showOverview && (
            <SidebarMenuItem>
              <SidebarMenuButton
                render={<Link href={basePath} onClick={() => isMobile && setOpenMobile(false)} />}
                isActive={pathname === basePath}
                tooltip="Overview"
                className={cn(
                  "rounded-lg px-3 py-3 h-auto gap-3 transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]",
                  pathname === basePath &&
                    "bg-gradient-to-r from-primary/10 to-primary/5 shadow-[inset_0_1px_1px_color-mix(in_srgb,var(--primary)_15%,transparent),0_0_16px_color-mix(in_srgb,var(--primary)_12%,transparent)] font-semibold text-primary",
                )}
              >
                <LayoutDashboard
                  className={cn(
                    "size-5 group-data-[collapsible=icon]:size-5 transition-all duration-300",
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

      <SidebarNav
        items={items}
        sections={sections}
        basePath={basePath}
        onNavigate={() => isMobile && setOpenMobile(false)}
      />

      <SidebarFooterDecorator>
        <SidebarUserMenu userName={userName} userRole={userRole} userInitials={userInitials} />
      </SidebarFooterDecorator>

      <SidebarRail />
    </Sidebar>
  );
}

function SidebarFooterDecorator({ children }: { children: React.ReactNode }) {
  return (
    <div className="border-t border-primary/10">
      <div className="mx-4 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent -mt-px" />
      <SidebarFooter>{children}</SidebarFooter>
    </div>
  );
}
