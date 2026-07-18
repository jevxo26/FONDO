import type { LucideIcon } from "lucide-react";
import { ClipboardList, UtensilsCrossed } from "lucide-react";

export interface SidebarItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

export const sidebarItems: SidebarItem[] = [
  { label: "Orders", href: "/orders", icon: ClipboardList },
  { label: "Meals", href: "/meals", icon: UtensilsCrossed },
];

export const sectionConfig = [
  { label: "Kitchen", items: ["Orders", "Meals"] },
] as const;
