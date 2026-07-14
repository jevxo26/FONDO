import type { LucideIcon } from "lucide-react";
import {
  DollarSign,
  User,
} from "lucide-react";

export interface SidebarItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

export const sidebarItems: SidebarItem[] = [
  { label: "Earnings", href: "/earnings", icon: DollarSign },
  { label: "Profile", href: "/profile", icon: User },
];

export const sectionConfig = [
  { label: "Rider", items: ["Earnings", "Profile"] },
] as const;
