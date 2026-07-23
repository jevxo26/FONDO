// src/config/sidebar.ts

import type { LucideIcon } from "lucide-react";
import {
  Building2,
  ClipboardList,
  LayoutDashboard,
  Settings,
  Users,
  Utensils,
  Wallet,
  Landmark,
  MapPin, // ← Added for Service Areas
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
  { label: "Branches", href: "/branches", icon: Building2 },
  { label: "Service Areas", href: "/service-areas", icon: MapPin }, // ← NEW
  { label: "Earnings", href: "/earnings", icon: Wallet },
  { label: "Bank Accounts", href: "/bank-accounts", icon: Landmark },
  { label: "Settings", href: "/settings", icon: Settings },
];

export const sectionConfig = [
  { label: "Business", items: ["Foods", "Orders"] },
  { label: "Operations", items: ["Kitchens", "Staff", "Branches", "Service Areas"] }, // ← Added Service Areas
  { label: "Finance", items: ["Earnings", "Bank Accounts"] },
  { label: "Settings", items: ["Settings"] },
] as const;