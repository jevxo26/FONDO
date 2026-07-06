"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { sidebarItems } from "@/data/dashboard";

export function SidebarMenu() {
  const pathname = usePathname();

  return (
    <nav className="flex-1 space-y-1">
      {sidebarItems.map((item) => {
        const isActive = pathname.startsWith(item.href);
        const Icon = item.icon;

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-3 text-muted-foreground transition-colors duration-200 hover:bg-muted",
              isActive &&
                "border-r-4 border-primary bg-muted font-bold text-primary",
            )}
          >
            <Icon className="size-5" />
            <span className="text-body-lg">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
