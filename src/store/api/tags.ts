// src/store/api/tags.ts
export const TAG_TYPES = [
  "Cart",
  "Order",
  "Favorite",
  "Food",
  "Category",
  "Address",
  "Payment",
  "PaymentMethod",
  "Profile",
  "Review",
  "AdminCustomer",
  "Wallet",
  "Coupon",
  "Package",
  "Vendor",
  "VendorFood",
  "User",
  "VendorOrder",
  "KitchenOrder",
  "AdminPayment",
  "VendorSettlement",
  "PlatformRevenue",
  "Role",
  "Permission",
] as const;

export type TagType = (typeof TAG_TYPES)[number];
