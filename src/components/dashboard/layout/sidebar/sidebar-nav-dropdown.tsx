"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import type { SidebarItem } from "./sidebar-nav";

interface Props {
  item: SidebarItem;
  basePath: string;
  pathname: string;
  isExpanded: boolean;
  onToggle: () => void;
  onNavigate?: () => void;
}

const buttonClass =
  "rounded-lg px-3 py-2.5 h-auto gap-3 text-muted-foreground transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-primary/8 cursor-pointer";

const activeButtonClass =
  "border-l-[3px] border-primary bg-gradient-to-r from-primary/10 to-primary/5 shadow-[inset_0_1px_1px_rgba(206,163,89,0.15),0_0_16px_rgba(206,163,89,0.12)] font-semibold text-primary";

const childLinkClass =
  "w-full rounded-md px-3 py-2 text-[13px] transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] flex items-center gap-2.5";

const activeChildClass =
  "font-semibold text-primary shadow-[inset_0_1px_1px_rgba(206,163,89,0.1),0_0_12px_rgba(206,163,89,0.08)] bg-gradient-to-r from-primary/8 to-primary/3";

const inactiveChildClass =
  "text-muted-foreground hover:bg-primary/5 hover:text-foreground";

function TreeChildren({
  children,
  basePath,
  pathname,
  onNavigate,
  lineLeft,
  linkMargin,
}: {
  children: SidebarItem["children"];
  basePath: string;
  pathname: string;
  onNavigate?: () => void;
  lineLeft: number;
  linkMargin: string;
}) {
  return (
    <ul className="space-y-1.5">
      {children!.map((child, i) => {
        const isLast = i === children!.length - 1;
        const childHref = `${basePath}${child.href}`.replace(/\/+$/, "");
        const isActive = pathname === childHref;
        const ChildIcon = child.icon;

        return (
          <li key={child.href} className="relative flex items-center">
            <div
              className="absolute top-0 bottom-1/2 w-px bg-gradient-to-b from-primary/20 to-transparent"
              style={{ left: lineLeft, display: isLast ? "none" : undefined }}
            />
            <div className="absolute top-1/2 h-px w-3 bg-primary/30" style={{ left: lineLeft }} />
            <div
              className={cn(
                "absolute top-1/2 -translate-y-1/2 size-2 rotate-45 transition-all duration-300",
                isActive ? "bg-primary shadow-[0_0_8px_rgba(206,163,89,0.4)]" : "bg-primary/40",
              )}
              style={{ left: lineLeft - 3 }}
            />
            <Link
              href={childHref}
              onClick={onNavigate}
              className={cn(
                linkMargin,
                childLinkClass,
                isActive ? activeChildClass : inactiveChildClass,
              )}
            >
              <ChildIcon className={cn("size-4 shrink-0", isActive && "text-primary")} />
              <span className="truncate">{child.label}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export function SidebarNavDropdown({
  item,
  basePath,
  pathname,
  isExpanded,
  onToggle,
  onNavigate,
}: Props) {
  const Icon = item.icon;
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";
  const [showFlyout, setShowFlyout] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleFlyoutOpen = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setShowFlyout(true);
  };

  const handleFlyoutClose = () => {
    closeTimer.current = setTimeout(() => setShowFlyout(false), 150);
  };

  const isChildActive = item.children!.some((child) => {
    const childHref = `${basePath}${child.href}`.replace(/\/+$/, "");
    return pathname === childHref;
  });

  if (isCollapsed) {
    return (
      <SidebarMenuItem>
        <Popover open={showFlyout} onOpenChange={setShowFlyout}>
          <PopoverTrigger render={<span />}>
            <SidebarMenuButton
              tooltip={undefined}
              isActive={isChildActive}
              onMouseEnter={handleFlyoutOpen}
              onMouseLeave={handleFlyoutClose}
              className={cn(buttonClass, isChildActive && activeButtonClass)}
            >
              <Icon
                className={cn(
                  "size-[18px] shrink-0 group-data-[collapsible=icon]:size-5 transition-all duration-300",
                  isChildActive && "text-primary",
                )}
              />
            </SidebarMenuButton>
          </PopoverTrigger>
          <PopoverContent
            side="right"
            align="start"
            sideOffset={8}
            className="min-w-52 p-2 bg-sidebar"
            onMouseEnter={handleFlyoutOpen}
            onMouseLeave={handleFlyoutClose}
          >
            <div className="flex items-center gap-2.5 px-2.5 py-2 mb-1 border-b border-primary/10">
              <Icon className="size-4 shrink-0 text-primary" />
              <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-primary">
                {item.label}
              </span>
            </div>
            <div className="relative">
              <div className="absolute left-[11px] top-0 bottom-2 w-px bg-gradient-to-b from-primary/30 via-primary/15 to-transparent" />
              <TreeChildren
                basePath={basePath}
                pathname={pathname}
                onNavigate={onNavigate}
                lineLeft={11}
                linkMargin="ml-6"
              >
                {item.children}
              </TreeChildren>
            </div>
          </PopoverContent>
        </Popover>
      </SidebarMenuItem>
    );
  }

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        tooltip={item.label}
        isActive={isChildActive}
        onClick={onToggle}
        className={cn(buttonClass, isChildActive && activeButtonClass)}
      >
        <Icon
          className={cn(
            "size-[18px] shrink-0 group-data-[collapsible=icon]:size-5 transition-all duration-300",
            isChildActive && "text-primary",
          )}
        />
        <div className="flex items-center gap-2 flex-1 min-w-0">
          {isChildActive && <div className="size-1.5 shrink-0 rotate-45 bg-primary" />}
          <span className="truncate">{item.label}</span>
        </div>
        <ChevronDown
          className={cn(
            "size-3.5 shrink-0 text-muted-foreground transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] group-data-[collapsible=icon]:hidden",
            isExpanded && "rotate-180",
          )}
        />
      </SidebarMenuButton>

      {isExpanded && (
        <div className="relative mt-0.5 group-data-[collapsible=icon]:hidden">
          <div className="absolute left-[23px] top-0 bottom-2 w-px bg-gradient-to-b from-primary/30 via-primary/15 to-transparent" />
          <TreeChildren
            basePath={basePath}
            pathname={pathname}
            onNavigate={onNavigate}
            lineLeft={23}
            linkMargin="ml-9"
          >
            {item.children}
          </TreeChildren>
        </div>
      )}
    </SidebarMenuItem>
  );
}
