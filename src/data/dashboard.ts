import type { LucideIcon } from "lucide-react";
import {
  BarChart3,
  CreditCard,
  Receipt,
  Store,
  Truck,
  Users,
  Utensils,
} from "lucide-react";

export interface SidebarItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

export const sidebarItems: SidebarItem[] = [
  { label: "Customers", href: "/customers", icon: Users },
  { label: "Vendors", href: "/vendors", icon: Store },
  { label: "Foods", href: "/foods", icon: Utensils },
  { label: "Orders", href: "/orders", icon: Receipt },
  { label: "Payments", href: "/payments", icon: CreditCard },
  { label: "Riders", href: "/riders", icon: Truck },
  { label: "Reports", href: "/reports", icon: BarChart3 },
];

export const sectionConfig = [
  { label: "Management", items: ["Customers", "Vendors", "Foods"] },
  { label: "Operations", items: ["Orders", "Payments", "Riders"] },
  { label: "Analytics", items: ["Reports"] },
] as const;
