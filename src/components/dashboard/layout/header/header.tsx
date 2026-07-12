"use client";

import { Fragment } from "react";
import { Bell, ChevronRight, HelpCircle, Package, Plus, Receipt, Settings, Store, Utensils } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { usePathname } from "next/navigation";
import Link from "next/link";

export function DashboardHeader() {
  const pathname = usePathname();

  const segments = pathname
    .replace("/dashboard", "")
    .split("/")
    .filter(Boolean);

  const humanize = (s: string) =>
    s.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()).trim();

  const currentPage = segments.length > 0 ? humanize(segments[segments.length - 1]) : "Overview";

  return (
    <header className="sticky top-0 z-30 border-b border-primary/15 bg-secondary/90 px-4 py-3 shadow-[var(--shadow-card)] backdrop-blur-xl transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] lg:px-6">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[3px] bg-gradient-to-r from-primary/40 via-primary/20 to-transparent" />
      <div className="relative flex items-center justify-between">
        <div className="flex items-center gap-4">
          <SidebarTrigger />

          <span className="text-sm font-semibold text-foreground md:hidden">{currentPage}</span>

          <nav className="hidden items-center gap-1.5 text-sm md:flex">
            <Link
              href="/dashboard"
              className="text-muted-foreground transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:text-foreground"
            >
              Dashboard
            </Link>
            {segments.map((seg, i) => {
              const href = "/dashboard/" + segments.slice(0, i + 1).join("/");
              const isLast = i === segments.length - 1;
              return (
                <Fragment key={seg}>
                  <ChevronRight className="size-3.5 text-muted-foreground/40" />
                  {isLast ? (
                    <span className="font-medium capitalize text-foreground">
                      {humanize(seg)}
                    </span>
                  ) : (
                    <Link
                      href={href}
                      className="capitalize text-muted-foreground transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:text-foreground"
                    >
                      {humanize(seg)}
                    </Link>
                  )}
                </Fragment>
              );
            })}
          </nav>

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
          <DropdownMenu>
            <DropdownMenuTrigger
              className={buttonVariants({
                variant: "ghost",
                size: "sm",
                className:
                  "rounded-full border border-primary/20 bg-primary/8 text-primary text-xs font-semibold px-2 py-1.5 h-auto transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-primary/12 hover:border-primary/40 active:scale-[0.97] sm:px-4",
              })}
            >
              <Plus className="size-3.5" />
              <span className="hidden sm:inline">New</span>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuGroup>
                <DropdownMenuLabel className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                  Quick Actions
                </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => console.log("New Food")}
                className="flex items-center gap-3 py-2.5"
              >
                <div className="flex size-8 items-center justify-center rounded-lg bg-primary/8">
                  <Utensils className="size-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">New Food Item</p>
                  <p className="text-[11px] text-muted-foreground">
                    Add a new food to the catalog
                  </p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => console.log("New Vendor")}
                className="flex items-center gap-3 py-2.5"
              >
                <div className="flex size-8 items-center justify-center rounded-lg bg-primary/8">
                  <Store className="size-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">New Vendor</p>
                  <p className="text-[11px] text-muted-foreground">
                    Register a new vendor account
                  </p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => console.log("New Order")}
                className="flex items-center gap-3 py-2.5"
              >
                <div className="flex size-8 items-center justify-center rounded-lg bg-primary/8">
                  <Receipt className="size-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">New Order</p>
                  <p className="text-[11px] text-muted-foreground">
                    Create a manual customer order
                  </p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => console.log("New Package")}
                className="flex items-center gap-3 py-2.5"
              >
                <div className="flex size-8 items-center justify-center rounded-lg bg-primary/8">
                  <Package className="size-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">New Package</p>
                  <p className="text-[11px] text-muted-foreground">
                    Create a new meal package
                  </p>
                </div>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
          </DropdownMenu>

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

          <div className="flex items-center gap-3">
            <div className="hidden text-right md:block">
              <p className="text-sm font-semibold text-foreground">
                Ahmed Rizvi
              </p>
              <p className="text-[10px] uppercase tracking-tighter text-muted-foreground">
                System Administrator
              </p>
            </div>
            <Avatar className="size-9 ring-2 ring-primary/30 ring-offset-2 ring-offset-card shadow-[0_0_12px_rgba(206,163,89,0.15)]">
              <AvatarFallback className="bg-primary/10 text-xs font-bold text-primary">
                AR
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </header>
  );
}
