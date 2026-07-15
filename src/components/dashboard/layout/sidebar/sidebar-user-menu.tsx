"use client";

import { useRouter } from "next/navigation";
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
import { ChevronUp, LogOut, Settings, User } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

interface SidebarUserMenuProps {
  userName: string;
  userRole: string;
  userInitials: string;
}

export function SidebarUserMenu({ userName, userRole, userInitials }: SidebarUserMenuProps) {
  const router = useRouter();
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };
  return (
    <>
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
              {[
                { icon: User, label: "Profile", desc: "View your profile", onClick: "Profile" },
                {
                  icon: Settings,
                  label: "Settings",
                  desc: "Dashboard preferences",
                  onClick: "Settings",
                },
              ].map((item) => (
                <DropdownMenuItem
                  key={item.label}
                  className="flex items-center gap-3 py-2.5"
                  onClick={() => console.log(item.onClick)}
                >
                  <div className="flex size-8 items-center justify-center rounded-lg bg-primary/8">
                    <item.icon className="size-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{item.label}</p>
                    <p className="text-[11px] text-muted-foreground">{item.desc}</p>
                  </div>
                </DropdownMenuItem>
              ))}
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
            {[
              { icon: User, label: "Profile" },
              { icon: Settings, label: "Settings" },
            ].map((item) => (
              <DropdownMenuItem key={item.label}>
                <item.icon className="size-4" />
                <span>{item.label}</span>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive" onClick={handleLogout}>
              <LogOut className="size-4" />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
}
