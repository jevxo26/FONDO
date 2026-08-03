import type { LucideIcon } from "lucide-react";
import {
  Apple,
  Banknote,
  BarChart3,
  Bike,
  CalendarDays,
  Clock,
  CreditCard,
  DollarSign,
  Gift,
  Grid3x3,
  Landmark,
  LayoutDashboard,
  Package,
  Radio,
  Receipt,
  Repeat,
  Store,
  ThumbsUp,
  Ticket,
  TrendingUp,
  Truck,
  Undo2,
  Users,
  Utensils,
  Wallet,
  Layout,
  Image,
  SlidersHorizontal,
  Newspaper,
  FileText,
  Settings,
} from "lucide-react";

export interface SidebarItem {
  label: string;
  href: string;
  icon: LucideIcon;
  children?: { label: string; href: string; icon: LucideIcon }[];
  permission?: string;
}

export const sidebarItems: SidebarItem[] = [
  {
    label: "Customers",
    href: "/customers",
    icon: Users,
    permission: "users",
    children: [
      { label: "Profiles", href: "/customers", icon: Users },
      { label: "Orders", href: "/customers/orders", icon: Receipt },
      { label: "Subscriptions", href: "/customers/subscriptions", icon: Repeat },
      { label: "Payments", href: "/customers/payments", icon: CreditCard },
      { label: "Wallets", href: "/customers/wallets", icon: Wallet },
    ],
  },
  {
    label: "Vendors",
    href: "/vendors",
    icon: Store,
    permission: "vendors",
    children: [
      { label: "All Vendors", href: "/vendors", icon: Store },
      { label: "Pending Approval", href: "/vendors/pending", icon: Clock },
      { label: "Performance", href: "/vendors/performance", icon: TrendingUp },
    ],
  },
  {
    label: "Foods",
    href: "/foods",
    icon: Utensils,
    permission: "foods",
    children: [
      { label: "All Foods", href: "/foods", icon: Utensils },
      { label: "Approval", href: "/foods/approval", icon: ThumbsUp },
      { label: "Categories", href: "/foods/categories", icon: Grid3x3 },
      { label: "Inventory", href: "/foods/inventory", icon: Package },
      { label: "Meal Plans", href: "/foods/meal-plans", icon: CalendarDays },
      { label: "Nutrition", href: "/foods/nutrition", icon: Apple },
      { label: "Packages", href: "/foods/packages", icon: Gift },
    ],
  },
  {
    label: "Users",
    href: "/users",
    icon: Users,
    permission: "users",
  },
  {
    label: "Orders",
    href: "/orders",
    icon: Receipt,
    permission: "orders",
    children: [
      { label: "All Orders", href: "/orders", icon: Receipt },
      { label: "Analytics", href: "/orders/analytics", icon: BarChart3 },
    ],
  },
  {
    label: "Payments",
    href: "/payments",
    icon: CreditCard,
    permission: "settings",
    children: [
      { label: "All Payments", href: "/payments", icon: CreditCard },
      { label: "Coupons", href: "/payments/coupons", icon: Ticket },
      { label: "Refunds", href: "/payments/refunds", icon: Undo2 },
      { label: "Withdrawals", href: "/payments/withdrawals", icon: Wallet },
      { label: "Settlements", href: "/payments/settlements", icon: Landmark },
      { label: "Revenue", href: "/payments/revenue", icon: Banknote },
    ],
  },
  {
    label: "Riders",
    href: "/riders",
    icon: Truck,
    permission: "riders",
    children: [
      { label: "All Riders", href: "/riders", icon: Truck },
      { label: "Earnings", href: "/riders/earnings", icon: Wallet },
      { label: "Live Tracking", href: "/riders/live", icon: Radio },
      { label: "Performance", href: "/riders/performance", icon: TrendingUp },
    ],
  },
  {
    label: "CMS",
    href: "/cms",
    icon: Layout,
    permission: "settings",
    children: [
      { label: "Dashboard", href: "/cms", icon: LayoutDashboard },
      { label: "Banners", href: "/cms/banners", icon: Image },
      { label: "Sliders", href: "/cms/sliders", icon: SlidersHorizontal },
      { label: "Blog Categories", href: "/cms/blog-categories", icon: Grid3x3 },
      { label: "Blogs", href: "/cms/blogs", icon: Newspaper },
      { label: "Pages", href: "/cms/pages", icon: FileText },
      { label: "Settings", href: "/cms/settings", icon: Settings },
    ],
  },
  {
    label: "Reports",
    href: "/reports",
    icon: BarChart3,
    permission: "reports",
    children: [
      { label: "Overview", href: "/reports", icon: LayoutDashboard },
      { label: "Revenue", href: "/reports/revenue", icon: DollarSign },
      { label: "Customers", href: "/reports/customers", icon: Users },
      { label: "Vendors", href: "/reports/vendors", icon: Store },
      { label: "Riders", href: "/reports/riders", icon: Bike },
      { label: "Inventory", href: "/reports/inventory", icon: Package },
      { label: "Subscriptions", href: "/reports/subscriptions", icon: Repeat },
    ],
  },
];

export const sectionConfig = [
  { label: "Management", items: ["Users", "Customers", "Vendors", "Foods"] },
  { label: "Operations", items: ["Orders", "Payments", "Riders"] },
  { label: "Content", items: ["CMS"] },
  { label: "Analytics", items: ["Reports"] },
] as const;