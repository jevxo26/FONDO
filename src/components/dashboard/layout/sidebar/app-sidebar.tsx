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
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import { sidebarItems } from "@/data/dashboard";
import { cn } from "@/lib/utils";
import { ChevronUp, LogOut, Settings, User, Utensils } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function AppSidebar() {
  const pathname = usePathname();
  const { setOpenMobile, isMobile } = useSidebar();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              render={<Link href="/" onClick={() => isMobile && setOpenMobile(false)} />}
            >
              <div className="flex size-10 items-center justify-center rounded-lg bg-primary group-data-[collapsible=icon]:size-8">
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
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="group-data-[collapsible=icon]:gap-2">
              {sidebarItems.map((item) => {
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
                        "rounded-lg px-3 py-3 gap-3 h-auto text-muted-foreground transition-colors duration-200 hover:bg-muted",
                        isActive && "border-r-4 border-primary bg-muted font-bold text-primary",
                      )}
                    >
                      <Icon className="size-5 group-data-[collapsible=icon]:size-4" />
                      <span>{item.label}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger
                className={buttonVariants({
                  variant: "ghost",
                  className:
                    "w-full justify-start gap-3 rounded-lg px-3 py-3 h-auto group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-2 group-data-[collapsible=icon]:py-2",
                })}
              >
                <Avatar className="size-8 shrink-0">
                  <AvatarFallback className="text-xs font-bold">AR</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left leading-tight group-data-[collapsible=icon]:hidden">
                  <span className="truncate text-sm font-bold">Ahmed Rizvi</span>
                  <span className="truncate text-[10px] text-muted-foreground">System Admin</span>
                </div>
                <ChevronUp className="size-4 text-muted-foreground group-data-[collapsible=icon]:hidden" />
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
