// src/store/api/tags.ts
export const TAG_TYPES = [
  "Food",
  "Category",
  "Vendor",
  "VendorFood",
  "Order",
  "Package",
  "User",
  "Profile",
] as const;

export type TagType = (typeof TAG_TYPES)[number];