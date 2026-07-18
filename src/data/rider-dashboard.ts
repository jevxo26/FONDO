import type { LucideIcon } from "lucide-react";
import {
  Bike,
  DollarSign,
  LayoutDashboard,
  User,
  BarChart3,
} from "lucide-react";

export interface SidebarItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

export const sidebarItems: SidebarItem[] = [
  { label: "Dashboard", href: "/dashboard/rider", icon: LayoutDashboard },
  { label: "Deliveries", href: "/dashboard/rider/deliveries", icon: Bike },
  { label: "Earnings", href: "/dashboard/rider/earnings", icon: DollarSign },
  { label: "Performance", href: "/dashboard/rider/performance", icon: BarChart3 },
  { label: "Profile", href: "/dashboard/rider/profile", icon: User },
];

export const sectionConfig = [
  { label: "Rider", items: ["Dashboard", "Deliveries", "Earnings", "Performance", "Profile"] },
] as const;
