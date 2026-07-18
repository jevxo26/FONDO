import type { LucideIcon } from "lucide-react";
import { BarChart3, Bike, DollarSign, LayoutDashboard, User } from "lucide-react";

export interface SidebarItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

export const sidebarItems: SidebarItem[] = [
  { label: "Dashboard", href: "/", icon: LayoutDashboard },
  { label: "Deliveries", href: "/deliveries", icon: Bike },
  { label: "Earnings", href: "/earnings", icon: DollarSign },
  { label: "Performance", href: "/performance", icon: BarChart3 },
  { label: "Profile", href: "/profile", icon: User },
];

export const sectionConfig = [
  { label: "Rider", items: ["Dashboard", "Deliveries", "Earnings", "Performance", "Profile"] },
] as const;
