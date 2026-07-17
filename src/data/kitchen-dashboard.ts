import type { LucideIcon } from "lucide-react";
import {
  LayoutDashboard,
  ClipboardList,
  UtensilsCrossed,
} from "lucide-react";

export interface SidebarItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

export const sidebarItems: SidebarItem[] = [
  { label: "Dashboard", href: "/dashboard/kitchen", icon: LayoutDashboard },
  { label: "Orders", href: "/dashboard/kitchen/orders", icon: ClipboardList },
  { label: "Meals", href: "/dashboard/kitchen/meals", icon: UtensilsCrossed },
];

export const sectionConfig = [
  { label: "Kitchen", items: ["Dashboard", "Orders", "Meals"] },
] as const;
