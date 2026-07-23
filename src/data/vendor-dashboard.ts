// src/config/sidebar.ts or wherever your sidebar config is

import type { LucideIcon } from "lucide-react";
import {
  Building2,
  ClipboardList,
  LayoutDashboard,
  Settings,
  Users,
  Utensils,
  Wallet,
  Landmark, // ← Added for Bank Accounts
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
  { label: "Branches", href: "/branches", icon: Building2 }, // ← NEW
  { label: "Earnings", href: "/earnings", icon: Wallet },
  { label: "Bank Accounts", href: "/bank-accounts", icon: Landmark }, // ← NEW
  { label: "Settings", href: "/settings", icon: Settings },
];

export const sectionConfig = [
  { label: "Business", items: ["Foods", "Orders"] },
  { label: "Operations", items: ["Kitchens", "Staff", "Branches"] }, // ← Added Branches
  { label: "Finance", items: ["Earnings", "Bank Accounts"] }, // ← Added Bank Accounts
  { label: "Settings", items: ["Settings"] }, // ← Moved Settings to its own section
] as const;