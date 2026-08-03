import type { Role } from "@prisma/client";

export const MODULE_LABELS: Record<string, string> = {
  users: "Users",
  foods: "Foods",
  orders: "Orders",
  vendors: "Vendors",
  coupons: "Coupons",
  riders: "Riders",
  packages: "Packages",
  reports: "Reports",
  settings: "Settings",
};

export const ALL_MODULES = Object.keys(MODULE_LABELS);

export const ROLE_PERMISSIONS: Record<Role, string[]> = {
  SUPER_ADMIN: ["*"],
  ADMIN: [...ALL_MODULES],
  VENDOR: ["foods", "orders", "packages"],
  RIDER: ["orders"],
  CUSTOMER: [],
};

export const TOGGLEABLE_MODULES: Record<Role, string[]> = {
  SUPER_ADMIN: [],
  ADMIN: [...ALL_MODULES],
  VENDOR: ["foods", "packages"],
  RIDER: [],
  CUSTOMER: [],
};
