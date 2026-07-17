"use client";

import { useMemo } from "react";
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

interface SidebarItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

interface SidebarNavProps {
  items: SidebarItem[];
  sections: readonly { readonly label: string; readonly items: readonly string[] }[];
  basePath: string;
  onNavigate?: () => void;
}

export function SidebarNav({ items, sections: sectionConfig, basePath, onNavigate }: SidebarNavProps) {
  const pathname = usePathname();

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
                const Icon = item.icon;
                const href = `${basePath}${item.href}`.replace(/\/+$/, '');
                const isActive = pathname === href || (href !== basePath && pathname.startsWith(href + '/'));

                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      render={
                        <Link href={href} onClick={onNavigate} />
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
  );
}
