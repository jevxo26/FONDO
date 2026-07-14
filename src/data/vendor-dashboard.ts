import type { LucideIcon } from "lucide-react";
import {
  Building2,
  ClipboardList,
  LayoutDashboard,
  Settings,
  Users,
  Utensils,
  Wallet,
} from "lucide-react";

export interface SidebarItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

export const sidebarItems: SidebarItem[] = [
  { label: "Foods", href: "/foods", icon: Utensils },
  { label: "Orders", href: "/orders", icon: ClipboardList },
  { label: "Kitchens", href: "/kitchens", icon: Building2 },
  { label: "Staff", href: "/staff", icon: Users },
  { label: "Earnings", href: "/earnings", icon: Wallet },
  { label: "Settings", href: "/settings", icon: Settings },
];

export const sectionConfig = [
  { label: "Business", items: ["Foods", "Orders"] },
  { label: "Operations", items: ["Kitchens", "Staff"] },
  { label: "Finance", items: ["Earnings", "Settings"] },
] as const;
