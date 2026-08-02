import {
  Bike,
  BookOpen,
  HelpCircle,
  Info,
  Mail,
  MessageSquareText,
  Package,
  Store,
  Truck,
  Utensils,
  UtensilsCrossed,
  Newspaper,
  FileText,
} from "lucide-react";
import type { ComponentType } from "react";

export const ROLE_DASHBOARD: Record<string, string> = {
  ADMIN: "/dashboard/admin",
  SUPER_ADMIN: "/dashboard/admin",
  VENDOR: "/dashboard/vendor",
  VENDOR_STAFF: "/dashboard/vendor",
  KITCHEN_STAFF: "/dashboard/kitchen",
  RIDER: "/dashboard/rider",
  SUPPORT_AGENT: "/dashboard/admin",
};

interface NavLink {
  href?: string;
  label: string;
  children?: { href: string; label: string }[];
}

export const childIcons: Record<string, ComponentType<{ className?: string }>> = {
  "/foods": Utensils,
  "/packages": Package,
  "/meals": UtensilsCrossed,
  "/reviews": MessageSquareText,
  "/our-story": BookOpen,
  "/about": Info,
  "/apply/vendor": Store,
  "/apply/rider": Bike,
  "/contact": Mail,
  "/faq": HelpCircle,
  "/traking-page": Truck,
  "/blog": Newspaper,
  "/pages": FileText,
};

export const mainNavLinks: NavLink[] = [
  { href: "/", label: "Home" },
  {
    label: "Foods",
    children: [
      { href: "/foods", label: "All Foods" },
      { href: "/packages", label: "Packages" },
      { href: "/meals", label: "Meals" },
      { href: "/reviews", label: "Reviews" },
    ],
  },
  { href: "/packages", label: "Packages" },
  { href: "/meals", label: "Meals" },
  {
    label: "More",
    children: [
      { href: "/our-story", label: "Our Story" },
      { href: "/about", label: "About" },
      { href: "/apply/vendor", label: "Apply as Vendor" },
      { href: "/apply/rider", label: "Apply as Rider" },
      { href: "/contact", label: "Contact" },
      { href: "/faq", label: "FAQ" },
      { href: "/blog", label: "Blog" },
      { href: "/pages", label: "Pages" },
    ],
  },
];

export const mobileNavLinks: { href: string; label: string }[] = [
  { href: "/", label: "Home" },
  { href: "/foods", label: "All Foods" },
  { href: "/packages", label: "Packages" },
  { href: "/meals", label: "Meals" },
  { href: "/reviews", label: "Reviews" },
  { href: "/our-story", label: "Our Story" },
  { href: "/about", label: "About" },
  { href: "/apply/vendor", label: "Apply as Vendor" },
  { href: "/apply/rider", label: "Apply as Rider" },
  { href: "/contact", label: "Contact" },
  { href: "/faq", label: "FAQ" },
  { href: "/traking-page", label: "Track Order" },
  { href: "/wishlist", label: "Wishlist" },
  { href: "/blog", label: "Blog" },
  { href: "/pages", label: "Pages" },
];