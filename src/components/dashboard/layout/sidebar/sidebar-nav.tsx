"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import type { LucideIcon } from "lucide-react";
import { SidebarNavDropdown } from "./sidebar-nav-dropdown";

export interface SidebarItem {
  label: string;
  href: string;
  icon: LucideIcon;
  children?: { label: string; href: string; icon: LucideIcon }[];
}

interface SidebarNavProps {
  items: SidebarItem[];
  sections: readonly { readonly label: string; readonly items: readonly string[] }[];
  basePath: string;
  onNavigate?: () => void;
}

export function SidebarNav({
  items,
  sections: sectionConfig,
  basePath,
  onNavigate,
}: SidebarNavProps) {
  const pathname = usePathname();
  const [expanded, setExpanded] = useState<string[]>([]);

  const toggleExpanded = (label: string) => {
    setExpanded((prev) =>
      prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label],
    );
  };

  const sections = useMemo(() => {
    const itemMap = new Map(items.map((item) => [item.label, item]));
    return sectionConfig.map((section) => ({
      label: section.label,
      items: section.items.map((label) => itemMap.get(label)).filter(Boolean) as SidebarItem[],
    }));
  }, [items, sectionConfig]);

  return (
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
                if (item.children) {
                  return (
                    <SidebarNavDropdown
                      key={item.label}
                      item={item}
                      basePath={basePath}
                      pathname={pathname}
                      isExpanded={expanded.includes(item.label)}
                      onToggle={() => toggleExpanded(item.label)}
                      onNavigate={onNavigate}
                    />
                  );
                }

                const Icon = item.icon;
                const href = `${basePath}${item.href}`.replace(/\/+$/, "");
                const isActive =
                  pathname === href || (href !== basePath && pathname.startsWith(href + "/"));

                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      render={<Link href={href} onClick={onNavigate} />}
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
                          "size-[18px] shrink-0 group-data-[collapsible=icon]:size-5 transition-all duration-300",
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
  );
}

function SidebarNavDropdown({
  item,
  basePath,
  pathname,
  isExpanded,
  onToggle,
  onNavigate,
}: {
  item: SidebarItem;
  basePath: string;
  pathname: string;
  isExpanded: boolean;
  onToggle: () => void;
  onNavigate?: () => void;
}) {
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
              className={cn(
                "rounded-lg px-3 py-2.5 h-auto gap-3 text-muted-foreground transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-primary/8 cursor-pointer",
                isChildActive &&
                  "border-l-[3px] border-primary bg-gradient-to-r from-primary/10 to-primary/5 shadow-[inset_0_1px_1px_rgba(206,163,89,0.15),0_0_16px_rgba(206,163,89,0.12)] font-semibold text-primary",
              )}
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
              <ul className="space-y-1.5">
                {item.children!.map((child, i) => {
                  const isLast = i === item.children!.length - 1;
                  const childHref = `${basePath}${child.href}`.replace(/\/+$/, "");
                  const isActive = pathname === childHref;
                  const ChildIcon = child.icon;

                  return (
                    <li key={child.href} className="relative flex items-center">
                      <div className="absolute left-[11px] top-0 bottom-1/2 w-px bg-gradient-to-b from-primary/20 to-transparent"
                        style={{ display: isLast ? "none" : undefined }}
                      />
                      <div className="absolute left-[11px] top-1/2 h-px w-3 bg-primary/30" />
                      <div
                        className={cn(
                          "absolute left-[8px] top-1/2 -translate-y-1/2 size-2 rotate-45 transition-all duration-300",
                          isActive ? "bg-primary shadow-[0_0_8px_rgba(206,163,89,0.4)]" : "bg-primary/40",
                        )}
                      />
                      <Link
                        href={childHref}
                        onClick={onNavigate}
                        className={cn(
"ml-6 w-full rounded-md px-3 py-2 text-[13px] transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] flex items-center gap-2.5",
                          isActive
                            ? "font-semibold text-primary shadow-[inset_0_1px_1px_rgba(206,163,89,0.1),0_0_12px_rgba(206,163,89,0.08)] bg-gradient-to-r from-primary/8 to-primary/3"
                            : "text-muted-foreground hover:bg-primary/5 hover:text-foreground",
                        )}
                      >
                        <ChildIcon className={cn("size-4 shrink-0", isActive && "text-primary")} />
                        <span className="truncate">{child.label}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
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
        className={cn(
          "rounded-lg px-3 py-2.5 h-auto gap-3 text-muted-foreground transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-primary/8 cursor-pointer",
          isChildActive &&
            "border-l-[3px] border-primary bg-gradient-to-r from-primary/10 to-primary/5 shadow-[inset_0_1px_1px_rgba(206,163,89,0.15),0_0_16px_rgba(206,163,89,0.12)] font-semibold text-primary",
        )}
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
          <ul className="space-y-1.5">
            {item.children!.map((child, i) => {
              const isLast = i === item.children!.length - 1;
              const childHref = `${basePath}${child.href}`.replace(/\/+$/, "");
              const isActive = pathname === childHref;

              const ChildIcon = child.icon;

              return (
                <li key={child.href} className="relative flex items-center">
                  <div className="absolute left-[23px] top-0 bottom-1/2 w-px bg-gradient-to-b from-primary/20 to-transparent"
                    style={{ display: isLast ? "none" : undefined }}
                  />
                  <div className="absolute left-[23px] top-1/2 h-px w-3 bg-primary/30" />
                  <div
                    className={cn(
                      "absolute left-[20px] top-1/2 -translate-y-1/2 size-2 rotate-45 transition-all duration-300",
                      isActive ? "bg-primary shadow-[0_0_8px_rgba(206,163,89,0.4)]" : "bg-primary/40",
                    )}
                  />
                  <Link
                    href={childHref}
                    onClick={onNavigate}
                    className={cn(
                      "ml-9 w-full rounded-md px-3 py-2 text-[13px] transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] flex items-center gap-2.5",
                      isActive
                        ? "font-semibold text-primary shadow-[inset_0_1px_1px_rgba(206,163,89,0.1),0_0_12px_rgba(206,163,89,0.08)] bg-gradient-to-r from-primary/8 to-primary/3"
                        : "text-muted-foreground hover:bg-primary/5 hover:text-foreground",
                    )}
                  >
                    <ChildIcon className={cn("size-4 shrink-0", isActive && "text-primary")} />
                    <span className="truncate">{child.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </SidebarMenuItem>
  );
}
