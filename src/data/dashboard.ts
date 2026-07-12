import type { LucideIcon } from "lucide-react";
import {
  BarChart3,
  CreditCard,
  Package,
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
  { label: "Food", href: "/foods", icon: Utensils },
  { label: "Packages", href: "/packages", icon: Package },
  { label: "Orders", href: "/orders", icon: Receipt },
  { label: "Payments", href: "/payments", icon: CreditCard },
  { label: "Riders", href: "/riders", icon: Truck },
  { label: "Reports", href: "/reports", icon: BarChart3 },
];
